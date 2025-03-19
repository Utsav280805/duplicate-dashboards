
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import {
  ArrowLeftRight,
  RefreshCw,
  Trash2,
  CheckCircle2,
  XCircle,
  Filter,
  AlertCircle
} from "lucide-react";

// Mock data for duplicates
const duplicatesData = [
  {
    id: "dup-1",
    records: [
      {
        id: "1",
        name: "John Smith",
        email: "john.smith@example.com",
        phone: "555-123-4567",
        city: "New York",
      },
      {
        id: "4",
        name: "John Smith",
        email: "john.smith2@example.com",
        phone: "555-444-5555",
        city: "New York",
      },
    ],
    similarity: 0.85,
    status: "pending",
  },
  {
    id: "dup-2",
    records: [
      {
        id: "5",
        name: "Sarah Williams",
        email: "sarah.williams@example.com",
        phone: "555-777-8888",
        city: "Miami",
      },
      {
        id: "8",
        name: "Sarah Williams",
        email: "sarah.w@example.com",
        phone: "555-333-4444",
        city: "Miami",
      },
    ],
    similarity: 0.78,
    status: "pending",
  },
  {
    id: "dup-3",
    records: [
      {
        id: "2",
        name: "Jane Doe",
        email: "jane.doe@example.com",
        phone: "555-987-6543",
        city: "Los Angeles",
      },
      {
        id: "9",
        name: "Jane D.",
        email: "jane.d@example.com",
        phone: "555-987-6500",
        city: "Los Angeles",
      },
    ],
    similarity: 0.72,
    status: "pending",
  },
];

