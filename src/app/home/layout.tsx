
import LeftSideBar from "@/components/LeftSideBar";
import RightSection from "@/components/RightSection";
import BottomNav from "@/components/ui/bottom-nav";
import MeCard from "@/components/ui/MeCard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full  h-full flex-col justify-center relative items-stretch">
      <div className="lg:max-w-[85vw] w-full h-full flex-col mx-auto relative text-white">
        <div className="w-full flex justify-center">
          <MeCard />
        </div>
        <div className="flex w-full h-full">
          <LeftSideBar />
          <main className="lg:w-[60%] max-w-[600px] mx-auto flex flex-col h-full min-h-screen border-t-[0.5px] border-l-[0.5px] border-r-[0.5px] border-gray-600">
            {children}
            <BottomNav />
          </main>
          <RightSection />
        </div>
      </div>
    </div>
  );
}
