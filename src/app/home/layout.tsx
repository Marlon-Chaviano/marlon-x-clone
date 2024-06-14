
import LeftSideBar from "@/components/LeftSideBar";
import RightSection from "@/components/RightSection";
import MeCard from "@/components/ui/MeCard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex-col justify-center relative items-stretch">
      <div className="lg:max-w-[85vw] w-full h-full flex-col mx-auto relative text-white">
        <div className="w-full flex justify-center">
          <MeCard/>
        </div>
        <div className="flex">
          <LeftSideBar />
          {children}
          <RightSection />
        </div>
      </div>
    </div>
  );
}
