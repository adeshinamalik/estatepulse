
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface StatusCardProps {
  type: 'power' | 'water' | 'security';
  status: string;
  detail: string;
  lastUpdated: string;
}

const getIcon = (type: 'power' | 'water' | 'security') => {
  switch (type) {
    case 'power':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case 'water':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      );
    case 'security':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
  }
};

const getStatusColor = (type: 'power' | 'water' | 'security', status: string) => {
  // For each amenity type, determine the positive status
  const positiveStatuses = {
    power: 'On',
    water: 'Safe',
    security: 'Secure'
  };
  
  return status === positiveStatuses[type] ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
};

const getCardClassByType = (type: 'power' | 'water' | 'security') => {
  switch (type) {
    case 'power':
      return 'border-estate-power/30 bg-estate-power/5';
    case 'water':
      return 'border-estate-water/30 bg-estate-water/5';
    case 'security':
      return 'border-estate-security/30 bg-estate-security/5';
  }
};

const getCardTitle = (type: 'power' | 'water' | 'security') => {
  switch (type) {
    case 'power':
      return 'Power';
    case 'water':
      return 'Water';
    case 'security':
      return 'Security';
  }
};

const StatusCard = ({ type, status, detail, lastUpdated }: StatusCardProps) => {
  return (
    <Card className={`${getCardClassByType(type)} hover:shadow-md transition-shadow`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          {getIcon(type)}
          {getCardTitle(type)}
        </CardTitle>
        <Badge className={getStatusColor(type, status)}>
          {status}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm mb-4">{detail}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          Updated: {lastUpdated}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
