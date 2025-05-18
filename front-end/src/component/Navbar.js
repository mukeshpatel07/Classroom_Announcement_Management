import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#2a4d23' }}>
      <div className="container-fluid d-flex align-items-center">
        <div className="d-flex align-items-center">
          <Link className="navbar-brand fw-bold ms-3 me-2" to="/">
            CAM
          </Link>
          {isAuthenticated && user && (
            <span className="text-white fw-bold ms-5">
              Welcome, {user.fullName}
            </span>
          )}
        </div>

        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-3"></ul>

          <div className="d-flex align-items-center me-3 ms-auto">
            {!isAuthenticated ? (
              <Link to="/login">
                <button className="btn btn-light fw-bold text-dark">Login</button>
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="btn btn-outline-light fw-bold"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
