import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Search, Mail, Calendar } from 'lucide-react';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredCustomers = customers.filter(c => 
    c.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 text-gray-900">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Registered Customers</h2>
          <p className="text-gray-500 mt-1">Manage and view your client list.</p>
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search customers..." 
            className="w-full md:w-64 pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm text-gray-900 placeholder-gray-400"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* RESPONSIVE TABLE FIX */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-gray-900 min-w-[800px]">
            <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-6 font-semibold">User</th>
                <th className="p-6 font-semibold">Contact</th>
                <th className="p-6 font-semibold">Join Date</th>
                <th className="p-6 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredCustomers.map((c, index) => (
                <tr key={c._id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm flex-shrink-0
                        ${index % 3 === 0 ? 'bg-gradient-to-br from-indigo-400 to-indigo-600' : 
                          index % 3 === 1 ? 'bg-gradient-to-br from-pink-400 to-pink-600' : 'bg-gradient-to-br from-cyan-400 to-cyan-600'}`}>
                        {c.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{c.username}</div>
                        <div className="text-xs text-gray-400">ID: {c._id.slice(-6)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg w-fit">
                      <Mail size={14} className="text-indigo-400" />
                      <span className="text-sm">{c.email}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar size={14} />
                      <span className="text-sm">{new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;