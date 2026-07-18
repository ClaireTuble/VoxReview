import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dash.css";

// SVG Icons for SuperAdmin dashboard
const Icons = {
  Dashboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>
  ),
  Orgs: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  ProductHistory: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
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
  Bell: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
  ),
  ChevronDown: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
  ),
  Approve: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
  ),
  Trash: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
  ),
  UserManagement: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  SystemMonitoring: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
  )
};

// Initial state data for dashboard statistics
const INITIAL_STATS = [
  { id: 1, title: "Total Users", value: "847", color: "purple", svgIcon: Icons.Orgs },
  { id: 2, title: "Total Products", value: "27", color: "teal", svgIcon: Icons.ProductHistory },
  { id: 3, title: "Total Reviews", value: "3,439", color: "green", svgIcon: Icons.Reports },
  { id: 4, title: "Active Users (30d)", value: "847", color: "yellow", svgIcon: Icons.Profile },
];

// Registered users initialized from organization list
const INITIAL_USERS = [
  { id: "u1", name: "Maky Boi", email: "maky@example.com", domain: "maky.com", products: 18, feedback: 2410, rating: "4.8/5", status: "Active", date: "Jan 12, 2025" },
  { id: "u2", name: "Mary Uy", email: "mary@example.com", domain: "maryuy.com", products: 15, feedback: 1980, rating: "4.7/5", status: "Active", date: "Jan 15, 2025" },
  { id: "u3", name: "Jane Doe", email: "jane@example.com", domain: "janedoe.com", products: 12, feedback: 1723, rating: "4.6/5", status: "Active", date: "Mar 10, 2025" },
  { id: "u4", name: "John Smith", email: "john@example.com", domain: "johnsmith.com", products: 3, feedback: 120, rating: "4.0/5", status: "Active", date: "May 20, 2025" },
  { id: "u5", name: "David Miller", email: "david@example.com", domain: "davidm.com", products: 0, feedback: 0, rating: "0.0/5", status: "Pending Approval", date: "Jun 24, 2026" }
];

// Product history initialized from event history
const INITIAL_PRODUCT_HISTORY = [
  { id: "ph1", name: "Tshirt", user: "Maky Boi", date: "Dec 12-18, 2025", feedback: 120, rating: "4.5 ★", sentiment: "Happy" },
  { id: "ph2", name: "Fan", user: "Mary Uy", date: "Oct 10-14, 2025", feedback: 85, rating: "3.8 ★", sentiment: "Envy" },
  { id: "ph3", name: "Pants", user: "Jane Doe", date: "Sep 5-8, 2025", feedback: 142, rating: "2.1 ★", sentiment: "Disgust" },
  { id: "ph4", name: "Leadership Summit 2026", user: "John Smith", date: "Feb 15, 2026", feedback: 12, rating: "4.2 ★", sentiment: "Happy" },
];

const INITIAL_ACTIVITIES = [
  { title: "New user registered", description: "David Miller submitted registration request", time: "2h ago" },
  { title: "Review milestone reached", description: "3,000 platform-wide product reviews successfully processed", time: "4h ago" },
];

const INITIAL_NOTIFICATIONS = [
  { id: "sn1", text: "New user accreditation requested by David Miller", date: "15m ago", read: false }
];

// Helper function to get custom sentiment colors
const getSentimentColor = (sentiment) => {
  switch (sentiment.toLowerCase()) {
    case "happy": return "#22c55e";      // Green
    case "angry": return "#ef4444";    // Red
    case "sad": return "#f97316";     // Orange
    case "disgust": return "#a855f7";  // Purple
    case "envy": return "#eab308";  // Yellow
    case "sarcastic": return "#ec4899"; // Pink
    default: return "#94a3b8";
  }
};



