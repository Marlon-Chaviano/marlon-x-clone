import LeftSideBar from '@/components/LeftSideBar';
import MainComponent from '@/components/MainComponent';
import RightSection from '@/components/RightSection';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react'

const Home = async () => {
  
  const supabase = createClient();
  
  const { data, error } = await supabase.auth.getUser();
  console.log({error , data});  

  if (error || !data?.user) {
    redirect("/login");
  }
  
  return (
    <div className="w-full h-full flex justify-center relative items-stretch">
      <div className="lg:max-w-[85vw] w-full  h-full flex relative text-white">
        <LeftSideBar />
        <MainComponent />
        <RightSection/>
      </div>
    </div>
  );
}

export default Home