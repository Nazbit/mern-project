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

const sectionGetAllSections = require('./routes/sectionGetAllSections')
const sectionGetSectionById = require('./routes/sectionGetSectionById')
const sectionCreateSection = require('./routes/sectionCreateSection')
const sectionDeleteSectionById = require('./routes/sectionDeleteSectionById')
const sectionUpdateSectionById = require('./routes/sectionUpdateSectionById')
const sectionAddCourseToSection = require('./routes/sectionAddCourseToSection')
const sectionDeleteCourseFromSection = require('./routes/sectionDeleteCourseFromSection')


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


app.use('/section', sectionGetAllSections )
app.use('/section', sectionGetSectionById )
app.use('/section', sectionCreateSection )
app.use('/section', sectionDeleteSectionById )
app.use('/section', sectionUpdateSectionById )
app.use('/section', sectionAddCourseToSection )
app.use('/section', sectionDeleteCourseFromSection )

app.listen(SERVER_PORT, (req, res) => {
    console.log(`The backend service is running on port ${SERVER_PORT} and waiting for requests.`);
})
