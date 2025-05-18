import React from 'react';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#2a4d23',
        color: '#f5f5f5',
        padding: '40px 20px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {/* Column 1 */}
        <div style={{ flex: '1 1 300px', marginBottom: '20px' }}>
          <h4 style={{ marginBottom: '15px' }}>📘 About Us</h4>
          <p style={{ lineHeight: 1.6 }}>
            This platform helps students and teachers communicate better through announcements, assignments, and event updates.
          </p>
        </div>

        {/* Column 2 */}
        <div style={{ flex: '1 1 200px', marginBottom: '20px' }}>
          <h4 style={{ marginBottom: '15px' }}>📍 Contact</h4>
          <p>Email: mukesh_m210705ca@nitc.ac.in</p>
          <p>Phone: +919838910520</p>
          <p>Address: Prayagraj</p>
        </div>

        {/* Column 3 */}
        <div style={{ flex: '1 1 200px', marginBottom: '20px' }}>
          <h4 style={{ marginBottom: '15px' }}>🔗 Connect</h4>
          <div style={{ display: 'flex', gap: '15px' }}>
            <a href="#" style={{ color: 'white' }}><i className="fa fa-facebook fa-lg"></i></a>
            <a href="#" style={{ color: 'white' }}><i className="fa fa-twitter fa-lg"></i></a>
            <a href="#" style={{ color: 'white' }}><i className="fa fa-linkedin fa-lg"></i></a>
            <a href="#" style={{ color: 'white' }}><i className="fa fa-instagram fa-lg"></i></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div
        style={{
          marginTop: '30px',
          textAlign: 'center',
          borderTop: '1px solid #44633f',
          paddingTop: '20px',
          fontSize: '0.9rem',
        }}
      >
        © {new Date().getFullYear()} StudyHub. All rights reserved.
      </div>
    </footer>
  );
}
