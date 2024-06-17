import NAVIGATION_ITEMS from '@/utils/constants/nav-items';
import React from 'react'
import NavItem from '../client-component/NavItem';
import { createClient } from '@/utils/supabase/server';
import { redirect, RedirectType } from 'next/navigation';

const BottomNav =async () => {
  const supabse = createClient()
  const user = await supabse.auth.getUser()
  if ( !user ) redirect('/login',RedirectType.replace)
  return (
    <div className='sticky h-full bottom-0 flex flex-col justify-end items-end'>
      <div className="sticky bottom-0 lg:hidden border-t-[0.5px] border-gray-500 bg-black/85 flex w-full justify-between">
        {NAVIGATION_ITEMS.map((item, i) => (
          <NavItem key={i} item={item} userId={user.data.user?.id} />
        ))}
      </div>
    </div>
  );
}

export default BottomNav