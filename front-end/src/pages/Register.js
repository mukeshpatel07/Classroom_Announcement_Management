import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // For making HTTP requests

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    role: '',
    emailId: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/users/register', formData);
      alert(response.data); // Show success message
    } catch (error) {
      alert(error.response?.data || 'Registration failed');
    }
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 120px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-6 col-lg-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample"
            />
          </div>
          <div className="col-md-6 col-lg-5">
            <form>
              <div className="text-center mb-5">
                <p className="text-success fs-4 fw-bold text-decoration-underline">
                  Create account
                </p>
              </div>

              <div className="form-outline mb-5">
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  style={{ height: '35px', fontSize: '14px' }}
                  placeholder="Full name"
                  onChange={handleChange}
                />
              </div>

              <div className="form-outline mb-5">
                <select
                  name="role"
                  className="form-control"
                  style={{ height: '35px', fontSize: '14px' }}
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="">Select role</option>
                  <option value="teacher">TEACHER</option>
                  <option value="student">STUDENT</option>
                </select>
              </div>

              <div className="form-outline mb-5">
                <input
                  type="email"
                  name="emailId"
                  className="form-control"
                  style={{ height: '35px', fontSize: '14px' }}
                  placeholder="Enter a valid email address"
                  onChange={handleChange}
                />
              </div>

              <div className="form-outline mb-5">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  style={{ height: '35px', fontSize: '14px' }}
                  placeholder="Enter password"
                  onChange={handleChange}
                />
              </div>

              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-primary btn-sm px-4"
                  onClick={handleRegister}
                >
                  Sign up
                </button>
                <p className="small fw-bold mt-3 mb-0">
                  Already have an account? <Link to="/">Sign in</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
