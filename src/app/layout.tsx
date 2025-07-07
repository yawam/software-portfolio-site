import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import AuthProvider from "@/components/AuthProvider";
import { Toaster } from "react-hot-toast";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Papa Yaw's Portfolio",
  icons: {
    icon: "/favicon.ico",
  },
  description: "Check out Papa Yaw's software portfolio",
  openGraph: {
    title: "Papa Yaw's Portfolio",
    description: "See my projects, recommendations, and favorite things.",
    url: "https://pyfolio.dev",
    siteName: "Papa Yaw's Portfolio",
    images: [
      {
        url: "https://axl8uyhwd5.ufs.sh/f/7dF6fxvLS6wZR9T4WWBhwd4XZYF5k7SvuxWrnf1lDVcIPHQi", // replace with your hosted image
        width: 1200,
        height: 630,
        alt: "Papa Yaw's Portfolio Screenshot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Papa Yaw's Portfolio",
    description: "Check out my work and get to know me.",
    images: [
      "https://axl8uyhwd5.ufs.sh/f/7dF6fxvLS6wZR9T4WWBhwd4XZYF5k7SvuxWrnf1lDVcIPHQi",
    ], // same or different from OG
  },
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
