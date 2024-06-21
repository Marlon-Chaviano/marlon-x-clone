"use client"

import { signInWithGithub, signInWithGoogle } from '@/app/login/actions';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { toast } from 'sonner';

type Props  = {
    text:string
}

export const SignInWithGithubButton = ({text}: Props) => {
  return (
    <button onClick={async () =>{
     try {
      await signInWithGithub();
     } catch (error) {
      toast.error(error as string)
     }
    }} className="bg-white hover:bg-white/85 transition duration-200 flex items-center text-sm justify-center text-gray-800 rounded-full py-2 px-6 text-center w-full">
      <div className="mr-2">
        <BsGithub />
      </div>
      {text}
    </button>
  );
}

export const SignInWithGoogleBtn = ({text}:Props) => {
    return (
      <button
        onClick={async () => {
          try {
            await signInWithGoogle()
          } catch (error) {
            toast.error(error as string);
          }
        }}
        className="bg-white hover:bg-white/85 transition duration-200 flex items-center text-sm justify-center text-gray-800 rounded-full py-2 px-6 text-center w-full"
      >
        <div className="mr-2">
          <BsGoogle />
        </div>
        {text}
      </button>
    );
}
