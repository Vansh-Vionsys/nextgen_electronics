import React from "react";
import Providers from "@/utils/Providers";
import { Toaster } from "react-hot-toast";
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Providers>
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </Providers>
  );
}
