import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import bgImage from "../pages/img/landing.jpg";

const UNIVERSITY_ORGS = {
  "Western Mindanao State University": [
    "Supreme Student Council (SSC)",
    "Computer Science Society (COSS)",
    "Society of Information Technology Educators (SITE)",
    "Junior Marketing Association (JMA)",
    "League of Young Entrepreneurs (LYE)",
  ],
  "Coffee Station": [
    "Coffee Station Baristas",
    "Coffee Station Managers",
    "location",
  ],
};

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // false for Login, true for SignUp
  const [signUpType, setSignUpType] = useState(null); // 'user', 'org', or null

  // User registration states
  const [profilePhoto, setProfilePhoto] = useState("");
  const [userName, setUserName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedOrgs, setSelectedOrgs] = useState([]);

  // Org registration states
  const [orgName, setOrgName] = useState("");
  const [orgUniversity, setOrgUniversity] = useState("");
  const [orgDesc, setOrgDesc] = useState("");
  const [repName, setRepName] = useState("");
  const [repEmail, setRepEmail] = useState("");

  // Registration success state
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const openLoginModal = () => {
    setIsSignUp(false);
    setSignUpType(null);
    setShowSuccess(false);
    setIsModalOpen(true);
  };

  const openRegisterModal = () => {
    setIsSignUp(true);
    setSignUpType(null);
    setShowSuccess(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSignUpType(null);
    setShowSuccess(false);
  };

  const handleUniversityChange = (e) => {
    setSelectedUniversity(e.target.value);
    setSelectedOrgs([]); // Reset selected orgs when university changes
  };

  const handleOrgCheckChange = (org, isChecked) => {
    if (isChecked) {
      setSelectedOrgs([...selectedOrgs, org]);
    } else {
      setSelectedOrgs(selectedOrgs.filter(item => item !== org));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    alert("Sign In successful! (Demo implementation)");
    closeModal();
  };

  const handleUserRegisterSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage(`User Account for ${userName} registered successfully!`);
    setShowSuccess(true);
    // Reset form fields
    setProfilePhoto("");
    setUserName("");
    setBirthDate("");
    setContactNumber("");
    setUserEmail("");
    setSelectedUniversity("");
    setSelectedOrgs([]);
  };

  const handleOrgRegisterSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage(`Accreditation submitted for ${orgName}!`);
    setShowSuccess(true);
    // Reset form fields
    setOrgName("");
    setOrgUniversity("");
    setOrgDesc("");
    setRepName("");
    setRepEmail("");
  };

  return (
    <div className="landing-container">
      {/* Navbar Header */}
      <header className="landing-header">
        <div className="brand">
          <span className="brand-icon">💠</span>
          <span className="brand-name">VoxReview</span>
        </div>
        <div className="nav-buttons">
          <button className="btn-nav btn-login" onClick={openLoginModal}>Log In</button>
          <button className="btn-nav btn-register" onClick={openRegisterModal}>Create Account</button>
        </div>
      </header>

      {/* Hero Content */}
      <section className="hero-section">
        <h1 className="hero-title">
          <span>VoxReview</span> Feedback Portal
        </h1>
        <p className="hero-subtitle">
          Voice of the Critics. VoxReview uses sentiment analysis to transform 
          evaluator and client feedback into actionable insights.
        </p>

        <div className="portal-grid">
          {/* Evaluator Review Portal */}
          <Link to="/user" className="portal-card portal-card--student">
            <div className="portal-card-top">
              <div className="portal-icon-wrapper">👤</div>
              <h2 className="portal-title">Evaluator Portal</h2>
              <p className="portal-description">
                Submit event feedback, rate activities, and view public sentiment reports. No sign-in required.
              </p>
            </div>
            <div className="portal-action">
              Give Feedback <span>➔</span>
            </div>
          </Link>

          {/* Org Admin Portal */}
          <Link to="/admin" className="portal-card">
            <div className="portal-card-top">
              <div className="portal-icon-wrapper">💼</div>
              <h2 className="portal-title">Organization Admin</h2>
              <p className="portal-description">
                Manage organization events, monitor real-time sentiment metrics, moderate feedback, and export reports.
              </p>
            </div>
            <div className="portal-action">
              Access Org Dashboard <span>➔</span>
            </div>
          </Link>

          {/* Superadmin Portal */}
          <Link to="/superadmin" className="portal-card portal-card--superadmin">
            <div className="portal-card-top">
              <div className="portal-icon-wrapper">🖥️</div>
              <h2 className="portal-title">Super Administrator</h2>
              <p className="portal-description">
                Manage your site, verify registered organizations, and view platform-wide analytics.
              </p>
            </div>
            <div className="portal-action">
              Access System Console <span>➔</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} VoxReview. All rights reserved.</p>
      </footer>

      {/* Auth Modal Overlay */}
      {isModalOpen && (
        <div className="auth-modal-overlay" onClick={closeModal}>
          <div className="auth-modal-container" onClick={(e) => e.stopPropagation()}>
            {/* Background Columns */}
            <div className="auth-bg-column auth-bg-left"></div>
            <div className="auth-bg-column auth-bg-right"></div>

            {/* Close button */}
            <button className="auth-modal-close" onClick={closeModal}>×</button>

            {/* Sliding Card */}
            <div className={`auth-sliding-card ${isSignUp ? "slide-right" : ""}`}>
              {showSuccess ? (
                /* Success Registration Message */
                <div className="success-register-screen">
                  <div className="success-icon">🎉</div>
                  <h2>Success!</h2>
                  <p>{successMessage}</p>
                  <button className="auth-btn-primary" style={{ width: "80%" }} onClick={openLoginModal}>
                    Go to Sign In
                  </button>
                </div>
              ) : !isSignUp ? (
                /* Login Content */
                <div className="auth-card-content">
                  <h2>Welcome Back</h2>
                  <p className="auth-subtitle">Login to your VoxReview account</p>
                  <form onSubmit={handleLoginSubmit}>
                    <div className="auth-input-group">
                      <label>Email Address</label>
                      <input type="email" placeholder="••••••••@gmail.com" required />
                    </div>
                    <div className="auth-input-group">
                      <label>Password</label>
                      <input type="password" placeholder="••••••••" required />
                    </div>
                    <button type="submit" className="auth-btn-primary">Sign In</button>
                  </form>
                  <div className="auth-switch-text">
                    Don't have an account?{" "}
                    <button className="auth-switch-btn" onClick={() => setIsSignUp(true)}>Sign Up</button>
                  </div>
                </div>
              ) : (
                /* Register Content */
                <div className="auth-card-content">
                  {!signUpType ? (
                    /* Choose Account Type */
                    <div className="signup-type-selection">
                      <h2>Create Account</h2>
                      <p className="auth-subtitle">Choose your account type to proceed</p>
                      <div className="signup-type-buttons">
                        <button className="signup-type-btn" onClick={() => setSignUpType("user")}>
                          <div className="signup-type-icon">🎓</div>
                          <div className="signup-type-text">
                            <h3>Create User Account</h3>
                            <p>Join as evaluator</p>
                          </div>
                        </button>
                        <button className="signup-type-btn" onClick={() => setSignUpType("org")}>
                          <div className="signup-type-icon">🏢</div>
                          <div className="signup-type-text">
                            <h3>Register Your Organization</h3>
                            <p>Accredit and manage events for sentiment tracking</p>
                          </div>
                        </button>
                      </div>
                      <div className="auth-switch-text">
                        Already have an account?{" "}
                        <button className="auth-switch-btn" onClick={() => {
                          setIsSignUp(false);
                          setSignUpType(null);
                        }}>Log In</button>
                      </div>
                    </div>
                  ) : signUpType === "user" ? (
                    /* User Registration Form */
                    <div className="register-form scrollable-form">
                      <button className="btn-back" onClick={() => setSignUpType(null)}>← Back</button>
                      <h2>User Account</h2>
                      <p className="auth-subtitle">Fill in the profile details</p>
                      <form onSubmit={handleUserRegisterSubmit}>
                        
                        {/* Profile Photo Uploader */}
                        <div className="profile-photo-uploader">
                          <div className="photo-preview-wrapper">
                            {profilePhoto ? (
                              <img src={profilePhoto} alt="Profile preview" className="photo-preview" />
                            ) : (
                              <div className="photo-placeholder"></div>
                            )}
                          </div>
                          <div className="photo-upload-controls">
                            <label className="photo-upload-label">
                              Choose Photo
                              <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: "none" }} />
                            </label>
                          </div>
                        </div>

                        <div className="auth-input-group">
                          <label>Full Name</label>
                          <input type="text" placeholder="name" required value={userName} onChange={(e) => setUserName(e.target.value)} />
                        </div>

                        <div className="auth-input-row">
                          <div className="auth-input-group">
                            <label>Birth Date</label>
                            <input type="date" required value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                          </div>
                          <div className="auth-input-group">
                            <label>Contact Number</label>
                            <input type="tel" placeholder="09123456789" required value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
                          </div>
                        </div>

                        <div className="auth-input-group">
                          <label>Email Address</label>
                          <input type="email" placeholder="name@gmail.com" required value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                        </div>

                        <div className="auth-input-group">
                          <label>University / Establishment</label>
                          <select required value={selectedUniversity} onChange={handleUniversityChange}>
                            <option value="">Select Organization</option>
                            {Object.keys(UNIVERSITY_ORGS).map(uni => (
                              <option key={uni} value={uni}>{uni}</option>
                            ))}
                          </select>
                        </div>

                        {selectedUniversity && (
                          <div className="auth-input-group org-checklist-group">
                            <label>Check Affiliated Organizations</label>
                            <p className="helper-text">Select university you belong to in {selectedUniversity}:</p>
                            <div className="org-checklist">
                              {UNIVERSITY_ORGS[selectedUniversity].map(org => (
                                <label key={org} className="org-checkbox-label">
                                  <input
                                    type="checkbox"
                                    checked={selectedOrgs.includes(org)}
                                    onChange={(e) => handleOrgCheckChange(org, e.target.checked)}
                                  />
                                  <span>{org}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}

                        <button type="submit" className="auth-btn-primary">Register User Account</button>
                      </form>
                    </div>
                  ) : (
                    /* Organization Registration Form */
                    <div className="register-form scrollable-form">
                      <button className="btn-back" onClick={() => setSignUpType(null)}>← Back</button>
                      <h2>Register Org</h2>
                      <p className="auth-subtitle">Register your organization for VoxReview tracking</p>
                      <form onSubmit={handleOrgRegisterSubmit}>
                        <div className="auth-input-group">
                          <label>Organization Name</label>
                          <input type="text" placeholder="Organization Name" required value={orgName} onChange={(e) => setOrgName(e.target.value)} />
                        </div>

                        <div className="auth-input-group">
                          <label>University / Establishment</label>
                          <select required value={orgUniversity} onChange={(e) => setOrgUniversity(e.target.value)}>
                            <option value="">Select Affiliated University/Establishment</option>
                            {Object.keys(UNIVERSITY_ORGS).map(uni => (
                              <option key={uni} value={uni}>{uni}</option>
                            ))}
                          </select>
                        </div>

                        <div className="auth-input-group">
                          <label>Brief Description</label>
                          <textarea rows="2" placeholder="Tell us about the organization..." value={orgDesc} onChange={(e) => setOrgDesc(e.target.value)}></textarea>
                        </div>

                        <div className="auth-input-row">
                          <div className="auth-input-group">
                            <label>Representative Name</label>
                            <input type="text" placeholder="Name" required value={repName} onChange={(e) => setRepName(e.target.value)} />
                          </div>
                          <div className="auth-input-group">
                            <label>Contact Email</label>
                            <input type="email" placeholder="name@gmail.com" required value={repEmail} onChange={(e) => setRepEmail(e.target.value)} />
                          </div>
                        </div>

                        <button type="submit" className="auth-btn-primary">Submit Registration</button>
                      </form>
                    </div>
                  )}
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