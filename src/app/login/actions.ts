"use server";

import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { AuthError } from "@supabase/supabase-js";




export async function login(formData: FormData) {
  const supabase = createClient();


  const newdata = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };


  const { error } = await supabase.auth.signInWithPassword(newdata);

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
  if ( error ) throw error.message
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
export async function signInWithGithub() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `https://marlon-x-clone-3cf.vercel.app/auth/callback`,
    },
  });

  
  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
  if (error) throw error
  
}

export async function signInWithGoogle() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `https://marlon-x-clone-3cf.vercel.app/auth/callback`,
      },
      });
      if(data.url){
        redirect(data.url)
      }
      if(error) throw error
}