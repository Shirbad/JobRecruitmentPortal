import { useState } from "react";
import "../index.css";

const ApplicationForm = ({ jobTitle, company }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
  });
  const [alert, setAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const appliedJob = {
      jobTitle,
      company,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    };
  
    // Retrieve existing applied jobs from localStorage
    const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs") || "[]");
  
    // Add new applied job and update localStorage
    appliedJobs.push(appliedJob);
    localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
    
    setAlert(true);
    setTimeout(() => setAlert(false), 1000); // Hide alert after 3 seconds

    setFormData({ name: "", email: "", phone: "", resume: null });
    document.getElementById("resumeInput").value = "";
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg relative">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Apply for {jobTitle} at {company}
      </h2>

      {/* Alert Box */}
      {alert && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg transition-opacity duration-500">
          ✅ Successfully submitted
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 mt-4">
        <div className="flex items-center">
          <label className="w-1/3 text-sm text-left font-medium text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-[70%] p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-sm text-left font-medium text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-[70%] p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-sm text-left font-medium text-gray-700">Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-[70%] p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-left text-sm font-medium text-gray-700">Resume:</label>
          <input
            id="resumeInput"
            type="file"
            onChange={handleFileChange}
            className="w-[70%] p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
