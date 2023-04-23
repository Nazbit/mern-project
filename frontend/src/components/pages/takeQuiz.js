import React, { useState, useEffect } from "react";
import axios from "axios";
import getUserInfo from "../../utilities/decodeJwt";
import { useParams } from "react-router-dom";

const TakeQuiz = () => {
    const { quizId } = useParams();
    const [userAnswers, setUserAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [quizTitle, setQuizTitle] = useState("");
    const [quizExplanation, setQuizExplanation] = useState("");
    const [quizScore, setQuizScore] = useState(null);
    const [userId, setUserId] = useState("");

useEffect(() => {
    const getQuiz = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8081/quiz/getQuizById/${quizId}`
            );
            const questionIds = res.data.questions.map((question) => question);
            const questionPromises = questionIds.map((id) => axios.get(`http://localhost:8081/question/getQuestionById/${id}`));
            const questionResponses = await Promise.all(questionPromises);
            const quizQuestions = questionResponses.map((response) => response.data);
            setQuestions(quizQuestions);
            setQuizTitle(res.data.title);
            setQuizExplanation(res.data.explanation);
            setUserId(getUserInfo().id);
        } catch (error) {
            console.error(error);
        }
    };
    getQuiz();
}, [quizId]);


    const handleQuestionChange = (questionId, value) => {
        const updatedAnswers = [...userAnswers];
        const answerIndex = updatedAnswers.findIndex(
            (answer) => answer.questionId === questionId
        );
        if (answerIndex >= 0) {
            updatedAnswers[answerIndex].answer = value;
        } else {
            updatedAnswers.push({ questionId, answer: value });
        }
        setUserAnswers(updatedAnswers);
    };

    const handleAnswerSubmit = async (e) => {
        e.preventDefault();
        try {
            const quizScore = await axios.post("http://localhost:8081/quiz/submitQuiz", {
                quizId,
                userAnswers,
                userId,
            });
            setQuizScore(quizScore.data.score);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleAnswerSubmit}>
            <h1>{quizTitle}</h1>
            <p>{quizExplanation}</p>
            {questions.map((question, index) => (
                <div key={question._id}>
                    <h2>{question.questionText}</h2>
                    {question.options.map((option, optionIndex) => (
                        <div key={optionIndex}>
                            <label>
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value={optionIndex}
                                    checked={
                                        userAnswers.findIndex(
                                            (answer) =>
                                                answer.questionId === question._id &&
                                                answer.answer === optionIndex
                                        ) >= 0
                                    }
                                    onChange={(e) =>
                                        handleQuestionChange(question._id, parseInt(e.target.value))
                                    }
                                />
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
            ))}
            <button type="submit">Submit Answers</button>
            {quizScore && (
                <div>
                    <h2>Your score is: {quizScore}</h2>
                </div>
            )}
        </form>
    );
};

export default TakeQuiz;
