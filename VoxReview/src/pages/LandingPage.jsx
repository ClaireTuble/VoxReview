import React, { useState, useEffect } from "react";
import VRLogo from "./img/VR.png";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import { FaTruck, FaBoxOpen, FaShieldAlt, FaHeadset, FaDollarSign, FaStar } from "react-icons/fa";

// Define e-commerce client platforms
const CLIENT_PLATFORMS = {
  "E-Commerce Websites": [
    "Shopee Sandbox Integration",
    "Lazada Sandbox Integration",
    "Shopify Client Plugin",
    "WooCommerce Plugin"
  ]
};

// Define products list
const PRODUCTS = [
  "Pants",
  "Fan",
  "Tshirt",
  "Hoodie",
  "Cap"
];

// Preset reviews list in English, except for Tshirt comment which is in Taglish
const PRESET_FEEDBACK = [
  {
    id: "1",
    name: "Maky Boi",
    product: "Pants",
    rating: 5,
    comment: "The material is great, super quality.",
    sentiment: "happy"
  },
  {
    id: "2",
    name: "Mary Uy",
    product: "Fan",
    rating: 3,
    comment: "It works fine, just okay.",
    sentiment: "envy"
  },
  {
    id: "3",
    name: "Mike Po",
    product: "Tshirt",
    rating: 1,
    comment: "Mainit tsaka sobrang nipis ng cotton. Hindi maganda ang design at hindi ko talaga gusto yung quality.",
    sentiment: "Disgust"
  }
];

// Helper function to get CSS class name based on sentiment
const getSentimentClass = (sentiment) => {
  const s = sentiment.toLowerCase();
  if (s === "happy") return "positive";
  if (s === "anger" || s === "disgust") return "negative";
  return "neutral"; // Maps to neutral for sad, envy, and sarcastic
};

// Helper function to get emoji representation of sentiment
const getSentimentEmoji = (sentiment) => {
  switch (sentiment.toLowerCase()) {
    case "happy": return "😊";
    case "anger": return "😡";
    case "sad": return "😢";
    case "disgust": return "🤢";
    case "envy": return "😒";
    case "sarcastic": return "😏";
    default: return "😐";
  }
};

// Custom background colors for new sentiments to avoid breaking CSS designs
const getSentimentColor = (sentiment) => {
  switch (sentiment.toLowerCase()) {
    case "happy": return "#22c55e";      // Green
    case "anger": return "#ef4444";    // Red
    case "sad": return "#3b82f6";      // Blue
    case "disgust": return "#a855f7";  // Purple
    case "envy": return "#8b5cf6";     // Violet
    case "sarcastic": return "#ec4899"; // Pink
    default: return "#94a3b8";
  }
};

