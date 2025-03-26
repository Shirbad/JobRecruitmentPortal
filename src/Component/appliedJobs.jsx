import { useState, useEffect } from "react"
import { CheckCircle, X, Calendar, User, Mail, Phone } from "lucide-react"
import { Link } from "react-router-dom"

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    // Load applied jobs from localStorage
    const appliedJobsFromStorage = JSON.parse(localStorage.getItem("appliedJobs") || "[]")
    setAppliedJobs(appliedJobsFromStorage)
  }, [])

  const openJobDetails = (job) => {
    setSelectedJob(job || {});
    setIsDialogOpen(true);
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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="max-w-7xl mx-auto mt-6 mb-6 p-4">
      {/* Applied Jobs Section */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6 px-6">
          <h1 className="text-2xl font-bold text-gray-800">Applied Jobs</h1>
          <div className="flex gap-4">
            <Link to="/savedJobs" className="text-blue-800 hover:underline">
              View Saved Jobs
            </Link>
            <Link to="/" className="text-blue-800 hover:underline">
              Back to Job Search
            </Link>
          </div>
        </div>

        {appliedJobs.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No applied jobs yet</h2>
            <p className="text-gray-500 mb-6">
              Jobs you apply for will appear here. Start exploring and applying for jobs you're interested in.
            </p>
            <Link to="/" className="bg-blue-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700">
              Explore Jobs
            </Link>
          </div>
        ) : (
          <div className="px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {appliedJobs.map((job, index) => (
                <div
                  key={index}
                  className="bg-white border rounded-xl shadow-md p-5 flex flex-col h-44 w-full relative cursor-pointer"
                  onClick={() => openJobDetails(job)}
                >
                  <h4 className="font-semibold text-lg text-gray-800 line-clamp-1">{job.jobTitle}</h4>
                  <p className="text-gray-600 line-clamp-1">{job.company}</p>

                  <div className="absolute top-4 right-4 flex items-center text-green-600">
                    <CheckCircle size={20} className="mr-1" />
                    <span className="text-xs font-medium">Applied</span>
                  </div>

                  {job.appliedDate && (
                    <div className="flex items-center text-gray-500 mt-2">
                      <Calendar size={14} className="mr-1" />
                      <span className="text-xs">Applied on: {formatDate(job.appliedDate)}</span>
                    </div>
                  )}

                  <div className="flex justify-center mt-auto">
                    <button className="bg-blue-800 text-white px-4 py-1 rounded-md font-medium">Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Custom Dialog for Applied Jobs */}
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
              <h2 className="text-2xl font-bold text-blue-800 text-center pr-8">{selectedJob.jobTitle}</h2>
              <p className="text-lg text-gray-600 text-center">{selectedJob.company}</p>
            </div>
            <div className="p-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center text-green-700">
                  <CheckCircle size={20} className="mr-2" />
                  <span className="font-semibold">Application Submitted</span>
                </div>
                {selectedJob.appliedDate && (
                  <p className="text-green-600 text-sm mt-1">Applied on: {formatDate(selectedJob.appliedDate)}</p>
                )}
                <div className="mt-3 pt-3 border-t border-green-200">
                  <h4 className="text-sm font-medium text-green-700 mb-2">Application Details:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center text-green-600 text-sm">
                      <User size={14} className="mr-2" />
                      <span>{selectedJob.name}</span>
                    </div>
                    <div className="flex items-center text-green-600 text-sm">
                      <Mail size={14} className="mr-2" />
                      <span>{selectedJob.email}</span>
                    </div>
                    <div className="flex items-center text-green-600 text-sm">
                      <Phone size={14} className="mr-2" />
                      <span>{selectedJob.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job details would go here - but we only have limited information from the application form */}
              <div className="space-y-2 text-gray-700 text-left">
                <p>
                  <span className="font-semibold">Position:</span> {selectedJob.jobTitle}
                </p>
                <p>
                  <span className="font-semibold">Company:</span> {selectedJob.company}
                </p>

                {/* If we have additional job details from the original job posting, we would display them here */}
                {selectedJob.location && (
                  <p>
                    <span className="font-semibold">Location:</span> {selectedJob.location}
                  </p>
                )}
                {selectedJob.salary && (
                  <p>
                    <span className="font-semibold">Salary:</span> {selectedJob.salary}
                  </p>
                )}
                {selectedJob.experience && (
                  <p>
                    <span className="font-semibold">Experience:</span> {selectedJob.experience}
                  </p>
                )}
              </div>

              {/* If we have job description, responsibilities, etc. from the original job, we would display them here */}
              {selectedJob.description && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-800 text-left">Job Description</h3>
                  <div className="text-gray-700 mt-2 text-left">{selectedJob.description}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AppliedJobs

