import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const CLIENT_PLATFORMS = {
  "E-Commerce Websites": [
    "Shopee Sandbox Integration",
    "Lazada Sandbox Integration",
    "Shopify Client Plugin",
    "WooCommerce Plugin"
  ],
  "Educational / Corporate Portals": [
    "Moodle LMS Client",
    "WMSU Portal Integration",
    "CS Society Website",
    "WordPress Client Site"
  ]
};

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

const EVENTS = [
  "Foundation Week 2025",
  "CSM Fest",
  "Palaro 2025",
  "Leadership Summit 2026",
  "General Assembly"
];


const PRESET_FEEDBACK = [
  {
    id: "1",
    studentName: "Maky Boi",
    rating: 5,
    comment: "This checkout process was so smooth! Kudos to the website devs for putting together such a fast loading interface!",
    sentiment: "Positive"
  },
  {
    id: "2",
    studentName: "Mary Uy",
    rating: 3,
    comment: "The page layout is a bit too cluttered, but finding products and checking reviews was decent.",
    sentiment: "Neutral"
  },
  {
    id: "3",
    studentName: "Anonymous",
    rating: 1,
    comment: "Very slow connection and extremely disorganized. The cart kept removing my items. Not happy at all.",
    sentiment: "Negative"
  }
];

const LandingPage = () => {
  const navigate = useNavigate();

  // Modals & Panels State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Authentication (Admins)
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginRole, setLoginRole] = useState("admin"); // 'admin' or 'superadmin'
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Org register
  const [orgName, setOrgName] = useState("");
  const [orgUniversity, setOrgUniversity] = useState("");
  const [orgDesc, setOrgDesc] = useState("");
  const [repName, setRepName] = useState("");
  const [repEmail, setRepEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  // Register Success
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Extension Feedback Form 
  const [feedbackList, setFeedbackList] = useState(() => {
    const saved = localStorage.getItem("vox_feedback");
    return saved ? JSON.parse(saved) : PRESET_FEEDBACK;
  });
  const [studentName, setStudentName] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(EVENTS[0]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [sentiment, setSentiment] = useState("Neutral");

  // Sidebar drag resizing states
  const [sidebarWidth, setSidebarWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);
  const [sentimentFilter, setSentimentFilter] = useState("ALL");

  const handlePointerDown = (e) => {
  e.preventDefault();
  e.stopPropagation();

  document.body.style.userSelect = "none";
  document.body.style.cursor = "ew-resize";

  setIsResizing(true);
};

useEffect(() => {
  if (!isResizing) return;

  const handlePointerMove = (e) => {
    const newWidth = window.innerWidth - e.clientX;

    setSidebarWidth(
      Math.max(320, Math.min(newWidth, 900))
    );
  };

  const handlePointerUp = () => {
    setIsResizing(false);

    document.body.style.userSelect = "";
    document.body.style.cursor = "";
  };

  window.addEventListener("pointermove", handlePointerMove);
  window.addEventListener("pointerup", handlePointerUp);

  return () => {
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);

    document.body.style.userSelect = "";
    document.body.style.cursor = "";
  };
}, [isResizing]);

  // Derived filtered feedback list
  const filteredFeedbackList = feedbackList.filter(item => {
    if (sentimentFilter === "ALL") return true;
    if (sentimentFilter === "POSITIVE") return item.sentiment.toLowerCase() === "positive";
    if (sentimentFilter === "NEUTRAL") return item.sentiment.toLowerCase() === "neutral";
  if (sentimentFilter === "NEGATIVE") return item.sentiment.toLowerCase() === "negative";
    return true;
  });

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
      {/* Background Hub Description ) */}
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

      {/* upper right button*/}
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

      {/* sidebar */}
        <div
         className={`extension-sidebar ${isSidebarOpen ? "open" : ""} ${
           isResizing ? "resizing" : ""
          }`}
          style={{
          width: `${sidebarWidth}px`,
          transform: isSidebarOpen
         ? "translateX(0)"
       : "translateX(100%)",  }}
    >
        <div
        className="sidebar-resize-handle"
         onPointerDown={handlePointerDown}
         />
        {/* navnar in the User View */}
        <header className="user-view-navbar">
          <div className="user-navbar-brand">
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
            <div className="ext-logo-text">
              <h3>VoxReview</h3>
              <p>Feedback Plugin</p>
            </div>
          </div>
          <button className="btn-close-extension" onClick={() => setIsSidebarOpen(false)} title="Close Sidebar">
            ✕
          </button>
        </div>

        <div className="extension-body">
          {/* Feed Card */}
          <section className="ext-card ext-feed-section" style={{ display: 'flex', flexDirection: 'column', flex: 1, maxHeight: 'calc(100vh - 150px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', borderBottom: '1px solid rgba(8, 145, 178, 0.15)', paddingBottom: '0.4rem' }}>
              <h4 style={{ margin: 0, border: 'none', padding: 0 }}>Feedbacks</h4>
              <span className="feedback-count-badge" style={{ fontSize: '0.75rem', background: 'rgba(8, 145, 178, 0.1)', color: '#0891b2', padding: '0.15rem 0.5rem', borderRadius: '12px', fontWeight: 700 }}>
                {filteredFeedbackList.length} items
              </span>
            </div>

            {/* Filter Dropdown Bar */}
            <div className="ext-filter-bar" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.85rem', background: 'rgba(8, 47, 73, 0.04)', padding: '0.45rem 0.75rem', borderRadius: '8px', border: '1px solid rgba(8, 47, 73, 0.08)' }}>
              <label htmlFor="sentiment-filter" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#082f49' }}>Sentiment:</label>
              <select
                id="sentiment-filter"
                value={sentimentFilter}
                onChange={(e) => setSentimentFilter(e.target.value)}
                className="ext-filter-select"
                style={{ flex: 1, background: 'white', border: '1px solid rgba(8, 145, 178, 0.2)', borderRadius: '6px', padding: '0.35rem 0.5rem', color: '#0f172a', fontFamily: 'inherit', fontSize: '0.75rem', fontWeight: 600, outline: 'none', cursor: 'pointer' }}
              >
                <option value="ALL">ALL</option>
                <option value="POSITIVE">POSITIVE</option>
                <option value="NEUTRAL">NEUTRAL</option>
                <option value="NEGATIVE">NEGATI</option>
              </select>
            </div>

            <div className="ext-feedback-list" style={{ flex: 1, overflowY: 'auto' }}>
              {filteredFeedbackList.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
                  No feedbacks match this sentiment.
                </div>
              ) : (
                filteredFeedbackList.map(item => (
                  <div key={item.id} className="ext-feedback-item">
                    <div className="ext-item-header">
                      <div>
                        <h5>{item.studentName}</h5>
                        <span className="ext-item-event">{item.event}</span>
                      </div>
                      <span className={`ext-badge ext-badge-small ext-badge--${item.sentiment.toLowerCase()}`}>
                        {item.sentiment === "Negative" ? "Negative" : item.sentiment}
                      </span>
                    </div>
                    <div className="ext-item-stars">
                      {"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}
                    </div>
                    <p className="ext-item-comment">"{item.comment}"</p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Modal (Admin) */}
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
                /* Login */
                <div className="auth-card-content">
                  <h2>Admin Portal Log In</h2>
                  <p className="auth-subtitle">Access your VoxReview administrative dashboard</p>
                  
                  {/* Role Selector */}
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