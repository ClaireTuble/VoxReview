import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontFamily: "sans-serif",
      backgroundColor: "#faf5ff",
      color: "#581c87"
    }}>
      <h1>About VoxReview</h1>
      <p style={{ maxWidth: "600px", textAlign: "center", lineHeight: "1.6" }}>
        VoxReview is a modern sentiment analysis and event feedback management system.
      </p>
      <Link to="/" style={{
        marginTop: "20px",
        padding: "10px 20px",
        backgroundColor: "#9333ea",
        color: "#ffffff",
        textDecoration: "none",
        borderRadius: "8px",
        fontWeight: "bold",
        boxShadow: "0 4px 6px -1px rgba(147, 51, 234, 0.4)"
      }}>
        Back to Home
      </Link>
    </div>
  );
};

export default About;
