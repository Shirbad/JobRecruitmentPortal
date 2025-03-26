import React, { useState } from "react";
import { Await, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const message = await response.text();
  
      if (!response.ok) {
        setError(message);
        return;
      }
  
      const isAdmin = email.toLowerCase() === "datatypeit@gmail.com";

      localStorage.setItem("user", email);
      localStorage.setItem("role", isAdmin ? "admin" : "user");
  
      alert("Successful Logged in!");
      window.location.href = "/";
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex h-[80vh] w-[70vw] mx-auto my-12 shadow-2xl rounded-lg overflow-hidden bg-gray-50">
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-10 border-r">
        <h2 className="text-2xl font-bold text-blue-800 mb-3">Datatype IT Consulting</h2>
        <h3 className="text-base mb-5 text-gray-700">Log in to your Account</h3>

        <button className="w-full flex items-center justify-center p-2 bg-gray-100 border rounded-md hover:bg-gray-200 transition-all mb-3 shadow-sm">
          <FcGoogle className="mr-2 text-xl" /> Login with Google
        </button>

        <p className="mb-2 text-gray-500 text-sm">or continue with email</p>

        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-800"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-800"
          />
          {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
          <button type="submit" className="w-full p-2 bg-blue-800 text-white font-medium rounded-md">
            Sign In
          </button>
        </form>

        <p className="mt-4 text-gray-600 text-sm">
          Don't have an account? <Link to="/signup" className="text-blue-800 hover:underline">Sign Up</Link>
        </p>
      </div>

      <div className="w-1/2 bg-gradient-to-b from-blue-900 via-blue-700 to-blue-400 flex flex-col items-center justify-center text-white p-10 text-center">
        <h2 className="text-2xl font-semibold mb-3">Welcome Back!</h2>
        <p className="text-sm max-w-sm leading-relaxed">
          Securely connect with all your applications and manage your account effortlessly.
        </p>
      </div>
    </div>
  );
};

export default SignIn;
