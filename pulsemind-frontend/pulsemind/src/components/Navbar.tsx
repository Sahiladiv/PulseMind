import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const isLoggedIn = !!localStorage.getItem("token");
  const role = localStorage.getItem("role"); // optional if you plan role-based menus

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4 py-2">
      <Link className="navbar-brand" to="/">
        PulseMind
      </Link>
      <div className="collapse navbar-collapse show justify-between w-full">
        <ul className="navbar-nav flex-row gap-4">
          <li className="nav-item">
            <Link className="nav-link" to="/predict">Predict</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/ekg">EKG Reading</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/history">History</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          {isLoggedIn && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/patient/profile">My Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/patient/visits">My Visits</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/patient/upload">Upload</Link>
              </li>
            </>
          )}
        </ul>

        <ul className="navbar-nav ms-auto flex-row gap-4 align-items-center">
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <span className="nav-link text-white font-semibold">{email}</span>
              </li>
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-light"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/patient/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/auth/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
