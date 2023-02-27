import React, { useState } from "react";
import axios from "axios";

const QuizForm = ({ handleSubmit, onCancel, initialValues }) => {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [course, setCourse] = useState(initialValues?.course || "");
  const [questions, setQuestions] = useState(
    initialValues?.questions || [{ question: "", options: ["", "", ""], correctAnswer: 1 }]
  );
  const [explanation, setExplanation] = useState(
    initialValues?.explanation || ""
  );

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctAnswer = value;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", "", ""], correctAnswer: 1 }]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

   handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8081/quiz/createQuiz", {
        title: title,
        questions: questions,
        explanation: explanation,
        course: course,
      });
      console.log(res);
      // reset the form
      setTitle("");
      setQuestions([{ question: "", options: ["", "", ""], correctAnswer: 1 }]);
      setExplanation("");
      setCourse("");
      // display success message to user
    } catch (error) {
      console.error(error);
      // display error message to user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="course">Course:</label>
        <input
          type="text"
          id="course"
          name="course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="questions">Questions:</label>
        {questions.map((question, index) => (
          <div key={index}>
            <label htmlFor={`question-${index}`}>Question {index + 1}:</label>
            <input
              type="text"
              id={`question-${index}`}
              name={`question-${index}`}
              value={question.question}
              onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
              required
            />
            <br />
            <label htmlFor={`option-${index}-1`}>Option 1:</label>
            <input
              type="text"
              id={`option-${index}-1`}
              name={`option-${index}-1`}
              value={question.options[0]}
              onChange={(e) => handleOptionChange(index, 0, e.target.value)}
              required
              />
              <br />
              <label htmlFor={`option-${index}-2`}>Option 2:</label>
              <input
                type="text"
                id={`option-${index}-2`}
                name={`option-${index}-2`}
                value={question.options[1]}
                onChange={(e) => handleOptionChange(index, 1, e.target.value)}
                required
              />
              <br />
              <label htmlFor={`option-${index}-3`}>Option 3:</label>
              <input
                type="text"
                id={`option-${index}-3`}
                name={`option-${index}-3`}
                value={question.options[2]}
                onChange={(e) => handleOptionChange(index, 2, e.target.value)}
                required
              />
              <br />
              <label htmlFor={`correct-answer-${index}`}>Correct Answer:</label>
              <select
                id={`correct-answer-${index}`}
                name={`correct-answer-${index}`}
                value={question.correctAnswer}
                onChange={(e) =>
                  handleCorrectAnswerChange(index, parseInt(e.target.value))
                }
                required
              >
                <option value={1}>Option 1</option>
                <option value={2}>Option 2</option>
                <option value={3}>Option 3</option>
              </select>
              <button type="button" onClick={() => handleRemoveQuestion(index)}>
                Remove Question
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddQuestion}>
            Add Question
          </button>
        </div>
        <div>
          <label htmlFor="explanation">Explanation:</label>
          <textarea
            id="explanation"
            name="explanation"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
);
};

export default QuizForm;      