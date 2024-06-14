
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';


const page = async () => {
  
    const supabase = createClient()
     const { data } = await supabase.auth.getUser();
     if ( data.user ) {
        redirect('home')
     } else {
        redirect('login')
     }
}

export default page