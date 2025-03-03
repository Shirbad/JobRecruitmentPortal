import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [mobileno, setMobile] = useState("");
  const [workStatus, setWorkStatus] = useState("Fresher");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirm_password || !mobileno) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirm_password) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/api/signup", {
          name,
          email,
          password,
          mobileno,
          workStatus,
      });

      if (response.status === 201) { 
          alert("Registration Successful!");
          navigate("/signin"); 
      } else {
          setError("Signup failed! Try again.");
      }
  } catch (error) {
      console.error("Signup Error:", error);
      setError("An error occurred. Please try again.");
  }
  };
  
  return (
    <div className="flex h-[80vh] w-[70vw] mx-auto my-12 shadow-2xl rounded-lg overflow-hidden bg-gray-50">
      {/* Left Side - Form */}
      <div className="w-1/2 flex flex-col justify-start items-center bg-white p-10 border-r max-h-full overflow-y-auto">

        <h2 className="text-2xl font-bold text-blue-700 mb-3">Datatype IT Consulting</h2>
        <h3 className="text-base mb-5 text-gray-700">Create a New Account</h3>

        <button className="w-full flex items-center justify-center p-2 bg-gray-100 border rounded-md hover:bg-gray-200 transition-all mb-3 shadow-sm">
          <FcGoogle className="mr-2 text-xl" /> Sign Up with Google
        </button>

        <p className="mb-2 text-gray-500 text-sm">or sign up with email</p>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm_password}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm"
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobileno}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full p-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm"
          />
          <select
            value={workStatus}
            onChange={(e) => setWorkStatus(e.target.value)}
            className="w-full p-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm"
          >
            <option value="Fresher">Fresher</option>
            <option value="Experienced">Experienced</option>
          </select>
          {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
          <button type="submit" className="w-full p-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-all shadow-md text-sm">
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-gray-600 text-sm">
          Already have an account? <Link to="/signin" className="text-blue-600 hover:underline">Sign In</Link>
        </p>
      </div>

      {/* Right Side - Decorative */}
      <div className="w-1/2 bg-blue-600 flex flex-col items-center justify-center text-white p-10 text-center">
        <h2 className="text-2xl font-semibold mb-3">Join Us Today!</h2>
        <p className="text-sm max-w-sm leading-relaxed">
          Unlock endless possibilities and seamlessly connect with your applications.
        </p>
      </div>
    </div>
  );
};

export default SignUp;
