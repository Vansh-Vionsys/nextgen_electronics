import { addProductAPI } from "@/services/productsAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useAddProduct = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (value: any) => addProductAPI(value),
    onSuccess: () => {
      toast.success("Product added Successfully");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.error);
    },
  });

  return {
    addProduct: mutate,
    isAdding: isPending,
    isError: error,
  };
};

export default useAddProduct;
