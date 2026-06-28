import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const UNIVERSITY_ORGS = {
  "Western Mindanao State University": [
    "Computer Science Society (COSS)",
    "Society of Information Technology Educators (SITE)",
    "Junior Marketing Association (JMA)",
    "League of Young Entrepreneurs (LYE)",
  ],
  "Mountaineering": [
    "Alphinity Mountaineering organization",
    "Beruda Mountaineering organization",
    "Apo Mountaineering organization",
  ],
};

const PRESET_FEEDBACK = [
  {
    id: "1",
    studentName: "Maky Boi",
    event: "Foundation Week 2025",
    rating: 5,
    comment: "This event was so much fun! Kudos to the student council for putting together such an active week!",
    sentiment: "Positive"
  },
  {
    id: "2",
    studentName: "Mary Uy",
    event: "CSM Fest",
    rating: 3,
    comment: "The seminars were a bit too long, but the booths and activities in the afternoon were decent.",
    sentiment: "Neutral"
  },
  {
    id: "3",
    studentName: "Anonymous",
    event: "Palaro 2025",
    rating: 1,
    comment: "Too hot and very disorganized. The games were delayed by hours. Not happy at all.",
    sentiment: "Negative"
  }
];

const EVENTS = [
  "Foundation Week 2025",
  "CSM Fest",
  "Palaro 2025",
  "Leadership Summit 2026",
  "General Assembly"
];

