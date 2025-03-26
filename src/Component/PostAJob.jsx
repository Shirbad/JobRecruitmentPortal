import React, { useState } from "react";

const PostJobForm = () => {
  const [formData, setFormData] = useState({
    applicationCount: "",
    companyName: "",
    role: "",
    jobType: "",
    description: "",
    skillsRequired: "",
    location: "",
    minSalary: "",
    maxSalary: "",
    salaryNotDisclosed: false,
    keyResponsibilities: "",
    experienceRange: "",
    education: "",
    datePosted: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData((prevData) => {
      if (name === "salaryNotDisclosed") {
        return {
          ...prevData,
          salaryNotDisclosed: checked,
          minSalary: checked ? "" : prevData.minSalary,
          maxSalary: checked ? "" : prevData.maxSalary,
        };
      }
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formattedData = {
      ...formData,
      description: formData.description.split("\n").map((line) => `\u2022 ${line}`).join("\n"),
      keyResponsibilities: formData.keyResponsibilities.split("\n").map((line) => `\u2022 ${line}`).join("\n"),
      education: formData.education.split("\n").map((line) => `\u2022 ${line}`).join("\n"),
      minSalary: formData.salaryNotDisclosed ? "Not Disclosed" : formData.minSalary,
      maxSalary: formData.salaryNotDisclosed ? "Not Disclosed" : formData.maxSalary,
    };

    try {
      const response = await fetch("http://localhost:8080/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      const result = await response.text();
      alert(result);
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Error posting job");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-5 bg-white shadow-lg rounded-lg mt-10 mb-10">
      <h2 className="text-2xl text-center font-bold text-blue-600 mb-8">Post a Job</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          {["applicationCount", "companyName", "role", "jobType", "skillsRequired", "location", "experienceRange"].map((field) => (
            <div key={field}>
              <label className="block font-semibold text-gray-700 capitalize">
                {field.replace(/([A-Z])/g, " $1").trim()}:
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                required
              />
            </div>
          ))}

          <div>
            <label className="block font-semibold text-gray-700">Salary Range (in LPA):</label>
            <div className="flex gap-4">
              <input
                type="number"
                name="minSalary"
                value={formData.minSalary}
                onChange={handleChange}
                className="w-1/2 border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                placeholder="Min LPA"
                step="0.1"
                min="0"
                disabled={formData.salaryNotDisclosed}
                required={!formData.salaryNotDisclosed}
              />
              <input
                type="number"
                name="maxSalary"
                value={formData.maxSalary}
                onChange={handleChange}
                className="w-1/2 border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                placeholder="Max LPA"
                step="0.1"
                min="0"
                disabled={formData.salaryNotDisclosed}
                required={!formData.salaryNotDisclosed}
              />
            </div>
            <div className="mt-2">
              <input
                type="checkbox"
                name="salaryNotDisclosed"
                checked={formData.salaryNotDisclosed}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-gray-700">Not Disclosed</label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-700">Date Posted:</label>
            <input
              type="text"
              name="datePosted"
              value={formData.datePosted}
              onChange={handleChange}
              className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Job Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
              required
            ></textarea>
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Key Responsibilities:</label>
            <textarea
              name="keyResponsibilities"
              value={formData.keyResponsibilities}
              onChange={handleChange}
              rows="4"
              className="w-full border p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
              required
            ></textarea>
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Education:</label>
            <textarea
              name="education"
              value={formData.education}
              onChange={handleChange}
              rows="4"
              className="w-full border p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
              required
            ></textarea>
          </div>
        </div>
        <div className="col-span-2 flex justify-center">
          <button type="submit" className="bg-blue-800 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition">
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJobForm;
