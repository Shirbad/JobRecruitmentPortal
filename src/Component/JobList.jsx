import React, { useState, useEffect } from "react";
import { Bookmark, BookmarkCheck, X } from "lucide-react";
import ApplicationForm from "./applicationForm";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [savedJobIds, setSavedJobIds] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/all")
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
        if (data.length > 0) {
          setSelectedJob(data[0]);
        }
      })
      .catch((error) => console.error("Error fetching jobs:", error));

    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobIds(new Set(savedJobs.map((job) => job.id)));
  }, []);

  const toggleBookmark = (job) => {
    let updatedSavedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    let updatedSavedIds = new Set(savedJobIds);

    if (savedJobIds.has(job.id)) {
      updatedSavedJobs = updatedSavedJobs.filter((item) => item.id !== job.id);
      updatedSavedIds.delete(job.id);
    } else {
      updatedSavedJobs.push(job);
      updatedSavedIds.add(job.id);
    }

    setSavedJobIds(updatedSavedIds);
    localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
  };

  return (
    <div className="flex max-w-5xl mx-auto mt-6 mb-6 gap-6">
      {/* Job List Section */}
      <div className="w-2/5 h-[500px] overflow-y-auto border bg-white rounded-xl shadow-md flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {jobs.map((job) => (
            <div
              key={job.id}
              className={`relative p-4 border-b cursor-pointer hover:bg-gray-100 ${
                selectedJob?.id === job.id ? "bg-gray-200 rounded-md" : ""
              }`}
              onClick={() => setSelectedJob(job)}
            >
              <h4 className="font-semibold text-lg text-left">{job.role}</h4>
              <p className="text-gray-600 text-left">{job.companyName}</p>
              <p className="text-sm text-gray-500 text-left">
                {job.minSalary && job.maxSalary
                  ? `₹${job.minSalary} - ₹${job.maxSalary} LPA`
                  : "₹ Not Disclosed"}
              </p>
              <p className="text-sm text-gray-500 text-left">{job.location}</p>
              <p className="text-sm text-gray-500 text-left">
                Experience: {job.experienceRange}
              </p>

              {/* Bookmark Icon */}
              <button
                className="absolute bottom-2 right-2 text-gray-500 hover:text-blue-600"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(job);
                }}
              >
                {savedJobIds.has(job.id) ? (
                  <BookmarkCheck size={20} className="text-blue-600" />
                ) : (
                  <Bookmark size={20} />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Job Description Section */}
      {selectedJob && (
        <div className="w-3/5 h-[500px] overflow-y-auto border bg-white rounded-xl shadow-md p-6 flex flex-col">
          <div className="mb-4 text-center">
            <h2 className="text-2xl font-bold text-blue-800">{selectedJob.role}</h2>
            <p className="text-lg text-gray-600">{selectedJob.companyName}</p>
          </div>

          <hr className="my-4 border-gray-300" />

          <div className="space-y-2 text-gray-700 text-left flex-grow">
            <p><span className="font-semibold">Location:</span> {selectedJob.location}</p>
            <p><span className="font-semibold">Date Posted:</span> {selectedJob.datePosted}</p>
            <p><span className="font-semibold">Salary:</span> {selectedJob.minSalary && selectedJob.maxSalary
              ? `₹${selectedJob.minSalary} - ₹${selectedJob.maxSalary} LPA`
              : "₹ Not Disclosed"}
            </p>
            <p><span className="font-semibold">Experience:</span> {selectedJob.experienceRange}</p>
            <p><span className="font-semibold">Job Type:</span> {selectedJob.jobType}</p>
          </div>
          {/* Education */}
          {selectedJob.education && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-800 text-left">Education</h3>
                  <ul className="list-disc list-inside text-gray-700 mt-2 text-left">
                    {selectedJob.education
                      ?.split(/[•]/)
                      .filter((point) => point.trim() !== "")
                      .map((point, index) => (
                        <li key={index}>{point.trim()}</li>
                      ))}
                  </ul>
                </div>
            )} 
           {/* Job Description */}
           {selectedJob.description && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-800 text-left">Job Description</h3>
                  <ul className="list-disc list-inside text-gray-700 mt-2 text-left">
                    {selectedJob.description
                      .split("•")
                      .filter((point) => point.trim() !== "")
                      .map((point, index) => (
                        <li key={index}>{point.trim()}</li>
                      ))}
                  </ul>
                </div>
              )} 

             {/* Key Responsibilities */}
              {selectedJob.keyResponsibilities && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-800 text-left">Key Responsibilities</h3>
                  <ul className="list-disc list-inside text-gray-700 mt-2 text-left">
                    {selectedJob.keyResponsibilities
                      .split("•")
                      .filter((point) => point.trim() !== "")
                      .map((point, index) => (
                        <li key={index}>{point.trim()}</li>
                      ))}
                  </ul>
                </div>
              )}
           {/* Skills Required */}
           {selectedJob.skillsRequired && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-800 text-left">Skills Required</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedJob.skillsRequired?.split(",").map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}   

          <div className="mt-6 flex justify-center">
            <button
              className="bg-blue-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
              onClick={() => setIsModalOpen(true)}
            >
              Apply Now
            </button>
          </div>
        </div>
      )}

      {/* Application Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={24} />
            </button>
            <ApplicationForm jobTitle={selectedJob?.role} company={selectedJob?.companyName} />
          </div>
        </div>
      )}
    </div>
  );
};

export default JobList;
