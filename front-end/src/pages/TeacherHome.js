import React, { useState, useEffect, useMemo } from 'react';

function TeacherHome() {
  const [announcements, setAnnouncements] = useState([]);
  const [activeTab, setActiveTab] = useState('Homework');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({
    category: 'Homework',
    title: '',
    description: '',
    dueDate: '',
  });

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || {};
    } catch {
      return {};
    }
  }, []);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/announcements', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      setAnnouncements(data);
    } catch (err) {
      console.error('Failed to load announcements', err);
    }
  };

  const filtered = announcements
    .filter(a => a.category === activeTab)
    .filter(a =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));

  const openModal = (edit = null) => {
    if (edit) {
      setEditItem(edit);
      setFormData({
        category: edit.category,
        title: edit.title,
        description: edit.description,
        dueDate: edit.dueDate ? edit.dueDate.split('T')[0] : '',
      });
    } else {
      setEditItem(null);
      setFormData({
        category: 'Homework',
        title: '',
        description: '',
        dueDate: '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditItem(null);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const createAnnouncement = async () => {
  try {
    const token = localStorage.getItem('token'); // JWT saved after login
    const response = await fetch('http://localhost:8080/api/announcements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: 'Test Title',
        category: 'Homework',
        description: 'Test description',
        dueDate: '2025-06-10'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      alert("Failed to create announcement: " + errorText);
      return;
    }

    const data = await response.json();
    alert("Announcement created successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to create announcement");
  }
};


const handleDelete = async id => {
  if (!window.confirm('Are you sure you want to delete this announcement?')) return;

  try {
    const res = await fetch(`http://localhost:8080/api/announcements/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (!res.ok) throw new Error('Failed to delete announcement');

    await loadAnnouncements();
  } catch (err) {
    alert(err.message);
  }
};


  const totalAnnouncements = announcements.length;
  const upcomingCount = announcements.filter(a => new Date(a.dueDate) > new Date()).length;

  return (
    <div className="container py-5">
      <header className="mb-4 text-white p-5 rounded" style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1350&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        <div className="position-absolute top-0 bottom-0 start-0 end-0 bg-dark opacity-50 rounded"></div>
        <div className="position-relative">
          <h1 className="fw-bold">Welcome, Teacher 👩‍🏫</h1>
          <p>You have <strong>{totalAnnouncements}</strong> announcements, <strong>{upcomingCount}</strong> upcoming.</p>
          <button className="btn btn-success" onClick={() => openModal()}>+ Create Announcement</button>
        </div>
      </header>

      <div className="d-flex justify-content-between mb-3">
        <ul className="nav nav-tabs">
          {['Homework', 'Event'].map(tab => (
            <li className="nav-item" key={tab}>
              <button className={`nav-link ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                {tab}
              </button>
            </li>
          ))}
        </ul>
        <input
          className="form-control w-25"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row">
        {filtered.length === 0 ? (
          <p className="text-muted">No announcements found.</p>
        ) : (
          filtered.map(a => (
            <div key={a.id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{a.title}</h5>
                  <p className="card-text">{a.description}</p>
                  <p className="text-muted">
                    <small>Due: {a.dueDate ? new Date(a.dueDate).toLocaleDateString() : 'N/A'}</small>
                  </p>
                  <div className="mt-auto d-flex justify-content-between">
                    <button className="btn btn-sm btn-primary" onClick={() => openModal(a)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(a.id)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={closeModal}>
          <div className="modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editItem ? 'Edit' : 'Create'} Announcement</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); createAnnouncement(); }}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select className="form-select" name="category" value={formData.category} onChange={handleChange}>
                      <option>Homework</option>
                      <option>Event</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input className="form-control" name="title" value={formData.title} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" name="description" rows="3" value={formData.description} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Due Date</label>
                    <input type="date" className="form-control" name="dueDate" value={formData.dueDate} onChange={handleChange} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="btn btn-success">{editItem ? 'Update' : 'Create'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherHome;
