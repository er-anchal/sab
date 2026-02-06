import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Admin.css';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <Link to="packages">Manage Packages</Link>
          <Link to="customers">Customers</Link>
        </nav>
        <button onClick={() => { logout(); navigate('/login'); }} style={{marginTop: '20px', padding: '10px', background: '#dc2626', color: 'white', border: 'none', cursor: 'pointer', width: '100%'}}>
          Logout
        </button>
      </div>
      <div className="admin-content">
        <header style={{marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px'}}>
          <h3>Welcome, {user?.username}</h3>
        </header>
        <Outlet />
      </div>
    </div>
  );
};
export default AdminDashboard;