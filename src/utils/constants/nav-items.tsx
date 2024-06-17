
import { BiSolidSearch } from "react-icons/bi";
import {
  BsBell,
  BsBellFill,
  BsBookmark,
  BsBookmarkFill,
  BsEnvelope,
  BsEnvelopeFill,
  BsHouseDoor,
  BsHouseDoorFill,
  BsPerson,
  BsPersonFill,
  BsSearch,
} from "react-icons/bs";
import { TbBrandX } from "react-icons/tb";
 const NAVIGATION_ITEMS = [
   {
     title: "X",
     icon: <TbBrandX />,
     to: "/home",
   },
   {
     title: "Home",
     icon: <BsHouseDoor />,
     fillicon: <BsHouseDoorFill />,
     to: "/home",
   },
   {
     title: "Explore",
     icon: <BsSearch />,
     fillicon: <BiSolidSearch />,
     to: "/home/explore",
   },
   {
     title: "Notifications",
     icon: <BsBell />,
     fillicon: <BsBellFill />,
     to: "/home",
   },
   {
     title: "Messages",
     icon: <BsEnvelope />,
     fillicon: <BsEnvelopeFill />,
     to: "/home",
   },
   {
     title: "Bookmarks",
     icon: <BsBookmark />,
     fillicon: <BsBookmarkFill />,
     to: "/home/bookmarks",
   },
   {
     title: "Profile",
     icon: <BsPerson />,
     fillicon: <BsPersonFill />,
   },
 ];
export default NAVIGATION_ITEMS