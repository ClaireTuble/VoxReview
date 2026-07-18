import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dash.css";

// SVG Icons for dashboard interface
const Icons = {
  Dashboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>
  ), 
  Feedback: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  ),
  Reports: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
  ),
  Profile: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  Settings: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
  ),
  Logout: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
  ),
  Bell: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
  ),
  ChevronDown: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
  ),
  Star: ({ filled }) => (
    <span style={{ color: filled ? "#fbbf24" : "#e2e8f0", marginRight: "1px" }}>★</span>
  )
};

// Section hierarchy in user dashboard navigation sidebar
const NAV_SECTIONS = [
  {
    heading: "Overview",
    items: [{ id: "dashboard", label: "Dashboard", icon: Icons.Dashboard }],
  },
{
  heading: "Management",
  items: [
    { id: "feedback-inbox", label: "Inbox", icon: Icons.Feedback }
  ],
},
  {
    heading: "Analytics",
    items: [
      { id: "reports", label: "Reports", icon: Icons.Reports },
    ],
  },
  {
    heading: "Account",
    items: [
      { id: "profile", label: "Profile", icon: Icons.Profile },
      { id: "settings", label: "Settings", icon: Icons.Settings },
    ],
  },
];


// Initial feedbacks with name, product, and sentiment fields
const INITIAL_FEEDBACKS = [
  { id: "f1", name: "Maky Boi", product: "Pants", rating: 5, comment: "The material is great, super quality.", sentiment: "Happy", date: "2 hrs ago", priority: "Neutral", status: "Unread" },
  { id: "f2", name: "Mary Uy", product: "Fan", rating: 3, comment: "It works fine, just okay.", sentiment: "Envy", date: "5 hrs ago", priority: "Neutral", status: "Read" },
  { id: "f3", name: "Mike po ", product: "Tshirt", rating: 1, comment: "Mainit tsaka sobrang nipis ng cotton. Hindi maganda ang design at hindi ko talaga gusto yung quality.", sentiment: "Disgust", date: "1 day ago", priority: "High Priority", status: "Unread" },
  { id: "f4", name: "Cardo", product: "Hoodie", rating: 4, comment: "A bit warm but the fabric fit is nice. Cool color too.", sentiment: "Happy", date: "2 days ago", priority: "Neutral", status: "Read" },
  { id: "f5", name: "Susan roses", product: "Cap", rating: 4, comment: "The cap is okay, but a bit tight on my head. Delivery was slow.", sentiment: "Envy", date: "3 days ago", priority: "Neutral", status: "Unread" }
];


// Initial alert system notifications
const INITIAL_NOTIFICATIONS = [
  { id: "n1", text: "New feedback containing Disgust sentiment received for Tshirt", date: "10m ago", read: false },
  { id: "n2", text: "Cap review flagged as high priority due to Envy score", date: "1h ago", read: false },
  { id: "n3", text: "Pants reached a milestone of 120 reviews", date: "2h ago", read: true },
];

// Helper function to get custom sentiment colors
const getSentimentColor = (sentiment) => {
  switch (sentiment.toLowerCase()) {
    case "happy": return "#22c55e";      // Green
    case "anger": return "#ef4444";    // Red
    case "sad": return "#f97316";     // Orange
    case "disgust": return "#a855f7";  // Purple
    case "envy": return "#eab308";  // Yellow
    case "sarcastic": return "#ec4899"; // Pink
    default: return "#94a3b8";
  }
};

