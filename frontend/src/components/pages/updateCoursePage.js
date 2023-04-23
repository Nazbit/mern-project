import React, { useState, useEffect } from "react";
import axios from "axios";
import courseService from "../../utilities/CourseService";
import { useParams } from "react-router-dom";


const UpdateCourseForm = ({ }) => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseData = await courseService.getCourseById(courseId);
        setCourse(courseData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourse();
  }, [courseId]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8081/course/updateCourse/${courseId}`, course);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={course.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={course.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Section:
        <input
          type="text"
          name="section"
          value={course.section}
          onChange={handleChange}
        />
      </label>
      <label>
        Content:
        <input
          type="text"
          name="content"
          value={course.content}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Update Course</button>
    </form>
  );
};

export default UpdateCourseForm;
