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
import AdminDashboard from "./Component/adminDashboard";
import JobPosting from "./Component/jobPosting";
import SavedJobs from "./Component/savedJobs";
import AppliedJobs from "./Component/appliedJobs";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");
    setIsLoggedIn(!!localStorage.getItem("user"));
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
              <Route path="/PostAJob" element={<PostJobForm />} />
              <Route path="/jobPosting" element={<JobPosting/>}/>
              <Route path="/savedJobs" element={<SavedJobs/>}/>
              <Route path="/appliedJobs" element={<AppliedJobs/>}/>
              <Route
                path="/adminDashboard"
                element={isLoggedIn && isAdmin ? <AdminDashboard /> : <Navigate to="/signin" replace />}
              />
              
              {/* Home Page is Always Accessible */}
              <Route
                path="/"
                element={
                  <div className="main-content">
                    <SearchBar />
                    <JobList />
                  </div>
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
