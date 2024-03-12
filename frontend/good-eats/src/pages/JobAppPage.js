import React, { useState } from 'react';
import JobApp from '../components/JobApp';
import NewJobAppPage from './NewJobAppPage';

const JobApplicationsPage = () => {
  const [showNewJobForm, setShowNewJobForm] = useState(false);
  const [jobApplications, setJobApplications] = useState([
    {
      id: 1,
      company: 'Example Company 1',
      title: 'Example Job Title 1',
      link: 'https://example.com/job1',
    },
    {
      id: 2,
      company: 'Example Company 2',
      title: 'Example Job Title 2',
      link: 'https://example.com/job2',
    },
  ]);

  const handleNewJobFormToggle = () => {
    setShowNewJobForm(!showNewJobForm);
  };

  const handleNewJobAppSubmit = (formData) => {
    const newJobApp = {
      id: jobApplications.length + 1,
      ...formData,
    };
    setJobApplications([...jobApplications, newJobApp]);
    setShowNewJobForm(false);
  };

  return (
    <div>
      <h2>Job Applications</h2>
      <button onClick={handleNewJobFormToggle}>Add New Job Application</button>
      {showNewJobForm && <NewJobAppPage onSubmit={handleNewJobAppSubmit} />}
      {jobApplications.map((job) => (
        <JobApp key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobApplicationsPage;
