import React from "react";

const JobDescription = ({ job }) => {
  return (
    <div className="job-description">
      <h3>{job.title}</h3>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p>{job.description}</p>
    </div>
  );
};

export default JobDescription;
