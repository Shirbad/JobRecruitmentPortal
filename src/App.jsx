import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import SignIn from "./Component/SignIn";
import SignUp from "./Component/SignUp";
import SearchBar from "./Component/SearchBar";
import JobList from "./Component/JobList";
import PostJobForm from "./Component/PostAJob";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");
    setIsLoggedIn(!!localStorage.getItem("user")); // Check if the user is logged in
  }, []);

  return (
    <GoogleOAuthProvider clientId="your-google-client-id">
      <div className="flex flex-col min-h-screen">
        <Router>
          <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
          <main className="flex-1">
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/PostAJob" element={<PostJobForm/>}/>
              <Route
                path="/"
                element={
                  isAdmin ? (
                    isLoggedIn ? (
                      <div className="admin-dashboard bg-gray-100 h-[80vh] flex items-center justify-center">
                        <h2 className="text-gray-500 text-xl">Admin Dashboard</h2>
                      </div>
                    ) : (
                      <Navigate to="/signin" replace/>
                    )
                  ) : (
                    <div className="main-content">
                      <SearchBar />
                      <JobList />
                    </div>
                  )
                }
              />
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
