import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import bgImage from "../pages/img/landing.jpg";

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Navbar Header */}
      <header className="landing-header">
        <div className="brand">
          <span className="brand-icon">💠</span>
          <span className="brand-name">VoxReview</span>
        </div>
        <div className="header-tag">Log in</div>
      </header>

      {/* Hero Content */}
      <section className="hero-section">
        <p className="hero-subtitle">
          Voice of the Critics. VoxReview uses sentiment analysis to transform 
          student feedback into actionable insights.
        </p>

        <div className="portal-grid">
          {/* Student Review Portal */}
          <Link to="/user" className="portal-card portal-card--student">
            <div className="portal-card-top">
              <div className="portal-icon-wrapper">👤</div>
              <h2 className="portal-title">Student Portal</h2>
              <p className="portal-description">
                Submit event feedback, rate campus activities, and view public sentiment reports. No sign-in required.
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
                Manage university branches, verify registered student organizations, and view platform-wide analytics.
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
        <p>© {new Date().getFullYear()} VoxReview. Mindanao State University. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;