import LeftSideBar from '@/components/LeftSideBar';
import MainComponent from '@/components/MainComponent';
import RightSection from '@/components/RightSection';
import React from 'react'



const Home = () => {
  return (
    <div className="w-full h-full flex justify-center relative bg-black items-stretch">
      <div className="max-w-[85vw] w-full h-full flex relative text-white">
        <LeftSideBar />
        <MainComponent />
        <RightSection/>
      </div>
    </div>
  );
}

export default Home