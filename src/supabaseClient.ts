import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vxsikirblhcmcjmsoyvz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4c2lraXJibGhjbWNqbXNveXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2MTQ0NTUsImV4cCI6MjA2MzE5MDQ1NX0.QFdVurvQ51LtuEOMTJ86vdr5Tf90aLhuh-Qr6sjUgIo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
