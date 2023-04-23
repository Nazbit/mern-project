import axios from 'axios';

const setQuestionQuiz = async (quizId, questionId) => {
  try {
    const response = await axios.put(`/setQuestionQuiz/${quizId}`, { questionId });
    return response.data;
  } catch (error) {
    console.error(error);
    return { message: 'Internal server error' };
  }
};

export default setQuestionQuiz;
