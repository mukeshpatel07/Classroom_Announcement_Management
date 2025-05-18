import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function StudentHome({ userName = 'Student' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const token = localStorage.getItem('token'); // JWT token saved at login
        const response = await axios.get('http://localhost:8080/api/announcements/student', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  const filteredAnnouncements = announcements
    .filter(a =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));

  const homeworkAnnouncements = filteredAnnouncements.filter(a => a.category === 'Homework');
  const eventAnnouncements = filteredAnnouncements.filter(a => a.category === 'Event');

  return (
    <div className="min-vh-100 bg-light">
      {/* Welcome Section */}
      <section
        className="text-white text-center py-5 mb-4"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1350&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: 'inset 0 0 0 1000px rgba(0, 0, 0, 0.4)',
        }}
      >
        <h1 className="fw-bold display-5">Welcome, {userName} 👋</h1>
        <p className="fs-5 opacity-75">Here are your latest announcements</p>
      </section>

      {/* Search Bar */}
      <div className="container mb-4">
        <input
          type="search"
          className="form-control form-control-lg shadow-sm"
          placeholder="Search announcements..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Announcements Section */}
      <div className="container pb-5">
        {/* Homework */}
        <section className="mb-5">
          <h2 className="border-start border-5 ps-3 mb-4 text-success border-success">
            📝 Homework
          </h2>
          {homeworkAnnouncements.length === 0 ? (
            <p className="text-muted">No homework announcements found.</p>
          ) : (
            <div className="row g-4">
              {homeworkAnnouncements.map(a => (
                <div className="col-md-6 col-lg-4" key={a.id}>
                  <div className="card shadow-sm h-100 border-0">
                    <div className="card-body">
                      <h5 className="card-title text-success">{a.title}</h5>
                      <p className="card-text text-dark">{a.description}</p>
                      <small className="text-success fw-semibold">
                        Due: {new Date(a.dueDate).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Events */}
        <section>
          <h2 className="border-start border-5 ps-3 mb-4 text-primary border-primary">
            📅 Events
          </h2>
          {eventAnnouncements.length === 0 ? (
            <p className="text-muted">No event announcements found.</p>
          ) : (
            <div className="row g-4">
              {eventAnnouncements.map(a => (
                <div className="col-md-6 col-lg-4" key={a.id}>
                  <div className="card shadow-sm h-100 border-0">
                    <div className="card-body">
                      <h5 className="card-title text-primary">{a.title}</h5>
                      <p className="card-text text-dark">{a.description}</p>
                      <small className="text-primary fw-semibold">
                        Date: {new Date(a.dueDate).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default StudentHome;
