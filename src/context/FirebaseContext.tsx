
import { createContext, useContext, ReactNode } from "react";
import { db, auth, storage } from "@/lib/firebase";
import { User } from "firebase/auth";
import { useQuery } from "@tanstack/react-query";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

type FirebaseContextType = {
  db: typeof db;
  auth: typeof auth;
  storage: typeof storage;
  currentUser: User | null;
  isManager: boolean;
};

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const currentUser = auth.currentUser;
  const isManager = false; // Will update once we implement authentication

  // In a real app, we would check user roles from Firestore
  // const isManager = Boolean(currentUser && userRoles?.includes('manager'));

  // For demo purposes, we'll use mock data but structured like we'd get from Firebase
  const { data: amenities } = useQuery({
    queryKey: ["amenities"],
    queryFn: async () => {
      // In a real app, this would fetch from Firestore
      return {
        power: {
          status: "On", 
          hoursToday: 6.5, 
          lastUpdated: "2025-04-15T08:00:00Z"
        },
        water: {
          tankLevel: 50, 
          quality: "Safe", 
          lastUpdated: "2025-04-15T08:00:00Z"
        },
        security: {
          gateStatus: "Secure", 
          lastActivity: "2025-04-15T08:00:00Z"
        }
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return (
    <FirebaseContext.Provider value={{ db, auth, storage, currentUser, isManager }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};
