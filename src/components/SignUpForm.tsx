"use client"
import React, { useState } from 'react'
import { Input } from './ui/input';
import { signup } from '@/app/login/actions';
import { toast } from 'sonner';
import { createClient } from '@/utils/supabase/client';
import Spinner from '@/components/ui/spinner';
import { redirect } from 'next/navigation';

const SignUpForm = () => {

    const [user, setUser] = useState({
      email: "",
      password: "",
      username: ""
    });

    const [isLoading, setIsLoading] = useState(false)

    type UserData = {
        email: string,
        password: string,
        username: string
    }

    async function hanldeSubmit({email, password, username}:UserData){
      setIsLoading(true);
      const supabase = createClient()
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("username", username);
        const { data: profiles } = await supabase.from("profiles").select();
        
        if (profiles?.find((profile) => profile?.username == username)) {
          return toast.error("Username already exists");
        } else {
          
          const data = await signup(formData)
          .then(() => setIsLoading(false))
          .then(() => redirect("/private"))
        
        }    
    }
  return (
    <form
      action="submit"
      className="mt-4 p-6 max-w-[450px] flex flex-col space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        const res = hanldeSubmit(user)
        console.log(res);
      }}
    >
      <p className="text-2xl tracking-wide font-extrabold">Crea tu Cuenta</p>
      <div className="p-2 flex flex-col space-y-4">
        <Input
          className={`bg-black ${
            !user.email.includes("@")
              ? "focus:border-red-600"
              : "focus:border-primary"
          }
             ${
               user.email.indexOf(".") == -1
                 ? "focus:border-red-600"
                 : "focus:border-primary"
             }
             border-gray-800 py-4 w-full px-6 rounded-none  focus:border-2  placeholder:text-gray-500`}
          placeholder="Email"
          name="email"
          autoComplete="off"
          type="email"
          required
          onChange={(e) => {
            setUser({
              ...user,
              email: e.target.value,
            });
          }}
        />
        <Input
          className={`bg-black border-gray-800 ${
            user.password.length < 6
              ? "focus:border-red-600 focus:border-2"
              : "focus:border-primary focus:border-2"
          } py-4 w-full px-6 rounded-none    placeholder:text-gray-500`}
          name="password"
          required
          type="password"
          autoComplete="off"
          placeholder="Password"
          onChange={(e) => {
            setUser({
              ...user,
              password: e.target.value,
            });
          }}
        />

        <Input
          className={`bg-black border-gray-800 ${
            user.username.length < 4
              ? "focus:border-red-600 focus:border-2"
              : "focus:border-primary focus:border-2"
          } py-4 w-full px-6 rounded-none    placeholder:text-gray-500`}
          name="username"
          required
          type="text"
          autoComplete="off"
          placeholder="@username"
          onChange={(e) => {
            setUser({
              ...user,
              username: e.target.value,
            });
          }}
        />
        <button
          type="submit"
          disabled={user.email.length < 5 || user.password.length < 6 || isLoading}
          className={`hover:opacity-85 transition duration-200 w-full rounded-full flex justify-center items-center py-2 font-extrabold text-md bg-gray-400 text-gray-700 text-center ${
            user.email.length > 4 &&
            user.email.includes("@") &&
            user.email.includes(".") &&
            user.password.length > 5 &&
            "bg-white  text-gray-900"
          }`}
        >
          {isLoading ? <Spinner/> : 'Siguiente'}
        </button>
      </div>
    </form>
  );
}

export default SignUpForm