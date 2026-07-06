import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./user.css";

const PRESET_FEEDBACK = [
  {
    id: "1",
    studentName: "Maky Boi",
    event: "Shovel",
    rating: 5,
    comment: "The Material is great.",
    sentiment: "Positive"
  },
  {
    id: "2",
    studentName: "Mary Uy",
    event: "Electrifan",
    rating: 3,
    comment: "It worked okay.",
    sentiment: "Neutral"
  },
  {
    id: "3",
    studentName: "Anonymous",
    event: "tshirt",
    rating: 1,
    comment: "the cotton are ugly and the design is not good. I hate it.",
    sentiment: "Negative"
  }
];

const EVENTS = [
  "Foundation Week 2025",
  "CSM Fest",
  "Palaro 2025",
  "Leadership Summit 2026",
  "General Assembly"
];

const UserPortal = () => {
  const [feedbackList, setFeedbackList] = useState(PRESET_FEEDBACK);
  const [studentName, setStudentName] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(EVENTS[0]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [sentiment, setSentiment] = useState("Neutral");

  // Simple keyword sentiment analyzer
  useEffect(() => {
    if (!comment.trim()) {
      setSentiment("Neutral");
      return;
    }

    const posWords = ["great", "good", "love", "awesome", "fun", "amazing", "excellent", "nice", "best", "cool", "happy", "kudos", "enjoy", "decent"];
    const negWords = ["bad", "worst", "terrible", "boring", "disappointed", "slow", "hate", "waste", "poor", "sad", "dislike", "hot", "disorganized", "delayed"];
    
    let score = 0;
    const lower = comment.toLowerCase();
    
    posWords.forEach(w => {
      if (lower.includes(w)) score += 1;
    });
    negWords.forEach(w => {
      if (lower.includes(w)) score -= 1;
    });

    if (score > 0) {
      setSentiment("Positive");
    } else if (score < 0) {
      setSentiment("Negative");
    } else {
      setSentiment("Neutral");
    }
  }, [comment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newFeedback = {
      id: Date.now().toString(),
      studentName: studentName.trim() || "Anonymous Student",
      event: selectedEvent,
      rating,
      comment: comment.trim(),
      sentiment
    };

    setFeedbackList([newFeedback, ...feedbackList]);
    setStudentName("");
    setComment("");
    setRating(5);
  };

  return (
    <div className="user-container">
      <div className="user-wrapper">
        
        {/* Portal Navbar */}
        <header className="user-header">
          <Link to="/" className="user-brand">
            <span className="user-brand-icon">📣</span>
            <span className="user-brand-name">VoxReview Student Portal</span>
          </Link>
          <Link to="/" className="btn-back-portal">
            ← Exit Portal
          </Link>
        </header>

        {/* Dynamic Grid */}
        <div className="user-grid">
          
          {/* Feedback Form Card */}
          <section className="form-card">
            <h2 className="user-section-title">Submit Event Review</h2>
            <form onSubmit={handleSubmit}>
              
              <div className="form-group">
                <label className="form-label">Name (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Juan Dela Cruz"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Select Campus Event</label>
                <select
                  className="form-select"
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                >
                  {EVENTS.map(ev => (
                    <option key={ev} value={ev}>{ev}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Overall Rating</label>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      className={`star-btn ${star <= rating ? "active" : ""}`}
                      onClick={() => setRating(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Your Feedback / Comments</label>
                <textarea
                  className="form-textarea"
                  rows="4"
                  placeholder="Write your review here. Tell us what went well and what can be improved."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                ></textarea>
              </div>


              <button type="submit" className="btn-submit">
                Submit
              </button>

            </form>
          </section>

          {/* Recent Reviews Feed */}
          <section className="list-card">
            <h2 className="user-section-title">Recent Submissions</h2>
            
            <div className="feedback-list">
              {feedbackList.map(item => (
                <div key={item.id} className="feedback-item">
                  <div className="feedback-item-header">
                    <div>
                      <h3 className="feedback-item-name">{item.studentName}</h3>
                      <p className="feedback-item-event">{item.event}</p>
                    </div>
                    <span className={`user-badge user-badge--${item.sentiment.toLowerCase()}`}>
                      {item.sentiment}
                    </span>
                  </div>
                  
                  <div className="feedback-item-stars">
                    {"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}
                  </div>
                  
                  <p className="feedback-item-text">"{item.comment}"</p>
                </div>
              ))}
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};

export default UserPortal;
