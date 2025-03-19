
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { FileSpreadsheet, Database, AlertCircle, CheckCircle2, RefreshCcw, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for charts
const duplicateData = [
  { name: "Jan", duplicates: 65 },
  { name: "Feb", duplicates: 59 },
  { name: "Mar", duplicates: 80 },
  { name: "Apr", duplicates: 81 },
  { name: "May", duplicates: 56 },
  { name: "Jun", duplicates: 55 },
  { name: "Jul", duplicates: 40 }
];

const pieData = [
  { name: "Unique Records", value: 400 },
  { name: "Potential Duplicates", value: 45 },
  { name: "Confirmed Duplicates", value: 30 }
];

const COLORS = ["#3b82f6", "#f59e0b", "#ef4444"];

const statCards = [
  {
    title: "Total Records",
    value: "475",
    icon: Database,
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Duplicate Records",
    value: "75",
    icon: AlertCircle,
    color: "bg-amber-50 text-amber-600"
  },
  {
    title: "Resolved Duplicates",
    value: "30",
    icon: CheckCircle2,
    color: "bg-green-50 text-green-600"
  },
  {
    title: "Last Updated",
    value: "2 hours ago",
    icon: RefreshCcw,
    color: "bg-indigo-50 text-indigo-600"
  }
];

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading delay for animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-1 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className={`transition-all duration-700 transform ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
              <p className="text-slate-500 mt-2">
                Welcome back, {user?.name}. Here's an overview of your data.
              </p>
            </header>

            {/* Stats grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {statCards.map((stat, index) => (
                <div 
                  key={index}
                  className={`transition-all duration-700 delay-[${index * 100}ms] transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                  <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                        <p className="text-2xl font-bold mt-2 text-slate-900">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${stat.color}`}>
                        <stat.icon className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
                <h2 className="text-lg font-semibold mb-6">Duplicate Trends</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={duplicateData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          borderRadius: '0.5rem',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                          border: '1px solid rgb(241, 245, 249)'
                        }} 
                      />
                      <Legend />
                      <Bar dataKey="duplicates" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
                <h2 className="text-lg font-semibold mb-6">Data Distribution</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          borderRadius: '0.5rem',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                          border: '1px solid rgb(241, 245, 249)'
                        }} 
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
              <h2 className="text-lg font-semibold mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button 
                  variant="outline" 
                  className="h-auto py-6 rounded-xl border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex flex-col items-center text-center">
                    <Upload className="h-6 w-6 mb-3 text-blue-600" />
                    <span className="font-medium">Upload Data</span>
                    <span className="text-xs text-slate-500 mt-1">Import CSV or Excel</span>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto py-6 rounded-xl border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex flex-col items-center text-center">
                    <FileSpreadsheet className="h-6 w-6 mb-3 text-blue-600" />
                    <span className="font-medium">Export Report</span>
                    <span className="text-xs text-slate-500 mt-1">Download as Excel</span>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto py-6 rounded-xl border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex flex-col items-center text-center">
                    <AlertCircle className="h-6 w-6 mb-3 text-blue-600" />
                    <span className="font-medium">Review Duplicates</span>
                    <span className="text-xs text-slate-500 mt-1">45 duplicates found</span>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto py-6 rounded-xl border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex flex-col items-center text-center">
                    <Database className="h-6 w-6 mb-3 text-blue-600" />
                    <span className="font-medium">Manage Data</span>
                    <span className="text-xs text-slate-500 mt-1">View and edit records</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
