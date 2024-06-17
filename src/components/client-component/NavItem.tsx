"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";

type Item = {
  item:
    | {
        title: string;
        icon: JSX.Element;
        to: string;
        fillicon?: undefined;
      }
    | {
        title: string;
        icon: JSX.Element;
        fillicon: JSX.Element;
        to: string;
      }
    | {
        title: string;
        icon: JSX.Element;
        fillicon: JSX.Element;
        to?: undefined;
      };
  userId?: string;
};

const NavItem = ({ item, userId }: Item) => {
  const pathname = usePathname()
  let [,path,] = pathname.slice(1, pathname.length).split('/')
  if (!path) path = 'home'
  
  

  return (
    <Link
      replace
      className={`${
        item.title == "X" ? "hover:bg-none hidden" : "hover:bg-white/10 flex"
      } text-2xl  transition duration-200 w-fit  items-center justify-start lg:p-2 p-4 space-x-4 px-6 lg:rounded-3xl ${
        item.title.toLowerCase() == path && "bg-white/10"
      }`}
      href={
        item.title.toLowerCase() == "profile"
          ? `/home/profile/${userId}`
          : (item.to as string)
      }
      key={item.title}
    >
      <div className={`${path == item.title.toLowerCase() && 'text-primary lg:text-white'}`}>
        {path == item.title.toLowerCase() ? item.fillicon : item.icon}
      </div>
      <div className="hidden lg:flex">{item.title != "X" && item.title}</div>
    </Link>
  );
};

export default NavItem;
