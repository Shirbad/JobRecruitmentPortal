import React, { useState } from "react";
import { Bookmark } from "lucide-react";

const jobs = [
  { id: 1, title: "Software Engineer", company: "ABC Corp", salary: "$80K - $100K", location: "New York", description: "Develop and maintain software applications." },
  { id: 2, title: "Frontend Developer", company: "XYZ Ltd", salary: "$70K - $90K", location: "San Francisco", description: "Build and optimize UI/UX experiences." },
  { id: 3, title: "Data Analyst", company: "Data Inc.", salary: "$65K - $85K", location: "Los Angeles", description: "Analyze and interpret data for business decisions." },
  { id: 4, title: "Backend Developer", company: "Tech Solutions", salary: "$75K - $95K", location: "Chicago", description: "Build and maintain backend systems." },
  { id: 5, title: "Project Manager", company: "Business Co.", salary: "$90K - $120K", location: "Seattle", description: "Manage and oversee software development projects." },
  { id: 6, title: "DevOps Engineer", company: "CloudTech", salary: "$85K - $110K", location: "Austin", description: "Automate and optimize cloud infrastructure." },
  { id: 7, title: "QA Engineer", company: "TestWorks", salary: "$60K - $80K", location: "Denver", description: "Ensure software quality through testing." },
  { id: 8, title: "Full Stack Developer", company: "Innovate Inc.", salary: "$85K - $105K", location: "Boston", description: "Develop and maintain full-stack applications." }
];

const JobList = () => {
  const [selectedJob, setSelectedJob] = useState(jobs[0]);

  return (
    <div className="flex max-w-5xl mx-auto mt-6 gap-6">
      {/* Job Listings (Scrollable) */}
      <div className="w-2/5 h-[400px] overflow-y-auto border p-4 bg-white rounded-xl shadow-md">
        {jobs.map((job) => (
          <div
            key={job.id}
            className={`p-4 border-b flex flex-col cursor-pointer ${selectedJob.id === job.id ? "bg-gray-200" : ""}`}
            onClick={() => setSelectedJob(job)}
          >
            <h4 className="font-semibold text-lg text-left">{job.title}</h4>
            <p className="text-gray-600 text-left">{job.company}</p>
            <p className="text-sm text-gray-500 text-left">{job.salary}</p>
            <p className="text-sm text-gray-500 text-left">{job.location}</p>
            <Bookmark className="text-gray-400 hover:text-blue-500 self-end" />
          </div>
        ))}
      </div>

      {/* Job Description (Stops Scrolling) */}
      <div className="w-3/5 border p-6 bg-gray-100 rounded-xl shadow-md z-10">
        <h2 className="text-xl font-semibold mb-2">{selectedJob.title}</h2>
        <p className="text-gray-700"><strong>Company:</strong> {selectedJob.company}</p>
        <p className="text-gray-700"><strong>Salary:</strong> {selectedJob.salary}</p>
        <p className="text-gray-700"><strong>Location:</strong> {selectedJob.location}</p>
        <p className="mt-4 text-gray-600">{selectedJob.description}</p>
      </div>
    </div>
  );
};

export default JobList;
