import React, { useState, useEffect } from 'react';
import CourseService from '../../utilities/CourseService';


const AllCoursesPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const coursesData = await CourseService.getAllCourses();
      CourseService.printAllCourses();
      setCourses(coursesData);
    }
    fetchData();
  }, []);

  const handleDeleteCourse = async (courseId) => {
    try {
      const data = await CourseService.deleteCourseById(courseId);
      console.log(data);
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">All Courses</h2>
      <div className="row">
        {courses.map((course, index) => (
          <div className="col-md-4" key={index}>
            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h3 className="card-title">{course.title}</h3>
                  <div>
                    <button className="btn btn-primary mr-2" onClick={() => window.location.href = `/coursePage/${course._id}`}>View Course</button>
                    <button className="btn btn-danger" onClick={() => handleDeleteCourse(course._id)}>Delete Course</button>
                  </div>
                </div>
                <p className="card-text">{course.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCoursesPage;
