import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import LeftSideBar from "@/components/LeftSideBar";
import RightSection from "@/components/RightSection";
import MeCard from "@/components/ui/MeCard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MarlonX",
  description: "X clon made by @Marlon-WebDeveloper",
  keywords: [
    "developer",
    "web developer",
    "Marlon",
    "Marlon chaviano",
    "twitter clon",
    "social media clon",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Toaster />
      <body className={`${inter.className} bg-black`}>
        {children}
      </body>
    </html>
  );
}
