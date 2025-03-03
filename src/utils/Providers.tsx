"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider, useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider refetchInterval={15 * 60}>
        <QueryClientProvider client={queryClient}>
          <SessionLoader>{children}</SessionLoader>
          <Toaster position="top-center" reverseOrder={false} />
          <ReactQueryDevtools initialIsOpen={false} position="top" />
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default Providers;

export const SessionLoader = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  console.log("Session Status:", status);

  if (status === "loading") {
    return (
      <div className="h-screen w-screen flex-col gap-4 flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
