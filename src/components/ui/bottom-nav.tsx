import NAVIGATION_ITEMS from '@/utils/constants/nav-items';
import React from 'react'
import NavItem from '../client-component/NavItem';
import { createClient } from '@/utils/supabase/server';
import { redirect, RedirectType } from 'next/navigation';

const BottomNav = async () => {
  const supabse = createClient()
  const user = await supabse.auth.getUser()
  if ( !user ) redirect('/login',RedirectType.replace)
  return (
      <div className="sticky max-w-[600px] bottom-0 lg:hidden border-t-[0.5px] border-gray-500 bg-black/85 flex w-full justify-between">
        {NAVIGATION_ITEMS.map((item, i) => (
          <NavItem key={i} item={item} userId={user.data.user?.id} />
        ))}
      </div>
  );
}

export default BottomNav