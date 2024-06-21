"use server"
import { getUser } from "@/lib/supabase/queries";
import { createClient } from "@/utils/supabase/server";
import NAVIGATION_ITEMS from '../utils/constants/nav-items'

import LogoutBtn from "./ui/logout";
import { redirect} from "next/navigation";
import NavItem from "./client-component/NavItem";
import ComposeLeftTweetBtn from "./server-components/ComposeLeftBtn";


const LeftSideBar = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const user = await getUser({userId: data.user?.id as string})
  if ( !data ) redirect('login')


  return (
    <section className="hidden lg:flex lg:flex-col sticky top-0 md:h-[90vh] lg:w-[23%] w-20 items-stretch">
      <div className="flex md:flex-col md:items-stretch md:h-full  md:space-y-4 md:mt-4">
        {NAVIGATION_ITEMS.map((item, i) => (
          <NavItem key={i} item={item} userId={user.id} />
        ))}
      <ComposeLeftTweetBtn/>
      </div>
      <div className="rounded-full w-full justify-between flex items-center space-x-2 bg-transparent p-4 text-center">
        <div className="flex space-x-2 items-center">
          <div className="rounded-full bg-slate-400 w-8 h-8"></div>
          <div className="text-left text-sm truncate">
            <div className="font-semibold">{user.username}</div>
            <div className="">@{user.username}</div>
          </div>
        </div>
        <LogoutBtn classname="bg-black/20 border-[0,5px] hover:bg-white/5 transition duration-200 " />
      </div>
    </section>
  );
};

export default LeftSideBar;
