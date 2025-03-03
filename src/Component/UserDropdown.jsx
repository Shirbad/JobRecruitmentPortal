import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const UserDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    window.location.href = "/signin"; // Redirect to login after logout
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Icon */}
      <FaUserCircle
        className="text-2xl cursor-pointer text-white"
        onClick={() => setIsOpen(!isOpen)}
      />

      {/* Dropdown Menu */}
      {/* Dropdown Menu */}
{isOpen && (
  <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
    {/* Display Email */}
    <div className="p-3 text-blue-600 font-semibold border-b border-gray-300">
      {user}
    </div>

    <ul className="py-2 text-gray-700">
      <li>
        <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
          Profile
        </Link>
      </li>
      <li>
        <Link to="/saved-jobs" className="block px-4 py-2 hover:bg-gray-100">
          Saved Jobs
        </Link>
      </li>
      <li>
        <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">
          Settings
        </Link>
      </li>
    </ul>

    {/* Centered Sign Out Button */}
    <div className="border-t text-center py-2">
      <button
        onClick={handleLogout}
        className="w-full px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white flex justify-center items-center space-x-2"
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
