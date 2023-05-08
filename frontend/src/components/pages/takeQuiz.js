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
            const res = await axios.get(`http://localhost:8081/quiz/getQuizById/${quizId}`);
            const questionIds = res.data.questions.map((question) => question);
            const questionPromises = questionIds.map((id) => axios.get(`http://localhost:8081/question/getQuestionById/${id}`));
            const questionResponses = await Promise.all(questionPromises);
            const quizQuestions = questionResponses.map((response) => {
                const questionData = response.data;
                questionData.correctAnswer = res.data.questions.find((question) => question === questionData._id).correctAnswer;
                return questionData;
            });
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
        let score = 0;
        for (const userAnswer of userAnswers) {
            const question = questions.find(
                (question) => question._id === userAnswer.questionId
            );
            if (question.correctAnswer === userAnswer.answer) {
                score++;
            }
        }
        const quizScore = await axios.post("http://localhost:8081/quiz/submitQuiz", {
            quizId,
            userAnswers,
            userId,
            score
        }
        );
        await axios.post("http://localhost:8081/user/updateQuizScore", {
            userId,
            quizId, 
            score
          });
        
        setQuizScore(quizScore.data.score);
    } catch (error) {
        console.error(error);
    }
};



return (
<form onSubmit={handleAnswerSubmit} className="container mt-5">
  <h1 className="text-center mb-4">{quizTitle}</h1>
  <p className="mb-4">{quizExplanation}</p>
  {questions.map((question, index) => (
    <div key={question._id} className="mb-5">
      <h2>{question.questionText}</h2>
      {question.options.map((option, optionIndex) => (
        <div key={optionIndex} className="form-check">
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
            className="form-check-input"
            id={`option-${optionIndex}`}
          />
          <label htmlFor={`option-${optionIndex}`} className="form-check-label">
            {option}
          </label>
        </div>
      ))}
    </div>
  ))}
  <button type="submit" className="btn btn-primary mb-5">
    Submit Answers
  </button>
  {quizScore != null && (
    <div className="text-center">
      <h2>Your score is: {quizScore}</h2>
    </div>
  )}
</form>

  );
  
};

export default TakeQuiz;

