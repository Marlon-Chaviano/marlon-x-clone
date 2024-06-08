import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../../types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secretKey = process.env.NEXT_PRIVATE_SUPABASE_SECRET_KEY;

export const supabaseServer = new SupabaseClient<Database>(supabaseUrl as string, secretKey as string);