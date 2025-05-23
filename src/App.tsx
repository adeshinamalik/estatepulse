
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FirebaseProvider } from "@/context/FirebaseContext";
import { AuthProvider } from "@/context/AuthContext";
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ReportIssue from "./pages/ReportIssue";
import AnnouncementsPage from "./pages/Announcements";
import Manager from "./pages/Manager";
import ManagerDashboard from "./pages/ManagerDashboard";
import ChatAssistant from "./pages/ChatAssistant";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <FirebaseProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/report-issue" element={<ReportIssue />} />
              <Route path="/announcements" element={<AnnouncementsPage />} />
              <Route path="/manager" element={<Manager />} />
              <Route path="/chat" element={<ChatAssistant />} />
              
              {/* Protected routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/manager-dashboard" element={<ManagerDashboard />} />
              </Route>
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </FirebaseProvider>
  </QueryClientProvider>
);

export default App;
