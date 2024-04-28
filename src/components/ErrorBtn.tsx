"use client"

import { useRouter } from 'next/navigation';
import React from 'react'
import { BsArrowReturnRight } from 'react-icons/bs';

const ErrorBtn = () => {
    const router = useRouter()
  return (
    <button
      className="font-bold animate-pulse flex space-x-2 items-center text-primary text-lg"
      onClick={() => {
        router.back();
      }}
    >
      Please try again
      <BsArrowReturnRight className="ml-2" />
    </button>
  );
}

export default ErrorBtn