import { addCartProductApi } from "@/services/cartAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useAddCartProduct = (userId: string) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: any) => addCartProductApi({ userId, data }),
    onSuccess: () => {
      toast.success("Product Added to Cart");
      queryClient.invalidateQueries({
        queryKey: ["cart", userId],
      });
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.error);
    },
  });
  return {
    addCartProduct: mutate,
    isAddingCart: isPending,
    isAddCartError: error,
  };
};

export default useAddCartProduct;
