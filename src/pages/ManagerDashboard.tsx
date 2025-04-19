
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import AIInsights from "@/components/manager/AIInsights";
import { 
  BatteryCharging, 
  Droplets, 
  Shield, 
  BarChart3, 
  MessageSquare, 
  Bell, 
  Users, 
  CreditCard,
  LogOut,
  BrainCircuit
} from "lucide-react";

const ManagerDashboard = () => {
  // For power status form
  const [powerStatus, setPowerStatus] = useState("On");
  const [powerHours, setPowerHours] = useState(6.5);
  
  // For water status form
  const [waterLevel, setWaterLevel] = useState(50);
  const [waterQuality, setWaterQuality] = useState("Safe");
  
  // For security status form
  const [gateStatus, setGateStatus] = useState("Secure");
  
  // Handle form submissions
  const handleUpdatePower = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Power status updated: ${powerStatus}, ${powerHours} hours`);
  };
  
  const handleUpdateWater = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Water status updated: Level ${waterLevel}%, Quality: ${waterQuality}`);
  };
  
  const handleUpdateSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Security status updated: Gate ${gateStatus}`);
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Manager Dashboard</h1>
            <p className="text-muted-foreground">
              Manage estate amenities and view analytics
            </p>
          </div>
          <Button variant="destructive" className="gap-2 self-start">
            <LogOut size={16} />
            Logout
          </Button>
        </div>
        
        {/* AI Insights Component */}
        <AIInsights />
        
        <Tabs defaultValue="amenities">
          <TabsList className="grid grid-cols-6 w-full max-w-4xl">
            <TabsTrigger value="amenities" className="flex items-center gap-2">
              <BatteryCharging className="h-4 w-4" />
              <span className="hidden sm:inline">Amenities</span>
            </TabsTrigger>
            <TabsTrigger value="issues" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Issues</span>
            </TabsTrigger>
            <TabsTrigger value="announcements" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Announcements</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Payments</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <BrainCircuit className="h-4 w-4" />
              <span className="hidden sm:inline">AI</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            {/* Amenities Tab */}
            <TabsContent value="amenities" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Power Form */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <BatteryCharging className="h-5 w-5 mr-2 text-estate-power" />
                      Power Status
                    </CardTitle>
                    <CardDescription>Update generator status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdatePower} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="power-status">Status</Label>
                        <div className="flex items-center gap-2">
                          <Switch 
                            id="power-status" 
                            checked={powerStatus === "On"}
                            onCheckedChange={(checked) => setPowerStatus(checked ? "On" : "Off")}
                          />
                          <Label htmlFor="power-status" className="font-normal">
                            {powerStatus}
                          </Label>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="power-hours">Hours Today</Label>
                        <Input
                          id="power-hours"
                          type="number"
                          min="0"
                          max="24"
                          step="0.5"
                          value={powerHours}
                          onChange={(e) => setPowerHours(parseFloat(e.target.value))}
                        />
                      </div>
                      
                      <Button type="submit" className="w-full">
                        Update Power Status
                      </Button>
                    </form>
                  </CardContent>
                </Card>
                
                {/* Water Form */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <Droplets className="h-5 w-5 mr-2 text-estate-water" />
                      Water Status
                    </CardTitle>
                    <CardDescription>Update water tank status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateWater} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="water-level">Tank Level (%)</Label>
                        <Input
                          id="water-level"
                          type="number"
                          min="0"
                          max="100"
                          step="5"
                          value={waterLevel}
                          onChange={(e) => setWaterLevel(parseInt(e.target.value))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="water-quality">Quality</Label>
                        <div className="flex items-center gap-2">
                          <Switch 
                            id="water-quality" 
                            checked={waterQuality === "Safe"}
                            onCheckedChange={(checked) => setWaterQuality(checked ? "Safe" : "Unsafe")}
                          />
                          <Label htmlFor="water-quality" className="font-normal">
                            {waterQuality}
                          </Label>
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full">
                        Update Water Status
                      </Button>
                    </form>
                  </CardContent>
                </Card>
                
                {/* Security Form */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <Shield className="h-5 w-5 mr-2 text-estate-security" />
                      Security Status
                    </CardTitle>
                    <CardDescription>Update gate security status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateSecurity} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="gate-status">Gate Status</Label>
                        <div className="flex items-center gap-2">
                          <Switch 
                            id="gate-status" 
                            checked={gateStatus === "Secure"}
                            onCheckedChange={(checked) => setGateStatus(checked ? "Secure" : "Open")}
                          />
                          <Label htmlFor="gate-status" className="font-normal">
                            {gateStatus}
                          </Label>
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full mt-10">
                        Update Security Status
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Other Tabs - For the sake of this demo, we'll just show placeholders */}
            <TabsContent value="issues">
              <Card>
                <CardHeader>
                  <CardTitle>Issue Management</CardTitle>
                  <CardDescription>
                    View and resolve tenant issues
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-12 text-muted-foreground">
                    This section will display tenant issues and allow resolution
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="announcements">
              <Card>
                <CardHeader>
                  <CardTitle>Announcements</CardTitle>
                  <CardDescription>
                    Create and manage estate announcements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-12 text-muted-foreground">
                    This section will allow creating and managing announcements
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Management</CardTitle>
                  <CardDescription>
                    Track tenant payments and dues
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-12 text-muted-foreground">
                    This section will display payment records and allow tracking
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>
                    View estate performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-12 text-muted-foreground">
                    This section will display charts and analytics for estate performance
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="ai">
              <Card>
                <CardHeader>
                  <CardTitle>AI Configuration</CardTitle>
                  <CardDescription>
                    Configure AI assistant and alerts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h3 className="font-medium">Alert Thresholds</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Power Service Alert</Label>
                        <div className="flex items-center gap-2">
                          <Input 
                            type="number" 
                            min="1" 
                            defaultValue="80" 
                            placeholder="Hours"
                          />
                          <span className="text-sm text-muted-foreground">hours</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Alert when generator runs more than this many hours
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Water Drop Alert</Label>
                        <div className="flex items-center gap-2">
                          <Input 
                            type="number" 
                            min="1" 
                            defaultValue="25" 
                            placeholder="%"
                          />
                          <span className="text-sm text-muted-foreground">%</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Alert when water level drops by this percentage
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Security Alert</Label>
                        <div className="flex items-center gap-2">
                          <Input 
                            type="number" 
                            min="1" 
                            defaultValue="3" 
                            placeholder="Count"
                          />
                          <span className="text-sm text-muted-foreground">opens</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Alert when gate opens exceed average by this number
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button>Save Configuration</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ManagerDashboard;
