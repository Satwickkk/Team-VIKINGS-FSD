import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const loc = useLocation();
  const active = (path) => loc.pathname === path ? 'nav-link active' : 'nav-link';

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        Team <span>VIKINGS</span>
      </div>
      <div className="navbar-links">
        <Link to="/" className={active('/')}>Home</Link>
        <Link to="/add" className={active('/add')}>Add Member</Link>
        <Link to="/members" className={active('/members')}>View Members</Link>
      </div>
    </nav>
  );
}
