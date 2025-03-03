import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import UserDropdown from "./UserDropdown";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkLoginStatus = () => {
      const user = localStorage.getItem("user");
      const role = localStorage.getItem("role"); // Store 'admin' or 'user' in localStorage

      if (user) {
        setIsLoggedIn(true);
        setUserEmail(user);
        setIsAdmin(role === "admin"); // Check if the user is admin
      } else {
        setIsLoggedIn(false);
        setUserEmail("");
        setIsAdmin(false);
      }
    };

    checkLoginStatus();

    window.addEventListener("storage", checkLoginStatus);
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  return (
    <nav className="flex items-center justify-between bg-blue-600 text-white p-3 shadow-lg relative">
      <h2 className="text-xl font-bold">Logo</h2>
      <div className="hidden md:flex space-x-6">
        {isAdmin ? (
          // Show Admin Tabs
          [
            { name: "Home", path: "/" },
            { name: "Post a Job", path: "/PostAJob" },
            { name: "Add Category", path: "/add-category" },
            { name: "All Jobs", path: "/all-jobs" },
            { name: "View Users", path: "/view-users" },
          ].map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`hover:text-gray-300 transition duration-300 px-3 pb-1 ${
                location.pathname === tab.path ? "border-b-2 border-white" : ""
              }`}
            >
              {tab.name}
            </Link>
          ))
        ) : (
          // Show User Tabs
          [
            { name: "Home", path: "/" },
            { name: "Job Posting", path: "/job-posting" },
            { name: "Blog", path: "/blog" },
            { name: "About", path: "/about" },
          ].map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`hover:text-gray-300 transition duration-300 px-3 pb-1 ${
                location.pathname === tab.path ? "border-b-2 border-white" : ""
              }`}
            >
              {tab.name}
            </Link>
          ))
        )}
      </div>

      <div className="flex space-x-4 items-center">
        {isLoggedIn ? (
          <>
            <FaBell className="text-white text-xl cursor-pointer hover:text-gray-300 transition duration-300" />
            <UserDropdown user={userEmail} />
          </>
        ) : (
          <>
            <Link to="/signin" className="bg-white text-blue-600 px-3 py-1 rounded-md">
              Sign In
            </Link>
            <Link to="/signup" className="bg-white text-blue-600 px-3 py-1 rounded-md">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
