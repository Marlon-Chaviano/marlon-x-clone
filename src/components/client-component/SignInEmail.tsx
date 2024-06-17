'use client'


import Link from 'next/link';
import React from 'react'
import { MdEmail } from 'react-icons/md';

const SignInEmail = () => {
  return (
      <Link 
      href={'/login/magicLink'}
      className="bg-white hover:bg-white/85 transition duration-200 text-sm flex items-center justify-center text-gray-800 rounded-full py-2 px-6 text-center w-full">
        <div className="mr-2">
          <MdEmail />
        </div>
        Sign up with Magic Link
      </Link>
  );
}

export default SignInEmail