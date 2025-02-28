import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const useLogin = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        throw new Error(res.error);
      }

      return res;
    },

    onSuccess: () => {
      toast.success("User login successful");
      router.push("/");
    },

    onError: (error) => {
      toast.error(error.message || "Error occurred while logging in");
    },
  });

  return {
    login: mutate,
    loginPending: isPending,
  };
};

export default useLogin;
