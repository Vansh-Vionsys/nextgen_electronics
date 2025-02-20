import { registerApi } from "@/services/authAPI";
import { IRegisterUser } from "@/types/user.types";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useRegister = () => {
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
export default useRegister;
