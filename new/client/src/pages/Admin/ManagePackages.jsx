import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { 
  Plus, Trash2, MapPin, Clock, Image as ImageIcon, 
  IndianRupee, Upload, Star, Layout, FileText 
} from 'lucide-react';

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
  
  const [form, setForm] = useState({ 
    title: '', 
    price: '', 
    image: '', 
    category: 'international', 
    duration: '', 
    location: '',
    description: '',
    isFeatured: false,
    backImage: '' 
  });

  // 👇 INPUT YOUR CLOUDINARY DATA HERE
  const cloudName = "dafdko2tk"; 
  const uploadPreset = "fuemyauo";

  const handleUpload = (field) => {
    if (!window.cloudinary) {
      alert("Cloudinary script not found. Please add it to index.html");
      return;
    }

    window.cloudinary.openUploadWidget(
      { 
        cloudName, 
        uploadPreset, 
        sources: ['local', 'url', 'camera'], 
        multiple: false,
        clientAllowedFormats: ["png", "jpg", "jpeg", "webp"]
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          // The result.info.secure_url is the input sent to the database
          setForm(prev => ({ ...prev, [field]: result.info.secure_url }));
        }
      }
    );
  };

  const fetchPackages = async () => {
    try {
      const { data } = await axios.get('http://localhost:5001/api/packages');
      setPackages(data);
    } catch (err) { 
      console.error(err); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { fetchPackages(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        gallery: form.backImage ? [form.backImage] : []
      };

      await axios.post('http://localhost:5001/api/packages', payload, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      
      fetchPackages();
      setForm({ title: '', price: '', image: '', category: 'international', duration: '', location: '', description: '', isFeatured: false, backImage: '' });
      alert('✨ Item added successfully!');
    } catch (err) {
      alert('Error adding item');
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm('Delete this item?')) return;
    try {
      await axios.delete(`http://localhost:5001/api/packages/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchPackages();
    } catch (err) { alert('Error deleting item'); }
  };

  return (
    <div className="space-y-8 text-gray-900 pb-10">
      <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600"><Plus size={18}/></span>
          Hybrid Content Manager
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <InputGroup icon={MapPin} placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
            <InputGroup icon={IndianRupee} placeholder="Price" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
            
            <div className="flex gap-2">
              <InputGroup icon={ImageIcon} placeholder="Image URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} required />
              <button type="button" onClick={() => handleUpload('image')} className="px-4 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors">
                <Upload size={18} />
              </button>
            </div>

            <InputGroup icon={Clock} placeholder="Duration" value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} />
            <InputGroup icon={MapPin} placeholder="Location" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
            
            <div className="relative">
               <select 
                value={form.category} 
                onChange={e => setForm({...form, category: e.target.value})} 
                className="w-full h-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer text-gray-900"
               >
                <option value="international">🌍 International</option>
                <option value="india">🇮🇳 India</option>
                <option value="honeymoon">❤️ Honeymoon</option>
                <option value="deal">🔥 Deal</option>
                <option value="flipcard-india">🎴 India Flipcard</option>
                <option value="flipcard-intl">🎴 Intl Flipcard</option>
                <option value="honeymoon-dest">🌹 Romantic Destination</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">▼</div>
            </div>

            {form.category.includes('flipcard') && (
              <div className="flex gap-2">
                <InputGroup icon={Layout} placeholder="Back Image URL" value={form.backImage} onChange={e => setForm({...form, backImage: e.target.value})} required />
                <button type="button" onClick={() => handleUpload('backImage')} className="px-4 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition-colors">
                  <Upload size={18} />
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputGroup icon={FileText} placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
              <input type="checkbox" id="featured" checked={form.isFeatured} onChange={e => setForm({...form, isFeatured: e.target.checked})} className="w-5 h-5 rounded text-indigo-600" />
              <label htmlFor="featured" className="text-gray-700 font-medium cursor-pointer flex items-center gap-2">
                <Star size={16} className={form.isFeatured ? "text-yellow-500 fill-yellow-500" : "text-gray-400"} />
                Mark as Featured
              </label>
            </div>
          </div>

          <button type="submit" className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-xl font-semibold shadow-lg transition-all active:scale-[0.98]">
            Push Content to Site
          </button>
        </form>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">Live Items</h3>
          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{packages.length} items</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody className="divide-y divide-gray-50">
              {packages.map(pkg => (
                <tr key={pkg._id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <img src={pkg.image} alt="" className="h-12 w-20 rounded-lg object-cover" />
                      <div className="font-bold">{pkg.title}</div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-indigo-50 text-indigo-600">
                      {pkg.category}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <button onClick={() => handleDelete(pkg._id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
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