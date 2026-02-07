import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Plus, Trash2, MapPin, Clock, Image as ImageIcon, IndianRupee } from 'lucide-react';

// 👇 FIX: Move this component OUTSIDE of ManagePackages
const InputGroup = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
      <Icon size={18} />
    </div>
    <input 
      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all hover:bg-white text-gray-900 placeholder-gray-400"
      {...props}
    />
  </div>
);

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', price: '', image: '', category: 'international', duration: '', location: '' });

  const fetchPackages = async () => {
    try {
      const { data } = await axios.get('http://localhost:5001/api/packages');
      setPackages(data);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  useEffect(() => { fetchPackages(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/packages', form, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchPackages();
      setForm({ title: '', price: '', image: '', category: 'international', duration: '', location: '' });
      alert('✨ Package added successfully!');
    } catch (err) {
      alert('Error adding package');
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm('Are you sure you want to remove this package?')) return;
    try {
      await axios.delete(`http://localhost:5001/api/packages/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchPackages();
    } catch (err) { alert('Error deleting package'); }
  };

  return (
    <div className="space-y-8 text-gray-900">
      <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600"><Plus size={18}/></span>
          Add New Package
        </h3>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <InputGroup icon={MapPin} placeholder="Package Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
          <InputGroup icon={IndianRupee} placeholder="Price" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
          <InputGroup icon={Clock} placeholder="Duration" value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} />
          <InputGroup icon={MapPin} placeholder="Location" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
          <InputGroup icon={ImageIcon} placeholder="Image URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} required />
          
          <div className="relative">
             <select 
              value={form.category} 
              onChange={e => setForm({...form, category: e.target.value})} 
              className="w-full h-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer text-gray-900"
             >
              <option value="international">🌍 International</option>
              <option value="india">🇮🇳 India</option>
              <option value="honeymoon">❤️ Honeymoon</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">▼</div>
          </div>

          <button type="submit" className="md:col-span-2 lg:col-span-3 bg-gray-900 hover:bg-black text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-gray-200 transition-all hover:scale-[1.01] active:scale-[0.98]">
            Create Package
          </button>
        </form>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">Existing Packages</h3>
          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{packages.length} items</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-gray-900 min-w-[800px]">
            <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-6 font-semibold">Package Info</th>
                <th className="p-6 font-semibold">Category</th>
                <th className="p-6 font-semibold">Price</th>
                <th className="p-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {packages.map(pkg => (
                <tr key={pkg._id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-24 rounded-xl overflow-hidden bg-gray-100 shadow-sm flex-shrink-0">
                        <img src={pkg.image} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{pkg.title}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1 mt-1"><Clock size={12}/> {pkg.duration}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                      ${pkg.category === 'honeymoon' ? 'bg-pink-100 text-pink-600' : 
                        pkg.category === 'india' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                      {pkg.category.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-6 font-semibold text-gray-700">{pkg.price}</td>
                  <td className="p-6 text-right">
                    <button 
                      onClick={() => handleDelete(pkg._id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
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

export default ManagePackages;