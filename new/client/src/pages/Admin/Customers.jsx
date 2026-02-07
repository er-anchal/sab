import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Search, Mail, Calendar, Phone, MessageSquare, Trash2 } from 'lucide-react';

const Customers = () => {
  const [inquiries, setInquiries] = useState([]); // Changed state to 'inquiries'
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        // ✅ FIX: Now fetching from the correct Inquiries endpoint
        const { data } = await axios.get('http://localhost:5001/api/inquiries', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setInquiries(data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    fetchInquiries();
  }, [user]);

  // Handle Delete (Optional but useful for admin)
  const handleDelete = async (id) => {
    if(!window.confirm("Delete this message?")) return;
    try {
        await axios.delete(`http://localhost:5001/api/inquiries/${id}`, {
            headers: { Authorization: `Bearer ${user.token}` }
        });
        setInquiries(inquiries.filter(i => i._id !== id));
    } catch (err) {
        alert("Failed to delete");
    }
  };

  const filteredInquiries = inquiries.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.source && c.source.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 text-gray-900">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Messages</h2>
          <p className="text-gray-500 mt-1">View inquiries from Contact Forms & Modal.</p>
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search inquiries..." 
            className="w-full md:w-64 pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm text-gray-900 placeholder-gray-400"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-gray-900 min-w-[800px]">
            <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-6 font-semibold">Customer</th>
                <th className="p-6 font-semibold">Source</th>
                <th className="p-6 font-semibold">Message</th>
                <th className="p-6 font-semibold">Date</th>
                <th className="p-6 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredInquiries.map((inquiry, index) => (
                <tr key={inquiry._id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      {/* Avatar Circle with Initials */}
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm flex-shrink-0
                        ${index % 3 === 0 ? 'bg-gradient-to-br from-indigo-400 to-indigo-600' : 
                          index % 3 === 1 ? 'bg-gradient-to-br from-pink-400 to-pink-600' : 'bg-gradient-to-br from-cyan-400 to-cyan-600'}`}>
                        {inquiry.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{inquiry.name}</div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Mail size={10} /> {inquiry.email}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Phone size={10} /> {inquiry.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                      {inquiry.source || 'Website'}
                    </span>
                  </td>
                  <td className="p-6 max-w-xs">
                    <div className="flex gap-2 items-start text-gray-600 text-sm">
                        <MessageSquare size={14} className="mt-1 flex-shrink-0"/>
                        <p className="line-clamp-2">{inquiry.message}</p>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar size={14} />
                      <span className="text-sm">{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <button 
                        onClick={() => handleDelete(inquiry._id)}
                        className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete Message"
                    >
                        <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredInquiries.length === 0 && (
                  <tr>
                      <td colSpan="5" className="p-8 text-center text-gray-400">No messages found.</td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;