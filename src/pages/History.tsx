
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Search,
  Download,
  Calendar,
  User,
  Filter,
  ArrowUpDown,
} from "lucide-react";

// Mock data for history logs
const historyData = [
  {
    id: "log-1",
    action: "Import",
    details: "Imported 100 records from customers.csv",
    user: "John Doe",
    timestamp: "2023-06-15T10:30:00",
    result: "success",
  },
  {
    id: "log-2",
    action: "Merge",
    details: "Merged 2 duplicate records (ID: 42, 45)",
    user: "Jane Smith",
    timestamp: "2023-06-15T11:45:00",
    result: "success",
  },
  {
    id: "log-3",
    action: "Delete",
    details: "Deleted duplicate record (ID: 78)",
    user: "John Doe",
    timestamp: "2023-06-14T14:20:00",
    result: "success",
  },
  {
    id: "log-4",
    action: "Export",
    details: "Exported 250 records to quarterly-report.xlsx",
    user: "Admin",
    timestamp: "2023-06-14T09:10:00",
    result: "success",
  },
  {
    id: "log-5",
    action: "Import",
    details: "Attempted to import leads.csv, invalid format",
    user: "Jane Smith",
    timestamp: "2023-06-13T16:05:00",
    result: "failed",
  },
  {
    id: "log-6",
    action: "Update",
    details: "Updated duplicate detection settings: Threshold 75%",
    user: "Admin",
    timestamp: "2023-06-12T11:30:00",
    result: "success",
  },
  {
    id: "log-7",
    action: "Scan",
    details: "Performed duplicate scan on 500 records",
    user: "John Doe",
    timestamp: "2023-06-11T10:15:00",
    result: "success",
  },
  {
    id: "log-8",
    action: "Update",
    details: "Updated record (ID: 156) fields: email, phone",
    user: "Jane Smith",
    timestamp: "2023-06-10T14:45:00",
    result: "success",
  },
];

const History = () => {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Filter logs
  const filteredLogs = historyData.filter((log) => {
    // Text search
    const matchesSearch =
      searchQuery === "" ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase());

    // Action filter
    const matchesAction = actionFilter === "all" || log.action === actionFilter;

    // User filter
    const matchesUser = userFilter === "all" || log.user === userFilter;

    // Date filter
    let matchesDate = true;
    const logDate = new Date(log.timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);

    if (dateFilter === "today") {
      matchesDate = logDate.toDateString() === today.toDateString();
    } else if (dateFilter === "yesterday") {
      matchesDate = logDate.toDateString() === yesterday.toDateString();
    } else if (dateFilter === "week") {
      matchesDate = logDate >= lastWeek;
    } else if (dateFilter === "month") {
      matchesDate = logDate >= lastMonth;
    }

    return matchesSearch && matchesAction && matchesUser && matchesDate;
  });

  // Get unique users for filter
  const uniqueUsers = Array.from(new Set(historyData.map((log) => log.user)));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-1 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Activity History</h1>
            <p className="text-slate-500 mt-2">
              View and track all actions performed on your data.
            </p>
          </header>

          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b border-slate-100">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                <div className="md:col-span-4 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search activity logs..."
                    className="pl-9 rounded-lg border-slate-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="text-sm text-slate-500 mb-1.5 block">
                    <Calendar className="inline h-4 w-4 mr-1 -mt-0.5" />
                    Date Range
                  </label>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="rounded-lg border-slate-200">
                      <SelectValue placeholder="All dates" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All dates</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="yesterday">Yesterday</SelectItem>
                      <SelectItem value="week">Last 7 days</SelectItem>
                      <SelectItem value="month">Last 30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="text-sm text-slate-500 mb-1.5 block">
                    <User className="inline h-4 w-4 mr-1 -mt-0.5" />
                    User
                  </label>
                  <Select value={userFilter} onValueChange={setUserFilter}>
                    <SelectTrigger className="rounded-lg border-slate-200">
                      <SelectValue placeholder="All users" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All users</SelectItem>
                      {uniqueUsers.map((user) => (
                        <SelectItem key={user} value={user}>
                          {user}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="text-sm text-slate-500 mb-1.5 block">
                    <Filter className="inline h-4 w-4 mr-1 -mt-0.5" />
                    Action Type
                  </label>
                  <Select value={actionFilter} onValueChange={setActionFilter}>
                    <SelectTrigger className="rounded-lg border-slate-200">
                      <SelectValue placeholder="All actions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All actions</SelectItem>
                      <SelectItem value="Import">Import</SelectItem>
                      <SelectItem value="Export">Export</SelectItem>
                      <SelectItem value="Merge">Merge</SelectItem>
                      <SelectItem value="Delete">Delete</SelectItem>
                      <SelectItem value="Update">Update</SelectItem>
                      <SelectItem value="Scan">Scan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="md:col-span-2">
                  <Button variant="outline" className="rounded-lg w-full border-slate-200">
                    <Download className="h-4 w-4 mr-2" />
                    Export Log
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">
                      <div className="flex items-center">
                        Action
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Details
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        User
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Date & Time
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              log.action === "Import"
                                ? "bg-blue-100 text-blue-800"
                                : log.action === "Export"
                                ? "bg-indigo-100 text-indigo-800"
                                : log.action === "Merge"
                                ? "bg-purple-100 text-purple-800"
                                : log.action === "Delete"
                                ? "bg-red-100 text-red-800"
                                : log.action === "Update"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {log.action}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium text-slate-900">
                          {log.details}
                        </TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell>{formatDate(log.timestamp)}</TableCell>
                        <TableCell>
                          {log.result === "success" ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Success
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Failed
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-slate-500">
                        No activity logs match your filters
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            <div className="py-4 px-6 bg-slate-50 border-t border-slate-100 text-sm text-slate-500">
              Showing {filteredLogs.length} of {historyData.length} logs
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default History;
