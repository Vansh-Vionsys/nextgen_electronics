import { registerApi } from "@/services/authAPI";
import { IRegisterUser } from "@/types/user.types";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export const useRegister = () => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: ({ userName, email, password }: IRegisterUser) =>
      registerApi({ userName, email, password }),
    onSuccess: () => toast.success("User created successfully"),
    onError: (err: any) => toast.error(err.response.data.error),
  });
  return {
    register: mutate,
    registerLoading: isPending,
    registerError: isError,
  };
};

export const useAuthLogin = () => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (provider: string) => signIn(provider, { callbackUrl: "/" }),
    onSuccess: () => {
      toast.success("Login Successful!!");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log(error?.response?.data?.error);
      toast.error(
        error?.response?.data?.error || "Failed to login. Please try again..."
      );
    },
  });
  return {
    authLogin: mutate,
    isAuthLoginPending: isPending,
    isAuthLoginError: isError,
  };
};
