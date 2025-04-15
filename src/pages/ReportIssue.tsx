
import Layout from "@/components/layout/Layout";
import IssueForm from "@/components/tenant/IssueForm";
import RecentIssues from "@/components/tenant/RecentIssues";

const ReportIssue = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <section>
          <h1 className="text-3xl font-bold mb-2">Report an Issue</h1>
          <p className="text-muted-foreground">
            Fill out the form below to report any problems with estate amenities
          </p>
        </section>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <IssueForm />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Your Recent Reports</h2>
            <RecentIssues />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportIssue;
