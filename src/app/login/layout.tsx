import { createClient } from "@/utils/supabase/server";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });




export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const supabase = createClient();
   const { data } = await supabase.auth.getUser();
   if (data.user) {
     redirect("home");
   }
  return <div>{children}</div>;
}
