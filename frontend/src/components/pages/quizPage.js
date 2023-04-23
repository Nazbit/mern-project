import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ListGroup, Button } from "react-bootstrap";

const QuizPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  const handleQuizSelect = (quizId) => {
    navigate(`/takeQuiz/${quizId}`);
  }

  const handleQuizDelete = async (quizId, event) => {
    event.stopPropagation();
    try {
      await axios.delete(`http://localhost:8081/quiz/deleteQuizById/${quizId}`);
      setQuizzes(quizzes.filter(quiz => quiz._id !== quizId));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const getQuizzes = async () => {
      try {
        const res = await axios.get("http://localhost:8081/quiz/getAllQuizzes");
        setQuizzes(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getQuizzes();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mb-5">Quizzes</h1>
      <ListGroup>
        {quizzes.map((quiz) => (
          <ListGroup.Item key={quiz._id}
          onClick={() => handleQuizSelect(quiz._id)}
           action>
            <div className="d-flex justify-content-between align-items-center">
              <span>{quiz.title}</span>
              <Button variant="danger" onClick={(event) => handleQuizDelete(quiz._id, event)}>Delete</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default QuizPage;
