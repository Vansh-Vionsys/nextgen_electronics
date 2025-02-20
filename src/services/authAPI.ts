import { IRegisterUser } from "@/types/user.types";
import axios from "axios";

export const registerApi = async ({
  userName,
  email,
  password,
}: IRegisterUser) => {
  const response = await axios.post("/api/auth/register", {
    userName,
    email,
    password,
  });
  return response.data;
};
