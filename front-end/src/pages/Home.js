import React from 'react';



export default function Home() {
    return (
        <div
            className="container-fluid py-5"
            style={{
                background: 'linear-gradient(135deg, #3a5a40, #7bb661)', // chalkboard green gradient
                color: '#f5f5dc', // light beige text, like chalk
                minHeight: '100vh',
                fontFamily: "'Comic Sans MS', cursive, sans-serif", // playful font
                padding: '40px',
            }}
        >
            <div className="row align-items-center mb-5">
                <div className="col-md-6">
                    <h1 className="text-light">Welcome to Your Classroom!</h1>
                    <h2 className="text-light">Stay updated. Stay connected.</h2>
                    <h1 className="display-1 fw-bold">Announcement Hub</h1>
                </div>
                <div className="col-md-6 fs-5">
                    <p>
                        Manage your classroom announcements with ease — share updates,
                        reminders, and important info all in one place.
                    </p>
                    <p>Because every student deserves to stay informed!</p>
                </div>
            </div>

            <div className="infographic-container" style={{ maxWidth: 900, margin: 'auto', padding: 20 }}>
                <h2 className="text-center mb-4">How Our Announcement Platform Works</h2>

                <svg
                    viewBox="0 0 900 300"
                    style={{ width: '100%', height: 'auto' }}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    
                    <circle cx="150" cy="150" r="60" fill="#4CAF50" className="pulse" />
                    <text x="150" y="155" fill="#fff" fontSize="16" fontWeight="bold" textAnchor="middle" pointerEvents="none">
                        Teacher
                    </text>
                    <text x="150" y="180" fill="#fff" fontSize="12" textAnchor="middle" pointerEvents="none">
                        Creates Announcement
                    </text>

                  
                    <line x1="210" y1="150" x2="310" y2="150" stroke="#4CAF50" strokeWidth="3" markerEnd="url(#arrowhead)" />

                 
                    <circle cx="370" cy="150" r="60" fill="#2196F3" className="pulse-delay" />
                    <text x="370" y="155" fill="#fff" fontSize="16" fontWeight="bold" textAnchor="middle" pointerEvents="none">
                        System
                    </text>
                    <text x="370" y="180" fill="#fff" fontSize="12" textAnchor="middle" pointerEvents="none">
                        Publishes Announcement
                    </text>

                    
                    <line x1="430" y1="150" x2="530" y2="150" stroke="#2196F3" strokeWidth="3" markerEnd="url(#arrowhead)" />

                   
                    <circle cx="590" cy="150" r="60" fill="#FFC107" className="pulse-delay-2" />
                    <text x="590" y="155" fill="#fff" fontSize="16" fontWeight="bold" textAnchor="middle" pointerEvents="none">
                        Students
                    </text>
                    <text x="590" y="180" fill="#fff" fontSize="12" textAnchor="middle" pointerEvents="none">
                        Receive & View
                    </text>

                  
                    <line x1="650" y1="150" x2="750" y2="150" stroke="#FFC107" strokeWidth="3" markerEnd="url(#arrowhead)" />

                   
                    <circle cx="810" cy="150" r="60" fill="#9C27B0" className="pulse-delay-3" />
                    <text x="810" y="155" fill="#fff" fontSize="16" fontWeight="bold" textAnchor="middle" pointerEvents="none">
                        Feedback
                    </text>
                    <text x="810" y="180" fill="#fff" fontSize="12" textAnchor="middle" pointerEvents="none">
                        & Interaction
                    </text>

                    
                    <defs>
                        <marker
                            id="arrowhead"
                            markerWidth="10"
                            markerHeight="7"
                            refX="0"
                            refY="3.5"
                            orient="auto"
                            fill="currentColor"
                        >
                            <polygon points="0 0, 10 3.5, 0 7" />
                        </marker>
                    </defs>
                </svg>

                <style>{`
        .pulse {
          animation: pulseAnimation 2s infinite;
        }
        .pulse-delay {
          animation: pulseAnimation 2s infinite 0.5s;
        }
        .pulse-delay-2 {
          animation: pulseAnimation 2s infinite 1s;
        }
        .pulse-delay-3 {
          animation: pulseAnimation 2s infinite 1.5s;
        }
        @keyframes pulseAnimation {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
            </div>

            <div className="mb-5">
                <h3 className="text-primary mb-4">Latest Announcements</h3>
                <div className="row g-4">

                    <div className="col-md-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="card-title">📢 Exam Schedule Released</h5>
                                <p className="card-text">
                                    The exam timetable is now available. Please check your email and plan accordingly.
                                </p>
                                <a href="/announcements/exams" className="btn btn-sm btn-outline-primary">
                                    View Details
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="card-title">📚 New Study Materials Added</h5>
                                <p className="card-text">
                                    Fresh resources have been uploaded to help you prepare for upcoming exams.
                                </p>
                                <a href="/resources" className="btn btn-sm btn-outline-primary">
                                    Explore Resources
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="card-title">📝 Project Submission Deadline</h5>
                                <p className="card-text">
                                    Remember to submit your projects by next Friday before 5 PM.
                                </p>
                                <a href="/projects" className="btn btn-sm btn-outline-primary">
                                    Submit Now
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>



           


        </div>
    );
}
