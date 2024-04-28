"use client"
import { redirect, useSearchParams } from 'next/navigation'
import React from 'react'
import Logo from '@/app/x-social-media-white-icon.svg';
import Image from 'next/image';
import { signup } from '@/app/login/actions';

const WaitPage = () => {

    const params = useSearchParams()
    const email = params.get("email")
    const username = params.get("username")

    if ( !email || !username) redirect("login")


  return (
    <div className="w-screen h-screen text-white flex flex col justify-center items-center">
      <div className='flex items-center space-x-2'>
        <div>
          <Image alt="x logo" src={Logo} width={80} height={80} />
        </div>
        <div className='font-medium'>
          <p>Hi 👋 {username} !</p>
          <p>Please check {email} and click the link for Sign up</p>
        </div>
      </div>
    </div>
  );
}

export default WaitPage;