import Link from 'next/link'
import React from 'react'
import { BsBell, BsBookmark, BsEnvelope, BsHouseDoor, BsPerson, BsSearch, BsThreeDots} from 'react-icons/bs'
import { TbBrandX } from 'react-icons/tb'
const NAVIGATION_ITEMS = [
  {
    title: "X",
    icon:TbBrandX
  },
  {
    title: "Home",
    icon: BsHouseDoor
  },
  {
    title: "Explore",
    icon: BsSearch
  },
  {
    title:"Notifications",
    icon: BsBell
  },
  {
    title:"Messages",
    icon:BsEnvelope
  },
  {
    title:"Bookmarks",
    icon: BsBookmark
  },
  {
    title: "Profile",
    icon:BsPerson
  }
]

const LeftSideBar = () => {
  return (
    <section className="hidden lg:flex lg:flex-col sticky top-0 h-screen lg:w-[23%] w-0  items-stretch">
      <div className="flex flex-col items-stretch h-full space-y-4 mt-4">
         {NAVIGATION_ITEMS.map((item) => (
          <Link
            className="hover:bg-white/10 text-2xl transition duration-200 w-fit flex items-center justify-start p-2 space-x-4 px-6 rounded-3xl"
            href={`/${item.title.toLowerCase()}`}
            key={item.title}
          >
            <div>
              <item.icon />
            </div>
            <div>{item.title != "X" && item.title}</div>
          </Link>
        ))}
        <button className="bg-primary m-4 rounded-full text-2xl font-bold p-4 hover:opacity-70 transition duration-200">
          Post
        </button>
      </div>
      <button className="rounded-full w-full justify-between hover:bg-white/10 transition duration-200  flex items-center space-x-2 bg-transparent p-4 text-center">
        <div className="flex space-x-2 items-center">
          <div className="rounded-full bg-slate-400 w-8 h-8"></div>
          <div className="text-left text-sm">
            <div className="font-semibold">Marlon</div>
            <div className="">@marlon</div>
          </div>
        </div>
        <div>
          <BsThreeDots />
        </div>
      </button>
    </section>
  );
}

export default LeftSideBar