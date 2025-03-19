
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  Save,
  User,
  Settings2,
  FileSpreadsheet,
  AlertTriangle,
  Bell,
  Shield,
  RefreshCw,
} from "lucide-react";

const Settings = () => {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("detection");
  
  // Detection settings
  const [matchThreshold, setMatchThreshold] = useState(70);
  const [matchMethod, setMatchMethod] = useState("fuzzy");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [includeFields, setIncludeFields] = useState(["name", "email", "phone"]);
  
  // Import settings
  const [duplicateHandling, setDuplicateHandling] = useState("flag");
  const [headerRow, setHeaderRow] = useState(true);
  const [delimiter, setDelimiter] = useState("comma");
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [duplicateAlerts, setDuplicateAlerts] = useState(true);
  const [importAlerts, setImportAlerts] = useState(true);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-1 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
            <p className="text-slate-500 mt-2">
              Customize your duplicate detection and data management preferences.
            </p>
          </header>

          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border-b border-slate-100">
                <div className="px-4 sm:px-6 flex overflow-x-auto">
                  <TabsList className="h-14 items-center justify-start bg-transparent p-0 w-full">
                    <TabsTrigger
                      value="detection"
                      className="h-14 px-4 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:shadow-none"
                    >
                      <Settings2 className="h-4 w-4 mr-2" />
                      Duplicate Detection
                    </TabsTrigger>
                    <TabsTrigger
                      value="import"
                      className="h-14 px-4 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:shadow-none"
                    >
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                      Import Settings
                    </TabsTrigger>
                    <TabsTrigger
                      value="notifications"
                      className="h-14 px-4 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:shadow-none"
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger
                      value="account"
                      className="h-14 px-4 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:shadow-none"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Account
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>
              
              <div className="p-6">
                <TabsContent value="detection" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Settings2 className="h-5 w-5 mr-2 text-blue-600" />
                        Duplicate Detection Settings
                      </h3>
                      <p className="text-sm text-slate-500 mb-6">
                        Configure how the system identifies potential duplicate records.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-end">
                          <Label htmlFor="match-threshold">Match Threshold ({matchThreshold}%)</Label>
                          <span className="text-xs text-slate-500">Higher = stricter matching</span>
                        </div>
                        <Slider
                          id="match-threshold"
                          defaultValue={[matchThreshold]}
                          max={100}
                          min={0}
                          step={5}
                          onValueChange={(value) => setMatchThreshold(value[0])}
                          className="py-2"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="match-method">Matching Method</Label>
                          <Select value={matchMethod} onValueChange={setMatchMethod}>
                            <SelectTrigger id="match-method" className="w-full">
                              <SelectValue placeholder="Select matching method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="exact">Exact Match</SelectItem>
                              <SelectItem value="fuzzy">Fuzzy Match</SelectItem>
                              <SelectItem value="phonetic">Phonetic Match</SelectItem>
                              <SelectItem value="hybrid">Hybrid Match</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="case-sensitive">Case Sensitivity</Label>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-slate-500">Ignore case when matching</span>
                            <Switch
                              id="case-sensitive"
                              checked={caseSensitive}
                              onCheckedChange={setCaseSensitive}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 pt-2">
                        <Label htmlFor="include-fields">Fields to Compare</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                          {["name", "email", "phone", "address", "city", "company", "title", "notes"].map((field) => (
                            <div key={field} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`field-${field}`}
                                className="rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                                checked={includeFields.includes(field)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setIncludeFields([...includeFields, field]);
                                  } else {
                                    setIncludeFields(includeFields.filter((f) => f !== field));
                                  }
                                }}
                              />
                              <Label htmlFor={`field-${field}`} className="text-sm capitalize">
                                {field}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="import" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <FileSpreadsheet className="h-5 w-5 mr-2 text-blue-600" />
                        Import & Export Settings
                      </h3>
                      <p className="text-sm text-slate-500 mb-6">
                        Configure how data is imported and processed from external files.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="duplicate-handling">Duplicate Handling During Import</Label>
                        <Select value={duplicateHandling} onValueChange={setDuplicateHandling}>
                          <SelectTrigger id="duplicate-handling" className="w-full">
                            <SelectValue placeholder="Select duplicate handling method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="flag">Flag Duplicates Only</SelectItem>
                            <SelectItem value="skip">Skip Duplicates</SelectItem>
                            <SelectItem value="merge">Auto-Merge Duplicates</SelectItem>
                            <SelectItem value="overwrite">Overwrite Existing Records</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="delimiter">CSV Delimiter</Label>
                          <Select value={delimiter} onValueChange={setDelimiter}>
                            <SelectTrigger id="delimiter" className="w-full">
                              <SelectValue placeholder="Select CSV delimiter" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="comma">Comma (,)</SelectItem>
                              <SelectItem value="semicolon">Semicolon (;)</SelectItem>
                              <SelectItem value="tab">Tab</SelectItem>
                              <SelectItem value="pipe">Pipe (|)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="header-row">Header Row</Label>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-slate-500">First row contains headers</span>
                            <Switch
                              id="header-row"
                              checked={headerRow}
                              onCheckedChange={setHeaderRow}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <div className="bg-amber-50 text-amber-800 p-4 rounded-lg border border-amber-200 flex">
                          <AlertTriangle className="h-5 w-5 mr-3 flex-shrink-0" />
                          <p className="text-sm">
                            <span className="font-medium">Note:</span> Import settings affect how new data is processed. Changing these settings will not affect previously imported data.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="notifications" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Bell className="h-5 w-5 mr-2 text-blue-600" />
                        Notification Preferences
                      </h3>
                      <p className="text-sm text-slate-500 mb-6">
                        Configure how and when you receive notifications about your data.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-slate-100">
                        <div>
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className="text-sm text-slate-500">
                            Receive email alerts for important events
                          </p>
                        </div>
                        <Switch
                          checked={emailNotifications}
                          onCheckedChange={setEmailNotifications}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between py-3 border-b border-slate-100">
                        <div>
                          <h4 className="font-medium">Duplicate Alerts</h4>
                          <p className="text-sm text-slate-500">
                            Get notified when new duplicates are detected
                          </p>
                        </div>
                        <Switch
                          checked={duplicateAlerts}
                          onCheckedChange={setDuplicateAlerts}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between py-3 border-b border-slate-100">
                        <div>
                          <h4 className="font-medium">Import Completion</h4>
                          <p className="text-sm text-slate-500">
                            Notify when data imports are complete
                          </p>
                        </div>
                        <Switch
                          checked={importAlerts}
                          onCheckedChange={setImportAlerts}
                        />
                      </div>
                      
                      <div className="pt-2">
                        <div className="bg-blue-50 text-blue-800 p-4 rounded-lg border border-blue-200 flex">
                          <RefreshCw className="h-5 w-5 mr-3 flex-shrink-0" />
                          <p className="text-sm">
                            <span className="font-medium">Pro Tip:</span> You can set up scheduled reports to receive a summary of duplicate detection activities on a regular basis.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="account" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <User className="h-5 w-5 mr-2 text-blue-600" />
                        Account Settings
                      </h3>
                      <p className="text-sm text-slate-500 mb-6">
                        Manage your account information and security preferences.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" defaultValue={user?.name} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" defaultValue={user?.email} />
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-slate-100 mt-6">
                        <h4 className="font-medium mb-4 flex items-center">
                          <Shield className="h-4 w-4 mr-2 text-blue-600" />
                          Security
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="password">Change Password</Label>
                            <Input id="password" type="password" placeholder="Enter new password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
              
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
