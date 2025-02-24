import React from "react";
import Providers from "@/utils/Providers";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Providers>
      <header className="z-50">
        <Navbar />
      </header>
      <Toaster position="top-center" reverseOrder={false} />
      {children}
      <footer>
        <Footer />
      </footer>
    </Providers>
  );
}