const AdminDashboard = () => {
  const [activeNav, setActiveNav] = useState("dashboard");
  const navigate = useNavigate();

  const handleProfileImageChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    setProfileImage(reader.result);
  };

  reader.readAsDataURL(file);
};
  // Dashboard component data states
  const [feedbacks, setFeedbacks] = useState(INITIAL_FEEDBACKS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Modal display toggles
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

  // Profile fields state
  const [profName, setProfName] = useState("Faye Vega");
  const [profEmail, setProfEmail] = useState("admin@voxreview.com");
  const [profPhone, setProfPhone] = useState("09123456789");
  const [profileImage, setProfileImage] = useState(null);

  // Settings configurations
  const [sensitivity, setSensitivity] = useState(60);

  // Sync feedbacks using periodic polling from localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const latest = localStorage.getItem("vox_feedback_latest");
      if (latest) {
        const item = JSON.parse(latest);
        const exists = feedbacks.some(f => f.comment === item.comment && f.name === item.name);
        if (!exists) {
          const formatted = {
            id: item.id,
            name: item.name,
            product: item.product,
            rating: item.rating,
            comment: item.comment,
            sentiment: item.sentiment || "happy",
            date: "Just now",
            priority: (item.sentiment === "Anger" || item.sentiment === "Disgust") ? "High Priority" : "Neutral",
            status: "Unread"
          };
          setFeedbacks(prev => [formatted, ...prev]);
          
          // Add a new admin notification alert
          const newNotif = {
            id: "n" + Date.now(),
            text: `New review from ${item.name}: ${item.sentiment} sentiment for ${item.product}`,
            date: "Just now",
            read: false
          };
           setNotifications(prev => [newNotif, ...prev]);

          localStorage.removeItem("vox_feedback_latest");
        }
      }
    };

    const interval = setInterval(handleStorageChange, 1500);

    return () => clearInterval(interval);
  }, [feedbacks]);

  // Inbox search and filter controls
  const [inboxPriority, setInboxPriority] = useState("All");
  const [inboxStatus, setInboxStatus] = useState("All");
  const [inboxSentiment, setInboxSentiment] = useState("All");
  const [inboxSearch, setInboxSearch] = useState("");
  const filteredFeedbacks = feedbacks.filter(f => {
    const matchesSearch = f.comment.toLowerCase().includes(inboxSearch.toLowerCase()) || 
                          f.name.toLowerCase().includes(inboxSearch.toLowerCase()) ||
                          f.product.toLowerCase().includes(inboxSearch.toLowerCase());
    
    const matchesPriority = inboxPriority === "All" || f.priority === inboxPriority;
    const matchesStatus = inboxStatus === "All" || f.status === inboxStatus;
    const matchesSentiment = inboxSentiment === "All" || f.sentiment === inboxSentiment;
    
    return matchesSearch && matchesPriority && matchesStatus && matchesSentiment;
  });

  const toggleReadStatus = (id) => {
    setFeedbacks(feedbacks.map(f => f.id === id ? { ...f, status: f.status === "Read" ? "Unread" : "Read" } : f));
  };

  // Calculate cumulative sentiment counts
  const totalReviews = feedbacks.length;
  const happyCount = feedbacks.filter(f => f.sentiment === "Happy").length;
  const angerCount = feedbacks.filter(f => f.sentiment === "Anger").length;
  const sadCount = feedbacks.filter(f => f.sentiment === "Sad").length;
  const disgustCount = feedbacks.filter(f => f.sentiment === "Disgust").length;
  const envyCount = feedbacks.filter(f => f.sentiment === "Envy").length;
  const sarcasticCount = feedbacks.filter(f => f.sentiment === "Sarcastic").length;

  const happyPct = totalReviews > 0 ? Math.round((happyCount / totalReviews) * 100) : 0;
  const angerPct = totalReviews > 0 ? Math.round((angerCount / totalReviews) * 100) : 0;
  const sadPct = totalReviews > 0 ? Math.round((sadCount / totalReviews) * 100) : 0;
  const disgustPct = totalReviews > 0 ? Math.round((disgustCount / totalReviews) * 100) : 0;
  const envyPct = totalReviews > 0 ? Math.round((envyCount / totalReviews) * 100) : 0;
  const sarcasticPct = totalReviews > 0 ? Math.round((sarcasticCount / totalReviews) * 100) : 0;

  // View renderer for navigation tabs
  const renderViewContent = () => {
    switch (activeNav) {
      case "dashboard":
        return (
          <>
            {/* KPI statistics cards */}
            <section className="stat-cards-grid">
              <div className="stat-card">
                <div className="stat-icon stat-icon--purple">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>
                <p className="stat-value">{feedbacks.length}</p>
                <p className="stat-label">Total Reviews</p>
                <p className="stat-trend stat-trend--positive">Active monitoring</p>
              </div>

              <div className="stat-card">
                <div className="stat-icon stat-icon--yellow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <p className="stat-value">
                  {feedbacks.length > 0 ? (feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length).toFixed(1) : "0.0"}/5.0
                </p>
                <p className="stat-label">Avg Satisfaction</p>
                <p className="stat-trend stat-trend--positive">Consistent feedback</p>
              </div>
            </section>

            {/* Sentiment distribution bar for the 6 sentiments */}
            <section className="card">
              <h2 className="card__title">Overall Sentiment Distribution</h2>
              <div className="sentiment-section">
                <div className="sentiment-bar" style={{ display: "flex", height: "16px", borderRadius: "8px", overflow: "hidden", margin: "1.2rem 0" }}>
                  <div className="sentiment-bar__segment" style={{ flex: happyCount || 1, backgroundColor: "#22c55e" }} title={`Happy: ${happyPct}%`} />
                  <div className="sentiment-bar__segment" style={{ flex: angerCount || 1, backgroundColor: "#ef4444" }} title={`Anger: ${angerPct}%`} />
                  <div className="sentiment-bar__segment" style={{ flex: sadCount || 1, backgroundColor: "#f97316" }} title={`Sad: ${sadPct}%`} />
                  <div className="sentiment-bar__segment" style={{ flex: disgustCount || 1, backgroundColor: "#a855f7" }} title={`Disgust: ${disgustPct}%`} />
                  <div className="sentiment-bar__segment" style={{ flex: envyCount || 1, backgroundColor: "#eab308" }} title={`Envy: ${envyPct}%`} />
                  <div className="sentiment-bar__segment" style={{ flex: sarcasticCount || 1, backgroundColor: "#ec4899" }} title={`Sarcastic: ${sarcasticPct}%`} />
                </div>
                <div className="sentiment-legend" style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginTop: "1rem" }}>
                  <span className="legend-item" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <span className="legend-dot" style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#22c55e" }} /> Happy {happyPct}%
                  </span>
                  <span className="legend-item" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <span className="legend-dot" style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ef4444" }} /> Anger {angerPct}%
                  </span>
                  <span className="legend-item" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <span className="legend-dot" style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#f97316" }} /> Sad {sadPct}%
                  </span>
                  <span className="legend-item" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <span className="legend-dot" style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#a855f7" }} /> Disgust {disgustPct}%
                  </span>
                  <span className="legend-item" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <span className="legend-dot" style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#eab308" }} /> Envy {envyPct}%
                  </span>
                  <span className="legend-item" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <span className="legend-dot" style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ec4899" }} /> Sarcastic {sarcasticPct}%
                  </span>
                </div>
              </div>
            </section>

            {/* Bottom Grid for recent activities */}
            <div className="bottom-grid">
              <section className="card">
                <h2 className="card__title">Recent Feedback Reviews</h2>
                <div className="feedback-table-wrapper">
                  <table className="feedback-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Product</th>
                        <th>Sentiment</th>
                        <th>Rating</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedbacks.slice(0, 3).map(({ id, name, product, sentiment, rating, date }) => (  
                        <tr key={id}>
                          <td className="td-name">{name}</td>
                          <td className="td-event">{product}</td>
                          <td>
                            <span 
                              className="badge" 
                              style={{ 
                                textTransform: "uppercase",
                                fontSize: "0.7rem",
                                padding: "2px 8px",
                                borderRadius: "4px",
                                fontWeight: 700,
                                backgroundColor: getSentimentColor(sentiment) + "22",
                                color: getSentimentColor(sentiment),
                                border: `1px solid ${getSentimentColor(sentiment)}44`
                              }}
                            >
                              {sentiment}
                            </span>
                          </td>
                          <td>
                            {[1, 2, 3, 4, 5].map(star => (
                              <Icons.Star key={star} filled={star <= rating} />
                            ))}
                          </td>
                          <td className="td-date">{date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="card quick-actions">
                <h2 className="card__title">Quick Actions</h2>
                <button className="btn btn--secondary" onClick={() => {
                  alert("Exporting sentiment reports to Excel... Please check your downloads folder!");
                }}>
                  Export Report
                </button>
              </section>
            </div>
          </>
        );


      case "feedback-inbox":
        return (
          <div className="card">
            <h2>Inbox</h2>
            <p style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
              Filter feedback dynamically by Priority levels, Read/Unread statuses, and Sentiment types.
            </p>
            
            <div className="inbox-toolbar">
              <div className="search-box">
                <span className="search-icon"><Icons.Search /></span>
                <input 
                  type="text" 
                  placeholder="Search inbox by name, keywords, or product..." 
                  value={inboxSearch}
                  onChange={(e) => setInboxSearch(e.target.value)}
                />
              </div>

              <div className="filter-controls-group">
                <div className="filter-item">
                  <label>Priority</label>
                  <select value={inboxPriority} onChange={(e) => setInboxPriority(e.target.value)}>
                    <option value="All">All</option>
                    <option value="High Priority">High Priority</option>
                    <option value="Low Priority">Low Priority</option>
                    <option value="Neutral">Neutral</option>
                  </select>
                </div>

                <div className="filter-item">
                  <label>Status</label>
                  <select value={inboxStatus} onChange={(e) => setInboxStatus(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Unread">Unread</option>
                    <option value="Read">Read</option>
                  </select>
                </div>

                <div className="filter-item">
                  <label>Sentiment</label>
                  <select value={inboxSentiment} onChange={(e) => setInboxSentiment(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Happy">Happy</option>
                    <option value="Anger">Anger</option>
                    <option value="Sad">Sad</option>
                    <option value="Disgust">Disgust</option>
                    <option value="Envy">Envy</option>
                    <option value="Sarcastic">Sarcastic</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="feedback-cards-list">
              {filteredFeedbacks.length === 0 ? (
                <div className="empty-state">
                  <p>No feedback matching the selected filter parameters found.</p>
                </div>
              ) : (
                filteredFeedbacks.map((f) => (
                  <div key={f.id} className={`inbox-feedback-card ${f.status === "Unread" ? "unread-bg" : ""}`} style={{ borderLeft: f.priority === "High Priority" ? "4px solid #ef4444" : "1px solid #e5e7eb" }}>
                    <div className="card-header-inbox">
                      <div className="info-main">
                        <h4 style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                          {f.name}
                          {f.status === "Unread" && <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4f46e5" }} title="Unread review" />}
                          {f.priority === "High Priority" && <span style={{ fontSize: "0.7rem", padding: "2px 6px", background: "#fef2f2", color: "#ef4444", borderRadius: "4px", fontWeight: "700" }}>HIGH PRIORITY</span>}
                        </h4>
                        <span className="sub-event-info">{f.product} • {f.date}</span>
                      </div>
                      <span 
                        className="badge"
                        style={{
                          textTransform: "uppercase",
                          fontSize: "0.7rem",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontWeight: 700,
                          backgroundColor: getSentimentColor(f.sentiment) + "22",
                          color: getSentimentColor(f.sentiment),
                          border: `1px solid ${getSentimentColor(f.sentiment)}44`
                        }}
                      >
                        {f.sentiment}
                      </span>
                    </div>

                    <div style={{ margin: "0.5rem 0", color: "#fbbf24" }}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <Icons.Star key={star} filled={star <= f.rating} />
                      ))}
                    </div>

                    <p className="feedback-comment">"{f.comment}"</p>

                    <div className="feedback-card-footer">
                      <button className="card-action-btn" onClick={() => toggleReadStatus(f.id)}>
                        Mark as {f.status === "Read" ? "Unread" : "Read"}
                      </button>
                      <button className="card-action-btn card-action-btn-danger" onClick={() => {
                        if (confirm("Are you sure you want to permanently delete this review?")) {
                          setFeedbacks(feedbacks.filter(item => item.id !== f.id));
                        }
                      }}>Delete</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );

  
      case "reports":
        return (
          <div className="card">
            <h2>Sentiment Analysis & Breakdown Reports</h2>
            
            <div className="report-stats-summary" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", margin: "1.5rem 0" }}>
              <div className="stat-sub-card">
                <h5>Highest Sentiment Score</h5>
                <h3>Happy ({happyPct}%)</h3>
                <div className="sentiment-mini-bar" style={{ background: "#22c55e", height: "4px", borderRadius: "2px", width: `${happyPct}%` }}></div>
              </div>
              <div className="stat-sub-card">
                <h5>Total Reviewed Items</h5>
                <h3>{feedbacks.length} Reviews</h3>
                <p>Total reviews: {feedbacks.length}</p>
              </div>
            </div>

            <h3 style={{ margin: "2rem 0 1rem" }}>Product-Specific Sentiment Breakdown</h3>
            

            <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "1.5rem", marginTop: "2rem", display: "flex", gap: "10px" }}>
              <button className="btn btn--primary" onClick={() => alert("PDF report compilation started. Check downloads folder.")}>
                Download PDF Report
              </button>
            </div>
          </div>
        );

      case "profile":
              return (
                <div className="card">
        <h2>Website User Profile</h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "25px 0",
          }}
        >
          <img
            src={
              profileImage ||
              "https://ui-avatars.com/api/?name=Faye+Vega&background=4f46e5&color=fff&size=200"
            }
            alt="Profile"
            style={{
              width: "130px",
              height: "130px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid #4f46e5",
              marginBottom: "15px",
            }}
          />

          <label
            htmlFor="profileUpload"
            className="btn btn--primary"
            style={{ cursor: "pointer" }}
          >
            Upload Profile Picture
          </label>

          <input
            id="profileUpload"
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            style={{ display: "none" }}
          />
        </div>

        <form
          style={{ maxWidth: "600px" }}
          onSubmit={(e) => {
            e.preventDefault();
            alert("Successfully saved profile updates!");
          }}
        >
          <div className="form-item">
            <label>Full Name</label>
            <input
              type="text"
              value={profName}
              onChange={(e) => setProfName(e.target.value)}
            />
          </div>

          <div className="form-item">
            <label>Work Email Address</label>
            <input
              type="email"
              value={profEmail}
              onChange={(e) => setProfEmail(e.target.value)}
            />
          </div>

          <div className="form-item">
            <label>Contact Phone Number</label>
            <input
              type="text"
              value={profPhone}
              onChange={(e) => setProfPhone(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn--primary"
            style={{ marginTop: "1rem" }}
          >
            Update Profile Info
          </button>
        </form>
      </div>        );

      case "settings":
        return (
          <div className="card">
            <h2>Accreditation & System Settings</h2>
            
            <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div className="settings-block">
                <h3>Sentiment Classification Threshold</h3>
                <p style={{ color: "#64748b", fontSize: "0.85rem", margin: "0.25rem 0 1rem" }}>
                  Adjust classification sensitivity mapping for automatic sentiment engine tagging.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <input 
                    type="range" 
                    min="10" 
                    max="90" 
                    value={sensitivity} 
                    onChange={(e) => setSensitivity(parseInt(e.target.value))} 
                    style={{ flex: 1, cursor: "pointer" }}
                  />
                  <span style={{ fontWeight: 700, minWidth: "50px" }}>{sensitivity}%</span>
                </div>
              </div>
              <div>
                <button className="btn btn--primary" onClick={() => alert("System settings saved successfully!")}>
                  Save System Settings
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return <div>View not implemented.</div>;
    }
  };

  const unreadNotifCount = notifications.filter(n => !n.read).length;

  return (
    <div className="app-shell">
      {/* Navigation Sidebar */}
      <aside className="sidebar">
        <div className="sidebar__brand">
          <span className="sidebar__brand-name">VoxReview</span>
        </div>

        <nav className="sidebar__nav">
          {NAV_SECTIONS.map(({ heading, items }) => (
            <div key={heading} className="nav-section">
              <p className="nav-section__heading">{heading}</p>
              {items.map(({ id, label, icon: IconComponent }) => (
                <button
                  key={id}
                  className={`nav-item ${activeNav === id ? "nav-item--active" : ""}`}
                  onClick={() => setActiveNav(id)}
                >
                  <span className="nav-item__icon"><IconComponent /></span>
                  {label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar__user">
                      {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="avatar avatar--sm"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div className="avatar avatar--sm">FV</div>
            )}
          <div className="sidebar__user-info">
            <p className="sidebar__user-name">{profName}</p>
            <p className="sidebar__user-role">Website User</p>
          </div>
          <button className="sidebar__logout" title="Sign out" onClick={() => navigate("/")}>
            <Icons.Logout />
          </button>
        </div>
      </aside>

      {/* Main Container Area */}
      <div className="main-area">
        <header className="topbar">
          <nav className="topbar__breadcrumb" aria-label="breadcrumb">
            <span className="topbar__breadcrumb-parent">Website User</span>
            <span className="topbar__breadcrumb-sep">/</span>
            <span className="topbar__breadcrumb-current" style={{ textTransform: "capitalize" }}>{activeNav.replace("-", " ")}</span>
          </nav>
          <div className="topbar__actions">        
            <button 
              className="topbar__icon-btn topbar__icon-btn--notif" 
              aria-label="Notifications" 
              onClick={() => setShowNotificationsModal(true)}
            >
              <Icons.Bell />
              {unreadNotifCount > 0 && <span className="notif-dot" />}
            </button>
           {profileImage ? (
  <img
    src={profileImage}
    alt="Profile"
    style={{
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      objectFit: "cover",
    }}
  />
) : (
        <div
          className="avatar"
          style={{ width: "32px", height: "32px", fontSize: "0.85rem" }}
        >
          FV
        </div>
      )} <span className="topbar__username" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }} onClick={() => setActiveNav("profile")}>
              Faye <Icons.ChevronDown />
            </span>
          </div>
        </header>

        <main className="dashboard-content">
          {renderViewContent()}
        </main>
      </div>

      {/* Notification alerts modals view */}
      {showNotificationsModal && (
        <div className="custom-modal-overlay" onClick={() => setShowNotificationsModal(false)}>
          <div className="custom-modal-content" onClick={(e) => e.stopPropagation()} style={{ width: "450px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0", paddingBottom: "0.85rem", marginBottom: "1rem" }}>
              <h3 style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px", fontSize: "1.15rem", fontWeight: 800 }}>
                <span style={{ color: "#4f46e5", display: "inline-flex" }}><Icons.Bell /></span>
                updates
              </h3>
              <button 
                onClick={() => setShowNotificationsModal(false)}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1rem", color: "#64748b" }}
              >
                ✕
              </button>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "300px", overflowY: "auto", paddingRight: "4px" }}>
              {notifications.map(n => (
                <div key={n.id} style={{
                  background: n.read ? "#f8fafc" : "#eff6ff",
                  border: n.read ? "1px solid #e2e8f0" : "1px solid #bfdbfe",
                  padding: "0.85rem",
                  borderRadius: "8px",
                  position: "relative"
                }}>
                  {!n.read && <span style={{ position: "absolute", top: "10px", right: "10px", width: "8px", height: "8px", background: "#3b82f6", borderRadius: "50%" }}></span>}
                  <p style={{ fontSize: "0.85rem", fontWeight: n.read ? "500" : "700", color: "#1e293b", margin: 0, paddingRight: "15px" }}>{n.text}</p>
                  <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block", marginTop: "4px" }}>{n.date}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem", borderTop: "1px solid #e2e8f0", paddingTop: "1rem" }}>
              <button className="btn btn--secondary" style={{ padding: "6px 12px", fontSize: "0.8rem" }} onClick={() => {
                setNotifications(notifications.map(n => ({ ...n, read: true })));
              }}>
                Mark all read
              </button>
              <button className="btn btn--primary" style={{ padding: "6px 12px", fontSize: "0.8rem" }} onClick={() => setShowNotificationsModal(false)}>
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;  