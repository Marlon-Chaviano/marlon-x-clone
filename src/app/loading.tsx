import React from 'react'
import Image from "next/image";
import Logo from "@/app/x-social-media-white-icon.svg";

const loading = () => {
  return (
    <div className="bg-black w-screen h-screen flex justify-center items-center">
      <Image alt="X Logo" src={Logo} width={50} height={50} />
    </div>
  );
}

export default loading