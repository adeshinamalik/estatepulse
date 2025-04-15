
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Lock, Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Manager = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email) return setError("Email is required");
    if (!password) return setError("Password is required");
    
    setIsLoading(true);
    
    try {
      // For demo purposes, accept any email/password with "manager" in it
      if (email.includes("manager")) {
        // Simulate Firebase auth for demo
        await new Promise(resolve => setTimeout(resolve, 1500));
        // In a real app, we would use:
        // await login(email, password);
        navigate("/manager-dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="flex justify-center items-center min-h-[60vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Manager Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the management dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              {error && (
                <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-md flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {error}
                </div>
              )}
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="text-xs text-center text-muted-foreground mt-2">
              For demo purposes, use any email containing "manager" with any password
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Manager;
