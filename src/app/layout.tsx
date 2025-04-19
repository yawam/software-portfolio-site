import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import AuthProvider from "@/components/AuthProvider";
import { Toaster } from "react-hot-toast";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Software Portfolio - Papa Yaw Agyeman-Manu",
  description: "This is Papa Yaw Agyeman-Manu's SoftwarePortfolio Website",
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
          <Toaster />
          <div className="sticky top-0 z-50 flex w-full justify-center">
            <Navbar />
          </div>
          <AuthProvider> {children} </AuthProvider>
        </main>
      </body>
    </html>
  );
}
