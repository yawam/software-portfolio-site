import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio - Papa Yaw Agyeman-Manu",
  description: "This is Papa Yaw Agyeman-Manu's Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <main className="bg-gradient-to-b from-gray-800 via-gray-900 to-black p-2 pb-16 shadow-2xl">
          <div className="sticky top-0 z-50 flex w-full justify-center">
            <Navbar />
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
