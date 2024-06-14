
import LeftSideBar from "@/components/LeftSideBar";
import RightSection from "@/components/RightSection";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex justify-center relative items-stretch">
      <div className="lg:max-w-[85vw] w-full  h-full flex relative text-white">
        <LeftSideBar />
        {children}
        <RightSection />
      </div>
    </div>
  );
}
