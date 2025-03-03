import React, { useState } from "react";

const PostJobForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    jobDescription: "",
    skillsRequired: "",
    location: "",
    salaryRange: "",
    keyResponsibilities: "",
    experienceRange: "",
    jobType: "",
    jobStatus: "",
    datePosted: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Posted:", formData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Post a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((field) => (
          <div key={field}>
            <label className="block font-semibold text-gray-700 capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}:</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        ))}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJobForm;
