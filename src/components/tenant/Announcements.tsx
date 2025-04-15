
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Clock } from "lucide-react";

import { announcementsData, formatDate } from "@/lib/mockData";

const Announcements = () => {
  // Sort announcements: pinned first, then by date
  const sortedAnnouncements = [...announcementsData].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
  });
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Megaphone className="h-5 w-5 text-primary" />
            <CardTitle>Estate Announcements</CardTitle>
          </div>
        </div>
        <CardDescription>
          Important notices and updates from management
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedAnnouncements.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No announcements available
          </p>
        ) : (
          sortedAnnouncements.map(announcement => (
            <div 
              key={announcement.id} 
              className={`border p-4 rounded-md ${announcement.isPinned ? 'bg-secondary/10 border-secondary' : 'bg-card'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className={`font-medium ${announcement.isPinned ? 'font-bold' : ''}`}>
                  {announcement.title}
                  {announcement.isPinned && (
                    <Badge className="ml-2 bg-secondary text-secondary-foreground">
                      Pinned
                    </Badge>
                  )}
                </h3>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDate(announcement.postedAt)}
                </div>
              </div>
              <p className="text-sm">{announcement.message}</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default Announcements;
