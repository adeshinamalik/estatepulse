
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, MessageSquare, Shield } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
          
          <div className="container relative px-4 mx-auto">
            <div className="flex flex-col items-center max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Welcome to EstatePulse
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground">
                Your comprehensive estate management solution. Simplifying property management for Nigerian estates.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Link to="/report-issue">
                  <Button size="lg" className="w-full sm:w-auto gap-2">
                    Report an Issue <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/manager">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                    Manager Login <Building2 className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Issue Reporting */}
              <div className="flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-card to-secondary/5 backdrop-blur-sm border">
                <MessageSquare className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Issue Reporting</h3>
                <p className="text-center text-muted-foreground">
                  Easily report and track maintenance issues within your estate
                </p>
              </div>

              {/* Announcements */}
              <div className="flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-card to-secondary/5 backdrop-blur-sm border">
                <Shield className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Security Updates</h3>
                <p className="text-center text-muted-foreground">
                  Stay informed about important security updates and announcements
                </p>
              </div>

              {/* Management Dashboard */}
              <div className="flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-card to-secondary/5 backdrop-blur-sm border">
                <Building2 className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Estate Management</h3>
                <p className="text-center text-muted-foreground">
                  Comprehensive tools for efficient estate management
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
