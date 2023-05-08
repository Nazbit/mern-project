import React, { useState, useEffect } from "react";
import axios from "axios";
import sectionService from "../../utilities/SectionService";

function CourseForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [section, setSection] = useState("");
  const [courseImage, setCourseImage] = useState(null);
  const [content, setContent] = useState("");
  const [sections, setSections] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await sectionService.getAllSections();
      setSections(data);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requestBody = {
      title: title,
      description: description,
      section: section,
      content: content,
    };
  
    // Only include the courseImage property if it is not null
    if (courseImage) {
      requestBody.courseImage = courseImage;
    }
  
    try {
      const courseResponse = await axios.post("http://localhost:8081/course/createCourse", requestBody);
      const courseId = courseResponse.data.id;
      const sectionId = section;
      const sectionResponse = await axios.post(`http://localhost:8081/section/sections/${sectionId}/courses/${courseId}`);
      console.log(sectionResponse);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="container">
      <h1 className="text-center my-5">Create Course</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="section">Module:</label>
          <select
            className="form-control"
            id="section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
          >
            <option value="">Select a Module</option>
            {sections.map((section) => (
              <option key={section._id} value={section._id}>
                {section.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="courseImage">Course Image:</label>
          <input
            type="file"
            className="form-control-file"
            id="courseImage"
            onChange={(e) => setCourseImage(e.target.files[0])}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            className="form-control"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CourseForm;
