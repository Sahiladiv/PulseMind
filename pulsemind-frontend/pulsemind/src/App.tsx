import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import PredictionForm from "./components/PredictionForm";
import About from "./components/About";
import History from "./components/History";
import EKGReader from "./components/EKGReader";
import Register from "./components/Register";
import Home from "./components/Home";
import Login from "./components/Login";

import PatientRegistration from './components/PatientRegistration';
import PatientProfile from './components/PatientProfile';
import VisitHistory from './components/VisitHistory';
import UploadDocuments from './components/UploadDocuments';

function App() {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="px-4 py-6">
          <Routes>
            {/* General Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />


            {/* Auth Routes */}
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />

            {/* Patient Management */}
            <Route path="/patient/register" element={<PatientRegistration />} />
            <Route path="/patient/profile" element={<PatientProfile />} />
            <Route path="/patient/visits" element={<VisitHistory />} />
            <Route path="/patient/upload" element={<UploadDocuments />} />

            {/* Redirects & 404 */}
            <Route path="/patient" element={<Navigate to="/patient/profile" />} />
            <Route path="*" element={<div className="text-center text-lg mt-20">404 - Page Not Found</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
