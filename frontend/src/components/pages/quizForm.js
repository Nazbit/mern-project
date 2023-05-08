import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Row, Col } from 'react-bootstrap';

const QuizForm = ({ handleSubmit, onCancel, initialValues }) => {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [course, setCourse] = useState(initialValues?.course || "");
  const [questions, setQuestions] = useState(
    initialValues?.questions || [{ question: "", options: ["", "", ""], correctAnswer: 1 }]
  );
  const [explanation, setExplanation] = useState(
    initialValues?.explanation || ""
  );
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await axios.get("http://localhost:8081/course/getAllCourses");
        setCourseList(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCourses();
  }, []);

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const courseId = course;
      // Create quiz
      const quizData = {
        title: title,
        explanation: explanation,
        course: courseId,
      };
      const res = await axios.post(
        "http://localhost:8081/quiz/createQuiz",
        quizData
      );
      const quizId = res.data.id;

      // Add quiz ID to quizzes array of current course
      axios.post(
        `http://localhost:8081/quiz/courses/${course}/quizzes/${quizId}`,
      );

      // Create questions
      const questionsData = questions.map((question) => ({
        questionText: question.question,
        options: question.options,
        correctAnswer: question.correctAnswer,
      }));
      questionsData.map(async (questionData) => {
        const res = await axios.post(
          "http://localhost:8081/question/createQuestion",
          questionData
        );
        let questionId = "";
        questionId = res.data.questionId;
        axios.post(
          `http://localhost:8081/question/quizzes/${quizId}/questions/${questionId}`,
        );
        return questionData;
      });




      // Set the form fields to their respective ids
      setTitle(quizId);
      setCourse(course);
      setExplanation(explanation);

      // Display success message to user
    } catch (error) {
      console.error(error);
      // Display error message to user
    }
  };


  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title:</Form.Label>
        <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="course">
        <Form.Label>Course:</Form.Label>
        <Form.Control as="select" value={course} onChange={(e) => setCourse(e.target.value)} required>
          <option value="">Select a course</option>
          {courseList.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="questions">
        <Form.Label>Questions:</Form.Label>
        {questions.map((question, index) => (
          <div key={index}>
            <Row>
              <Col>
                <Form.Label>{`Question ${index + 1}:`}</Form.Label>
                <Form.Control type="text" value={question.question} onChange={(e) => handleQuestionChange(index, "question", e.target.value)} required />
              </Col>
              <Col>
                <Button variant="danger" onClick={() => handleRemoveQuestion(index)}>Remove</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Options:</Form.Label>
                <Form.Control type="text" value={question.options[0]} onChange={(e) => handleOptionChange(index, 0, e.target.value)} />
                <Form.Control type="text" value={question.options[1]} onChange={(e) => handleOptionChange(index, 1, e.target.value)} />
                <Form.Control type="text" value={question.options[2]} onChange={(e) => handleOptionChange(index, 2, e.target.value)} />
                <Form.Control type="text" value={question.options[3]} onChange={(e) => handleOptionChange(index, 3, e.target.value)} />
              </Col>
              <Col>
                <Form.Label>Correct Answer:</Form.Label>
                <Form.Control as="select" value={null} onChange={(e) => handleCorrectAnswerChange(index, e.target.value)} required>
                  <option value="">Select an answer</option>
                  <option value="0">Option 1</option>
                  <option value="1">Option 2</option>
                  <option value="2">Option 3</option>
                  <option value="3">Option 4</option>
                </Form.Control>
              </Col>
            </Row>
          </div>
        ))}
        <Button variant="secondary" onClick={handleAddQuestion}>Add Question</Button>
      </Form.Group>
      <Form.Group controlId="explanation">
        <Form.Label>Explanation:</Form.Label>
        <Form.Control as="textarea" value={explanation} onChange={(e) => setExplanation(e.target.value)} required />
      </Form.Group>
      <Button type="submit" variant="primary">Submit Quiz</Button>{' '}
      <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
    </Form>
  );
}
export default QuizForm;

