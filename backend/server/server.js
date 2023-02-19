const express = require("express");
const app = express();
const cors = require('cors')
const loginRoute = require('./routes/userLogin')
const getAllUsersRoute = require('./routes/userGetAllUsers')
const registerRoute = require('./routes/userSignUp')
const getUserByIdRoute = require('./routes/userGetUserById')
const dbConnection = require('./config/db.config')
const editUser = require('./routes/userEditUser')
const deleteUser = require('./routes/userDeleteAll')

const courseGetAllCourses = require('./routes/courseGetAllCourses')
const courseGetCourseById = require('./routes/courseGetCourseById')
const courseCreateCourse = require('./routes/courseCreateCourse')
const courseDeleteCourseById = require('./routes/courseDeleteCourseById')
const courseUpdateCourseById = require('./routes/courseUpdateCourseById')


const sectionCreateSection = require('./routes/sectionCreateSection')

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

app.use('/course', courseGetAllCourses )
app.use('/course', courseGetCourseById )
app.use('/course', courseCreateCourse )
app.use('/course', courseDeleteCourseById )
app.use('/course', courseUpdateCourseById )


app.use('/section', sectionCreateSection )

app.listen(SERVER_PORT, (req, res) => {
    console.log(`The backend service is running on port ${SERVER_PORT} and waiting for requests.`);
})
