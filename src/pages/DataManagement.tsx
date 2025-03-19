
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Search,
  MoreHorizontal,
  Upload,
  Download,
  Plus,
  Edit,
  Trash2,
  Copy,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

// Mock data for the table
const initialData = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "555-123-4567",
    city: "New York",
    status: "unique",
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "555-987-6543",
    city: "Los Angeles",
    status: "unique",
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    phone: "555-222-3333",
    city: "Chicago",
    status: "unique",
  },
  {
    id: "4",
    name: "John Smith",
    email: "john.smith2@example.com",
    phone: "555-444-5555",
    city: "New York",
    status: "duplicate",
  },
  {
    id: "5",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "555-777-8888",
    city: "Miami",
    status: "unique",
  },
  {
    id: "6",
    name: "David Brown",
    email: "david.brown@example.com",
    phone: "555-666-9999",
    city: "Seattle",
    status: "unique",
  },
  {
    id: "7",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "555-111-2222",
    city: "Boston",
    status: "unique",
  },
  {
    id: "8",
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    phone: "555-333-4444",
    city: "Miami",
    status: "duplicate",
  },
];

const DataManagement = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRecord((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddRecord = () => {
    const id = (data.length + 1).toString();
    const record = {
      id,
      ...newRecord,
      status: "unique",
    };
    
    setData([...data, record]);
    setNewRecord({
      name: "",
      email: "",
      phone: "",
      city: "",
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Record added",
      description: "The new record has been added successfully.",
    });
  };

  const handleDeleteRecord = (id: string) => {
    setData(data.filter((item) => item.id !== id));
    
    toast({
      title: "Record deleted",
      description: "The record has been deleted successfully.",
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // This would be where you'd process the uploaded file
      // For now, we'll just show a toast
      toast({
        title: "File uploaded",
        description: `File "${file.name}" has been uploaded.`,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-1 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Data Management</h1>
            <p className="text-slate-500 mt-2">
              Manage your data records, import new data, and identify duplicates.
            </p>
          </header>

          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden mb-8">
            <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative w-full sm:w-auto flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search records..."
                  className="pl-9 rounded-lg border-slate-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative">
                  <input
                    type="file"
                    id="file-upload"
                    className="sr-only"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Import
                  </label>
                </div>
                
                <Button variant="outline" className="rounded-lg border-slate-200">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="rounded-lg">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Record
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add New Record</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Enter name"
                          value={newRecord.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          placeholder="Enter email"
                          value={newRecord.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="Enter phone number"
                          value={newRecord.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          placeholder="Enter city"
                          value={newRecord.city}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button type="button" onClick={handleAddRecord}>
                        Save Record
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length > 0 ? (
                    filteredData.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.id}</TableCell>
                        <TableCell>{record.name}</TableCell>
                        <TableCell>{record.email}</TableCell>
                        <TableCell>{record.phone}</TableCell>
                        <TableCell>{record.city}</TableCell>
                        <TableCell>
                          {record.status === "unique" ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Unique
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Potential Duplicate
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteRecord(record.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-slate-500">
                        No records found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            <div className="py-4 px-6 bg-slate-50 border-t border-slate-100 text-sm text-slate-500">
              Showing {filteredData.length} of {data.length} records
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DataManagement;
