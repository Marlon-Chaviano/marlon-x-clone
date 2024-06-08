import React from 'react'
import { BsSearch } from 'react-icons/bs';

const RightSection = () => {
  return (
    <section className="hidden lg:flex sticky top-2 overflow-scroll flex-col w-[40%] mt-2 space-y-4 items-stretch h-screen px-6">
      <div>
        <div className="relative w-full h-full group">
          <input
            id="searchBox"
            type="text"
            placeholder="Search X"
            className="w-full h-full peer focus:border-primary focus:border outline-none bg-neutral-900/80 rounded-xl pl-14 pr-4 py-4 "
          />
          <label
            htmlFor="searchBox"
            className="absolute top-0 h-full left-0 flex items-center justify-center p-4 peer-focus:text-primary text-gray-500"
          >
            <BsSearch className="w-5 h-5" />
          </label>
        </div>
      </div>

      <div className="flex flex-col rounded-xl bg-neutral-900 my-4">
        <h3 className="font-bold text-xl my-2 p-2 px-4">
          What&apos;s happening{" "}
        </h3>
        <div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="hover:bg-white/10 p-4  last:rounded-b-xl transition duration-200"
            >
              <div className="font-bold text-lg">#trending Item {i + 1}</div>
              <div className="text-xs text-neutral-400">34.5k</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col rounded-xl bg-neutral-900 my-4">
        <h3 className="font-bold text-xl my-2 p-2 px-4">Who to follow</h3>
        <div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="hover:bg-white/10 p-4 flex w-fulL justify-between items-center last:rounded-b-xl transition duration-200"
            >
              <div className="flex space-x-2 items-center">
                <div className="w-10 h-10 rounded-full  bg-neutral-600"></div>
                <div className="flex flex-col">
                  <div className="font-bold text-white">OtherUser</div>
                  <div className="text-xs text-gray-500">@otheruser123</div>
                </div>
              </div>
              <div className="">
                <button className="rounded-full px-6 py-2 text-neutral-950 bg-white">
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RightSection