
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Send, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { amenityData } from "@/lib/mockData";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Currently a mock chatbot that simulates basic responses
// In a real implementation, this would connect to Dialogflow
const EstateChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm your EstatePulse assistant. You can ask me about power, water, security, or other estate services.",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Focus input on component mount
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Simulate API call to Dialogflow
    setTimeout(() => {
      const botResponse = generateMockResponse(input);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const generateMockResponse = (query: string): Message => {
    const lowercaseQuery = query.toLowerCase();
    let responseText = "";

    // Check if query matches any of our predefined patterns
    if (lowercaseQuery.includes("power") || lowercaseQuery.includes("electricity") || lowercaseQuery.includes("generator")) {
      responseText = `The power is currently ${amenityData.power.status}. Today we've had ${amenityData.power.hoursToday} hours of power. Last updated at ${new Date(amenityData.power.lastUpdated).toLocaleString('en-NG', {timeStyle: 'short', dateStyle: 'short'})}`;
    } 
    else if (lowercaseQuery.includes("water") || lowercaseQuery.includes("tank")) {
      responseText = `The water quality is currently ${amenityData.water.quality}. The tank is ${amenityData.water.tankLevel}% full. Last updated at ${new Date(amenityData.water.lastUpdated).toLocaleString('en-NG', {timeStyle: 'short', dateStyle: 'short'})}`;
    }
    else if (lowercaseQuery.includes("security") || lowercaseQuery.includes("gate")) {
      responseText = `The gate is currently ${amenityData.security.gateStatus}. Last activity was at ${new Date(amenityData.security.lastActivity).toLocaleString('en-NG', {timeStyle: 'short', dateStyle: 'short'})}`;
    }
    // Support for Nigerian Pidgin
    else if (lowercaseQuery.includes("power dey") || lowercaseQuery.includes("light dey")) {
      responseText = `The power ${amenityData.power.status === "On" ? "dey on" : "no dey"}. We don get ${amenityData.power.hoursToday} hours of light today.`;
    }
    else if (lowercaseQuery.includes("water dey") || lowercaseQuery.includes("water good")) {
      responseText = `The water ${amenityData.water.quality === "Safe" ? "dey safe to use" : "no dey safe, abeg no use am"}. The tank na ${amenityData.water.tankLevel}% full.`;
    }
    else if (lowercaseQuery.includes("hello") || lowercaseQuery.includes("hi") || lowercaseQuery.includes("hey")) {
      responseText = "Hello! How can I help you with the estate services today?";
    }
    else {
      responseText = "I'm sorry, I don't understand that question. You can ask me about power, water, or security in the estate.";
    }

    return {
      id: `bot-${Date.now()}`,
      text: responseText,
      sender: "bot",
      timestamp: new Date()
    };
  };

  return (
    <Card className="w-full max-w-md mx-auto h-[500px] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <Bot className="h-5 w-5 mr-2 text-primary" />
          Estate Assistant
        </CardTitle>
        <CardDescription>
          Ask about estate services in English or Pidgin
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-[350px] px-4">
          <div className="space-y-4 pt-2 pb-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="flex items-start gap-2 max-w-[80%]">
                  {msg.sender === "bot" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">EP</AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div
                    className={`rounded-lg px-3 py-2 text-sm ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString('en-NG', {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                  
                  {msg.sender === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-accent">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2 max-w-[80%]">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">EP</AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg px-3 py-2 bg-muted">
                    <div className="flex space-x-1 items-center h-6">
                      <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.1s]"></div>
                      <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.3s]"></div>
                      <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.5s]"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      
      <CardFooter className="pt-3">
        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
          <Input
            ref={inputRef}
            placeholder="Ask about power, water, or security..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
            disabled={isTyping}
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default EstateChatbot;