const LandingPage = () => {
  const navigate = useNavigate();

  // State variables for modal and panels
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Admin login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginRole, setLoginRole] = useState("admin"); // 'admin' or 'superadmin'
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // User registration state
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerFullName, setRegisterFullName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerBio, setRegisterBio] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  // Flag for registration success status
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Feedback list for simulator plugin
  const [feedbackList, setFeedbackList] = useState(PRESET_FEEDBACK);
  const [sentimentFilter, setSentimentFilter] = useState("ALL");

  // Resizing state for dragging the sidebar
  const [sidebarWidth, setSidebarWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);

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
      setSidebarWidth(Math.max(320, Math.min(newWidth, 900)));
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

  // List of filtered feedbacks based on selected sentiment
  const filteredFeedbackList = feedbackList.filter(item => {
    if (sentimentFilter === "ALL") return true;
    return item.sentiment.toUpperCase() === sentimentFilter.toUpperCase();
  });

  // Save feedback list to localStorage for dashboard synchronization
  useEffect(() => {
    localStorage.setItem("vox_feedback", JSON.stringify(feedbackList));
  }, [feedbackList]);

  const openLoginModal = () => {
    setIsSidebarOpen(false);   
    setIsSignUp(false);
    setIsForgotPassword(false);
    setShowSuccess(false);
    setIsModalOpen(true);
  };

  const openRegisterModal = () => {
    setIsSignUp(true);
    setIsForgotPassword(false);
    setShowSuccess(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowSuccess(false);
    setIsSidebarOpen(true); // Open sidebar again after closing
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

  // Submit handler for registering a new user
  const handleUserRegisterSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage(
      `Registration for user account "${registerFullName}" (${registerUsername}) has been successfully submitted. It is currently under review by the platform Super Administrator. Approval details will be sent to "${registerEmail}" in 1-2 business days.`
    );
    setShowSuccess(true);
    // Reset form fields
    setRegisterUsername("");
    setRegisterFullName("");
    setRegisterEmail("");
    setRegisterBio("");
    setRegisterPassword("");
  };

  // Calculate percentages for the six sentiments
  const totalReviewsCount = feedbackList.length;
  const happyCount = feedbackList.filter(f => f.sentiment === "Happy").length;
  const angerCount = feedbackList.filter(f => f.sentiment === "Anger").length;
  const sadCount = feedbackList.filter(f => f.sentiment === "Sad").length;
  const disgustCount = feedbackList.filter(f => f.sentiment === "Disgust").length;
  const envyCount = feedbackList.filter(f => f.sentiment === "Envy").length;
  const sarcasticCount = feedbackList.filter(f => f.sentiment === "Sarcastic").length;

  const happyPct = totalReviewsCount > 0 ? Math.round((happyCount / totalReviewsCount) * 100) : 0;
  const angerPct = totalReviewsCount > 0 ? Math.round((angerCount / totalReviewsCount) * 100) : 0;
  const sadPct = totalReviewsCount > 0 ? Math.round((sadCount / totalReviewsCount) * 100) : 0;
  const disgustPct = totalReviewsCount > 0 ? Math.round((disgustCount / totalReviewsCount) * 100) : 0;
  const envyPct = totalReviewsCount > 0 ? Math.round((envyCount / totalReviewsCount) * 100) : 0;
  const sarcasticPct = totalReviewsCount > 0 ? Math.round((sarcasticCount / totalReviewsCount) * 100) : 0;

  return (
    <div className="host-container-blank">
      {/* Simulation Host Site Background */}
      <div className="blank-page-helper">
        <div className="blank-page-card">
          <div className="mock-shopee-header">
            <span className="shopee-logo">VoxReview</span>
            <div className="mock-user-meta">Example Site</div>
          </div>
          <h1>VoxReview Integration</h1>
          <p>
            This is a temporary host application where the VoxReview feedback plugin sidebar is integrated.
          </p>
        </div>
      </div>

      {/* Floating trigger button at the top right */}
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

      {/* Sidebar sheet for plugin view */}
      <div
        className={`extension-sidebar ${isSidebarOpen ? "open" : ""} ${isResizing ? "resizing" : ""}`}
        style={{
          width: `${sidebarWidth}px`,
          transform: isSidebarOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div className="sidebar-resize-handle" onPointerDown={handlePointerDown} />
        
        {/* Navbar inside the plugin */}
        <header className="user-view-navbar">
          <div className="user-navbar-brand">
            <div className="brand-titles">
              <h3>VoxReview</h3>
            </div>
          </div>
          <div className="user-navbar-buttons">
            <button className="btn-user-nav btn-user-login" onClick={openLoginModal}>Log In</button>
            <button className="btn-user-nav btn-user-register" onClick={openRegisterModal}>Register User</button>
          </div>
        </header>

        <div className="extension-header">
          <div className="ext-logo">
            <div className="ext-logo-text">
              <p>Feedback Plugin</p>
            </div>
          </div>
          <button className="btn-close-extension" onClick={() => setIsSidebarOpen(false)} title="Close Sidebar">
            ✕
          </button>
        </div>

        <div className="extension-body">
          {/* Feed Card */}
          <section className="ext-card ext-feed-section">
            {/* Product summary details */}
            <div className="ext-product-summary">
              <h4 className="summary-title">Product</h4>
              <div className="product-name">
                Wooden Clothes Hanger (20 pcs)
              </div>
              <div className="product-rating">
                <FaStar className="rating-star" />
                <span className="rating-score">4.6</span>
                <span className="rating-count">(1,245 Reviews)</span>
              </div>
            </div>

            {/* Overall sentiment distribution breakdown */}
            <div className="ext-overall-sentiment">
              <h4 className="summary-title">Overall Sentiment</h4>
              {[
                { label: "Happy", pct: happyPct, colorClass: "positive", emoji: "😊" },
                { label: "Anger", pct: angerPct, colorClass: "negative", emoji: "😡" },
                { label: "Sad", pct: sadPct, colorClass: "neutral", emoji: "😢" },
                { label: "Disgust", pct: disgustPct, colorClass: "negative", emoji: "🤢", customColor: "#a855f7" },
                { label: "Envy", pct: envyPct, colorClass: "neutral", emoji: "😒" },
                { label: "Sarcastic", pct: sarcasticPct, colorClass: "neutral", emoji: "😏", customColor: "#ec4899" }
              ].map(emo => (
                <div className="sentiment-row" key={emo.label}>
                  <div className="sentiment-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "1.1rem" }}>{emo.emoji}</span>
                    <span>{emo.label}</span>
                  </div>
                  <div className="sentiment-progress">
                    <div
                      className={`progress-fill ${emo.colorClass}`}
                      style={{ 
                        width: `${emo.pct}%`,
                        ...(emo.customColor ? { backgroundColor: emo.customColor } : {})
                      }}
                    />
                  </div>
                  <span className="sentiment-percent">{emo.pct}%</span>
                </div>
              ))}
            </div>

            {/* Top issue categories */}
            <div className="ext-top-issues">
              <h4 className="issues-title">Top Issue Categories</h4>
              <div className="issue-row">
                <span className="issue-name"><FaTruck className="issue-icon" /> Delivery</span>
                <span className="issue-percent">35%</span>
              </div>
              <div className="issue-row">
                <span className="issue-name"><FaBoxOpen className="issue-icon" /> Packaging</span>
                <span className="issue-percent">25%</span>
              </div>
              <div className="issue-row">
                <span className="issue-name"><FaShieldAlt className="issue-icon" /> Product Quality</span>
                <span className="issue-percent">20%</span>
              </div>
              <div className="issue-row">
                <span className="issue-name"><FaHeadset className="issue-icon" /> Customer Service</span>
                <span className="issue-percent">15%</span>
              </div>
              <div className="issue-row">
                <span className="issue-name"><FaDollarSign className="issue-icon" /> Pricing</span>
                <span className="issue-percent">5%</span>
              </div>
            </div>

            {/* Header and filter controls for reviews list */}
            <div className="ext-feedback-header">
              <h4>Feedbacks</h4>
              <div className="ext-filter-bar">
                <label htmlFor="sentiment-filter">Filter:</label>
                <select
                  id="sentiment-filter"
                  value={sentimentFilter}
                  onChange={(e) => setSentimentFilter(e.target.value)}
                  className="ext-filter-select"
                >
                  <option value="ALL">ALL</option>
                  <option value="HAPPY">HAPPY</option>
                  <option value="ANGER">ANGER</option>
                  <option value="SAD">SAD</option>
                  <option value="DISGUST">DISGUST</option>
                  <option value="ENVY">ENVY</option>
                  <option value="SARCASTIC">SARCASTIC</option>
                </select>
              </div>
            </div>

            <div className="ext-feedback-list" style={{ height: "320px", overflowY: "auto", overflowX: "hidden" }}>
              {filteredFeedbackList.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
                  No feedback matches this sentiment.
                </div>
              ) : (
                filteredFeedbackList.map(item => (
                  <div key={item.id} className="ext-feedback-item">
                    <div className="ext-item-header">
                      <div>
                        <h5>{item.name}</h5>
                        <span className="ext-item-event">{item.product}</span>
                      </div>
                      <span 
                        className={`ext-badge ext-badge-small ext-badge--${getSentimentClass(item.sentiment)}`}
                        style={{ 
                          textTransform: "uppercase",
                          backgroundColor: getSentimentColor(item.sentiment) + "26", // alpha opacity
                          color: getSentimentColor(item.sentiment),
                          border: `1px solid ${getSentimentColor(item.sentiment)}33`
                        }}
                      >
                        {getSentimentEmoji(item.sentiment)} {item.sentiment}
                      </span>
                    </div>
                    <p className="ext-item-comment">"{item.comment}"</p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Pop-up modal for login, registration, and forgot password */}
      {isModalOpen && (
        <div className="auth-modal-overlay" onClick={closeModal}>
          <div className="auth-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="auth-bg-column auth-bg-left"></div>
            <div className="auth-bg-column auth-bg-left"></div>

            <div className="auth-bg-column auth-bg-right">
              <div className="auth-right-content">    
                <div className="auth-logo">
                  <h1>VoxReview</h1>
                  <span>Sentiment Review Plugin</span>
                </div>
                <div className="auth-illustration"> 
                  <img src={VRLogo} alt="VoxReview Logo" className="auth-logo-image" />
                </div>
                <div className="auth-description">
                  <h2>Welcome!</h2>
                  <p>
                    Log in to manage product reviews and monitor user sentiments.
                  </p>
                </div>
              </div>
            </div>

            <button className="auth-modal-close" onClick={closeModal}>×</button>

            <div className={`auth-sliding-card ${isSignUp ? "slide-right" : ""}`}>
              {showSuccess ? (
                /* Success Screen */
                <div className="success-register-screen">
                  <h2>User Registration Submitted</h2>
                  <p>{successMessage}</p>
                  <button className="auth-btn-primary" onClick={openLoginModal}>
                    Go to Login
                  </button>
                </div>
              ) : isForgotPassword ? (
                /* Forgot Password Form */
                <div className="auth-card-content">
                  <h2>Forgot Password</h2>
                  <p className="auth-subtitle">Enter your email address to receive a password reset link</p>
                  
                  {forgotSuccess ? (
                    <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                      <p style={{ color: "#10b981", fontWeight: "600", marginBottom: "1.5rem" }}>
                        The reset link has been successfully sent to your email address! Please check your inbox.
                      </p>
                      <button className="auth-btn-primary" onClick={() => {
                        setIsForgotPassword(false);
                        setForgotSuccess(false);
                        setForgotEmail("");
                      }}>
                        Back to Log In
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={(e) => { e.preventDefault(); setForgotSuccess(true); }}>
                      <div className="auth-input-group">
                        <label>Email Address</label>
                        <input 
                          type="email" 
                          placeholder="user@example.com" 
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          required 
                        />
                      </div>
                      
                      <button type="submit" className="auth-btn-primary">
                        Send Reset Link
                      </button>
                      
                      <div className="auth-switch-text" style={{ marginTop: "1.5rem" }}>
                        <button type="button" className="auth-switch-btn" onClick={() => setIsForgotPassword(false)}>
                          Back to Log In
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ) : !isSignUp ? (
                /* Login Form */
                <div className="auth-card-content">
                  <h2>User Portal Log In</h2>
                  <p className="auth-subtitle">Access your VoxReview dashboard</p>
                  
                  {/* Tabs to switch between Web User and SuperAdmin */}
                  <div className="role-selector">
                    <button 
                      type="button" 
                      className={`role-tab ${loginRole === "admin" ? "active" : ""}`}
                      onClick={() => setLoginRole("admin")}
                    >
                      Web User
                    </button>
                    <button 
                      type="button" 
                      className={`role-tab ${loginRole === "superadmin" ? "active" : ""}`}
                      onClick={() => setLoginRole("superadmin")}
                    >
                      SuperAdmin
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
                      
                      {/* Password Reset Link */}
                      <div style={{ textAlign: "right", marginTop: "6px" }}>
                        <button 
                          type="button" 
                          className="auth-switch-btn" 
                          onClick={() => setIsForgotPassword(true)}
                          style={{ fontSize: "0.75rem", color: "#6366f1", border: "none", background: "none", cursor: "pointer" }}
                        >
                          Forgot Password?
                        </button>
                      </div>
                    </div>
                    
                    <button type="submit" className="auth-btn-primary">
                      Log In {loginRole === "superadmin" ? "SuperAdmin" : "User"}
                    </button>
                  </form>

                  <div className="quick-test-note">
                    <strong>Reminder:</strong> This is sandbox mode only.
                  </div>

                  <div className="auth-switch-text" style={{ marginTop: "1rem" }}>
                    Need a new account?{" "}
                    <button type="button" className="auth-switch-btn" onClick={() => {
                      setIsSignUp(true);
                      setIsForgotPassword(false);
                    }}>Register here</button>
                  </div>
                </div>
              ) : (
                /* Register User Form */
                <div className="auth-card-content">
                  <div className="register-form scrollable-form">
                    <h2>Register User</h2>
                    <p className="auth-subtitle">Create your VoxReview user account</p>
                    
                    <form onSubmit={handleUserRegisterSubmit}>
                      <div className="auth-input-group">
                        <label>Username</label>
                        <input 
                          type="text" 
                          placeholder="e.g. juan_delacruz" 
                          required 
                          value={registerUsername} 
                          onChange={(e) => setRegisterUsername(e.target.value)} 
                        />
                      </div>

                      <div className="auth-input-group">
                        <label>Short Bio</label>
                        <textarea 
                          rows="2" 
                          placeholder="Short description about you..." 
                          value={registerBio} 
                          onChange={(e) => setRegisterBio(e.target.value)}
                          required
                        ></textarea>
                      </div>

                      <div className="auth-input-row">
                        <div className="auth-input-group">
                          <label>Full Name</label>
                          <input 
                            type="text" 
                            placeholder="Full Name" 
                            required 
                            value={registerFullName} 
                            onChange={(e) => setRegisterFullName(e.target.value)} 
                          />
                        </div>
                        <div className="auth-input-group">
                          <label>Contact Email</label>
                          <input 
                            type="email" 
                            placeholder="name@example.com" 
                            required 
                            value={registerEmail} 
                            onChange={(e) => setRegisterEmail(e.target.value)} 
                          />
                        </div>
                      </div>

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
                      
                      <button type="submit" className="auth-btn-primary">Register User</button>
                    </form>

                    <div className="auth-switch-text" style={{ marginTop: "1rem" }}>
                      Already have an account?{" "}
                      <button type="button" className="auth-switch-btn" onClick={() => setIsSignUp(false)}>Log In</button>
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