import { createClient } from "@/lib/supabase/client";

export const signInWithEmail = async ({ email, password }) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log("data", data); // Check what data is returned
  if (error) {
    throw new Error(error.message);
  }

  return data;
}