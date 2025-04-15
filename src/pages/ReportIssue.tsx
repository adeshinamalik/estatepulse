
import Layout from "@/components/layout/Layout";
import IssueForm from "@/components/tenant/IssueForm";

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
        
        <IssueForm />
      </div>
    </Layout>
  );
};

export default ReportIssue;
