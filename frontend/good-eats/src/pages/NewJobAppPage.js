import React, { useState } from 'react';
import InputField from '../components/InputField';

const NewJobAppPage = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    link: '',
  });

  const { company, title, link } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      company: '',
      title: '',
      link: '',
    });
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <InputField 
                label="Company"
                type="text"
                name="company"
                value={company}
                onChange={handleChange}
                style={{}}
            />
            <InputField 
                label="Job Title"
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                style={{}}
            />
            <InputField 
                label="Job Link"
                type="text"
                name="link"
                value={link}
                onChange={handleChange}
                style={{}}
            />
            <button type="submit">Submit</button>
        </form>
    </div>
  );
};

export default NewJobAppPage;
