"use server";

import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

export const validateUser = async (
  Credentials: Record<"email" | "password", string> | undefined
) => {
  try {
    if (!Credentials?.email || !Credentials?.password)
      throw new Error("Credentials required");
    await dbConnect();

    const user = await User.findOne({ email: Credentials?.email });
    if (!user) throw new Error("user not found");

    const isValid = await bcrypt.compare(Credentials?.password, user?.password);
    if (!isValid) throw new Error("Invalid password");

    return {
      id: user?._id.toString(),
      role: user?.role,
      email: user?.email,
      name: user?.userName,
    };
  } catch (error) {
    console.log("Auth Error", error);
    throw error;
  }
};
