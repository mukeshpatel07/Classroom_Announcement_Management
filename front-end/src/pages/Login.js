import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // use login method from context

  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        emailId,
        password,
      });

      const userData = response.data;
      login(userData); // store in context + localStorage

      const { role } = userData;
      if (role && role.toLowerCase() === 'teacher') {
        navigate('/teacher-home');
      } else if (role && role.toLowerCase() === 'student') {
        navigate('/student-home');
      } else {
        alert('Unknown role, cannot redirect.');
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data || 'Login failed!');
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 120px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <div className="text-center mb-5">
                <p className="text-success fs-4 fw-bold text-decoration-underline">
                  Welcome Back! Login to your account
                </p>
              </div>

              <div className="form-outline mb-5">
                <input
                  type="email"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  className="form-control"
                  style={{ height: '35px', fontSize: '14px' }}
                  placeholder="Enter a valid email address"
                  required
                />
              </div>

              <div className="form-outline mb-5">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  style={{ height: '35px', fontSize: '14px' }}
                  placeholder="Enter password"
                  required
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-sm px-4"
                >
                  Login
                </button>
                <p className="small fw-bold mt-3 mb-0">
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
