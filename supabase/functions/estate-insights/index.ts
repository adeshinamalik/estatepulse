
// estate-insights - A Supabase Edge Function that analyzes estate data
// and generates maintenance alerts and insights
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Create Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || 'https://hrbwnahotvrslmokhhgu.supabase.co';
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyYnduYWhvdHZyc2xtb2toaGd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3ODQ5MTAsImV4cCI6MjA2MDM2MDkxMH0.cVkBMEwi3EbUwJBWZ5lOfG6weXdEzW_V8Un6GZENRbk';

// Maintenance alert thresholds (can be adjusted)
const THRESHOLDS = {
  power: {
    serviceHours: 80, // Alert if generator runs > 80 hours without service
    highUsage: 5, // Flag if usage is > average + 5 hours
  },
  water: {
    unsafeDays: 1, // Alert if water unsafe for > 1 day
    suddenDrop: 25, // Flag if tank level drops > 25% in a day
  },
  security: {
    lateGateOpens: 2, // Alert if gate opens late > 2 times
    unusualActivity: 3, // Flag if gate opens > average + 3 times
  }
};

// Types for our data
interface PowerData {
  status: string;
  hoursToday: number;
  lastUpdated: string;
}

interface WaterData {
  quality: string;
  tankLevel: number;
  lastUpdated: string;
}

interface SecurityData {
  gateStatus: string;
  lastActivity: string;
}

interface HistoricalData {
  date: string;
  powerHours: number;
  waterLevel: number;
  gateOpens: number;
}

// Helper function: Calculate average from array
function calculateAverage(array: number[]): number {
  if (array.length === 0) return 0;
  const sum = array.reduce((acc, val) => acc + val, 0);
  return sum / array.length;
}

// Main handler function
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // In a production app, we would fetch real data from Supabase tables
    // For now, we'll use mock data to demonstrate the function
    
    // Mock current data (in a real app, this would come from Supabase)
    const currentPower: PowerData = {
      status: "On",
      hoursToday: 8.5,
      lastUpdated: new Date().toISOString(),
    };
    
    const currentWater: WaterData = {
      quality: "Safe",
      tankLevel: 45, 
      lastUpdated: new Date().toISOString(),
    };
    
    const currentSecurity: SecurityData = {
      gateStatus: "Secure",
      lastActivity: new Date().toISOString(),
    };
    
    // Mock historical data (7 days)
    const historicalData: HistoricalData[] = [
      { date: "2025-04-18", powerHours: 7.5, waterLevel: 70, gateOpens: 12 },
      { date: "2025-04-17", powerHours: 6.0, waterLevel: 65, gateOpens: 10 },
      { date: "2025-04-16", powerHours: 8.0, waterLevel: 60, gateOpens: 11 },
      { date: "2025-04-15", powerHours: 7.0, waterLevel: 55, gateOpens: 9 },
      { date: "2025-04-14", powerHours: 6.5, waterLevel: 50, gateOpens: 10 },
      { date: "2025-04-13", powerHours: 7.0, waterLevel: 45, gateOpens: 11 },
      { date: "2025-04-12", powerHours: 7.5, waterLevel: 40, gateOpens: 10 },
    ];
    
    // Calculate averages from historical data
    const avgPowerHours = calculateAverage(historicalData.map(d => d.powerHours));
    const avgGateOpens = calculateAverage(historicalData.map(d => d.gateOpens));
    
    // Check for tank level drop
    const yesterdayWaterLevel = historicalData[0].waterLevel;
    const waterLevelDrop = yesterdayWaterLevel - currentWater.tankLevel;
    const waterDropPercentage = (waterLevelDrop / yesterdayWaterLevel) * 100;
    
    // Calculate total power hours over the past 7 days
    const totalPowerHours = historicalData.reduce((sum, day) => sum + day.powerHours, 0) + currentPower.hoursToday;
    
    // Generate maintenance alerts
    const maintenanceAlerts = [];
    
    // Power alerts
    if (totalPowerHours > THRESHOLDS.power.serviceHours) {
      maintenanceAlerts.push({
        type: "power",
        priority: "high",
        message: `Generator has run for ${totalPowerHours.toFixed(1)} hours. Service recommended.`,
        timestamp: new Date().toISOString(),
      });
    }
    
    // Water alerts
    if (currentWater.quality === "Unsafe") {
      maintenanceAlerts.push({
        type: "water",
        priority: "high",
        message: "Water quality is unsafe. Immediate attention required.",
        timestamp: new Date().toISOString(),
      });
    }
    
    // Security alerts (mock alert for demonstration)
    if (Math.random() > 0.7) { // Just a random condition for demo purposes
      maintenanceAlerts.push({
        type: "security",
        priority: "medium",
        message: "Gate security system requires routine check.",
        timestamp: new Date().toISOString(),
      });
    }
    
    // Generate insights
    const insights = [];
    
    // Power insights
    if (currentPower.hoursToday > avgPowerHours + THRESHOLDS.power.highUsage) {
      insights.push({
        type: "power",
        message: `Unusually high power usage today (${currentPower.hoursToday.toFixed(1)} hours vs. avg ${avgPowerHours.toFixed(1)} hours).`,
        timestamp: new Date().toISOString(),
      });
    }
    
    // Water insights
    if (waterDropPercentage > THRESHOLDS.water.suddenDrop) {
      insights.push({
        type: "water",
        message: `Water level dropped by ${waterDropPercentage.toFixed(1)}% since yesterday. Possible leak.`,
        timestamp: new Date().toISOString(),
      });
    }
    
    // Security insights
    const mockGateOpensToday = 13; // In a real app, this would come from database
    if (mockGateOpensToday > avgGateOpens + THRESHOLDS.security.unusualActivity) {
      insights.push({
        type: "security",
        message: `Unusually high gate activity today (${mockGateOpensToday} opens vs. avg ${avgGateOpens.toFixed(1)}).`,
        timestamp: new Date().toISOString(),
      });
    }
    
    // Return the alerts and insights
    return new Response(
      JSON.stringify({
        maintenanceAlerts,
        insights,
        currentStatus: {
          power: currentPower,
          water: currentWater,
          security: currentSecurity
        },
        historicalData
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
    
  } catch (error) {
    console.error("Error in estate-insights function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error occurred" }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
