import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://giycswhelnympkrjhynx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpeWNzd2hlbG55bXBrcmpoeW54Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODgxNDMwNCwiZXhwIjoyMDE0MzkwMzA0fQ.mX5jLkRZ4sPtNuY2xlzBHJL1FtxbFMSHR-IUjdtzq6Q";

export const supabase = createClient(supabaseUrl, supabaseKey);
