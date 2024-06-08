import Link from "next/link";
import Logo from '@/app/x-social-media-white-icon.svg';
import Image from "next/image";
import { BsArrowReturnRight, BsCircleFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import ErrorBtn from "@/components/client-component/ErrorBtn";
export default function ErrorPage() {
  
  return (
  
    <div className="w-screen h-screen space-y-6 text-white bg-black flex flex-col justify-center items-center">
      <Image alt="X logo" src={Logo} width={150} />
      <div>
        <h3 className="font-medium text-2xl">Oops, something went wrong</h3>
        <ErrorBtn/>
      </div>
    </div>
  );
}
