"use client"

import { signInWithGithub } from '@/app/login/actions';
import { createClient } from '@/utils/supabase/client';
import { BsGithub } from 'react-icons/bs';

type Props  = {
    text:string
}

const SignInWithGithubButton = ({text}: Props) => {
  return (
    <button onClick={async () =>{
     await signInWithGithub()
    }} className="bg-white hover:bg-white/85 transition duration-200 flex items-center text-sm justify-center text-gray-800 rounded-full py-2 px-6 text-center w-full">
      <div className="mr-2">
        <BsGithub />
      </div>
      {text}
    </button>
  );
}

export default SignInWithGithubButton