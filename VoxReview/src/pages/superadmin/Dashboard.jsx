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
            <section className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon green">
                  <Icons.Reports />
                </div>
                <div>
                  <p>Total Reviews Processed</p>
                  <h2>{totalReviewsAnalyzedDash.toLocaleString()}</h2>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon teal">
                  <Icons.Orgs />
                </div>
                <div>
                  <p>Active Users</p>
                  <h2>{users.filter(u => u.status === "Active").length}</h2>
                </div>
              </div>
            </section>

            {/* Platform-wide Sentiment Overview split into 6 sentiments */}
            <section className="analytics-card">
              <div>
                <h2>Platform-Wide Sentiment Analysis</h2>
              </div>
              <div className="sentiment-bar">
                <div className="sentiment-seg-happy" title="61% Happy"></div>
                <div className="sentiment-seg-angry" title="14% Angry"></div>
                <div className="sentiment-seg-sad" title="10% Sad"></div>
                <div className="sentiment-seg-disgust" title="5% Disgust"></div>
                <div className="sentiment-seg-envy" title="5% Envy"></div>
                <div className="sentiment-seg-sarcastic" title="5% Sarcastic"></div>
              </div>
              <div className="legend">
                <span className="legend-item"><span className="legend-dot happy"></span> Happy 61%</span>
                <span className="legend-item"><span className="legend-dot angry"></span> Angry 14%</span>
                <span className="legend-item"><span className="legend-dot sad"></span> Sad 10%</span>
                <span className="legend-item"><span className="legend-dot disgust"></span> Disgust 5%</span>
                <span className="legend-item"><span className="legend-dot envy"></span> Envy 5%</span>
                <span className="legend-item"><span className="legend-dot sarcastic"></span> Sarcastic 5%</span>
              </div>
            </section>

            {/* Audit activity logging views */}
            <div className="bottom-grid">
              <section className="table-card">
                <h2 className="card-title">System Activity Logs</h2>
                <div className="feedback-table-wrapper">
                  <table className="logs-table">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Role</th>
                        <th>Action</th>
                        <th>IP Address</th>
                        <th>Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activityLogs.map((log) => (
                        <tr key={log.id}>
                          <td className="log-user">{log.user}</td>
                          <td>
                            <span className={`role-tag ${log.role === "Super Admin" ? "super-admin" : "default"}`}>
                              {log.role}
                            </span>
                          </td>
                          <td className={log.action.includes("Logged In") ? "log-action-login" : "log-action-other"}>{log.action}</td>
                          <td className="text-muted">{log.ip}</td>
                          <td className="text-muted">{log.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="activity-card">
                <h2 className="card-title">Platform Alerts</h2>
                <div className="alerts-list">
                  {activities.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-bullet"></div>
                      <div>
                        <h4>{activity.title}</h4>
                        <p>{activity.description}</p>
                        <small>{activity.time}</small>
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
          <div className="card user-management-card">
            <div className="section-header">
              <h2>User Management / Accounts Accreditation</h2>
              <div className="search-box">
                <input 
                  type="text" 
                  className="search-input"
                  placeholder="Search by name or email..." 
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                />
                <span className="search-icon"><Icons.Search /></span>
              </div>
            </div>

            <div className="feedback-table-wrapper">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Contact Email</th>
                    <th>Affiliated Domain</th>
                    <th>Reg Date</th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase()))
                    .map((org) => (
                      <tr key={org.id}>
                        <td className="user-name">{org.name}</td>
                        <td>{org.email}</td>
                        <td>{org.domain}</td>
                        <td>{org.date}</td>
                        <td>
                          <span className={`status-tag status-${org.status.toLowerCase().replace(" ", "-")}`}>
                            {org.status}
                          </span>
                        </td>
                        <td className="text-right">
                          {org.status === "Pending Approval" ? (
                            <div className="action-buttons-group">
                              <button className="action-btn-success" onClick={() => handleApproveUser(org.id)}>
                                <Icons.Approve /> Approve
                              </button>
                              <button className="action-btn-danger" onClick={() => handleDeclineUser(org.id)}>
                                <Icons.Trash /> Decline
                              </button>
                            </div>
                          ) : (
                            <span className="accredited-text">Accredited</span>
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
          <div className="card">
            <h2>User Account Statistics & Reports</h2>
            
            <div className="org-selection-header">
              <label>Select User Account:</label>
              <select 
                className="select-input"
                value={selectedReportUser} 
                onChange={(e) => setSelectedReportUser(e.target.value)}
              >
                {users.filter(u => u.status === "Active").map(u => (
                  <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                ))}
              </select>
            </div>

            {reportUserObj && (
              <div className="org-report-layout">
                <div className="report-top">
                  <div>
                    <h3>{reportUserObj.name}</h3>
                    <p className="report-domain">Affiliated Domain: {reportUserObj.domain}</p>
                  </div>
                  <div className="report-status-box">
                    <span className="status-label">Registration Status</span>
                    <h4 className="status-value">{reportUserObj.status}</h4>
                  </div>
                </div>

                <div className="report-grid-details">
                  <div className="report-detail-box">
                    <span className="report-detail-label">PRODUCTS ACCREDITED</span>
                    <h2 className="report-detail-value">{reportUserObj.products}</h2>
                  </div>
                  <div className="report-detail-box">
                    <span className="report-detail-label">FEEDBACK PROCESSES</span>
                    <h2 className="report-detail-value">{reportUserObj.feedback}</h2>
                  </div>
                  <div className="report-detail-box">
                    <span className="report-detail-label">AVG PRODUCT RATING</span>
                    <h2 className="report-detail-value rating">{reportUserObj.rating}</h2>
                  </div>
                </div>

                <h4>Cumulative Sentiment Breakdown</h4>
                <div className="sentiment-bar">
                  <div className="sentiment-seg-happy" title="61% Happy"></div>
                  <div className="sentiment-seg-angry" title="14% Angry"></div>
                  <div className="sentiment-seg-sad" title="10% Sad"></div>
                  <div className="sentiment-seg-disgust" title="5% Disgust"></div>
                  <div className="sentiment-seg-envy" title="5% Envy"></div>
                  <div className="sentiment-seg-sarcastic" title="5% Sarcastic"></div>
                </div>
                <div className="legend">
                  <span className="legend-item"><span className="legend-dot happy"></span> Happy 61%</span>
                  <span className="legend-item"><span className="legend-dot angry"></span> Angry 14%</span>
                  <span className="legend-item"><span className="legend-dot sad"></span> Sad 10%</span>
                  <span className="legend-item"><span className="legend-dot disgust"></span> Disgust 5%</span>
                  <span className="legend-item"><span className="legend-dot envy"></span> Envy 5%</span>
                  <span className="legend-item"><span className="legend-dot sarcastic"></span> Sarcastic 5%</span>
                </div>

                <div className="report-actions">
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
          <div className="card">
            <div className="profile-header">
              <img
                src={
                  profileImage ||
                  "https://ui-avatars.com/api/?name=Claire+Tuble&background=4f46e5&color=fff&size=200"
                }
                alt="Profile"
                className="profile-img-large"
              />
              <label htmlFor="profileUpload" className="profile-upload-label">
                Upload Profile Picture
              </label>
              <input
                id="profileUpload"
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="file-input-hidden"
              />
            </div>
            <h2>Platform Super Administrator Profile</h2>
            <form className="profile-form" onSubmit={(e) => {
              e.preventDefault();
              alert("Super Admin profile saved.");
            }}>
              <div className="form-item">
                <label>Full Name</label>
                <input type="text" className="form-input" value={adminName} onChange={(e) => setAdminName(e.target.value)} required />
              </div>
              <div className="form-item">
                <label>Email Address</label>
                <input type="email" className="form-input" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} required />
              </div>
              <div className="form-item">
                <label>Role Designation</label>
                <input type="text" value="System Super Administrator" disabled className="form-input disabled" />
              </div>
              <button type="submit" className="btn btn--primary">Save Credentials</button>
            </form>
          </div>
        );

      case "settings":
        return (
          <div className="card">
            <h2>System Settings & Global Configurations</h2>
            <div className="settings-container">
              <div className="settings-block">
                <h3 className="settings-title">Database Backup</h3>
                <p className="settings-desc">Configure system backups schedule for database logs and sentiment indexes.</p>
                <select 
                  className="select-input"
                  value={backupSchedule} 
                  onChange={(e) => setBackupSchedule(e.target.value)}
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
        <div className="logo">
          <h2>VoxReview</h2>
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
          <button className={`nav-item ${activeNav === "settings" ? "active" : ""}`} onClick={() => setActiveNav("settings")}>
            <Icons.Settings /> Settings
          </button>
        </div>

        <div className="sidebar-user">
          <div className="sidebar-user-info">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="avatar-img" />
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
            className="signout-btn"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content display viewport */}
      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            Super Administrator / <strong>{activeNav.replace("-", " ")}</strong>
          </div>
            
          <div className="topbar-right">
            <button 
              className="topbar-bell-btn" 
              onClick={() => setShowNotificationsModal(true)}
            >
              <Icons.Bell />
              {unreadNotifCount > 0 && <span className="notif-dot" />}
            </button>

            {profileImage ? (
              <img src={profileImage} alt="Profile" className="avatar-img-small" />
            ) : (
              <div className="avatar small">CT</div>
            )}
            <span className="user-dropdown-trigger" onClick={() => setActiveNav("profile")}>
              Claire <Icons.ChevronDown />
            </span>
          </div>
        </header>

        <div className="main-subpage-container">
          {renderSubpage()}
        </div>
      </main>

      {/* User admin notifications modal popup */}
      {showNotificationsModal && (
        <div className="custom-modal-overlay" onClick={() => setShowNotificationsModal(false)}>
          <div className="custom-modal-content modal-width-450" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                <span className="modal-bell-icon"><Icons.Bell /></span>
                Platform alerts (Super Admin)
              </h3>
              <button 
                onClick={() => setShowNotificationsModal(false)}
                className="modal-close-btn"
              >
                ✕
              </button>
            </div>
            
            <div className="notif-list">
              {notifications.map(n => (
                <div key={n.id} className={`notif-item ${n.read ? "read" : "unread"}`}>
                  {!n.read && <span className="unread-indicator"></span>}
                  <p className={`notif-text ${n.read ? "read" : "unread"}`}>{n.text}</p>
                  <span className="notif-date">{n.date}</span>
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <button className="btn btn--secondary" onClick={() => {
                setNotifications(notifications.map(n => ({ ...n, read: true })));
              }}>
                Mark all read
              </button>
              <button className="btn btn--primary" onClick={() => setShowNotificationsModal(false)}>
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