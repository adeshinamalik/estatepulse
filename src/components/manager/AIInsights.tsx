
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, AlertCircle, BrainCircuit, TrendingUp, Lightbulb, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  type: "power" | "water" | "security";
  priority: "high" | "medium" | "low";
  message: string;
  timestamp: string;
}

interface Insight {
  type: "power" | "water" | "security";
  message: string;
  timestamp: string;
}

const AIInsights = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase.functions.invoke('estate-insights');
        
        if (error) {
          throw new Error(error.message || "Failed to fetch insights");
        }
        
        setAlerts(data.maintenanceAlerts || []);
        setInsights(data.insights || []);
        
      } catch (err: any) {
        console.error("Error fetching AI insights:", err);
        setError(err.message || "Failed to load insights");
        toast({
          variant: "destructive",
          title: "Error loading insights",
          description: err.message || "Please try again later",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInsights();
    
    // Refresh insights every 30 minutes
    const interval = setInterval(fetchInsights, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [toast]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "medium":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "low":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "power":
        return <AlertCircle className="h-4 w-4 text-estate-power" />;
      case "water":
        return <AlertTriangle className="h-4 w-4 text-estate-water" />;
      case "security":
        return <AlertCircle className="h-4 w-4 text-estate-security" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-NG', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <BrainCircuit className="h-5 w-5 mr-2" />
            AI Insights
          </CardTitle>
          <CardDescription>Loading AI-powered analysis...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-2">
                <Skeleton className="h-4 w-4 mt-1" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg text-red-700">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Error Loading Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">{error}</p>
          <p className="text-sm text-red-500 mt-2">
            Please check your connection and try refreshing the page.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (alerts.length === 0 && insights.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <Lightbulb className="h-5 w-5 mr-2" />
            AI Insights
          </CardTitle>
          <CardDescription>No alerts or insights currently</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-6">
            All systems are operating normally.
            <br />
            Check back later for AI-powered insights.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <BrainCircuit className="h-5 w-5 mr-2" />
          AI Insights
        </CardTitle>
        <CardDescription>
          AI-powered maintenance alerts and insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {alerts.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-md font-medium flex items-center">
                <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                Maintenance Alerts
              </h3>
              <div className="space-y-2">
                {alerts.map((alert, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 border rounded-md bg-red-50/50">
                    {getTypeIcon(alert.type)}
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getPriorityColor(alert.priority)}>
                          {alert.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(alert.timestamp)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm">{alert.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {insights.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-md font-medium flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                Usage Insights
              </h3>
              <div className="space-y-2">
                {insights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 border rounded-md bg-blue-50/50">
                    {getTypeIcon(insight.type)}
                    <div>
                      <div className="flex items-center">
                        <span className="text-xs text-muted-foreground">
                          {formatDate(insight.timestamp)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm">{insight.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsights;
