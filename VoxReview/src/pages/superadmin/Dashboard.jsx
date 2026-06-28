import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dash.css";

// SVG Icons
const Icons = {
  Dashboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>
  ),
  Orgs: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  EventHistory: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
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
  )
};

// Initial Data States
const INITIAL_STATS = [
  { id: 1, title: "Total Organizations", value: "47", color: "purple", svgIcon: Icons.Orgs },
  { id: 2, title: "Total Events", value: "27", color: "teal", svgIcon: Icons.EventHistory },
  { id: 3, title: "Total Feedback", value: "3,439", color: "green", svgIcon: Icons.Reports },
  { id: 4, title: "Active Users (30d)", value: "847", color: "yellow", svgIcon: Icons.Profile },
];

const INITIAL_ORGANIZATIONS = [
  { id: "o1", name: "Computer Science Society (COSS)", rep: "Maky Boi", university: "Western Mindanao State University", events: 18, feedback: 2410, sentiment: "4.8/5", status: "Active", date: "Jan 12, 2025" },
  { id: "o2", name: "Society of Information Technology Educators (SITE)", rep: "Mary Uy", university: "Western Mindanao State University", events: 15, feedback: 1980, sentiment: "4.7/5", status: "Active", date: "Jan 15, 2025" },
  { id: "o3", name: "Junior Marketing Association (JMA)", rep: "Jane Doe", university: "Western Mindanao State University", events: 12, feedback: 1723, sentiment: "4.6/5", status: "Active", date: "Mar 10, 2025" },
  { id: "o4", name: "League of Young Entrepreneurs (LYE)", rep: "John Smith", university: "Western Mindanao State University", events: 3, feedback: 120, sentiment: "4.0/5", status: "Active", date: "May 20, 2025" },
  { id: "o5", name: "Alphinity Mountaineering organization", rep: "David Miller", university: "Mountaineering", events: 0, feedback: 0, sentiment: "0.0/5", status: "Pending Approval", date: "Jun 24, 2026" }
];

const INITIAL_EVENT_HISTORY = [
  { id: "eh1", name: "Foundation Week 2025", organization: "Computer Science Society (COSS)", date: "Dec 12-18, 2025", feedback: 120, rating: "4.5 ★", sentiment: "Positive" },
  { id: "eh2", name: "CSM Fest", organization: "Society of Information Technology Educators (SITE)", date: "Oct 10-14, 2025", feedback: 85, rating: "3.8 ★", sentiment: "Neutral" },
  { id: "eh3", name: "Palaro 2025", organization: "Junior Marketing Association (JMA)", date: "Sep 5-8, 2025", feedback: 142, rating: "2.1 ★", sentiment: "Negative" },
  { id: "eh4", name: "Leadership Summit 2026", organization: "League of Young Entrepreneurs (LYE)", date: "Feb 15, 2026", feedback: 12, rating: "4.2 ★", sentiment: "Positive" },
];

const INITIAL_ACTIVITIES = [
  { title: "New organization registered", description: "Alphinity Mountaineering organization submitted registration request", time: "2h ago" },
  { title: "Feedback milestone reached", description: "3,000 platform-wide reviews successfully processed", time: "4h ago" },
  { title: "New event created", description: "General Assembly event set up by SITE", time: "6h ago" },
];

