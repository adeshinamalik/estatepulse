
import Layout from "@/components/layout/Layout";
import Announcements from "@/components/tenant/Announcements";

const AnnouncementsPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <section>
          <h1 className="text-3xl font-bold mb-2">Announcements</h1>
          <p className="text-muted-foreground">
            Stay updated with the latest estate news and announcements
          </p>
        </section>
        
        <Announcements />
      </div>
    </Layout>
  );
};

export default AnnouncementsPage;
