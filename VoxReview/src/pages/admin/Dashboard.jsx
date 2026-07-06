import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dash.css";

// SVG Icons
const Icons = {
  Dashboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>
  ),
  Events: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  ),
  Feedback: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  ),
  Moderation: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
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
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
  ),
  Trash: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
  ),
  Approve: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  ),
  Reject: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  ),
  ChevronDown: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
  ),
  Star: ({ filled }) => (
    <span style={{ color: filled ? "#fbbf24" : "#e2e8f0", marginRight: "1px" }}>★</span>
  )
};

const NAV_SECTIONS = [
  {
    heading: "Overview",
    items: [{ id: "dashboard", label: "Dashboard", icon: Icons.Dashboard }],
  },
  {
    heading: "Management",
    items: [
      { id: "feedback-inbox", label: "Inbox", icon: Icons.Feedback },
      
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

// eme
const INITIAL_EVENTS = [
  { id: "e1", name: "Foundation Week 2025", organizer: "Student Council", date: "Dec 12-18, 2025", reviews: 120, rating: 4.5, status: "Completed" },
  { id: "e2", name: "CSM Fest", organizer: "Science Club", date: "Oct 10-14, 2025", reviews: 85, rating: 3.8, status: "Completed" },
  { id: "e3", name: "Palaro 2025", organizer: "Sports Office", date: "Sep 5-8, 2025", reviews: 142, rating: 2.1, status: "Completed" },
  { id: "e4", name: "Leadership Summit 2026", organizer: "COSS", date: "Feb 15, 2026", reviews: 0, rating: 0.0, status: "Upcoming" },
  { id: "e5", name: "General Assembly", organizer: "SITE", date: "Jul 10, 2026", reviews: 0, rating: 0.0, status: "Active" }
];

const INITIAL_FEEDBACKS = [
  { id: "f1", studentName: "Maky Boi", event: "Foundation Week 2025", rating: 5, comment: "This event was so much fun! Kudos to the student council for putting together such an active week!", sentiment: "Positive", date: "2 hrs ago", priority: "Neutral", status: "Unread" },
  { id: "f2", studentName: "Mary Uy", event: "CSM Fest", rating: 3, comment: "The seminars were a bit too long, but the booths and activities in the afternoon were decent.", sentiment: "Neutral", date: "5 hrs ago", priority: "Neutral", status: "Read" },
  { id: "f3", studentName: "Anonymous Student", event: "Palaro 2025", rating: 1, comment: "Too hot and very disorganized. The games were delayed by hours. Not happy at all.", sentiment: "Negative", date: "1 day ago", priority: "High Priority", status: "Unread" },
  { id: "f4", studentName: "Cardo", event: "Foundation Week 2025", rating: 4, comment: "Loved the food trucks and overall vibe. Concert was amazing!", sentiment: "Positive", date: "2 days ago", priority: "Neutral", status: "Read" },
  { id: "f5", studentName: "Susan roses", event: "CSM Fest", rating: 4, comment: "Great booths, had a lot of interactive games. Well done organizers.", sentiment: "Positive", date: "3 days ago", priority: "Neutral", status: "Unread" }
];

const INITIAL_MODERATION = [
  { id: "m1", studentName: "Aldrin Ramos", event: "Palaro 2025", rating: 2, comment: "The sports schedule kept changing without notice. Frustrating.", sentiment: "Negative", date: "10 mins ago" },
  { id: "m2", studentName: "Klaire Cruz", event: "Foundation Week 2025", rating: 5, comment: "Best week of the year! WMSU represent!", sentiment: "Positive", date: "30 mins ago" },
  { id: "m3", studentName: "Joseph Tan", event: "General Assembly", rating: 3, comment: "Okay meeting, but audio was terrible at the gym.", sentiment: "Neutral", date: "1 hr ago" }
];

const INITIAL_NOTIFICATIONS = [
  { id: "n1", text: "New negative review received for Palaro 2025", date: "10m ago", read: false },
  { id: "n2", text: "General Assembly feedback flagged as high priority", date: "1h ago", read: false },
  { id: "n3", text: "CSM Fest reached a milestone of 80 reviews", date: "2h ago", read: true },
];

const AdminDashboard = () => {
  const [activeNav, setActiveNav] = useState("dashboard");
  const navigate = useNavigate();

  // Shared application 
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [feedbacks, setFeedbacks] = useState(INITIAL_FEEDBACKS);
  const [modQueue, setModQueue] = useState(INITIAL_MODERATION);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Modal 
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

  // Profile fields 
  const [profName, setProfName] = useState("Faye Vega");
  const [profEmail, setProfEmail] = useState("admin@voxreview.com");
  const [profOrg, setProfOrg] = useState("Computer Science Society");
  const [profPhone, setProfPhone] = useState("09123456789");

  // Settings states
  const [sensitivity, setSensitivity] = useState(60);
  const [notifNew, setNotifNew] = useState(true);
  const [notifDaily, setNotifDaily] = useState(false);
  const [anonymousAllowed, setAnonymousAllowed] = useState(true);
  const [apiKey, setApiKey] = useState("vox_live_8f3a9d2c1e6b5a4d");

  // Load any latest feedback submitted from sidebar (extension)
  useEffect(() => {
    const handleStorageChange = () => {
      const latest = localStorage.getItem("vox_feedback_latest");
      if (latest) {
        const item = JSON.parse(latest);
        // Avoid duplicate entry if reloading
        const exists = feedbacks.some(f => f.comment === item.comment && f.studentName === item.studentName);
        if (!exists) {
          const formatted = {
            id: item.id,
            studentName: item.studentName,
            event: item.event,
            rating: item.rating,
            comment: item.comment,
            sentiment: item.sentiment,
            date: "Just now",
            priority: item.sentiment === "Negative" ? "High Priority" : "Neutral",
            status: "Unread"
          };
          setFeedbacks(prev => [formatted, ...prev]);
          
          // Generate notification
          const newNotif = {
            id: "n" + Date.now(),
            text: `New review submitted: ${item.sentiment} sentiment for ${item.event}`,
            date: "Just now",
            read: false
          };
          setNotifications(prev => [newNotif, ...prev]);

          // Update event reviews stats
          setEvents(prev => prev.map(ev => {
            if (ev.name === item.event) {
              const newReviews = ev.reviews + 1;
              const newRating = parseFloat(((ev.rating * ev.reviews + item.rating) / newReviews).toFixed(1));
              return { ...ev, reviews: newReviews, rating: newRating };
            }
            return ev;
          }));
          localStorage.removeItem("vox_feedback_latest");
        }
      }
    };

    // Check periodically since local storage don't fire on the same window
    const interval = setInterval(handleStorageChange, 1500);
    return () => clearInterval(interval);
  }, [feedbacks]);

  // Handle Event Creation
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEventName, setNewEventName] = useState("");
  const [newEventOrg, setNewEventOrg] = useState("Computer Science Society");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventStatus, setNewEventStatus] = useState("Active");

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!newEventName.trim()) return;

    const newEv = {
      id: "e" + (events.length + 1),
      name: newEventName.trim(),
      organizer: newEventOrg,
      date: newEventDate || "TBA",
      reviews: 0,
      rating: 0.0,
      status: newEventStatus
    };

    setEvents([...events, newEv]);
    setShowEventModal(false);
    setNewEventName("");
    setNewEventDate("");
    alert("New campus event registered successfully!");
  };

  // Handle Moderation actions
  const handleApproveFeedback = (id) => {
    const item = modQueue.find(m => m.id === id);
    if (!item) return;

    // Remove from moderation
    setModQueue(modQueue.filter(m => m.id !== id));

    // Add to approved feedbacks
    const approvedItem = {
      ...item,
      id: "f" + (feedbacks.length + 1),
      date: "Just now",
      priority: item.sentiment === "Negative" ? "High Priority" : "Neutral",
      status: "Unread"
    };
    setFeedbacks([approvedItem, ...feedbacks]);

    // Update event stats
    setEvents(events.map(ev => {
      if (ev.name === item.event) {
        const newReviews = ev.reviews + 1;
        const newRating = parseFloat(((ev.rating * ev.reviews + item.rating) / newReviews).toFixed(1));
        return { ...ev, reviews: newReviews, rating: newRating };
      }
      return ev;
    }));

    alert("Feedback review approved and published to the public portal feed.");
  };

  const handleRejectFeedback = (id) => {
    setModQueue(modQueue.filter(m => m.id !== id));
    alert("Feedback review rejected and archived.");
  };

  // Feedback Inbox Filter and Search
  const [inboxPriority, setInboxPriority] = useState("All"); // All, High Priority, Neutral
  const [inboxStatus, setInboxStatus] = useState("All"); // All, Read, Unread
  const [inboxSentiment, setInboxSentiment] = useState("All"); // All, Positive, Neutral, Negative
  const [inboxSearch, setInboxSearch] = useState("");

  const filteredFeedbacks = feedbacks.filter(f => {
    const matchesSearch = f.comment.toLowerCase().includes(inboxSearch.toLowerCase()) || 
                          f.studentName.toLowerCase().includes(inboxSearch.toLowerCase()) ||
                          f.event.toLowerCase().includes(inboxSearch.toLowerCase());
    
    const matchesPriority = inboxPriority === "All" || f.priority === inboxPriority;
    const matchesStatus = inboxStatus === "All" || f.status === inboxStatus;
    const matchesSentiment = inboxSentiment === "All" || f.sentiment === inboxSentiment;
    
    return matchesSearch && matchesPriority && matchesStatus && matchesSentiment;
  });

  const toggleReadStatus = (id) => {
    setFeedbacks(feedbacks.map(f => f.id === id ? { ...f, status: f.status === "Read" ? "Unread" : "Read" } : f));
  };

  const togglePriority = (id) => {
    setFeedbacks(feedbacks.map(f => f.id === id ? { ...f, priority: f.priority === "High Priority" ? "Neutral" : "High Priority" } : f));
  };

  // Calculate Sentiment statistics
  const totalReviews = feedbacks.length;
  const positiveReviews = feedbacks.filter(f => f.sentiment === "Positive").length;
  const neutralReviews = feedbacks.filter(f => f.sentiment === "Neutral").length;
  const negativeReviews = feedbacks.filter(f => f.sentiment === "Negative").length;

  const posPct = totalReviews > 0 ? Math.round((positiveReviews / totalReviews) * 100) : 0;
  const neuPct = totalReviews > 0 ? Math.round((neutralReviews / totalReviews) * 100) : 0;
  const negPct = totalReviews > 0 ? Math.round((negativeReviews / totalReviews) * 100) : 0;

  // View switch renderer
  const renderViewContent = () => {
    switch (activeNav) {
      case "dashboard":
        return (
          <>
            {/* KPI Cards */}
            <section className="stat-cards-grid">
              <div className="stat-card">
                <div className="stat-icon stat-icon--purple">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>
                <p className="stat-value">{feedbacks.length}</p>
                <p className="stat-label">Total Feedback</p>
                <p className="stat-trend stat-trend--positive">+{feedbacks.filter(f => f.date === "Just now" || f.date.includes("hr")).length} new today</p>
              </div>

              <div className="stat-card">
                <div className="stat-icon stat-icon--yellow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <p className="stat-value">
                  {feedbacks.length > 0 ? (feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length).toFixed(1) : "0.0"}/5.0
                </p>
                <p className="stat-label">Avg Satisfaction</p>
                <p className="stat-trend stat-trend--positive">Stable rating</p>
              </div>


            </section>

            {/* Sentiment */}
            <section className="card">
              <h2 className="card__title">Overall Sentiment Distribution</h2>
              <div className="sentiment-section">
                <div className="sentiment-bar">
                  <div className="sentiment-bar__segment sentiment-bar__segment--positive" style={{ flex: posPct || 1 }} />
                  <div className="sentiment-bar__segment sentiment-bar__segment--neutral"  style={{ flex: neuPct || 1 }} />
                  <div className="sentiment-bar__segment sentiment-bar__segment--negative" style={{ flex: negPct || 1 }} />
                </div>
                <div className="sentiment-legend">
                  <span className="legend-item">
                    <span className="legend-dot legend-dot--positive" /> Positive {posPct}%
                  </span>
                  <span className="legend-item">
                    <span className="legend-dot legend-dot--neutral" /> Neutral {neuPct}%
                  </span>
                  <span className="legend-item">
                    <span className="legend-dot legend-dot--negative" /> Negative {negPct}%
                  </span>
                </div>
              </div>
            </section>

            {/* Bottom Row */}
            <div className="bottom-grid">
              <section className="card">
                <h2 className="card__title">Recent Feedback</h2>
                <div className="feedback-table-wrapper">
                  <table className="feedback-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Website</th>
                        <th>Sentiment</th>
                        <th>Rating</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedbacks.slice(0, 3).map(({ id, studentName, event, sentiment, rating, date }) => (
                        <tr key={id}>
                          <td className="td-name">{studentName}</td>
                          <td className="td-event">{event}</td>
                          <td>
                            <span className={`badge badge--${sentiment.toLowerCase()}`}>{sentiment}</span>
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
                  alert("Preparing export files... Excel template report download started!");
                }}>
                  Export Report
                </button>
              </section>
            </div>
          </>
        );

      case "events":
        return (
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2>Events Management</h2>
              <button className="btn btn--primary" style={{ padding: "10px 18px", display: "flex", alignItems: "center", gap: "6px" }} onClick={() => setShowEventModal(true)}>
                <Icons.Plus /> New Event
              </button>
            </div>

            {/* Create Event */}
            {showEventModal && (
              <div className="custom-modal-overlay">
                <div className="custom-modal-content">
                  <h3>Register New Event</h3>
                  <form onSubmit={handleCreateEvent} style={{ marginTop: "1rem" }}>
                    <div className="form-item">
                      <label>Event Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. WMSU Palaro 2026" 
                        value={newEventName} 
                        onChange={(e) => setNewEventName(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="form-item">
                      <label>Organizing Department/Society</label>
                      <input 
                        type="text" 
                        value={newEventOrg} 
                        onChange={(e) => setNewEventOrg(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="form-item-row">
                      <div className="form-item" style={{ flex: 1 }}>
                        <label>Schedule / Date</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Oct 10-14, 2025" 
                          value={newEventDate} 
                          onChange={(e) => setNewEventDate(e.target.value)} 
                        />
                      </div>
                      <div className="form-item" style={{ flex: 1 }}>
                        <label>Initial Status</label>
                        <select value={newEventStatus} onChange={(e) => setNewEventStatus(e.target.value)}>
                          <option value="Active">Active</option>
                          <option value="Upcoming">Upcoming</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "10px", marginTop: "1.5rem", justifyContent: "flex-end" }}>
                      <button type="button" className="btn btn--secondary" style={{ padding: "8px 16px" }} onClick={() => setShowEventModal(false)}>Cancel</button>
                      <button type="submit" className="btn btn--primary" style={{ padding: "8px 16px" }}>Register Event</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="feedback-table-wrapper">
              <table className="feedback-table">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Organizer</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Reviews</th>
                    <th>Avg Score</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((ev) => (
                    <tr key={ev.id}>
                      <td style={{ fontWeight: 600 }}>{ev.name}</td>
                      <td>{ev.organizer}</td>
                      <td>{ev.date}</td>
                      <td>
                        <span className={`badge-status status-${ev.status.toLowerCase()}`}>
                          {ev.status}
                        </span>
                      </td>
                      <td>{ev.reviews} reviews</td>
                      <td style={{ fontWeight: 600, color: ev.rating >= 4 ? "#166534" : ev.rating >= 3 ? "#92400e" : "#991b1b" }}>
                        {ev.rating > 0 ? `${ev.rating} ★` : "No reviews"}
                      </td>
                      <td>
                        <button className="icon-btn-danger" title="Delete Event" onClick={() => {
                          if (confirm(`Are you sure you want to delete ${ev.name}?`)) {
                            setEvents(events.filter(e => e.id !== ev.id));
                          }
                        }}>
                          <Icons.Trash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "feedback-inbox":
        return (
          <div className="card">
            <h2>Personal Inbox</h2>
            <p style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
              Filter feedback dynamically by Priority levels, Read/Unread statuses, and Sentiment types.
            </p>
            
            {/* Search and Filters */}
            <div className="inbox-toolbar">
              <div className="search-box">
                <span className="search-icon"><Icons.Search /></span>
                <input 
                  type="text" 
                  placeholder="Search inbox by student name, keywords, or event..." 
                  value={inboxSearch}
                  onChange={(e) => setInboxSearch(e.target.value)}
                />
              </div>

              {/* Filters */}
<div className="filter-controls-group">

  <div className="filter-item">
    <label>Priority</label>
    <select
      value={inboxPriority}
      onChange={(e) => setInboxPriority(e.target.value)}
    >
      <option value="All">All</option>
      <option value="High Priority">High Priority</option>
      <option value="Neutral">Neutral</option>
    </select>
  </div>

  <div className="filter-item">
    <label>Status</label>
    <select
      value={inboxStatus}
      onChange={(e) => setInboxStatus(e.target.value)}
    >
      <option value="All">All</option>
      <option value="Unread">Unread</option>
      <option value="Read">Read</option>
    </select>
  </div>

  <div className="filter-item">
    <label>Sentiment</label>
    <select
      value={inboxSentiment}
      onChange={(e) => setInboxSentiment(e.target.value)}
    >
      <option value="All">All</option>
      <option value="Positive">Positive</option>
      <option value="Neutral">Neutral</option>
      <option value="Negative">Negative</option>
    </select>
  </div>
</div>

            </div>
            <div className="feedback-cards-list">
              {filteredFeedbacks.length === 0 ? (
                <div className="empty-state">
                  <p>No feedback matching the selected priority, status, and sentiment filters found.</p>
                </div>
              ) : (
                filteredFeedbacks.map((f) => (
                  <div key={f.id} className={`inbox-feedback-card ${f.status === "Unread" ? "unread-bg" : ""}`} style={{ borderLeft: f.priority === "High Priority" ? "4px solid #ef4444" : "1px solid #e5e7eb" }}>
                    <div className="card-header-inbox">
                      <div className="info-main">
                        <h4 style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                          {f.studentName}
                          {f.status === "Unread" && <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4f46e5" }} title="Unread review" />}
                          {f.priority === "High Priority" && <span style={{ fontSize: "0.7rem", padding: "2px 6px", background: "#fef2f2", color: "#ef4444", borderRadius: "4px", fontWeight: "700" }}>HIGH PRIORITY</span>}
                        </h4>
                        <span className="sub-event-info">{f.event} • {f.date}</span>
                      </div>
                      <span className={`badge badge--${f.sentiment.toLowerCase()}`}>{f.sentiment}</span>
                    </div>

                    <div style={{ margin: "0.5rem 0", color: "#fbbf24" }}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <Icons.Star key={star} filled={star <= f.rating} />
                      ))}
                    </div>

                    <p className="feedback-comment">"{f.comment}"</p>

                    <div className="feedback-card-footer">
                      {/* Filter test helpers toggles */}
                      <button className="card-action-btn" onClick={() => toggleReadStatus(f.id)}>
                        Mark as {f.status === "Read" ? "Unread" : "Read"}
                      </button>
                      
                      <button className="card-action-btn" onClick={() => togglePriority(f.id)}>
                        Make {f.priority === "High Priority" ? "Neutral Priority" : "High Priority"}
                      </button>

                      <button className="card-action-btn card-action-btn-danger" onClick={() => {
                        if (confirm("Delete this review permanently?")) {
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

      case "moderation-queue":
        return (
          <div className="card">
            <h2>Moderation Approval Queue</h2>
            <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              User reviews held for moderation review. Approving them will import and publish them on the live metrics.
            </p>

            {modQueue.length === 0 ? (
              <div className="empty-queue-banner">
                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#22c55e" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 12.5l3 3 5-6"/></svg>
                <h3>All Clear!</h3>
                <p>There are no feedback submissions waiting in the moderation approval queue.</p>
              </div>
            ) : (
              <div className="feedback-table-wrapper">
                <table className="feedback-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Event</th>
                      <th>Comment</th>
                      <th>Detected Sentiment</th>
                      <th>Rating</th>
                      <th style={{ textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modQueue.map((item) => (
                      <tr key={item.id}>
                        <td style={{ fontWeight: 600 }}>{item.studentName}</td>
                        <td>{item.event}</td>
                        <td style={{ maxWidth: "250px", wordBreak: "break-word" }}>"{item.comment}"</td>
                        <td>
                          <span className={`badge badge--${item.sentiment.toLowerCase()}`}>{item.sentiment}</span>
                        </td>
                        <td>
                          {[1,2,3,4,5].map(star => (
                            <Icons.Star key={star} filled={star <= item.rating} />
                          ))}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                            <button className="action-btn-success" title="Approve & Publish" onClick={() => handleApproveFeedback(item.id)}>
                              <Icons.Approve /> Approve
                            </button>
                            <button className="action-btn-danger" title="Reject & Delete" onClick={() => handleRejectFeedback(item.id)}>
                              <Icons.Reject /> Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );

      case "reports":
        return (
          <div className="card">
            <h2>Sentiment Analysis Reports</h2>
            
            <div className="report-stats-summary" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", margin: "1.5rem 0" }}>
              <div className="stat-sub-card">
                <h5>Overall Sentiment Score</h5>
                <h3>82% Positive</h3>
                <div className="sentiment-mini-bar" style={{ background: "#22c55e", height: "4px", borderRadius: "2px", width: "82%" }}></div>
              </div>
              <div className="stat-sub-card">
                <h5>Evaluation Volume</h5>
                <h3>{feedbacks.length} Submissions</h3>
                <p>Participation rate: 87%</p>
              </div>
              <div className="stat-sub-card">
                <h5>Highest Rated Event</h5>
                <h3>Foundation Week (4.5 ★)</h3>
                <p>Total reviews: 120</p>
              </div>
            </div>

            <h3 style={{ margin: "2rem 0 1rem" }}>Sentiment Split by Registered Event</h3>
            
            <div className="event-sentiment-charts">
              {events.filter(e => e.reviews > 0).map(ev => {
                // Mock splits
                let pos = 70;
                let neu = 20;
                let neg = 10;
                if (ev.rating >= 4.5) { pos = 85; neu = 10; neg = 5; }
                else if (ev.rating < 3.0) { pos = 25; neu = 30; neg = 45; }

                return (
                  <div key={ev.id} className="event-chart-row" style={{ marginBottom: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem", fontSize: "0.9rem" }}>
                      <span style={{ fontWeight: 700 }}>{ev.name} ({ev.reviews} reviews)</span>
                      <span style={{ color: "#64748b" }}>Rating: {ev.rating} ★</span>
                    </div>
                    <div className="sentiment-bar" style={{ height: "18px" }}>
                      <div className="sentiment-bar__segment sentiment-bar__segment--positive" style={{ flex: pos }} title={`Positive: ${pos}%`} />
                      <div className="sentiment-bar__segment sentiment-bar__segment--neutral"  style={{ flex: neu }} title={`Neutral: ${neu}%`} />
                      <div className="sentiment-bar__segment sentiment-bar__segment--negative" style={{ flex: neg }} title={`Negative: ${neg}%`} />
                    </div>
                    <div style={{ display: "flex", gap: "10px", fontSize: "0.75rem", color: "#64748b", marginTop: "0.2rem" }}>
                      <span>Positive {pos}%</span>
                      <span>Neutral {neu}%</span>
                      <span>Negative {neg}%</span>
                    </div>
                  </div>
                );
              })}
            </div>

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
            <h2>Organization Administrator Profile</h2>
            
            <form style={{ maxWidth: "600px", marginTop: "1.5rem" }} onSubmit={(e) => {
              e.preventDefault();
              alert("Admin Profile configuration saved successfully!");
            }}>
              <div className="form-item">
                <label>Full Name</label>
                <input type="text" value={profName} onChange={(e) => setProfName(e.target.value)} required />
              </div>
              <div className="form-item">
                <label>Work Email Address</label>
                <input type="email" value={profEmail} onChange={(e) => setProfEmail(e.target.value)} required />
              </div>
              <div className="form-item">
                <label>Contact Phone Number</label>
                <input type="text" value={profPhone} onChange={(e) => setProfPhone(e.target.value)} required />
              </div>
              <div className="form-item">
                <label>Associated University Organization</label>
                <input type="text" value={profOrg} disabled style={{ background: "#f1f5f9", cursor: "not-allowed" }} />
                <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Accredited organization. Contact Super Administrator to change affiliated group.</span>
              </div>
              
              <button type="submit" className="btn btn--primary" style={{ marginTop: "1rem" }}>
                Update Profile Info
              </button>
            </form>
          </div>
        );

      case "settings":
        return (
          <div className="card">
            <h2>Accreditation & System Settings</h2>
            
            <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div className="settings-block">
                <h3>Sentiment Classification Threshold</h3>
                <p style={{ color: "#64748b", fontSize: "0.85rem", margin: "0.25rem 0 1rem" }}>
                  Adjust classification sensitivity score mapping for reviews positive/negative filters.
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

              <div className="settings-block">
                <h3>System Configurations</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "1rem" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "0.95rem" }}>
                    <input type="checkbox" checked={notifNew} onChange={(e) => setNotifNew(e.target.checked)} />
                    Email Notification when new negative feedback is received
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "0.95rem" }}>
                    <input type="checkbox" checked={notifDaily} onChange={(e) => setNotifDaily(e.target.checked)} />
                    Daily digests report email
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "0.95rem" }}>
                    <input type="checkbox" checked={anonymousAllowed} onChange={(e) => setAnonymousAllowed(e.target.checked)} />
                    Allow anonymous feedback submissions on the widget sidebar
                  </label>
                </div>
              </div>

              <div>
                <button className="btn btn--primary" onClick={() => alert("Configurations saved successfully!")}>
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
      {/* Sidebar */}
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
          <div className="avatar avatar--sm">FV</div>
          <div className="sidebar__user-info">
            <p className="sidebar__user-name">{profName}</p>
            <p className="sidebar__user-role">Organization Admin</p>
          </div>
          <button className="sidebar__logout" title="Sign out" onClick={() => navigate("/")}>
            <Icons.Logout />
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="main-area">
        <header className="topbar">
          <nav className="topbar__breadcrumb" aria-label="breadcrumb">
            <span className="topbar__breadcrumb-parent">Organization Admin</span>
            <span className="topbar__breadcrumb-sep">/</span>
            <span className="topbar__breadcrumb-current" style={{ textTransform: "capitalize" }}>{activeNav.replace("-", " ")}</span>
          </nav>
          <div className="topbar__actions">        
            {/* Clickable Bell to open Modal Design notifications */}
            <button 
              className="topbar__icon-btn topbar__icon-btn--notif" 
              aria-label="Notifications" 
              onClick={() => setShowNotificationsModal(true)}
            >
              <Icons.Bell />
              {unreadNotifCount > 0 && <span className="notif-dot" />}
            </button>

            <div className="avatar" style={{ width: "32px", height: "32px", fontSize: "0.85rem" }}>FV</div>
            <span className="topbar__username" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }} onClick={() => setActiveNav("profile")}>
              Faye <Icons.ChevronDown />
            </span>
          </div>
        </header>

        <main className="dashboard-content">
          {renderViewContent()}
        </main>
      </div>

      {/* NOTIFICATIONS MODAL DESIGN */}
      {showNotificationsModal && (
        <div className="custom-modal-overlay" onClick={() => setShowNotificationsModal(false)}>
          <div className="custom-modal-content" onClick={(e) => e.stopPropagation()} style={{ width: "450px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0", paddingBottom: "0.85rem", marginBottom: "1rem" }}>
              <h3 style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px", fontSize: "1.15rem", fontWeight: 800 }}>
                <span style={{ color: "#4f46e5", display: "inline-flex" }}><Icons.Bell /></span>
                Admin Alerts Queue
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