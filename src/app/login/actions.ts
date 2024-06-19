"use server";

import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { createClient } from "@/utils/supabase/server";




export async function login(formData: FormData) {
  const supabase = createClient();


  const newdata = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };


  const {data , error } = await supabase.auth.signInWithPassword(newdata);

  if (error) {
    throw error
  }
  
  revalidatePath("/home", "layout");
  redirect("/home");
}

export async function logout() {
  const supabse = createClient()
  await supabse.auth.signOut()
  revalidatePath('/home')
  redirect("/login",RedirectType.replace)
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const user = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    username: formData.get("username") as string
  };


  const {data, error } = await supabase.auth.signUp({
    email:user.email,
    password: user.password,
    options:{
      data:{
        username: user.username
      }
    }
  });  
  if ( error ) throw error
}

export async function signInWithEmail(formData: FormData) {
  const supabase = createClient();

    const user = {
      email: formData.get("email") as string,
      username: formData.get("username") as string,
    };

    const { data , error } = await supabase.auth.signInWithOtp({
      email: user.email,
      options: {
        data: {
          username: user.username
        },
        shouldCreateUser: true,
        
      },
    }); 

    if ( error ) throw error
}

