import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Banner */}
      <div className="hero">
        <div className="hero-badge">21CSS301T — Full Stack Development</div>
        <h1 className="hero-title">
          Team <span>VIKINGS</span>
        </h1>
        <p className="hero-subtitle">
          Student Team Members Management Application
        </p>
        <p className="hero-desc">
          A full-stack web application built with React.js, Node.js, Express, and MongoDB
          to manage and display team member information.
        </p>
        <div className="hero-btns">
          <Link to="/add" className="btn btn-primary hero-btn">
            ➕ Add Member
          </Link>
          <Link to="/members" className="btn btn-outline hero-btn">
            👥 View Members
          </Link>
        </div>
      </div>

      {/* Team Cards */}
      <div className="container">
        <h2 className="section-title">Our Team</h2>
        <div className="team-grid">

          <div className="team-card">
            <div className="team-avatar blue">S</div>
            <div className="team-info">
              <div className="team-name">Sagar satya</div>
              <div className="team-role">Full Stack Developer</div>
              <div className="team-reg">Reg No: RA2311056010332</div>
              <div className="team-dept">Dept: Computer Science & Engineering</div>
            </div>
          </div>

          <div className="team-card">
            <div className="team-avatar purple">S</div>
            <div className="team-info">
              <div className="team-name">Satwick</div>
              <div className="team-role">Full Stack Developer</div>
              <div className="team-reg">Reg No: RA2311056010314</div>
              <div className="team-dept">Dept: Computer Science & Engineering</div>
            </div>
          </div>

        </div>

        {/* Tech Stack */}
        <h2 className="section-title" style={{ marginTop: 48 }}>Tech Stack</h2>
        <div className="tech-grid">
          <div className="tech-card">
            <div className="tech-icon">⚛️</div>
            <div className="tech-name">React.js</div>
            <div className="tech-desc">Frontend UI with React Router</div>
          </div>
          <div className="tech-card">
            <div className="tech-icon">🟩</div>
            <div className="tech-name">Node.js</div>
            <div className="tech-desc">JavaScript runtime for backend</div>
          </div>
          <div className="tech-card">
            <div className="tech-icon">🚂</div>
            <div className="tech-name">Express.js</div>
            <div className="tech-desc">REST API framework</div>
          </div>
          <div className="tech-card">
            <div className="tech-icon">🍃</div>
            <div className="tech-name">MongoDB</div>
            <div className="tech-desc">NoSQL database storage</div>
          </div>
          <div className="tech-card">
            <div className="tech-icon">📦</div>
            <div className="tech-name">Multer</div>
            <div className="tech-desc">Image upload handling</div>
          </div>
          <div className="tech-card">
            <div className="tech-icon">🔗</div>
            <div className="tech-name">Axios</div>
            <div className="tech-desc">HTTP client for API calls</div>
          </div>
        </div>
      </div>
    </div>
  );
}
