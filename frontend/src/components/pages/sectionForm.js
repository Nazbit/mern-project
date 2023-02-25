
import React, { useState } from "react";

function SectionForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

  
    fetch('http://localhost:8081/section/createSection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          description: description,
        })
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  
  };

  return (
    <div>
      <h1>Create Section</h1>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SectionForm;
