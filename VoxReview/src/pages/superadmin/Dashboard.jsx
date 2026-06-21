import React from "react";
import { useNavigate } from "react-router-dom";
import "./dash.css";

const stats = [
  {
    id: 1,
    icon: "🏢",
    title: "Total Organizations",
    value: "47",
    color: "purple",
  },
  {
    id: 2,
    icon: "📅",
    title: "Total Events",
    value: "27",
    color: "teal",
  },
  {
    id: 3,
    icon: "💬",
    title: "Total Feedback",
    value: "3,439",
    color: "green",
  },
  {
    id: 4,
    icon: "👥",
    title: "Active Users (30d)",
    value: "847",
    color: "yellow",
  },
];

const organizations = [
  {
    name: "Student Council",
    events: 18,
    feedback: 2410,
    sentiment: "4.8/5",
    status: "Active",
  },
  {
    name: "Computer Society",
    events: 15,
    feedback: 1980,
    sentiment: "4.7/5",
    status: "Active",
  },
  {
    name: "Engineering Club",
    events: 12,
    feedback: 1723,
    sentiment: "4.6/5",
    status: "Active",
  },
];

const activities = [
  {
    title: "New organization registered",
    description: "Mindanao State University",
    time: "2h ago",
  },
  {
    title: "Feedback milestone reached",
    description: "2,000 reviews processed",
    time: "4h ago",
  },
  {
    title: "New event created",
    description: "Summer Camp 2026",
    time: "6h ago",
  },
];

const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <h2>VoxReview</h2>
        </div>

        <div className="nav-section">
          <span className="section-title">OVERVIEW</span>
          <button className="nav-item active">Dashboard</button>
        </div>

        <div className="nav-section">
          <span className="section-title">PLATFORM MANAGEMENT</span>
          <button className="nav-item">Organizations</button>
          <button className="nav-item">Event History</button>
        </div>

        <div className="nav-section">
          <span className="section-title">REPORTS</span>
          <button className="nav-item">Organization Reports</button>
        </div>

        <div className="nav-section">
          <span className="section-title">ACCOUNT</span>
          <button className="nav-item">Profile</button>
          <button className="nav-item">Settings</button>
        </div>

        <div className="sidebar-user" style={{ flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <div className="avatar">JD</div>

            <div>
              <h4>Claire Tuble</h4>
              <p>Super Administrator</p>
            </div>
          </div>
          <button 
            onClick={() => navigate("/")}
            style={{
              marginTop: "8px",
              width: "100%",
              padding: "10px",
              background: "#fee2e2",
              color: "#ef4444",
              border: "1px solid #fecaca",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              textAlign: "center",
              transition: "all 0.2s ease"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#ef4444";
              e.currentTarget.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#fee2e2";
              e.currentTarget.style.color = "#ef4444";
            }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">

        {/* Header */}
        <header className="topbar">
          <div className="breadcrumb">
            Super Administrator / <strong>Dashboard</strong>
          </div>

          <div className="topbar-right">
            <span>🔍</span>
            <span>🔔</span>

            <div className="avatar small">CT</div>
            <span>Claire ▼</span>
          </div>
        </header>

        {/* Stats */}
        <section className="stats-grid">
          {stats.map((item) => (
            <div key={item.id} className="stat-card">
              <div className={`stat-icon ${item.color}`}>
                {item.icon}
              </div>

              <div>
                <p>{item.title}</p>
                <h2>{item.value}</h2>
              </div>
            </div>
          ))}
        </section>

        {/* Analytics */}
        <section className="analytics-card">
          <h2>Platform-Wide Sentiment Overview</h2>

          <div className="sentiment-bar">
            <div className="positive"></div>
            <div className="neutral"></div>
            <div className="negative"></div>
          </div>

          <div className="legend">
            <span className="positive-text">● Positive 61%</span>
            <span className="neutral-text">● Neutral 25%</span>
            <span className="negative-text">● Negative 14%</span>
          </div>

          {/* Placeholder Chart */}
          <div className="chart-placeholder">
            Monthly Sentiment Trend Chart
          </div>
        </section>

        {/* Bottom Section */}
        <div className="bottom-grid">

          {/* Organizations */}
          <section className="table-card">
            <div className="card-header">
              <h2>Top Organizations by Activity</h2>
              <button>View All ↗</button>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Org Name</th>
                  <th>Events</th>
                  <th>Feedback</th>
                  <th>Avg Sentiment</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {organizations.map((org) => (
                  <tr key={org.name}>
                    <td>{org.name}</td>
                    <td>{org.events}</td>
                    <td>{org.feedback}</td>
                    <td>{org.sentiment}</td>
                    <td>
                      <span className="status">
                        {org.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Activity Feed */}
          <section className="activity-card">
            <h2>Recent Platform Activity</h2>

            {activities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">🏢</div>

                <div>
                  <h4>{activity.title}</h4>
                  <p>{activity.description}</p>
                  <small>{activity.time}</small>
                </div>
              </div>
            ))}
          </section>

        </div>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;