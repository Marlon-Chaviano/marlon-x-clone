import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import type { Viewport } from "next";

const inter = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

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

export const viewport: Viewport = {
  themeColor: "black",
  initialScale: 1.0,
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
