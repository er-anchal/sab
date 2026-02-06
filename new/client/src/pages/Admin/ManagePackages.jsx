import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const { user } = useAuth();
  const [form, setForm] = useState({ title: '', price: '', image: '', category: 'international', duration: '', location: '' });

  const fetchPackages = async () => {
    const { data } = await axios.get('http://localhost:5000/api/packages');
    setPackages(data);
  };

  useEffect(() => { fetchPackages(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/packages', form, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchPackages();
      setForm({ title: '', price: '', image: '', category: 'international', duration: '', location: '' });
      alert('Package added!');
    } catch (err) {
      alert('Error adding package');
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm('Delete this package?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/packages/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchPackages();
    } catch (err) {
      alert('Error deleting package');
    }
  };

  return (
    <div>
      <h2>Manage Packages</h2>
      <form onSubmit={handleSubmit} style={{background: 'white', padding: '20px', marginBottom: '20px', display: 'grid', gap: '10px'}}>
        <input placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required style={{padding: '8px'}}/>
        <input placeholder="Price" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required style={{padding: '8px'}}/>
        <input placeholder="Image URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} required style={{padding: '8px'}}/>
        <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} style={{padding: '8px'}}>
          <option value="international">International</option>
          <option value="india">India</option>
          <option value="honeymoon">Honeymoon</option>
        </select>
        <button type="submit" style={{background: '#2563eb', color: 'white', padding: '10px', border: 'none'}}>Add Package</button>
      </form>

      <table className="admin-table">
        <thead><tr><th>Title</th><th>Price</th><th>Category</th><th>Action</th></tr></thead>
        <tbody>
          {packages.map(pkg => (
            <tr key={pkg._id}>
              <td>{pkg.title}</td>
              <td>{pkg.price}</td>
              <td>{pkg.category}</td>
              <td><button onClick={() => handleDelete(pkg._id)} style={{color: 'red'}}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ManagePackages;