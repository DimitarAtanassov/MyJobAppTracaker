// NewJobAppForm.js
/* 
  React Component used to get User Input to create a new Job Application
*/
import React, { useState } from 'react';

const NewJobAppForm = ({ onSubmit }) => {
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ company, title, link });
    // Optionally, you can clear the form fields after submission
    setCompany('');
    setTitle('');
    setLink('');
  };

  return (
    <form onSubmit={handleSubmit}> 
      <div >
        <label htmlFor="company">Company:</label>
        <input
          type="text"
          id="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="link">Link:</label>
        <input
          type="text"
          id="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewJobAppForm;
