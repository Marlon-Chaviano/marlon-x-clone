import Link from "next/link";
import React from "react";
import { BsX } from "react-icons/bs";
import Logo from "@/app/x-social-media-white-icon.svg";
import Image from "next/image";
import MagicLinkForm from "@/components/client-component/MagicLinkForm";

const page = () => {
  return (
    <main className="p-10 pt-40 w-screen h-screen  max-w-[600px] mx-auto text-white">
      <div className="w-full max-w-[450px]">
        <div className="flex w-[50%] justify-between items-center">
          <Link href={"/login"}>
            <BsX className="w-10 h-10 animate-pulse" />
          </Link>
          <Image alt="X logo" src={Logo} width={30} height={30} />
        </div>
        <MagicLinkForm />
      </div>
    </main>
  );
};

export default page;
