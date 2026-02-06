import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/admin/customers', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setCustomers(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCustomers();
  }, [user]);

  return (
    <div>
      <h2>Registered Customers</h2>
      <table className="admin-table">
        <thead><tr><th>Name</th><th>Email</th><th>Joined</th></tr></thead>
        <tbody>
          {customers.map(c => (
            <tr key={c._id}>
              <td>{c.username}</td>
              <td>{c.email}</td>
              <td>{new Date(c.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Customers;