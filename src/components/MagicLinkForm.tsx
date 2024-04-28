"use client"
import React, { useState } from 'react'
import { Input } from './ui/input';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { signInWithEmail } from '@/app/login/actions';
import Spinner from './ui/spinner';
import { redirect, useRouter } from 'next/navigation';


const MagicLinkForm = () => {

    const [user, setUser] = useState({
    email: "",
    username: "",
    });

    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    type UserData = {
    email: string;
    username: string;
    };

    type data = {
      user: {

      }
    }

     async function handleSubmit({email ,username}:UserData){
      setIsLoading(true)
      const supabase = createClient()
        const formData = new FormData();
        formData.append("email", email);
        formData.append("username", username);
        const { data: profiles } = await supabase.from("profiles").select();
        
        if ( profiles?.find( profile => profile?.username == username)){
          setIsLoading(false)
          setUser({...user,username: ""})
          return toast.error("Username already exists")
        } else {
           const data = await signInWithEmail(formData)
           .then(() => setIsLoading(false));
           router.push(
             `/private?email=${user.email}&&username=${user.username}`
           )
           } 
        }    
      

  return (
    <form
      className="mt-4 p-6 max-w-[450px] flex flex-col space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(user);
        
      }}
    >
      <div>
        <h4 className="text-2xl tracking-wide font-extrabold">Magic Link</h4>
        <p className="text-balanced font-bold text-gray-500 text-sm">
          You will recibe a link to sign up, please click it and you will be
          redirected to the home page
        </p>
      </div>
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
          disabled={user.email.length < 5 || user.username.length < 4 || isLoading}
          className={`hover:opacity-85 transition flex justify-center items-center duration-200 w-full rounded-full py-2 font-extrabold text-md bg-gray-400 text-gray-700 text-center ${
            user.email.length > 4 &&
            user.email.includes("@") &&
            user.email.includes(".") &&
            "bg-white  text-gray-900"
          }`}
        >
          {isLoading ? <Spinner/> : 'Siguiente'}
        </button>
      </div>
    </form>
  )
}

export default MagicLinkForm