const INITIAL_NOTIFICATIONS = [
  { id: "sn1", text: "New organization accreditation requested by Alphinity Mountaineering", date: "15m ago", read: false },
  { id: "sn2", text: "High priority ticket resolved: WMSU Site Connection Online", date: "2h ago", read: false },
  { id: "sn3", text: "Daily database backup generated successfully", date: "1d ago", read: true },
];

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("dashboard");

  // State Management
  const [organizations, setOrganizations] = useState(INITIAL_ORGANIZATIONS);
  const [eventHistory, setEventHistory] = useState(INITIAL_EVENT_HISTORY);
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Modal State
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

  // Profile management states
  const [adminName, setAdminName] = useState("Claire Tuble");
  const [adminEmail, setAdminEmail] = useState("superadmin@voxreview.com");
  const [adminPhone, setAdminPhone] = useState("+63 987 654 3210");

  // Settings states
  const [autoApprove, setAutoApprove] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [backupSchedule, setBackupSchedule] = useState("Weekly");

  // Filter & Search states
  const [orgSearch, setOrgSearch] = useState("");
  const [eventSearch, setEventSearch] = useState("");
  const [selectedReportOrg, setSelectedReportOrg] = useState("o1");

  // Handlers
  const handleApproveOrg = (id) => {
    setOrganizations(organizations.map(org => {
      if (org.id === id) {
        alert(`Organization "${org.name}" has been accredited successfully.`);
        
        // Log activity
        const newAct = {
          title: "Organization Accredited",
          description: `"${org.name}" accreditation approved by ${adminName}`,
          time: "Just now"
        };
        setActivities([newAct, ...activities]);

        return { ...org, status: "Active" };
      }
      return org;
    }));
  };

  const handleDeclineOrg = (id) => {
    if (confirm("Are you sure you want to reject and delete this registration?")) {
      const org = organizations.find(o => o.id === id);
      setOrganizations(organizations.filter(o => o.id !== id));
      
      const newAct = {
        title: "Registration Rejected",
        description: `"${org?.name || 'Unknown'}" accreditation request declined`,
        time: "Just now"
      };
      setActivities([newAct, ...activities]);
    }
  };

  // Render Subpages
  const renderSubpage = () => {
    switch (activeNav) {
      case "dashboard":
        return (
          <>
            {/* Stats Grid */}
            <section className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem", marginBottom: "1.5rem" }}>
              {INITIAL_STATS.map((item) => {
                const SvgIcon = item.svgIcon;
                // Dynamically fetch values
                let val = item.value;
                if (item.id === 1) val = organizations.length.toString();
                if (item.id === 2) val = (organizations.reduce((sum, o) => sum + o.events, 0) + eventHistory.length).toString();

                return (
                  <div key={item.id} className="stat-card" style={{ display: "flex", gap: "15px", alignItems: "center", background: "white", padding: "1.25rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                    <div className={`stat-icon ${item.color}`} style={{ width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "10px" }}>
                      <SvgIcon />
                    </div>
                    <div>
                      <p style={{ color: "#64748b", fontSize: "0.85rem", margin: 0 }}>{item.title}</p>
                      <h2 style={{ fontSize: "1.6rem", fontWeight: 800, margin: "2px 0 0" }}>{val}</h2>
                    </div>
                  </div>
                );
              })}
            </section>

            {/* Platform-wide Sentiment Overview */}
            <section className="analytics-card" style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1rem" }}>Platform-Wide Sentiment Analysis</h2>
              <div className="sentiment-bar" style={{ display: "flex", height: "12px", borderRadius: "999px", overflow: "hidden", margin: "1rem 0" }}>
                <div className="positive" style={{ background: "#22c55e", flex: 61 }} title="61% Positive"></div>
                <div className="neutral" style={{ background: "#eab308", flex: 25 }} title="25% Neutral"></div>
                <div className="negative" style={{ background: "#ef4444", flex: 14 }} title="14% Negative"></div>
              </div>
              <div className="legend" style={{ display: "flex", gap: "25px", fontSize: "0.85rem", color: "#64748b" }}>
                <span className="positive-text" style={{ display: "flex", alignItems: "center", gap: "6px" }}><span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }}></span> Positive 61%</span>
                <span className="neutral-text" style={{ display: "flex", alignItems: "center", gap: "6px" }}><span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#eab308" }}></span> Neutral 25%</span>
                <span className="negative-text" style={{ display: "flex", alignItems: "center", gap: "6px" }}><span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444" }}></span> Negative 14%</span>
              </div>
            </section>

            {/* Bottom Grid */}
            <div className="bottom-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
              {/* Top Organizations Card */}
              <section className="table-card" style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <h2 style={{ fontSize: "1.1rem", fontWeight: 800 }}>Accredited Campus Organizations</h2>
                  <button style={{ border: "none", background: "none", color: "#4f46e5", fontWeight: 700, cursor: "pointer" }} onClick={() => setActiveNav("organizations")}>View All ↗</button>
                </div>
                <div className="feedback-table-wrapper" style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                    <thead>
                      <tr style={{ background: "#f8fafc", textAlign: "left" }}>
                        <th style={{ padding: "10px" }}>Org Name</th>
                        <th style={{ padding: "10px" }}>University</th>
                        <th style={{ padding: "10px" }}>Events</th>
                        <th style={{ padding: "10px" }}>Avg Sentiment</th>
                        <th style={{ padding: "10px" }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {organizations.slice(0, 3).map((org) => (
                        <tr key={org.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "10px", fontWeight: 600 }}>{org.name}</td>
                          <td style={{ padding: "10px" }}>{org.university}</td>
                          <td style={{ padding: "10px" }}>{org.events}</td>
                          <td style={{ padding: "10px", fontWeight: 700, color: "#166534" }}>{org.sentiment}</td>
                          <td style={{ padding: "10px" }}>
                            <span className={`status-tag status-${org.status.toLowerCase().replace(" ", "-")}`} style={{ fontSize: "0.75rem", fontWeight: 700, padding: "4px 8px", borderRadius: "4px" }}>
                              {org.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Activity Feed Card */}
              <section className="activity-card" style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1rem" }}>Platform Log</h2>
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

      case "organizations":
        return (
          <div className="card" style={{ background: "white", padding: "1.5rem", borderRadius: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2>Organizations Directory</h2>
              <div className="search-box" style={{ width: "300px", position: "relative" }}>
                <input 
                  type="text" 
                  placeholder="Search organization or university..." 
                  value={orgSearch}
                  onChange={(e) => setOrgSearch(e.target.value)}
                  style={{ width: "100%", padding: "8px 10px 8px 30px", border: "1px solid #cbd5e1", borderRadius: "6px", fontFamily: "inherit" }}
                />
                <span style={{ position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)" }}><Icons.Search /></span>
              </div>
            </div>

            <div className="feedback-table-wrapper">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", textAlign: "left" }}>
                    <th style={{ padding: "12px" }}>Organization Name</th>
                    <th style={{ padding: "12px" }}>Representative</th>
                    <th style={{ padding: "12px" }}>Affiliated University</th>
                    <th style={{ padding: "12px" }}>Reg Date</th>
                    <th style={{ padding: "12px" }}>Status</th>
                    <th style={{ padding: "12px", textAlign: "right" }}>Accreditation Action</th>
                  </tr>
                </thead>
                <tbody>
                  {organizations
                    .filter(org => org.name.toLowerCase().includes(orgSearch.toLowerCase()) || org.university.toLowerCase().includes(orgSearch.toLowerCase()))
                    .map((org) => (
                      <tr key={org.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "12px", fontWeight: 700 }}>{org.name}</td>
                        <td style={{ padding: "12px" }}>{org.rep}</td>
                        <td style={{ padding: "12px" }}>{org.university}</td>
                        <td style={{ padding: "12px" }}>{org.date}</td>
                        <td style={{ padding: "12px" }}>
                          <span className={`status-tag status-${org.status.toLowerCase().replace(" ", "-")}`}>
                            {org.status}
                          </span>
                        </td>
                        <td style={{ padding: "12px", textAlign: "right" }}>
                          {org.status === "Pending Approval" ? (
                            <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                              <button className="action-btn-success" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }} onClick={() => handleApproveOrg(org.id)}>
                                <Icons.Approve /> Approve
                              </button>
                              <button className="action-btn-danger" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }} onClick={() => handleDeclineOrg(org.id)}>
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

      case "event-history":
        return (
          <div className="card" style={{ background: "white", padding: "1.5rem", borderRadius: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2>Global Campus Event Log</h2>
              <div className="search-box" style={{ width: "300px", position: "relative" }}>
                <input 
                  type="text" 
                  placeholder="Search event name..." 
                  value={eventSearch}
                  onChange={(e) => setEventSearch(e.target.value)}
                  style={{ width: "100%", padding: "8px 10px 8px 30px", border: "1px solid #cbd5e1", borderRadius: "6px", fontFamily: "inherit" }}
                />
                <span style={{ position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)" }}><Icons.Search /></span>
              </div>
            </div>

            <div className="feedback-table-wrapper">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", textAlign: "left" }}>
                    <th style={{ padding: "12px" }}>Event Name</th>
                    <th style={{ padding: "12px" }}>Parent Organization</th>
                    <th style={{ padding: "12px" }}>Date Schedule</th>
                    <th style={{ padding: "12px" }}>Submissions</th>
                    <th style={{ padding: "12px" }}>Overall Rating</th>
                    <th style={{ padding: "12px" }}>Sentiment Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {eventHistory
                    .filter(ev => ev.name.toLowerCase().includes(eventSearch.toLowerCase()))
                    .map((ev) => (
                      <tr key={ev.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "12px", fontWeight: 700 }}>{ev.name}</td>
                        <td style={{ padding: "12px" }}>{ev.organization}</td>
                        <td style={{ padding: "12px" }}>{ev.date}</td>
                        <td style={{ padding: "12px" }}>{ev.feedback} reviews</td>
                        <td style={{ padding: "12px", fontWeight: 600 }}>{ev.rating}</td>
                        <td style={{ padding: "12px" }}>
                          <span className={`status-tag status-${ev.sentiment.toLowerCase()}`}>
                            {ev.sentiment}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "reports":
        const reportOrgObj = organizations.find(o => o.id === selectedReportOrg) || organizations[0];
        
        return (
          <div className="card" style={{ background: "white", padding: "1.5rem", borderRadius: "12px" }}>
            <h2>Organization Statistics & Reports</h2>
            
            <div className="org-selection-header" style={{ margin: "1.5rem 0", display: "flex", alignItems: "center", gap: "15px" }}>
              <label style={{ fontWeight: 700 }}>Select Organization:</label>
              <select 
                value={selectedReportOrg} 
                onChange={(e) => setSelectedReportOrg(e.target.value)}
                style={{ padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontFamily: "inherit" }}
              >
                {organizations.filter(o => o.status === "Active").map(org => (
                  <option key={org.id} value={org.id}>{org.name}</option>
                ))}
              </select>
            </div>

            {reportOrgObj && (
              <div className="org-report-layout" style={{ border: "1px solid #e2e8f0", borderRadius: "12px", padding: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "1rem" }}>
                  <div>
                    <h3>{reportOrgObj.name}</h3>
                    <p style={{ color: "#64748b", fontSize: "0.85rem", marginTop: "4px" }}>Affiliated with: {reportOrgObj.university}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Registration Status</span>
                    <h4 style={{ color: "#166534" }}>{reportOrgObj.status}</h4>
                  </div>
                </div>

                <div className="report-grid-details" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", margin: "1.5rem 0" }}>
                  <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "8px" }}>
                    <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 700 }}>EVENTS HOSTED</span>
                    <h2 style={{ fontSize: "2rem", margin: "5px 0 0" }}>{reportOrgObj.events}</h2>
                  </div>
                  <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "8px" }}>
                    <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 700 }}>FEEDBACK SUBMISSIONS</span>
                    <h2 style={{ fontSize: "2rem", margin: "5px 0 0" }}>{reportOrgObj.feedback}</h2>
                  </div>
                  <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "8px" }}>
                    <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 700 }}>AGGREGATE SENTIMENT</span>
                    <h2 style={{ fontSize: "2rem", color: "#166534", margin: "5px 0 0" }}>{reportOrgObj.sentiment}</h2>
                  </div>
                </div>

                <h4>Sentiment Distribution Analysis</h4>
                <div className="sentiment-bar" style={{ display: "flex", height: "14px", borderRadius: "7px", overflow: "hidden", margin: "1rem 0" }}>
                  <div style={{ background: "#22c55e", flex: 72 }} title="72% Positive"></div>
                  <div style={{ background: "#eab308", flex: 18 }} title="18% Neutral"></div>
                  <div style={{ background: "#ef4444", flex: 10 }} title="10% Negative"></div>
                </div>
                <div style={{ display: "flex", gap: "15px", fontSize: "0.75rem", color: "#64748b" }}>
                  <span>● Positive 72%</span>
                  <span>● Neutral 18%</span>
                  <span>● Negative 10%</span>
                </div>

                <div style={{ marginTop: "2rem", borderTop: "1px solid #f1f5f9", paddingTop: "1.5rem" }}>
                  <button className="btn btn--primary" onClick={() => alert(`Accreditation summary report generated for "${reportOrgObj.name}". File downloaded!`)}>
                    Export Aggregate Org Report (PDF)
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case "profile":
        return (
          <div className="card" style={{ background: "white", padding: "1.5rem", borderRadius: "12px" }}>
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
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700 }}>Organization Auto-Accreditation</h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "0.5rem" }}>Automatically approve organization accreditation requests upon registration form submission.</p>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: 600 }}>
                  <input type="checkbox" checked={autoApprove} onChange={(e) => setAutoApprove(e.target.checked)} />
                  Enable Auto-Accreditation
                </label>
              </div>

              <div className="settings-block">
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700 }}>Security & Alerts</h3>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: 600, marginTop: "0.5rem" }}>
                  <input type="checkbox" checked={emailAlerts} onChange={(e) => setEmailAlerts(e.target.checked)} />
                  Send platform metrics alert to Super Admin daily
                </label>
              </div>

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
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "1.5rem" }}>
          <div style={{ color: "#4f46e5", display: "flex", alignItems: "center" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0, color: "#4f46e5" }}>VoxReview</h2>
        </div>

        <div className="nav-section">
          <span className="section-title">OVERVIEW</span>
          <button className={`nav-item ${activeNav === "dashboard" ? "active" : ""}`} onClick={() => setActiveNav("dashboard")}>
            <Icons.Dashboard /> Dashboard
          </button>
        </div>

        <div className="nav-section">
          <span className="section-title">PLATFORM MANAGEMENT</span>
          <button className={`nav-item ${activeNav === "organizations" ? "active" : ""}`} onClick={() => setActiveNav("organizations")}>
            <Icons.Orgs /> Organizations
          </button>
          <button className={`nav-item ${activeNav === "event-history" ? "active" : ""}`} onClick={() => setActiveNav("event-history")}>
            <Icons.EventHistory /> Event History
          </button>
        </div>

        <div className="nav-section">
          <span className="section-title">REPORTS</span>
          <button className={`nav-item ${activeNav === "reports" ? "active" : ""}`} onClick={() => setActiveNav("reports")}>
            <Icons.Reports /> Organization Reports
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
            <div className="avatar">JD</div>
            <div>
              <h4>{adminName}</h4>
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

      {/* Main Content Area */}
      <main className="main-content">
        {/* Header */}
        <header className="topbar">
          <div className="breadcrumb" style={{ textTransform: "capitalize" }}>
            Super Administrator / <strong>{activeNav.replace("-", " ")}</strong>
          </div>

          <div className="topbar-right" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            
            {/* Notification Bell with working modal triggers */}
            <button 
              className="topbar__icon-btn" 
              onClick={() => setShowNotificationsModal(true)} 
              style={{ position: "relative", border: "none", background: "none", cursor: "pointer", color: "#64748b" }}
            >
              <Icons.Bell />
              {unreadNotifCount > 0 && <span className="notif-dot" style={{ position: "absolute", top: "1px", right: "2px", width: "6px", height: "6px", background: "#ef4444", borderRadius: "50%" }} />}
            </button>

            <div className="avatar small">CT</div>
            <span style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }} onClick={() => setActiveNav("profile")}>
              Claire <Icons.ChevronDown />
            </span>
          </div>
        </header>

        {/* Dynamic view */}
        <div style={{ marginTop: "1.5rem" }}>
          {renderSubpage()}
        </div>
      </main>

      {/* SUPER ADMIN NOTIFICATIONS MODAL DESIGN */}
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