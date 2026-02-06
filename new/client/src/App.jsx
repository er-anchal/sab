import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AuthForm from './pages/AuthForm.jsx'
import IndiaTrips from './pages/IndiaTrips.jsx'
import InternationalTrips from './pages/InternationalTrips.jsx'
import Honeymoon from './pages/Honeymoon.jsx'
import About from './pages/About.jsx'
import ScrollToTop from './components/common/ScrollToTop';
// Import the new button
import FloatingContactButton from './components/common/FloatingContactButton'; 
import { useAuth } from './context/AuthContext';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManagePackages from './pages/Admin/ManagePackages';
import Customers from './pages/Admin/Customers';

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  return user && user.isAdmin ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <div>
      <ScrollToTop />
      
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/india" element={<IndiaTrips />} />
        <Route path="/international" element={<InternationalTrips />} />
        <Route path="/honeymoon" element={<Honeymoon />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>}>
           <Route path="dashboard" element={<h2>Welcome to Dashboard</h2>} />
           <Route path="packages" element={<ManagePackages />} />
           <Route path="customers" element={<Customers />} />
        </Route>
      </Routes>

      {/* Global Floating Button */}
      <FloatingContactButton />
    </div>
  )
}

export default App