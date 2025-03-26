import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell
} from "recharts";

const COLORS = ["#1981e3", "#36A2EB", "#2a6bd4", "#1941e3", "#9966FF"];

const AdminDashboard = () => {
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [applicationsByCategory, setApplicationsByCategory] = useState([]);
  const [monthlyJobData, setMonthlyJobData] = useState([]);
  const [newApplications, setNewApplications] = useState({ today: 0, thisWeek: 0 });

  useEffect(() => {
    // Simulated API Data
    setTotalJobs(120);
    setTotalUsers(500);
    setApplicationsByCategory([
      { category: "Frontend Dev", applications: 45 },
      { category: "UI/UX Designer", applications: 30 },
      { category: "Backend Dev", applications: 20 },
      { category: "FullStack Dev", applications: 25 },
    ]);
    setMonthlyJobData([
      { month: "Jan", jobsPosted: 10, applications: 50 },
      { month: "Feb", jobsPosted: 20, applications: 70 },
      { month: "Mar", jobsPosted: 30, applications: 90 },
      { month: "Apr", jobsPosted: 25, applications: 80 },
      { month: "May", jobsPosted: 35, applications: 100 },
      { month: "June", jobsPosted: 45, applications: 80 },
      { month: "July", jobsPosted: 35, applications: 100 },
      { month: "Aug", jobsPosted: 35, applications: 100 },
      { month: "Sep", jobsPosted: 35, applications: 100 },
      { month: "Oct", jobsPosted: 35, applications: 100 },
      { month: "Nov", jobsPosted: 35, applications: 100 },
      { month: "Dec", jobsPosted: 35, applications: 100 },
    ]);
    setNewApplications({ today: 5, thisWeek: 35 });
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Main Dashboard Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side: Cards */}
        <div className="flex flex-col gap-4 w-full md:w-[250px]">
          <div className="bg-white shadow-md rounded-lg p-4 text-center">
            <h3 className="text-sm font-semibold text-gray-700">Total Jobs</h3>
            <p className="text-2xl font-bold text-blue-600">{totalJobs}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 text-center">
            <h3 className="text-sm font-semibold text-gray-700">Total Users</h3>
            <p className="text-2xl font-bold text-blue-600">{totalUsers}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 text-center">
            <h3 className="text-sm font-semibold text-gray-700">New Applications</h3>
            <p className="text-sm text-gray-600">
              Today: <span className="font-bold text-blue-600">{newApplications.today}</span>
            </p>
            <p className="text-sm text-gray-600">
              This Week: <span className="font-bold text-blue-600">{newApplications.thisWeek}</span>
            </p>
          </div>
        </div>

        {/* Right Side: Pie Chart */}
        <div className="flex-grow bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
          <h3 className="text-sm font-semibold mb-2">Applications by Category</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={applicationsByCategory}
                dataKey="applications"
                nameKey="category"
                cx="40%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {applicationsByCategory.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Below All: Bar Chart */}
      <div className="mt-6 bg-white shadow-md rounded-lg p-4">
        <h3 className="text-sm font-semibold mb-2">Monthly Jobs & Applications</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyJobData} barSize={15}>
            <XAxis dataKey="month" interval={0} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="jobsPosted" fill="#4285F4" name="Jobs Posted" radius={[4, 4, 0, 0]} />
            <Bar dataKey="applications" fill="#1920e3" name="Applications" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
