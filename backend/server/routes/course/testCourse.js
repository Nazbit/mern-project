const axios = require('axios');

// define the course data to be created
const courseData = {
  title: "Test Course",
  description: "This is a test course",
  section: "6414d50efb96d06b8f2bd178", // ID of an existing section
  content: "Test content for the course"
};

// define the quiz ID to be added
const quizId = "6415f94c7a6f3ec226a8582a";

// make the post request to create the course and add the quiz
axios.post(`http://localhost:8081/quiz/courses/${courseId}/quizzes/${quizId}`, {
  ...courseData,
  quizzes: [quizId]
})
.then((response) => {
  console.log(response.data);
})
.catch((error) => {
  console.error(error);
});
