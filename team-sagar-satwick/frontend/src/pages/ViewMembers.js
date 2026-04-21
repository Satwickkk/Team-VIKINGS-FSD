import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ViewMembers.css';

const API_URL = 'http://localhost:5000';

export default function ViewMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');

  useEffect(() => {
    axios.get('/api/members')
      .then(res => setMembers(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.role.toLowerCase().includes(search.toLowerCase()) ||
    (m.department || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this member?')) return;
    await axios.delete(`/api/members/${id}`);
    setMembers(members.filter(m => m._id !== id));
  };

  if (loading) return (
    <div className="container">
      <div className="loading-state">⏳ Loading members...</div>
    </div>
  );

  return (
    <div className="container">
      <div className="view-header">
        <div>
          <h1>Team Members</h1>
          <p>{members.length} member{members.length !== 1 ? 's' : ''} in the team</p>
        </div>
        <Link to="/add" className="btn btn-primary">➕ Add Member</Link>
      </div>

      {/* API Info Bar */}
      <div className="api-bar">
        <span className="api-method get">GET</span>
        <span className="api-url">/api/members</span>
        <span className="api-note">Fetched {members.length} documents from MongoDB</span>
      </div>

      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="🔍  Search by name, role or department..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Members Grid */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="icon">👥</div>
          <h3>No members found</h3>
          <p>{members.length === 0 ? 'Add your first team member to get started' : 'No members match your search'}</p>
          {members.length === 0 && <Link to="/add" className="btn btn-primary" style={{ marginTop: 16 }}>Add First Member</Link>}
        </div>
      ) : (
        <div className="members-grid">
          {filtered.map(m => (
            <div key={m._id} className="member-card card">
              <div className="member-img-wrap">
                {m.image ? (
                  <img src={`${API_URL}/uploads/${m.image}`} alt={m.name} className="member-img" />
                ) : (
                  <div className="member-avatar">{m.name[0]?.toUpperCase()}</div>
                )}
              </div>
              <div className="member-body">
                <div className="member-name">{m.name}</div>
                <div className="member-role">{m.role}</div>
                {m.department && <div className="member-dept">🏛 {m.department}</div>}
                {m.email && <div className="member-email">✉️ {m.email}</div>}
              </div>
              <div className="member-footer">
                <Link to={`/members/${m._id}`} className="btn btn-outline" style={{ fontSize: 13, padding: '8px 16px' }}>
                  View Details
                </Link>
                <button className="btn btn-danger" style={{ fontSize: 13, padding: '8px 16px' }} onClick={() => handleDelete(m._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
