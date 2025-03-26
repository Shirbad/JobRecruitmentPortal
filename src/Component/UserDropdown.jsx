import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const email = localStorage.getItem("user") || "";
  const role = localStorage.getItem("role") || "";

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <FaUserCircle
        className="text-2xl cursor-pointer text-white"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div
          className="absolute right-0 mt-2 min-w-max bg-white shadow-lg rounded-lg border border-gray-200 z-50"
          style={{ minWidth: "200px" }} // Ensures better sizing
        >
          {/* Display only email */}
          <div className="p-4 text-blue-800 font-semibold border-b border-gray-300 text-left">
            {email}
          </div>

          <ul className="py-2 text-gray-700">
            {/* User Menu (Profile, Saved Jobs, Settings, Sign Out) */}
            {role !== "admin" && (
              <>
                <li>
                  <Link to="/profile" className="block px-4 py-3 hover:bg-gray-100">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/savedJobs" className="block px-4 py-3 hover:bg-gray-100">
                    Saved Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/appliedJobs" className="block px-4 py-3 hover:bg-gray-100">
                    Applied Jobs
                  </Link>
                </li>
              </>
            )}

            {/* Admin Menu (Only Settings and Sign Out) */}
            {role === "admin" && (
              <li>
                <Link to="/settings" className="block px-4 py-3 hover:bg-gray-100">
                  Settings
                </Link>
              </li>
            )}
          </ul>

          {/* Sign Out for both User and Admin */}
          <div className="border-t text-center py-1">
            <button
              onClick={handleLogout}
              className="w-full px-3 py-2 text-gray-700 hover:bg-blue-800 hover:text-white flex justify-center items-center space-x-2"
            >
              <FaSignOutAlt className="text-gray-500" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
