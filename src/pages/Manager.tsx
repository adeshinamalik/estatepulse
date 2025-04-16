import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Lock, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Manager = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email) return setError("Email is required");
    if (!password) return setError("Password is required");
    
    setIsLoading(true);
    
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      toast({
        title: "Login successful",
        description: "Welcome back to the management dashboard",
      });

      navigate("/manager-dashboard");
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please try again.");
      toast({
        variant: "destructive",
        title: "Login failed",
        description: err.message || "Authentication failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <Card className="w-full max-w-md bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900/50 backdrop-blur-sm border-opacity-50">
          <CardHeader className="space-y-3 text-center pb-8">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Manager Login
            </CardTitle>
            <CardDescription className="text-base">
              Access the management dashboard securely
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground/70" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 text-base bg-white dark:bg-gray-950 border-opacity-50"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground/70" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-12 text-base bg-white dark:bg-gray-950 border-opacity-50"
                    />
                  </div>
                </div>
              </div>
              
              {error && (
                <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col pb-8">
            <p className="text-sm text-center text-muted-foreground">
              Contact your administrator if you need access
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Manager;
