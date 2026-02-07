import React from 'react';
import { Users, Package, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, change, trend, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
        {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        <span>{change}</span>
        <span className="text-gray-400 font-normal ml-1">vs last month</span>
      </div>
    </div>
    <div className={`p-3 rounded-2xl ${color}`}>
      <Icon size={24} className="text-gray-900 opacity-80" />
    </div>
  </div>
);

const DashboardOverview = () => {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Bookings" 
          value="1,284" 
          change="+12%" 
          trend="up" 
          icon={Calendar} 
          color="bg-indigo-100 text-indigo-600" 
        />
        <StatCard 
          title="Active Users" 
          value="842" 
          change="+5.2%" 
          trend="up" 
          icon={Users} 
          color="bg-pink-100 text-pink-600" 
        />
        <StatCard 
          title="Total Revenue" 
          value="₹4.2L" 
          change="+8%" 
          trend="up" 
          icon={TrendingUp} 
          color="bg-green-100 text-green-600" 
        />
        <StatCard 
          title="Active Packages" 
          value="24" 
          change="-2%" 
          trend="down" 
          icon={Package} 
          color="bg-orange-100 text-orange-600" 
        />
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Chart Placeholder / Large Widget */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Revenue Analytics</h3>
            <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-2 text-gray-600 outline-none">
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="h-64 bg-gray-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">Chart Visualization Placeholder</p>
          </div>
        </div>

        {/* Right: Recent Activity Feed */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex gap-4 items-start">
                <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500 shrink-0" />
                <div>
                  <p className="text-sm text-gray-800 font-medium">New booking for "Kerala Bliss"</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;