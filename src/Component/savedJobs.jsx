import { useState, useEffect } from "react"
import { BookmarkCheck, X } from "lucide-react"
import { Link } from "react-router-dom"

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const savedJobsFromStorage = JSON.parse(localStorage.getItem("savedJobs") || "[]")
    setSavedJobs(savedJobsFromStorage)
  }, [])

  const removeFromSaved = (jobId, e) => {
    e.stopPropagation()
    const updatedSavedJobs = savedJobs.filter((job) => job.id !== jobId)
    setSavedJobs(updatedSavedJobs)
    localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs))
  }

  const openJobDetails = (job) => {
    setSelectedJob(job || {})
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
    setSelectedJob(null)
  }

  const handleDialogClick = (e) => {
    if (e.target.classList.contains("dialog-overlay")) {
      closeDialog()
    }
  }

  return (
    <div className="max-w-7xl mx-auto mt-6 mb-6 p-4">
      {/* Saved Jobs Section */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6 px-6">
          <h1 className="text-2xl font-bold text-gray-800">Saved Jobs</h1>
          <Link to="/" className="text-blue-800 hover:underline">
            Back to Job Search
          </Link>
        </div>

        {savedJobs.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No saved jobs yet</h2>
            <p className="text-gray-500 mb-6">
              Jobs you save will appear here. Start exploring and bookmarking jobs you're interested in.
            </p>
            <Link to="/" className="bg-blue-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700">
              Explore Jobs
            </Link>
          </div>
        ) : (
          <div className="px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white border rounded-xl shadow-md p-5 flex flex-col h-44 w-full flex-shrink-0 relative cursor-pointer"
                  onClick={() => openJobDetails(job)}
                >
                  <h4 className="font-semibold text-lg text-gray-800 line-clamp-1">{job.role}</h4>
                  <p className="text-gray-600 line-clamp-1">{job.companyName}</p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Salary:</span>{" "}
                    {job.minSalary || job.maxSalary
                      ? `₹${job.minSalary || job.maxSalary} ${job.maxSalary ? `- ₹${job.maxSalary}` : ""} LPA`
                      : "₹ Not Disclosed"}
                    <span className="mx-2">|</span>
                    <span className="text-sm text-gray-500">{job.location}</span>
                  </p>

                  <button className="absolute top-4 right-4 text-blue-600" onClick={(e) => removeFromSaved(job.id, e)}>
                    <BookmarkCheck size={20} className="fill-blue-600" />
                  </button>
                  <div className="flex justify-center mt-auto">
                    <button className="bg-blue-800 text-white px-4 py-1 rounded-md font-medium">Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Custom Dialog for Saved Jobs */}
      {isDialogOpen && selectedJob && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 dialog-overlay"
          onClick={handleDialogClick}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative p-5 border-b">
              <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={closeDialog}>
                <X size={20} />
              </button>
              <h2 className="text-2xl font-bold text-blue-800 text-center pr-8">{selectedJob.role}</h2>
              <p className="text-lg text-gray-600 text-center">{selectedJob.companyName}</p>
            </div>
            <div className="p-6">
              <div className="space-y-2 text-gray-700 text-left">
                <p>
                  <span className="font-semibold">Location:</span> {selectedJob.location}
                </p>
                <p>
                  <span className="font-semibold">Date Posted:</span> {selectedJob.datePosted}
                </p>
                <p>
                  <span className="font-semibold">Salary:</span>{" "}
                  {selectedJob.minSalary && selectedJob.maxSalary
                    ? `₹${selectedJob.minSalary} - ₹${selectedJob.maxSalary} LPA`
                    : selectedJob.minSalary
                      ? `₹${selectedJob.minSalary} LPA`
                      : selectedJob.maxSalary
                        ? `₹${selectedJob.maxSalary} LPA`
                        : "₹ Not Disclosed"}
                </p>
                <p>
                  <span className="font-semibold">Experience:</span>{" "}
                  {selectedJob.experienceRange || selectedJob.experience}
                </p>
                <p>
                  <span className="font-semibold">Job Type:</span> {selectedJob.jobType}
                </p>
              </div>
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
                <button className="bg-blue-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SavedJobs

