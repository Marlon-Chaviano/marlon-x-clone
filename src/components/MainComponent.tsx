import React from 'react'
import { AiOutlineRetweet } from "react-icons/ai";
import { BsBookmark, BsDot, BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { FiHeart, FiShare } from "react-icons/fi";
import { IoMdStats } from "react-icons/io";

const MainComponent = () => {
  return (
    <main className="w-[60%] flex flex-col h-full min-h-screen border-l-[0.5px] border-r-[0.5px] border-gray-600">
      <h1 className="text-xl font-bold p-6 backdrop-blur-sm bg-black/10 sticky top-0">
        Home
      </h1>
      <div className="border-t-[0.5px] border-b-[0.5px] flex px-4 py-6 items-stretch space-x-2 border-gray-600 relative">
        <div className="w-10 h-10 bg-slate-400 rounded-full flex-none"></div>
        <div className="flex flex-col w-full">
          <input
            type="text"
            placeholder="What's Happening ?"
            className="w-full h-full p-4 placeholder:text-xl placeholder:text-gray-600 border-b-[0.5px] bg-transparent outline-none border-none"
          />
          <div className="w-full justify-between items-center flex">
            <div></div>
            <div className="w-full max-w-[100px]">
              <button className="bg-primary rounded-full text-lg font-bold px-4 py-2 w-full hover:opacity-70 transition duration-200">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        {Array.from({ length: 5 }).map((_, i) => {
          return (
            <div
              key={i}
              className="border-b-[0.5px] border-gray-600 p-4 flex space-x-4"
            >
              <div>
                <div className="w-10 h-10 bg-slate-200 rounded-full" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center my-1 w-full justify-between">
                  <div className="flex items-center space-x-1 ">
                    <div className="font-bold">Marlon</div>
                    <div className="text-gray-500">@marlon.developer</div>
                    <div>
                      <BsDot />
                    </div>
                    <div className="text-gray-500">1 hour ago</div>
                  </div>
                  <div>
                    <BsThreeDots />
                  </div>
                </div>
                <div className="text-white text-base my-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime quaerat labore suscipit praesentium asperiores
                  consequatur ea, nihil numquam natus aut!
                </div>
                <div className="bg-slate-400 aspect-square w-full h-80 rounded-xl mt-2"></div>
                <div className="flex items-center space-x-2 w-full justify-between mt-4">
                  <div className="hover:text-primary transition duration-200 p-1 cursor-pointer">
                    <FaRegComment />
                  </div>
                  <div className="hover:text-primary transition duration-200 p-1 cursor-pointer">
                    <AiOutlineRetweet />
                  </div>
                  <div className="hover:text-primary transition duration-200 p-1 cursor-pointer">
                    <FiHeart />
                  </div>
                  <div className="hover:text-primary transition duration-200 p-1 cursor-pointer">
                    <IoMdStats />
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="hover:text-primary transition duration-200 p-1 cursor-pointer">
                      <BsBookmark />
                    </div>
                    <div className="hover:text-primary transition duration-200 p-1 cursor-pointer">
                      <FiShare />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default MainComponent