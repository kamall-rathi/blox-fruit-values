import { createClient } from '@supabase/supabase-js';

// Fallback to your explicit string if the process environment hasn't injected yet
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ugkbjmkwbtlnaxvmoxcx.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVna2JqbWt3YnRsbmF4dm1veGN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyMjYyMzQsImV4cCI6MjA5NTgwMjIzNH0.9XjpKt5NWQcxXb4HWZQZgZhnFOp04fUTV4OPOd0tQSA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type TradeAdRecord = {
  id: string;
  user_id: string;
  offering: string[];
  requesting: string[];
  note: string | null;
  status: 'active' | 'completed' | 'cancelled';
  created_at: string;
  profiles?: {
    username: string;
    verified: boolean;
    rating: number;
  };
};