const DuplicateDetection = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [duplicates, setDuplicates] = useState(duplicatesData);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedDuplicate, setSelectedDuplicate] = useState<string | null>("dup-1");

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleMergeDuplicates = (dupId: string) => {
    setDuplicates(
      duplicates.map((dup) =>
        dup.id === dupId ? { ...dup, status: "merged" } : dup
      )
    );
    
    toast({
      title: "Records merged",
      description: "The duplicate records have been successfully merged.",
    });
  };

  const handleIgnoreDuplicates = (dupId: string) => {
    setDuplicates(
      duplicates.map((dup) =>
        dup.id === dupId ? { ...dup, status: "ignored" } : dup
      )
    );
    
    toast({
      title: "Duplicates ignored",
      description: "The duplicate records have been marked as not duplicates.",
    });
  };

  const handleDeleteDuplicate = (dupId: string, recordId: string) => {
    const duplicate = duplicates.find((dup) => dup.id === dupId);
    if (!duplicate) return;
    
    if (duplicate.records.length <= 2) {
      setDuplicates(duplicates.filter((dup) => dup.id !== dupId));
    } else {
      setDuplicates(
        duplicates.map((dup) =>
          dup.id === dupId
            ? {
                ...dup,
                records: dup.records.filter((rec) => rec.id !== recordId),
              }
            : dup
        )
      );
    }
    
    toast({
      title: "Record deleted",
      description: "The record has been deleted successfully.",
    });
  };

  const filteredDuplicates = activeTab === "all" 
    ? duplicates 
    : duplicates.filter((dup) => dup.status === activeTab);

  const selectedDuplicateData = selectedDuplicate 
    ? duplicates.find((dup) => dup.id === selectedDuplicate) 
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-1 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Duplicate Detection</h1>
            <p className="text-slate-500 mt-2">
              Identify and resolve duplicate records in your database.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Duplicate Sets</CardTitle>
                  <CardDescription>
                    {duplicates.length} potential duplicate sets identified
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-3 mb-6">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="pending">Pending</TabsTrigger>
                      <TabsTrigger value="merged">Resolved</TabsTrigger>
                    </TabsList>
                    
                    <div className="space-y-3">
                      {filteredDuplicates.map((duplicate) => (
                        <div
                          key={duplicate.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                            selectedDuplicate === duplicate.id
                              ? "bg-blue-50 border-blue-200"
                              : "bg-white border-slate-100 hover:border-blue-100 hover:bg-blue-50/50"
                          }`}
                          onClick={() => setSelectedDuplicate(duplicate.id)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <p className="font-medium text-slate-900">
                              {duplicate.records[0].name}
                            </p>
                            <div className="flex items-center">
                              {duplicate.status === "pending" ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                                  Pending
                                </span>
                              ) : duplicate.status === "merged" ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                  Merged
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800">
                                  Ignored
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-sm text-slate-600">
                            <span>{duplicate.records.length} records</span>
                            <span>{Math.round(duplicate.similarity * 100)}% similar</span>
                          </div>
                        </div>
                      ))}
                      
                      {filteredDuplicates.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-8 text-center text-slate-500">
                          <AlertCircle className="h-8 w-8 mb-2 text-slate-400" />
                          <p>No duplicate sets found</p>
                          <p className="text-sm mt-1">
                            Try adjusting the filter settings
                          </p>
                        </div>
                      )}
                    </div>
                  </Tabs>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" className="w-full rounded-lg">
                    <Filter className="h-4 w-4 mr-2" />
                    Adjust Detection Settings
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              {selectedDuplicateData ? (
                <Card>
                  <CardHeader className="flex flex-row items-start justify-between pb-2">
                    <div>
                      <CardTitle className="text-lg">Duplicate Comparison</CardTitle>
                      <CardDescription>
                        Compare and resolve potential duplicate records
                      </CardDescription>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleIgnoreDuplicates(selectedDuplicateData.id)}
                        disabled={selectedDuplicateData.status !== "pending"}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Not Duplicates
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleMergeDuplicates(selectedDuplicateData.id)}
                        disabled={selectedDuplicateData.status !== "pending"}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Merge
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Field</TableHead>
                            {selectedDuplicateData.records.map((record, index) => (
                              <TableHead key={record.id}>
                                Record {index + 1}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="ml-2 h-6 w-6 p-0 text-slate-400 hover:text-red-500"
                                  onClick={() => handleDeleteDuplicate(selectedDuplicateData.id, record.id)}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">ID</TableCell>
                            {selectedDuplicateData.records.map((record) => (
                              <TableCell key={record.id}>{record.id}</TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Name</TableCell>
                            {selectedDuplicateData.records.map((record) => (
                              <TableCell key={record.id}>{record.name}</TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Email</TableCell>
                            {selectedDuplicateData.records.map((record) => (
                              <TableCell
                                key={record.id}
                                className={
                                  selectedDuplicateData.records[0].email !== record.email
                                    ? "bg-amber-50 text-amber-900"
                                    : ""
                                }
                              >
                                {record.email}
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Phone</TableCell>
                            {selectedDuplicateData.records.map((record) => (
                              <TableCell
                                key={record.id}
                                className={
                                  selectedDuplicateData.records[0].phone !== record.phone
                                    ? "bg-amber-50 text-amber-900"
                                    : ""
                                }
                              >
                                {record.phone}
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">City</TableCell>
                            {selectedDuplicateData.records.map((record) => (
                              <TableCell key={record.id}>{record.city}</TableCell>
                            ))}
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    
                    {selectedDuplicateData.status === "pending" ? (
                      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
                        <h3 className="font-semibold flex items-center mb-2">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Recommended Action
                        </h3>
                        <p className="text-sm">
                          These records appear to be duplicates. We recommend merging them into a single record, keeping the most detailed information from each.
                        </p>
                      </div>
                    ) : selectedDuplicateData.status === "merged" ? (
                      <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
                        <h3 className="font-semibold flex items-center mb-2">
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Records Merged
                        </h3>
                        <p className="text-sm">
                          These records have been successfully merged. The unified record contains the most accurate data from both sources.
                        </p>
                      </div>
                    ) : (
                      <div className="mt-6 bg-slate-50 border border-slate-200 rounded-lg p-4 text-slate-800">
                        <h3 className="font-semibold flex items-center mb-2">
                          <XCircle className="h-4 w-4 mr-2" />
                          Marked as Not Duplicates
                        </h3>
                        <p className="text-sm">
                          These records have been marked as not duplicates and will be maintained as separate entries in your database.
                        </p>
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter>
                    <div className="w-full flex items-center justify-between text-sm text-slate-500">
                      <span>Similarity Score: {Math.round(selectedDuplicateData.similarity * 100)}%</span>
                      <span className="flex items-center">
                        <ArrowLeftRight className="h-4 w-4 mr-1" />
                        Comparing {selectedDuplicateData.records.length} records
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              ) : (
                <Card className="h-full flex flex-col items-center justify-center p-12 text-center">
                  <AlertCircle className="h-12 w-12 text-slate-300 mb-4" />
                  <CardTitle className="text-lg mb-2">No Duplicate Set Selected</CardTitle>
                  <CardDescription className="max-w-md">
                    Select a potential duplicate set from the list to view and compare records.
                  </CardDescription>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DuplicateDetection;
