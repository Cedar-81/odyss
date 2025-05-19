import { createClient } from "@supabase/supabase-js"

// Provide fallback values for development if env vars are missing
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ""
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ""

// Check if URL is available and show a helpful error message
if (!supabaseUrl) {
  console.error("ERROR: Supabase URL is missing. Make sure you have a .env file with VITE_SUPABASE_URL defined.")
}

if (!supabaseAnonKey) {
  console.error(
    "ERROR: Supabase Anon Key is missing. Make sure you have a .env file with VITE_SUPABASE_ANON_KEY defined.",
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
