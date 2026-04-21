import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddMember.css';

export default function AddMember() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', role: '', email: '', phone: '', department: '', bio: ''
  });
  const [image, setImage]     = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert]     = useState(null);
  const [errors, setErrors]   = useState({});

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = e => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim())  errs.name  = 'Name is required';
    if (!form.role.trim())  errs.role  = 'Role is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setAlert(null);

    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      if (image) data.append('image', image);

      await axios.post('/api/members', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setAlert({ type: 'success', msg: '✅ Member added successfully!' });
      setForm({ name: '', role: '', email: '', phone: '', department: '', bio: '' });
      setImage(null);
      setPreview(null);
      setTimeout(() => navigate('/members'), 1500);
    } catch (err) {
      setAlert({ type: 'error', msg: '❌ ' + (err.response?.data?.message || 'Failed to add member') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Add New Member</h1>
        <p>Fill in the details to add a new team member</p>
      </div>

      <div className="add-layout">
        {/* Form */}
        <div className="card add-card">
          {alert && <div className={`alert alert-${alert.type}`}>{alert.msg}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input name="name" placeholder="e.g. Sagar Raj" value={form.name} onChange={handleChange} />
                {errors.name && <span className="err">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label>Role *</label>
                <input name="role" placeholder="e.g. Full Stack Developer" value={form.role} onChange={handleChange} />
                {errors.role && <span className="err">{errors.role}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email Address *</label>
                <input name="email" type="email" placeholder="example@srm.edu.in" value={form.email} onChange={handleChange} />
                {errors.email && <span className="err">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input name="phone" placeholder="e.g. 9876543210" value={form.phone} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label>Department</label>
              <select name="department" value={form.department} onChange={handleChange}>
                <option value="">Select department</option>
                <option>Computer Science & Engineering</option>
                <option>Electronics & Communication</option>
                <option>Mechanical Engineering</option>
                <option>Information Technology</option>
                <option>Civil Engineering</option>
                <option>Artificial Intelligence & ML</option>
              </select>
            </div>

            <div className="form-group">
              <label>Bio / About</label>
              <textarea name="bio" rows={3} placeholder="Brief description about the member..." value={form.bio} onChange={handleChange} />
            </div>

            {/* Image Upload */}
            <div className="form-group">
              <label>Profile Photo</label>
              <div className="upload-box" onClick={() => document.getElementById('imgInput').click()}>
                {preview ? (
                  <img src={preview} alt="preview" className="img-preview" />
                ) : (
                  <div className="upload-placeholder">
                    <div className="upload-icon">📷</div>
                    <div className="upload-text">Click to upload your photo</div>
                    <div className="upload-hint">JPG, PNG, WEBP up to 5MB</div>
                  </div>
                )}
              </div>
              <input id="imgInput" type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
              {preview && (
                <button type="button" className="remove-img" onClick={() => { setImage(null); setPreview(null); }}>
                  Remove photo
                </button>
              )}
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button type="submit" className="btn btn-primary" disabled={loading} style={{ flex: 1, padding: 13 }}>
                {loading ? 'Adding...' : '➕ Add Member'}
              </button>
              <button type="button" className="btn btn-outline" onClick={() => navigate('/members')} style={{ padding: '13px 24px' }}>
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Info Panel */}
        <div className="info-panel">
          <div className="card info-card">
            <h3>📋 API Used</h3>
            <div className="api-badge">POST /api/members</div>
            <p>Sends form data (including image) to the backend using Axios with multipart/form-data content type. The backend saves the image to the uploads/ folder and stores the filename in MongoDB.</p>
          </div>
          <div className="card info-card">
            <h3>✅ Required Fields</h3>
            <ul className="req-list">
              <li>Full Name</li>
              <li>Role / Designation</li>
              <li>Email Address</li>
            </ul>
            <h3 style={{ marginTop: 12 }}>📎 Optional Fields</h3>
            <ul className="req-list">
              <li>Phone Number</li>
              <li>Department</li>
              <li>Bio</li>
              <li>Profile Photo</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