const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [activeNav, setActiveNav] = useState("dashboard");

  // State Management for dashboard view elements
  const [users, setUsers] = useState(INITIAL_USERS);
  const [productHistory, setProductHistory] = useState(INITIAL_PRODUCT_HISTORY);
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Registered website accounts for plugin interface
  const [registeredWebsites, setRegisteredWebsites] = useState([
    { id: "w1", name: "Faye", domain: "shopee.com", repEmail: "faye@gmail.com", status: "Active", regDate: "Jan 12, 2025", totalReviews: 2410 },
    { id: "w3", name: "Dwayne", domain: "googleplay.com", repEmail: "Dwayne@gmail.com", status: "Active", regDate: "Mar 10, 2025",  totalReviews: 104 },
    { id: "w4", name: "Mark", domain: "agoda.com", repEmail: "Mark@gmail.com", status: "Suspended", regDate: "May 20, 2025", totalReviews: 15 },
  ]);

  // System activity logs for superadmin auditing
  const [activityLogs, setActivityLogs] = useState([
    { id: 1, user: "Mark zack", role: "Web User", action: "Logged In", ip: "192.168.1.102", time: "2026-07-05 18:32:05" },
    { id: 2, user: "Dwayne", role: "Web User", action: "Logged In", ip: "192.168.1.105", time: "2026-07-05 18:10:44" },
    { id: 5, user: "Faye Vega", role: "Web User", action: "Logged In", ip: "203.111.4.52", time: "2026-07-05 16:22:19" },
    { id: 7, user: "lebron", role: "Web User", action: "Logged In", ip: "192.168.2.40", time: "2026-07-05 14:15:22" }
  ]);

  // Modal State for SuperAdmin alert box
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

  // Profile management states
  const [adminName, setAdminName] = useState("Claire Tuble");
  const [adminEmail, setAdminEmail] = useState("superadmin@voxreview.com");
  const [adminPhone, setAdminPhone] = useState("+63 987 654 3210");

  // Settings states
  const [backupSchedule, setBackupSchedule] = useState("Weekly");

  // Filter & Search states
  const [userSearch, setUserSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [selectedReportUser, setSelectedReportUser] = useState("u1");

  // Handlers for website suspension and activation controls
  const handleToggleSuspendWebsite = (id) => {
    setRegisteredWebsites(registeredWebsites.map(site => {
      if (site.id === id) {
        const nextStatus = site.status === "Active" ? "Suspended" : "Active";
        alert(`Website Account "${site.name}" has been ${nextStatus === "Active" ? "re-activated" : "suspended"}.`);
        
        const newAct = {
          title: nextStatus === "Active" ? "Client Site Restored" : "Client Site Suspended",
          description: `"${site.name}" account status set to ${nextStatus} by ${adminName}`,
          time: "Just now"
        };
        setActivities([newAct, ...activities]);

        const newLog = {
          id: Date.now(),
          user: adminName,
          role: "Super Admin",
          action: nextStatus === "Active" ? "Restored Site" : "Suspended Site",
          ip: "192.168.1.100",
          time: new Date().toISOString().replace('T', ' ').substring(0, 19)
        };
        setActivityLogs([newLog, ...activityLogs]);

        return { ...site, status: nextStatus };
      }
      return site;
    }));
  };

  const handleDeleteWebsite = (id) => {
    if (confirm("Are you sure you want to permanently delete this website account? This will block its API key access.")) {
      const site = registeredWebsites.find(s => s.id === id);
      setRegisteredWebsites(registeredWebsites.filter(s => s.id !== id));
      
      const newAct = {
        title: "Client Site Deleted",
        description: `"${site?.name || 'Unknown'}" account removed by ${adminName}`,
        time: "Just now"
      };
      setActivities([newAct, ...activities]);

      const newLog = {
        id: Date.now(),
        user: adminName,
        role: "Super Admin",
        action: "Deleted Client Site",
        ip: "192.168.1.100",
        time: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };
      setActivityLogs([newLog, ...activityLogs]);
    }
  };

  // Handlers for user approvals
  const handleApproveUser = (id) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        alert(`User "${u.name}" accredited successfully.`);
        
        const newAct = {
          title: "User Accredited",
          description: `"${u.name}" registration approved by ${adminName}`,
          time: "Just now"
        };
        setActivities([newAct, ...activities]);

        return { ...u, status: "Active" };
      }
      return u;
    }));
  };

  const handleDeclineUser = (id) => {
    if (confirm("Are you sure you want to decline and delete this registration?")) {
      const u = users.find(item => item.id === id);
      setUsers(users.filter(item => item.id !== id));
      
      const newAct = {
        title: "Registration Rejected",
        description: `"${u?.name || 'Unknown'}" accreditation request declined`,
        time: "Just now"
      };
      setActivities([newAct, ...activities]);
    }
  };
const handleProfileImageChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = () => {
    setProfileImage(reader.result);
  };

  reader.readAsDataURL(file);
};

  // Render Subpages
  const renderSubpage = () => {
    switch (activeNav) {
      case "dashboard":
        const totalReviewsAnalyzedDash = registeredWebsites.reduce((sum, s) => sum + s.totalReviews, 0) + 18;

        return (
          <>
            {/* Stats Cards Grid */}
            <section className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem", marginBottom: "1.5rem" }}>
              <div className="stat-card" style={{ display: "flex", gap: "15px", alignItems: "center", background: "white", padding: "1.25rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <div className="stat-icon green" style={{ width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "10px" }}>
                  <Icons.Reports />
                </div>
                <div>
                  <p style={{ color: "#64748b", fontSize: "0.85rem", margin: 0 }}>Total Reviews Processed</p>
                  <h2 style={{ fontSize: "1.6rem", fontWeight: 800, margin: "2px 0 0" }}>{totalReviewsAnalyzedDash.toLocaleString()}</h2>
                </div>
              </div>
              <div className="stat-card" style={{ display: "flex", gap: "15px", alignItems: "center", background: "white", padding: "1.25rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <div className="stat-icon teal" style={{ width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "10px" }}>
                  <Icons.Orgs />
                </div>
                <div>
                  <p style={{ color: "#64748b", fontSize: "0.85rem", margin: 0 }}>Active Users</p>
                  <h2 style={{ fontSize: "1.6rem", fontWeight: 800, margin: "2px 0 0" }}>{users.filter(u => u.status === "Active").length}</h2>
                </div>
              </div>
            </section>

            {/* Platform-wide Sentiment Overview split into 6 sentiments */}
            <section className="analytics-card" style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0 }}>Platform-Wide Sentiment Analysis</h2>
              </div>
              <div className="sentiment-bar" style={{ display: "flex", height: "16px", borderRadius: "8px", overflow: "hidden", margin: "1.2rem 0" }}>
                <div style={{ background: "#22c55e", flex: 61 }} title="61% Happy"></div>
                <div style={{ background: "#ef4444", flex: 14 }} title="14% Angry"></div>
                <div style={{ background: "#f97316", flex: 10 }} title="10% Sad"></div>
                <div style={{ background: "#a855f7", flex: 5 }} title="5% Disgust"></div>
                <div style={{ background: "#eab308", flex: 5 }} title="5% Envy"></div>
                <div style={{ background: "#ec4899", flex: 5 }} title="5% Sarcastic"></div>
              </div>
              <div className="legend" style={{ display: "flex", flexWrap: "wrap", gap: "20px", fontSize: "0.85rem", color: "#64748b" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }}></span> Happy 61%</span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444" }}></span> Angry 14%</span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#f97316" }}></span> Sad 10%</span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#a855f7" }}></span> Disgust 5%</span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#eab308" }}></span> Envy 5%</span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#ec4899" }}></span> Sarcastic 5%</span>
              </div>
            </section>

            {/* Audit activity logging views */}
            <div className="bottom-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
              <section className="table-card" style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1rem" }}>System Activity Logs</h2>
                <div className="feedback-table-wrapper" style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                    <thead>
                      <tr style={{ background: "#f8fafc", textAlign: "left" }}>
                        <th style={{ padding: "10px" }}>User</th>
                        <th style={{ padding: "10px" }}>Role</th>
                        <th style={{ padding: "10px" }}>Action</th>
                        <th style={{ padding: "10px" }}>IP Address</th>
                        <th style={{ padding: "10px" }}>Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activityLogs.map((log) => (
                        <tr key={log.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "10px", fontWeight: 600 }}>{log.user}</td>
                          <td style={{ padding: "10px" }}>
                            <span style={{ background: log.role === "Super Admin" ? "#e0f2fe" : "#f1f5f9", color: log.role === "Super Admin" ? "#0369a1" : "#475569", padding: "2px 6px", borderRadius: "4px", fontWeight: 700, fontSize: "0.75rem" }}>
                              {log.role}
                            </span>
                          </td>
                          <td style={{ padding: "10px", fontWeight: 500, color: log.action.includes("Logged In") ? "#16a34a" : "#ea580c" }}>{log.action}</td>
                          <td style={{ padding: "10px", color: "#64748b" }}>{log.ip}</td>
                          <td style={{ padding: "10px", color: "#64748b" }}>{log.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="activity-card" style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1rem" }}>Platform Alerts</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {activities.map((activity, index) => (
                    <div key={index} className="activity-item" style={{ display: "flex", gap: "10px", fontSize: "0.85rem", borderBottom: "1px solid #f1f5f9", paddingBottom: "8px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4f46e5", marginTop: "4px" }}></div>
                      <div>
                        <h4 style={{ fontWeight: 700, margin: 0, color: "#0f172a" }}>{activity.title}</h4>
                        <p style={{ margin: "2px 0", color: "#64748b" }}>{activity.description}</p>
                        <small style={{ color: "#94a3b8" }}>{activity.time}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </>
        );

      case "user-management":
        return (
          <div className="card" style={{ background: "white", padding: "1.5rem", borderRadius: "12px", marginRight: "16px", marginLeft: "26px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2>User Management / Accounts Accreditation</h2>
              <div className="search-box" style={{ width: "300px", position: "relative" }}>
                <input 
                  type="text" 
                  placeholder="Search by name or email..." 
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  style={{ width: "100%", padding: "8px 10px 8px 30px", border: "1px solid #cbd5e1", borderRadius: "6px", fontFamily: "inherit" }}
                />
                <span style={{ position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)" }}><Icons.Search /></span>
              </div>
            </div>

            <div className="feedback-table-wrapper" style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", textAlign: "left" }}>
                    <th style={{ padding: "12px" }}>Full Name</th>
                    <th style={{ padding: "12px" }}>Contact Email</th>
                    <th style={{ padding: "12px" }}>Affiliated Domain</th>
                    <th style={{ padding: "12px" }}>Reg Date</th>
                    <th style={{ padding: "12px" }}>Status</th>
                    <th style={{ padding: "12px", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase()))
                    .map((org) => (
                      <tr key={org.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "12px", fontWeight: 700 }}>{org.name}</td>
                        <td style={{ padding: "12px" }}>{org.email}</td>
                        <td style={{ padding: "12px" }}>{org.domain}</td>
                        <td style={{ padding: "12px" }}>{org.date}</td>
                        <td style={{ padding: "12px" }}>
                          <span className={`status-tag status-${org.status.toLowerCase().replace(" ", "-")}`}>
                            {org.status}
                          </span>
                        </td>
                        <td style={{ padding: "12px", textAlign: "right" }}>
                          {org.status === "Pending Approval" ? (
                            <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                              <button className="action-btn-success" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }} onClick={() => handleApproveUser(org.id)}>
                                <Icons.Approve /> Approve
                              </button>
                              <button className="action-btn-danger" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }} onClick={() => handleDeclineUser(org.id)}>
                                <Icons.Trash /> Decline
                              </button>
                            </div>
                          ) : (
                            <span style={{ color: "#64748b", fontSize: "0.85rem", fontWeight: 600 }}>Accredited</span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "reports":
        const reportUserObj = users.find(u => u.id === selectedReportUser) || users[0];
        
        return (
          <div className="card" style={{ background: "white", padding: "1.5rem", borderRadius: "12px" }}>
            <h2>User Account Statistics & Reports</h2>
            
            <div className="org-selection-header" style={{ margin: "1.5rem 0", display: "flex", alignItems: "center", gap: "15px" }}>
              <label style={{ fontWeight: 700 }}>Select User Account:</label>
              <select 
                value={selectedReportUser} 
                onChange={(e) => setSelectedReportUser(e.target.value)}
                style={{ padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontFamily: "inherit" }}
              >
                {users.filter(u => u.status === "Active").map(u => (
                  <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                ))}
              </select>
            </div>

            {reportUserObj && (
              <div className="org-report-layout" style={{ border: "1px solid #e2e8f0", borderRadius: "12px", padding: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "1rem" }}>
                  <div>
                    <h3>{reportUserObj.name}</h3>
                    <p style={{ color: "#64748b", fontSize: "0.85rem", marginTop: "4px" }}>Affiliated Domain: {reportUserObj.domain}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Registration Status</span>
                    <h4 style={{ color: "#166534" }}>{reportUserObj.status}</h4>
                  </div>
                </div>

                <div className="report-grid-details" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", margin: "1.5rem 0" }}>
                  <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "8px" }}>
                    <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 700 }}>PRODUCTS ACCREDITED</span>
                    <h2 style={{ fontSize: "2rem", margin: "5px 0 0" }}>{reportUserObj.products}</h2>
                  </div>
                  <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "8px" }}>
                    <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 700 }}>FEEDBACK PROCESSES</span>
                    <h2 style={{ fontSize: "2rem", margin: "5px 0 0" }}>{reportUserObj.feedback}</h2>
                  </div>
                  <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "8px" }}>
                    <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 700 }}>AVG PRODUCT RATING</span>
                    <h2 style={{ fontSize: "2rem", color: "#166534", margin: "5px 0 0" }}>{reportUserObj.rating}</h2>
                  </div>
                </div>

                <h4>Cumulative Sentiment Breakdown</h4>
                <div className="sentiment-bar" style={{ display: "flex", height: "14px", borderRadius: "7px", overflow: "hidden", margin: "1rem 0" }}>
                  <div style={{ background: "#22c55e", flex: 61 }} title="61% Happy"></div>
                  <div style={{ background: "#ef4444", flex: 14 }} title="14% Angry"></div>
                  <div style={{ background: "#f97316", flex: 10 }} title="10% Sad"></div>
                  <div style={{ background: "#a855f7", flex: 5 }} title="5% Disgust"></div>
                  <div style={{ background: "#eab308", flex: 5 }} title="5% Envy"></div>
                  <div style={{ background: "#ec4899", flex: 5 }} title="5% Sarcastic"></div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", fontSize: "0.75rem", color: "#64748b" }}>
                  <span>● Happy 61%</span>
                  <span>● Angry 14%</span>
                  <span>● Sad 10%</span>
                  <span>● Disgust 5%</span>
                  <span>● Envy 5%</span>
                  <span>● Sarcastic 5%</span>
                </div>

                <div style={{ marginTop: "2rem", borderTop: "1px solid #f1f5f9", paddingTop: "1.5rem" }}>
                  <button className="btn btn--primary" onClick={() => alert(`Accreditation summary report generated for "${reportUserObj.name}". File downloaded!`)}>
                    Export User Report (PDF)
                  </button>
                </div>
              </div>
            )}
          </div>
        );

     case "profile":
        
        return (
          <div className="card" style={{ background: "white", padding: "1.5rem", borderRadius: "12px" }}>
            <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "25px",
    marginTop: "20px",
  }}
