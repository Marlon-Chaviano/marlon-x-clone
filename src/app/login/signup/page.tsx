import Logo from '@/app/x-social-media-white-icon.svg';
import { BsX } from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';
import SignUpForm from '@/components/SignUpForm';


const page = () => {
  
  return (
    <main className="p-10 pt-40 w-screen h-screen  max-w-[600px] mx-auto text-white">
      <div className='w-full max-w-[450px]'>
        <div className="flex w-[50%] justify-between items-center">
          <Link href={"/login"}>
            <BsX className="w-10 h-10 animate-pulse" />
          </Link>
          <Image src={Logo} alt="X logo" width={30} height={30} />
        </div>
        <SignUpForm />
      </div>
    </main>
  );
}

export default page