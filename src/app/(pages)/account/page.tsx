import AdminLayout from "@/components/admin/AdminLayout";
import UserLayout from "@/components/user/UserLayout";
import { useSession } from "next-auth/react";
import React from "react";

const AccountPage = () => {
  const { data: session, status } = useSession();
  console.log("session: ", session, "status: ", status);

  return session?.user?.role === "admin" ? <AdminLayout /> : <UserLayout />;
};

export default AccountPage;
