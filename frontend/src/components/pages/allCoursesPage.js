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
    }, [courses]);

    return (
        <div>
            <h2>All Courses</h2>
            <ul>
                {courses.map((course, index) => (
                    <li key={index}>
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllCoursesPage;
