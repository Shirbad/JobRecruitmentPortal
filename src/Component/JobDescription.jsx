import React from "react";

const JobDescription = ({ job }) => {
  if (!job) {
    return <p className="text-center">Select a job to view details.</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-blue-600">{job.role}</h3>
      <p className="text-gray-700"><strong>Company:</strong> {job.companyName}</p>
      <p className="text-gray-700"><strong>Location:</strong> {job.location}</p>
      <p className="text-gray-700"><strong>Salary:</strong> {job.salaryRange}</p>
      <p className="text-gray-700"><strong>Experience:</strong> {job.experienceRange}</p>
      <p className="text-gray-700"><strong>Job Type:</strong> {job.jobType}</p>
      <p className="text-gray-700"><strong>Date Posted:</strong> {job.datePosted}</p>
      <p className="text-gray-700"><strong>Key Responsibilities:</strong> {job.keyResponsibilities}</p>
      <p className="text-gray-700"><strong>Skills Required:</strong> {job.skillsRequired}</p>
      <p className="text-gray-700"><strong>Education:</strong> {job.education}</p>
      <p className="mt-4 text-gray-600">{job.description}</p>
    </div>
  );
};

export default JobDescription;
