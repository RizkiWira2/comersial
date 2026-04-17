import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lxzzvlcvkphsvdsiuadj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4enp2bGN2a3Boc3Zkc2l1YWRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MjUwNzcsImV4cCI6MjA5MjAwMTA3N30.Mz55OVDHo8hJk2bsJWi5e-HMftfH2Yl_3ErZpt4N3OI";

// Create a single supabase client for the entire app
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
  }
});
