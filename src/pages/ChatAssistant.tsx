
import Layout from "@/components/layout/Layout";
import EstateChatbot from "@/components/tenant/EstateChatbot";
import { MessageSquare } from "lucide-react";

const ChatAssistant = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-2">
            <MessageSquare className="h-8 w-8 text-primary" />
            Estate Assistant
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Ask questions about estate amenities, power schedules, water status, 
            security, or maintenance in English or Pidgin.
          </p>
        </div>
        
        <EstateChatbot />
        
        <div className="bg-accent/10 p-4 rounded-lg mt-6">
          <h3 className="font-medium mb-2">Sample questions you can ask:</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• "Is the power on right now?"</li>
            <li>• "How many hours of electricity today?"</li>
            <li>• "What is the water tank level?"</li>
            <li>• "Is the water safe?"</li>
            <li>• "What is the gate status?"</li>
            <li>• "Power dey?" (Pidgin for "Is there power?")</li>
            <li>• "Water dey?" (Pidgin for "Is water available?")</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ChatAssistant;
