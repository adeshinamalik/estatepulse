
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle } from "lucide-react";

interface Issue {
  id: string;
  block: string;
  room: string;
  amenity: string;
  description: string;
  status: "Open" | "Resolved";
  submittedAt: string;
  photo?: string;
}

const RecentIssues = () => {
  // In a real app, this would fetch from Firestore
  const { data: issues, isLoading } = useQuery({
    queryKey: ["recentIssues"],
    queryFn: async () => {
      // This would be replaced with a Firestore query in production
      return [
        {
          id: "xyz123",
          block: "Hostel A",
          room: "Room 5",
          amenity: "Power",
          description: "No power since yesterday",
          status: "Open",
          submittedAt: "2025-04-15T09:00:00Z",
        },
        {
          id: "xyz124",
          block: "Block C",
          room: "Room 12",
          amenity: "Water",
          description: "Water has strange smell",
          status: "Open",
          submittedAt: "2025-04-14T14:30:00Z",
        },
        {
          id: "xyz125",
          block: "Hostel B",
          room: "Room 7",
          amenity: "Security",
          description: "Gate not locking properly",
          status: "Resolved",
          submittedAt: "2025-04-13T11:15:00Z",
        }
      ] as Issue[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Recent Issues
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-4">Loading recent issues...</p>
        </CardContent>
      </Card>
    );
  }
  
  if (!issues || issues.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Recent Issues
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-4">No recent issues reported</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          Recent Issues
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {issues.map((issue) => (
            <li key={issue.id} className="border-b pb-3 last:border-0">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <span className="font-medium">{issue.block}, {issue.room}</span>
                  <Badge className="ml-2" variant={issue.status === "Open" ? "destructive" : "outline"}>
                    {issue.status}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {new Date(issue.submittedAt).toLocaleString('en-NG', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                  })}
                </div>
              </div>
              <div className="text-sm">
                <span className="font-medium text-primary">{issue.amenity}: </span>
                {issue.description}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecentIssues;
