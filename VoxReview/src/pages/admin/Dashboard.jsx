import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dash.css";

// example lng

const STAT_CARDS = [
  {
    id: "total-feedback",
    icon: "💬",
    iconTheme: "purple",
    value: "347",
    label: "Total Feedback",
    trendType: "positive",
  },
  {
    id: "avg-satisfaction",
    icon: "⭐",
    iconTheme: "yellow",
    value: "4.2/5.0",
    label: "Avg Satisfaction",
    trendType: "positive",
  },
  {
    id: "pending-moderation",
    icon: "🛡️",
    iconTheme: "orange",
    value: "8",
    label: "Pending Moderation",
    trend: "Needs attention",
    trendType: "warning",
  },
  {
    id: "active-events",
    icon: "📅",
    iconTheme: "teal",
    value: "3",
    label: "Active Events",
    trend: "Ongoing now",
    trendType: "neutral",
  },
];

const NAV_SECTIONS = [
  {
    heading: "Overview",
    items: [{ id: "dashboard", label: "Dashboard", icon: "⊞" }],
  },
  {
    heading: "Management",
    items: [
      { id: "events", label: "Events", icon: "📅" },
      { id: "feedback-inbox", label: "Feedback Inbox", icon: "💬" },
      { id: "moderation-queue", label: "Moderation Queue", icon: "🛡️" },
    ],
  },
  {
    heading: "Analytics",
    items: [
      { id: "reports", label: "Reports", icon: "📊" },
    ],
  },
  {
    heading: "Account",
    items: [
      { id: "profile", label: "Profile", icon: "👤" },
      { id: "settings", label: "Settings", icon: "⚙️" },
    ],
  },
];

const RECENT_FEEDBACK = [
  {
    id: "1",
    studentName: "Maky Boi",
    event: "Foundation Week 2025",
    sentiment: "Positive",
    date: "2 hrs ago",
  },
  {
    id: "2",
    studentName: "Mary Uy",
    event: "CSM Fest",
    sentiment: "Neutral",
    date: "5 hrs ago",
  },
  {
    id: "3",
    studentName: "Anonymous",
    event: "Palaro 2025",
    sentiment: "Negative",
    date: "1 day ago",
  },
];

// Sub-components 

const StatCard = ({ icon, iconTheme, value, label, trend, trendType }) => (
  <div className="stat-card">
    <div className={`stat-icon stat-icon--${iconTheme}`}>{icon}</div>
    <p className="stat-value">{value}</p>
    <p className="stat-label">{label}</p>
    <p className={`stat-trend stat-trend--${trendType}`}>{trend}</p>
  </div>
);

const SentimentBadge = ({ sentiment }) => (
  <span className={`badge badge--${sentiment.toLowerCase()}`}>{sentiment}</span>
);

const SentimentBar = () => (
  <div className="sentiment-section">
    <div className="sentiment-bar">
      <div className="sentiment-bar__segment sentiment-bar__segment--positive" style={{ flex: 64 }} />
      <div className="sentiment-bar__segment sentiment-bar__segment--neutral"  style={{ flex: 22 }} />
      <div className="sentiment-bar__segment sentiment-bar__segment--negative" style={{ flex: 14 }} />
    </div>
    <div className="sentiment-legend">
      <span className="legend-item">
        <span className="legend-dot legend-dot--positive" /> Positive 64%
      </span>
      <span className="legend-item">
        <span className="legend-dot legend-dot--neutral" /> Neutral 22%
      </span>
      <span className="legend-item">
        <span className="legend-dot legend-dot--negative" /> Negative 14%
      </span>
    </div>
  </div>
);

const FeedbackTable = () => (
  <div className="feedback-table-wrapper">
    <table className="feedback-table">
      <thead>
        <tr>
          <th>Student Name</th>
          <th>Event</th>
          <th>Sentiment</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {RECENT_FEEDBACK.map(({ id, studentName, event, sentiment, date }) => (
          <tr key={id}>
            <td className="td-name">{studentName}</td>
            <td className="td-event">{event}</td>
            <td><SentimentBadge sentiment={sentiment} /></td>
            <td className="td-date">{date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Sidebar = ({ activeNav, onNavChange, onLogout }) => (
  <aside className="sidebar">
    <div className="sidebar__brand">
      <span className="sidebar__brand-icon">💠</span>
      <span className="sidebar__brand-name">VoxReview</span>
    </div>

    <nav className="sidebar__nav">
      {NAV_SECTIONS.map(({ heading, items }) => (
        <div key={heading} className="nav-section">
          <p className="nav-section__heading">{heading}</p>
          {items.map(({ id, label, icon }) => (
            <button
              key={id}
              className={`nav-item ${activeNav === id ? "nav-item--active" : ""}`}
              onClick={() => onNavChange(id)}
            >
              <span className="nav-item__icon">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      ))}
    </nav>

    <div className="sidebar__user">
      <div className="avatar avatar--sm">FV</div>
      <div className="sidebar__user-info">
        <p className="sidebar__user-name">Faye Vega</p>
        <p className="sidebar__user-role">Organization Admin</p>
      </div>
      <button className="sidebar__logout" title="Sign out" onClick={onLogout}>↪</button>
    </div>
  </aside>
);

const TopBar = () => (
  <header className="topbar">
    <nav className="topbar__breadcrumb" aria-label="breadcrumb">
      <span className="topbar__breadcrumb-parent">Organization Admin</span>
      <span className="topbar__breadcrumb-sep">/</span>
      <span className="topbar__breadcrumb-current">Dashboard</span>
    </nav>
    <div className="topbar__actions">
      <button className="topbar__icon-btn" aria-label="Search">🔍</button>
      <button className="topbar__icon-btn topbar__icon-btn--notif" aria-label="Notifications">
        🔔
        <span className="notif-dot" aria-hidden="true" />
      </button>
      <div className="avatar">FV</div>
      <span className="topbar__username">Faye ▾</span>
    </div>
  </header>
);
// main
const AdminDashboard = () => {
  const [activeNav, setActiveNav] = useState("dashboard");
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} onLogout={() => navigate("/")} />

      <div className="main-area">
        <TopBar />

        <main className="dashboard-content">
          {/* KPI Cards */}
          <section className="stat-cards-grid" aria-label="Key metrics">
            {STAT_CARDS.map((card) => (
              <StatCard key={card.id} {...card} />
            ))}
          </section>

          {/* Sentiment This Month */}
          <section className="card" aria-label="Overall sentiment this month">
            <h2 className="card__title">Overall Sentiment This Month</h2>
            <SentimentBar />
          </section>

          {/* Bottom row feedback and quick actions */}
          <div className="bottom-grid">
            <section className="card" aria-label="Recent feedback">
              <h2 className="card__title">Recent Feedback</h2>
              <FeedbackTable />
            </section>

            <section className="card quick-actions" aria-label="Quick actions">
              <h2 className="card__title">Quick Actions</h2>
              <button className="btn btn--primary">📅 &nbsp;Create New Event</button>
              <button className="btn btn--secondary">Export Report</button>
              <button className="btn btn--outline">
                🛡️ &nbsp;View Moderation Queue
                <span className="queue-badge">8</span>
              </button>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;