>
  <img
    src={
      profileImage ||
      "https://ui-avatars.com/api/?name=Claire+Tuble&background=4f46e5&color=fff&size=200"
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
    style={{
      background: "#4f46e5",
      color: "#fff",
      padding: "10px 18px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
    }}
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
            <h2>Platform Super Administrator Profile</h2>
            <form style={{ maxWidth: "600px", marginTop: "1.5rem" }} onSubmit={(e) => {
              e.preventDefault();
              alert("Super Admin profile saved.");
            }}>
              <div className="form-item" style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "1rem" }}>
                <label style={{ fontWeight: 700, fontSize: "0.8rem", color: "#64748b" }}>Full Name</label>
                <input type="text" value={adminName} onChange={(e) => setAdminName(e.target.value)} style={{ padding: "8px", border: "1px solid #cbd5e1", borderRadius: "6px", fontFamily: "inherit" }} required />
              </div>
              <div className="form-item" style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "1rem" }}>
                <label style={{ fontWeight: 700, fontSize: "0.8rem", color: "#64748b" }}>Email Address</label>
                <input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} style={{ padding: "8px", border: "1px solid #cbd5e1", borderRadius: "6px", fontFamily: "inherit" }} required />
              </div>
              <div className="form-item" style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "1rem" }}>
                <label style={{ fontWeight: 700, fontSize: "0.8rem", color: "#64748b" }}>Admin Phone</label>
                <input type="text" value={adminPhone} onChange={(e) => setAdminPhone(e.target.value)} style={{ padding: "8px", border: "1px solid #cbd5e1", borderRadius: "6px", fontFamily: "inherit" }} required />
              </div>
              <div className="form-item" style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "1rem" }}>
                <label style={{ fontWeight: 700, fontSize: "0.8rem", color: "#64748b" }}>Role Designation</label>
                <input type="text" value="System Super Administrator" disabled style={{ padding: "8px", border: "1px solid #cbd5e1", borderRadius: "6px", background: "#f1f5f9", fontFamily: "inherit" }} />
              </div>
              <button type="submit" className="btn btn--primary" style={{ marginTop: "1rem" }}>Save Credentials</button>
            </form>
          </div>
        );

      case "settings":
        return (
          <div className="card" style={{ background: "white", padding: "1.5rem", borderRadius: "12px" }}>
            <h2>System Settings & Global Configurations</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "1.5rem" }}>
              <div className="settings-block">
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700 }}>Database Backup</h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "0.5rem" }}>Configure system backups schedule for database logs and sentiment indexes.</p>
                <select 
                  value={backupSchedule} 
                  onChange={(e) => setBackupSchedule(e.target.value)}
                  style={{ padding: "8px", border: "1px solid #cbd5e1", borderRadius: "6px", fontFamily: "inherit" }}
                >
                  <option value="Daily">Daily Backup</option>
                  <option value="Weekly">Weekly Backup</option>
                  <option value="Monthly">Monthly Backup</option>
                </select>
              </div>
              <div>
                <button className="btn btn--primary" onClick={() => alert("Platform parameters updated.")}>
                  Save Configurations
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return <div>View not implemented</div>;
    }
  };

  const unreadNotifCount = notifications.filter(n => !n.read).length;

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation Panel */}
      <aside className="sidebar">
        <div className="logo" style={{ background: "lightcyan", display: "flex", alignItems: "center", gap: "10px", padding: "1.6rem", borderBottom: "1px solid #e2e8f0" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0, color: "#4f46e5" }}>VoxReview</h2>
        </div>

        <div className="nav-section">
          <span className="section-title">OVERVIEW</span>
          <button className={`nav-item ${activeNav === "dashboard" ? "active" : ""}`} onClick={() => setActiveNav("dashboard")}>
            <Icons.Dashboard /> Analytics Overview
          </button>
        </div>

        <div className="nav-section">
          <span className="section-title">PLATFORM MANAGEMENT</span>
          <button className={`nav-item ${activeNav === "user-management" ? "active" : ""}`} onClick={() => setActiveNav("user-management")}>
            <Icons.UserManagement /> User Management
          </button>
        </div>

        <div className="nav-section">
          <span className="section-title">ACCOUNT</span>
          <button className={`nav-item ${activeNav === "profile" ? "active" : ""}`} onClick={() => setActiveNav("profile")}>
            <Icons.Profile /> Profile
          </button>
          <button className={`nav-item ${activeNav === "settings" ? "active" : ""}`} onClick={() => setActiveNav("settings")}>
            <Icons.Settings /> Settings
          </button>
        </div>

        <div className="sidebar-user" style={{ flexDirection: "column", gap: "10px", marginTop: "auto" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            {profileImage ? (
               <img src={profileImage} alt="Profile" 
               style={{ width: "45px", height: "45px", borderRadius: "50%", objectFit: "cover", }}/>
) : (
  <div className="avatar">CT</div>
)}
            <div>
              <h4>{adminName}</h4>
              <p>Super Admin</p>
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

      {/* Main content display viewport */}
      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb" style={{ textTransform: "capitalize" }}>
            Super Administrator / <strong>{activeNav.replace("-", " ")}</strong>
          </div>
            
          <div className="topbar-right" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <button 
              className="topbar-right" 
              onClick={() => setShowNotificationsModal(true)} 
              style={{ position: "relative", border: "none", background: "none", cursor: "pointer", color: "#64748b" }}
            >
              <Icons.Bell />
              {unreadNotifCount > 0 && <span className="notif-dot" style={{ position: "absolute", top: "1px", right: "2px", width: "6px", height: "6px", background: "#ef4444", borderRadius: "50%" }} />}
            </button>

            {profileImage ? (
               <img
            src={profileImage}
            alt="Profile"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            />
          ) : (
           <div className="avatar small">CT</div>
          )}
            <span style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }} onClick={() => setActiveNav("profile")}>
              Claire <Icons.ChevronDown />
            </span>
          </div>
        </header>

        <div style={{ marginTop: "1.5rem" }}>
          {renderSubpage()}
        </div>
      </main>

      {/* User admin notifications modal popup */}
      {showNotificationsModal && (
        <div className="custom-modal-overlay" onClick={() => setShowNotificationsModal(false)}>
          <div className="custom-modal-content" onClick={(e) => e.stopPropagation()} style={{ width: "450px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0", paddingBottom: "0.85rem", marginBottom: "1rem" }}>
              <h3 style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px", fontSize: "1.15rem", fontWeight: 800 }}>
                <span style={{ color: "#4f46e5", display: "inline-flex" }}><Icons.Bell /></span>
                Platform alerts (Super Admin)
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

export default SuperAdminDashboard;