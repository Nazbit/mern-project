
import React, { useState } from "react";
import axios from "axios";

function CourseForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [section, setSection] = useState("");
  const [courseImage, setCourseImage] = useState(null);
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      "title": title,
      "description": description,
      "section": section,
      "content": content,
    };
  
    // Only include the courseImage property if it is not null
    if (courseImage) {
      requestBody.courseImage = courseImage;
    }
  
    fetch('http://localhost:8081/course/createCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          description: description,
          section: section
        })
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  
  };

  return (
    <div>
      <h1>Create Course</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <br />
        <label>
          Section:
          <input type="text" value={section} onChange={(e) => setSection(e.target.value)} />
        </label>
        <br />
        <label>
          Course Image:
          <input type="file" onChange={(e) => setCourseImage(e.target.files[0])} />
        </label>
        <br />
        <label>
          Content:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CourseForm;
