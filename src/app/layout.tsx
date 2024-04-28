import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Toaster} from 'sonner';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "X - Marlon",
  description: "X clon made by @Marlon-WebDeveloper",
  keywords: [
    'developer',
    'web developer',
    'Marlon',
    'Marlon chaviano',
    'twitter clon',
    'social media clon'
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <Toaster />
        <body className={`${inter.className} bg-black`}>{children}</body>
    </html>
  );
}