const LandingPage = () => {
  const navigate = useNavigate();

  // Modals & Panels State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Authentication State (For Admins)
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginRole, setLoginRole] = useState("admin"); // 'admin' or 'superadmin'
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Org registration states
  const [orgName, setOrgName] = useState("");
  const [orgUniversity, setOrgUniversity] = useState("");
  const [orgDesc, setOrgDesc] = useState("");
  const [repName, setRepName] = useState("");
  const [repEmail, setRepEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  // Registration success state
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Extension Feedback Form States
  const [feedbackList, setFeedbackList] = useState(() => {
    const saved = localStorage.getItem("vox_feedback");
    return saved ? JSON.parse(saved) : PRESET_FEEDBACK;
  });
  const [studentName, setStudentName] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(EVENTS[0]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [sentiment, setSentiment] = useState("Neutral");

  // Save feedback list to localStorage
  useEffect(() => {
    localStorage.setItem("vox_feedback", JSON.stringify(feedbackList));
  }, [feedbackList]);

  // Sentiment Analyzer
  useEffect(() => {
    if (!comment.trim()) {
      setSentiment("Neutral");
      return;
    }
    const posWords = ["great", "good", "love", "awesome", "fun", "amazing", "excellent", "nice", "best", "cool", "happy", "kudos", "enjoy", "decent", "success", "wonderful"];
    const negWords = ["bad", "worst", "terrible", "boring", "disappointed", "slow", "hate", "waste", "poor", "sad", "dislike", "hot", "disorganized", "delayed", "ruined", "annoyed"];
    
    let score = 0;
    const lower = comment.toLowerCase();
    
    posWords.forEach(w => {
      if (lower.includes(w)) score += 1;
    });
    negWords.forEach(w => {
      if (lower.includes(w)) score -= 1;
    });

    if (score > 0) {
      setSentiment("Positive");
    } else if (score < 0) {
      setSentiment("Negative");
    } else {
      setSentiment("Neutral");
    }
  }, [comment]);

  const openLoginModal = () => {
    setIsSignUp(false);
    setShowSuccess(false);
    setIsModalOpen(true);
  };

  const openRegisterModal = () => {
    setIsSignUp(true);
    setShowSuccess(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowSuccess(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginRole === "superadmin") {
      navigate("/superadmin");
    } else {
      navigate("/admin");
    }
    closeModal();
  };

  const handleOrgRegisterSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage(
      `Registration for "${orgName}" submitted successfully. Accreditation requests are under review by the platform Super Administrator. Approval details will be sent to "${repEmail}" in 1-2 business days.`
    );
    setShowSuccess(true);
    // Reset fields
    setOrgName("");
    setOrgUniversity("");
    setOrgDesc("");
    setRepName("");
    setRepEmail("");
    setRegisterPassword("");
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newFeedback = {
      id: Date.now().toString(),
      studentName: studentName.trim() || "Anonymous Student",
      event: selectedEvent,
      rating,
      comment: comment.trim(),
      sentiment
    };

    const updated = [newFeedback, ...feedbackList];
    setFeedbackList(updated);
    
    // Save to sync with dashboards if needed
    localStorage.setItem("vox_feedback_latest", JSON.stringify(newFeedback));

    // Reset Form
    setStudentName("");
    setComment("");
    setRating(5);
    alert("Feedback submitted successfully! Thank you.");
  };

  return (
    <div className="host-container-blank">
      {/* Background Hub Description (representing Shopee or another host website) */}
      <div className="blank-page-helper">
        <div className="blank-page-card">
          <div className="mock-shopee-header">
            <span className="shopee-logo">VoxReview</span>
            <div className="mock-user-meta">Example Site</div>
          </div>
          <h1>VoxReview Integration Sandbox</h1>
          <p>
            This represents a blank page of a host application (like Shopee) where your sentiment review plugin is integrated.
          </p>
          <p>
            To interact with the review plugin, click the floating <strong>VoxReview</strong> icon in the <strong>upper right corner</strong>.
          </p>
          <div style={{ marginTop: "1rem", color: "#64748b", fontSize: "0.85rem" }}>
            The plugin's navigation bar (Log In ) is fully embedded inside the sidebar view itself.
          </div>
        </div>
      </div>

      {/* FLOATING TRIGGER BUTTON (UPPER RIGHT CORNER) */}
      <button 
        className={`floating-feedback-trigger-ur ${isSidebarOpen ? "active" : ""}`}
        onClick={() => setIsSidebarOpen(true)}
        title="Open VoxReview Sidebar"
      >
        <span className="trigger-pulse"></span>
        <svg viewBox="0 0 24 24" className="trigger-icon">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="trigger-text">VoxReview Portal</span>
      </button>

      {/* RIGHT SIDEBAR: VoxReview Feedback Plugin (Extension Sized) */}
      <div className={`extension-sidebar ${isSidebarOpen ? "open" : ""}`}>
        {/* Navigation Bar inside the User View */}
        <header className="user-view-navbar">
          <div className="user-navbar-brand">
            <svg viewBox="0 0 24 24" className="brand-svg-logo-sm">
              <path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2z" fill="#4f46e5" />
              <path d="M3 10v6c0 2.21 4.03 4 9 4s9-1.79 9-4v-6l-9 4-9-4z" fill="#818cf8" />
            </svg>
            <div className="brand-titles">
              <h4>Your View Matters</h4>
              <span>VoxReview</span>
            </div>
          </div>
          <div className="user-navbar-buttons">
            <button className="btn-user-nav btn-user-login" onClick={openLoginModal}>Log In</button>
            <button className="btn-user-nav btn-user-register" onClick={openRegisterModal}>Register Organization</button>
          </div>
        </header>

        <div className="extension-header">
          <div className="ext-logo">
            <span className="ext-logo-icon">📣</span>
            <div className="ext-logo-text">
              <h3>VoxReview</h3>
              <p>Event Feedback Plugin</p>
            </div>
          </div>
          <button className="btn-close-extension" onClick={() => setIsSidebarOpen(false)} title="Close Sidebar">
            ✕
          </button>
        </div>

        <div className="extension-body">
          {/* Form Card */}
          <section className="ext-card ext-form-section">
            <h4>Submit Event Review</h4>
            <form onSubmit={handleFeedbackSubmit}>
              <div className="ext-form-group">
                <label>Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Anonymous Student"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
              </div>

              <div className="ext-form-group">
                <label>Select Event</label>
                <select
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                >
                  {EVENTS.map(ev => (
                    <option key={ev} value={ev}>{ev}</option>
                  ))}
                </select>
              </div>

              <div className="ext-form-group">
                <label>Overall Rating</label>
                <div className="ext-star-rating">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      className={`ext-star-btn ${star <= rating ? "active" : ""}`}
                      onClick={() => setRating(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="ext-form-group">
                <label>Comments / Review</label>
                <textarea
                  rows="3"
                  placeholder="Write your review here. sentiment detected dynamically..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                ></textarea>
              </div>

              {comment.trim() && (
                <div className="ext-sentiment-indicator">
                  <span>Sentiment Detected:</span>
                  <span className={`ext-badge ext-badge--${sentiment.toLowerCase()}`}>
                    {sentiment}
                  </span>
                </div>
              )}

              <button type="submit" className="ext-btn-submit">
                Submit Review
              </button>
            </form>
          </section>

          {/* Feed Card */}
          <section className="ext-card ext-feed-section">
            <h4>Recent Reviews</h4>
            <div className="ext-feedback-list">
              {feedbackList.map(item => (
                <div key={item.id} className="ext-feedback-item">
                  <div className="ext-item-header">
                    <div>
                      <h5>{item.studentName}</h5>
                      <span className="ext-item-event">{item.event}</span>
                    </div>
                    <span className={`ext-badge ext-badge-small ext-badge--${item.sentiment.toLowerCase()}`}>
                      {item.sentiment}
                    </span>
                  </div>
                  <div className="ext-item-stars">
                    {"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}
                  </div>
                  <p className="ext-item-comment">"{item.comment}"</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Auth Modal Overlay (Admin Only) */}
      {isModalOpen && (
        <div className="auth-modal-overlay" onClick={closeModal}>
          <div className="auth-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="auth-bg-column auth-bg-left"></div>
            <div className="auth-bg-column auth-bg-right"></div>
            <button className="auth-modal-close" onClick={closeModal}>×</button>

            <div className={`auth-sliding-card ${isSignUp ? "slide-right" : ""}`}>
              {showSuccess ? (
                /* Success Screen */
                <div className="success-register-screen">
                  <h2>Organization Registration submitted</h2>
                  <p>{successMessage}</p>
                  <button className="auth-btn-primary" onClick={openLoginModal}>
                    Go to Login
                  </button>
                </div>
              ) : !isSignUp ? (
                /* Login Content */
                <div className="auth-card-content">
                  <h2>Admin Portal Log In</h2>
                  <p className="auth-subtitle">Access your VoxReview administrative dashboard</p>
                  
                  {/* Role Selector Tabs */}
                  <div className="role-selector">
                    <button 
                      type="button" 
                      className={`role-tab ${loginRole === "admin" ? "active" : ""}`}
                      onClick={() => setLoginRole("admin")}
                    >
                      Org Admin
                    </button>
                    <button 
                      type="button" 
                      className={`role-tab ${loginRole === "superadmin" ? "active" : ""}`}
                      onClick={() => setLoginRole("superadmin")}
                    >
                      Example SuperAdmin
                    </button>
                  </div>

                  <form onSubmit={handleLoginSubmit}>
                    <div className="auth-input-group">
                      <label>Email Address</label>
                      <input 
                        type="email" 
                        placeholder={loginRole === "superadmin" ? "superadmin@voxreview.com" : "admin@voxreview.com"} 
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required 
                      />
                    </div>
                    
                    <div className="auth-input-group">
                      <label>Password</label>
                      <div style={{ position: "relative" }}>
                        <input 
                          type={showLoginPassword ? "text" : "password"} 
                          placeholder="••••••••" 
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required 
                          style={{ paddingRight: "50px", width: "100%" }}
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          className="password-toggle-btn"
                        >
                          {showLoginPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                    </div>
                    
                    <button type="submit" className="auth-btn-primary">
                      Log In {loginRole === "superadmin" ? "SuperAdmin" : "Admin"}
                    </button>
                  </form>

                  <div className="quick-test-note">
                    <strong>Reminder:</strong> Dipa tapos pi </div>

                  <div className="auth-switch-text">
                    Want to register an organization?{" "}
                    <button className="auth-switch-btn" onClick={() => setIsSignUp(true)}>Register here</button>
                  </div>
                </div>
              ) : (
                /* Register Org Content (No User Option) */
                <div className="auth-card-content">
                  <div className="register-form scrollable-form">
                    <h2>Register Organization</h2>
                    <p className="auth-subtitle">Accredit your campus organization for event feedback</p>
                    
                    <form onSubmit={handleOrgRegisterSubmit}>
                      <div className="auth-input-group">
                        <label>Organization Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Computer Science Society" 
                          required 
                          value={orgName} 
                          onChange={(e) => setOrgName(e.target.value)} 
                        />
                      </div>

                      <div className="auth-input-group">
                        <label>University</label>
                        <select 
                          required 
                          value={orgUniversity} 
                          onChange={(e) => setOrgUniversity(e.target.value)}
                        >
                          <option value="">Select Affiliated University</option>
                          {Object.keys(UNIVERSITY_ORGS).map(uni => (
                            <option key={uni} value={uni}>{uni}</option>
                          ))}
                        </select>
                      </div>

                      <div className="auth-input-group">
                        <label>Brief Description</label>
                        <textarea 
                          rows="2" 
                          placeholder="What is the mission of this organization..." 
                          value={orgDesc} 
                          onChange={(e) => setOrgDesc(e.target.value)}
                          required
                        ></textarea>
                      </div>

                      <div className="auth-input-row">
                        <div className="auth-input-group">
                          <label>Representative Name</label>
                          <input 
                            type="text" 
                            placeholder="Full Name" 
                            required 
                            value={repName} 
                            onChange={(e) => setRepName(e.target.value)} 
                          />
                        </div>
                        <div className="auth-input-group">
                          <label>Contact Email</label>
                          <input 
                            type="email" 
                            placeholder="name@gmail.com" 
                            required 
                            value={repEmail} 
                            onChange={(e) => setRepEmail(e.target.value)} 
                          />
                        </div>
                      </div>

                      {/* Password with hide/see feature */}
                      <div className="auth-input-group">
                        <label>Password</label>
                        <div style={{ position: "relative" }}>
                          <input 
                            type={showRegisterPassword ? "text" : "password"} 
                            placeholder="••••••••" 
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            required 
                            style={{ paddingRight: "50px", width: "100%" }}
                          />
                          <button 
                            type="button" 
                            onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                            className="password-toggle-btn"
                          >
                            {showRegisterPassword ? "Hide" : "Show"}
                          </button>
                        </div>
                      </div>
                      
                      <button type="submit" className="auth-btn-primary">Submit Accreditation Request</button>
                    </form>

                    <div className="auth-switch-text" style={{ marginTop: "1rem" }}>
                      Already have an account?{" "}
                      <button className="auth-switch-btn" onClick={() => setIsSignUp(false)}>Log In</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;