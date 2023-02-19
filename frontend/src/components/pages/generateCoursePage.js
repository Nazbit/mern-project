import React, { useState, useEffect } from "react";
import CourseService from '../../utilities/CourseService';

function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      const response = await CourseService.getAllCourses
      setCourses(response.data);
    }
    fetchCourses();
  }, []);

  return (
    <div>
      <h1>Course List</h1>
      {courses.map((course) => (
        <div key={course._id}>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <img src={`data:image/jpeg;base64,${course.courseImage}`} alt={course.title} />
        </div>
      ))}
    </div>
  );
}

export default CourseList;