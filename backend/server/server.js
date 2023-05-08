const express = require("express");
const app = express();


const cors = require('cors')

const loginRoute = require('./routes/user/userLogin')
const registerRoute = require('./routes/user/userSignup')
const getAllUsersRoute = require('./routes/user/getAllUsers')
const getUserByIdRoute = require('./routes/user/getUserById')
const dbConnection = require('./config/db.config')
const editUser = require('./routes/user/editUser')
const deleteUser = require('./routes/user/deleteAll')
const isAdmin = require('./routes/user/isAdmin')
const updateQuizScore = require('./routes/user/updateQuizScore')




const getAllCourses = require('./routes/course/getAllCourses')
const getCourseById = require('./routes/course/getCourseById')
const createCourse = require('./routes/course/createCourse')
const deleteCourseById = require('./routes/course/deleteCourseById')
const updateCourseById = require('./routes/course/updateCourseById')

const getAllSections = require('./routes/section/getAllSections')
const getSectionById = require('./routes/section/getSectionById')
const createSection = require('./routes/section/createSection')
const deleteSectionById = require('./routes/section/deleteSectionById')
const updateSectionById = require('./routes/section/updateSectionById')
const addCourseToSection = require('./routes/section/addCourseToSection')


const getAllQuizzes = require('./routes/quiz/getAllQuizzes')
const getQuizById = require('./routes/quiz/getQuizById')
const createQuiz = require('./routes/quiz/createQuiz')
const deleteQuizById = require('./routes/quiz/deleteQuizById')
const updateQuizById = require('./routes/quiz/updateQuizById')
const addQuizToCourse = require('./routes/quiz/addQuizToCourse')
const deleteQuizFromCourse = require('./routes/quiz/deleteQuizFromCourse')
const submitQuiz = require('./routes/quiz/submitQuiz')


const getAllQuestions = require('./routes/question/getAllQuestions')
const getQuestionById = require('./routes/question/getQuestionById')
const createQuestion = require('./routes/question/createQuestion')
const deleteQuestionById = require('./routes/question/deleteQuestionById')
const updateQuestionById = require('./routes/question/updateQuestionById')
const addQuestionToQuiz = require('./routes/question/addQuestionToQuiz')
const deleteQuestionFromQuiz = require('./routes/question/deleteQuestionFromQuiz')

require('dotenv').config();
const SERVER_PORT = 8081

dbConnection()
app.use(cors({origin: '*'}))
app.use(express.json())

app.use('/user', loginRoute)
app.use('/user', registerRoute)
app.use('/user', getAllUsersRoute)
app.use('/user', getUserByIdRoute)
app.use('/user', editUser)
app.use('/user', deleteUser)
app.use('/user', isAdmin)
app.use('/user', updateQuizScore)


app.use('/course', getAllCourses )
app.use('/course', getCourseById )
app.use('/course', createCourse )
app.use('/course', deleteCourseById )
app.use('/course', updateCourseById )


app.use('/section', getAllSections )
app.use('/section', getSectionById )
app.use('/section', createSection )
app.use('/section', deleteSectionById )
app.use('/section', updateSectionById )
app.use('/section', addCourseToSection )


app.use('/quiz', getAllQuizzes )
app.use('/quiz', getQuizById )
app.use('/quiz', createQuiz )
app.use('/quiz', deleteQuizById )
app.use('/quiz', updateQuizById )
app.use('/quiz', addQuizToCourse )
app.use('/quiz', deleteQuizFromCourse )
app.use('/quiz', submitQuiz )

app.use('/question', getAllQuestions )
app.use('/question', getQuestionById )
app.use('/question', createQuestion )
app.use('/question', deleteQuestionById )
app.use('/question', updateQuestionById )
app.use('/question', addQuestionToQuiz )
app.use('/question', deleteQuestionFromQuiz )

app.listen(SERVER_PORT, (req, res) => {
    console.log(`The backend service is running on port ${SERVER_PORT} and waiting for requests.`);
})
