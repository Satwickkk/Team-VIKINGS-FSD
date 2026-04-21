import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './MemberDetails.css';

const API_URL = 'http://localhost:5000';

export default function MemberDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState('');

  useEffect(() => {
    axios.get(`/api/members/${id}`)
      .then(res => setMember(res.data))
      .catch(() => setError('Member not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this member permanently?')) return;
    await axios.delete(`/api/members/${id}`);
    navigate('/members');
  };

  if (loading) return <div className="container"><div className="loading-state">⏳ Loading...</div></div>;
  if (error)   return (
    <div className="container">
      <div className="error-state">
        <div style={{ fontSize: 48, marginBottom: 12 }}>❌</div>
        <h3>{error}</h3>
        <Link to="/members" className="btn btn-primary" style={{ marginTop: 16 }}>← Back to Members</Link>
      </div>
    </div>
  );

  return (
    <div className="container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Home</Link> &rsaquo;
        <Link to="/members">Members</Link> &rsaquo;
        <span>{member.name}</span>
      </div>

      {/* API Info Bar */}
      <div className="api-bar-detail">
        <span className="api-method-get">GET</span>
        <span className="api-url-text">/api/members/{id}</span>
      </div>

      <div className="detail-layout">
        {/* Photo Panel */}
        <div className="photo-panel card">
          {member.image ? (
            <img src={`${API_URL}/uploads/${member.image}`} alt={member.name} className="detail-photo" />
          ) : (
            <div className="detail-avatar">{member.name[0]?.toUpperCase()}</div>
          )}
          <div className="photo-name">{member.name}</div>
          <div className="photo-role">{member.role}</div>
          {member.department && <div className="photo-dept">🏛 {member.department}</div>}
          <div className="photo-actions">
            <button className="btn btn-danger" style={{ width: '100%', padding: 11 }} onClick={handleDelete}>
              🗑 Delete Member
            </button>
            <Link to="/members" className="btn btn-outline" style={{ width: '100%', padding: 11, textAlign: 'center', display: 'block', marginTop: 8 }}>
              ← Back to List
            </Link>
          </div>
        </div>

        {/* Info Panel */}
        <div className="detail-info">
          <div className="card info-section">
            <h2 className="info-title">Member Details</h2>

            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">Full Name</div>
                <div className="info-value">{member.name}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Role</div>
                <div className="info-value role-value">{member.role}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Email Address</div>
                <div className="info-value">
                  <a href={`mailto:${member.email}`} className="email-link">{member.email}</a>
                </div>
              </div>
              {member.phone && (
                <div className="info-item">
                  <div className="info-label">Phone Number</div>
                  <div className="info-value">{member.phone}</div>
                </div>
              )}
              {member.department && (
                <div className="info-item">
                  <div className="info-label">Department</div>
                  <div className="info-value">{member.department}</div>
                </div>
              )}
              <div className="info-item">
                <div className="info-label">Member ID</div>
                <div className="info-value id-value">{member._id}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Date Added</div>
                <div className="info-value">
                  {new Date(member.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
            </div>

            {member.bio && (
              <div className="bio-section">
                <div className="info-label">About</div>
                <p className="bio-text">{member.bio}</p>
              </div>
            )}
          </div>

          {/* Raw JSON (API response preview) */}
          <div className="card info-section" style={{ marginTop: 16 }}>
            <h3 className="info-title" style={{ fontSize: 14 }}>📡 API Response — JSON</h3>
            <pre className="json-preview">{JSON.stringify(member, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
