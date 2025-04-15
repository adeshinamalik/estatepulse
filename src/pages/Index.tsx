
import Layout from "@/components/layout/Layout";
import StatusCard from "@/components/tenant/StatusCard";
import Announcements from "@/components/tenant/Announcements";
import { Button } from "@/components/ui/button";
import { AlertTriangle, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { amenityData, formatDate } from "@/lib/mockData";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="bg-primary/10 -mx-4 px-4 py-8 rounded-lg border border-primary/20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to <span className="text-primary">EstatePulse</span>
            </h1>
            <p className="text-xl mb-6">
              Real-time monitoring of your estate's amenities
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/report-issue">
                <Button className="gap-2">
                  <AlertTriangle size={16} />
                  Report an Issue
                </Button>
              </Link>
              <Button variant="outline" className="gap-2">
                <MessageSquare size={16} />
                Ask a Question
              </Button>
            </div>
          </div>
        </section>

        {/* Amenity Status Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Current Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatusCard
              type="power"
              status={amenityData.power.status}
              detail={`${amenityData.power.hoursToday} hours today`}
              lastUpdated={formatDate(amenityData.power.lastUpdated)}
            />
            <StatusCard
              type="water"
              status={amenityData.water.quality}
              detail={`Tank level: ${amenityData.water.tankLevel}% full`}
              lastUpdated={formatDate(amenityData.water.lastUpdated)}
            />
            <StatusCard
              type="security"
              status={amenityData.security.gateStatus}
              detail="Gate status updated"
              lastUpdated={formatDate(amenityData.security.lastActivity)}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Status updates are provided by estate management
          </p>
        </section>

        {/* Announcements Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Announcements</h2>
          <Announcements />
        </section>
      </div>
    </Layout>
  );
};

export default Index;
