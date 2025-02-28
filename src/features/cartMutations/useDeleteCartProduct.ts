import { deleteCartProductApi } from "@/services/cartAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useDeleteCartProduct = (userId: string) => {
  const queryClient = useQueryClient();

  const { mutate, isError, isPending } = useMutation({
    mutationFn: async (productId: string) => deleteCartProductApi(productId),
    onSuccess: () => {
      toast.success("Product removed from cart");

      queryClient.invalidateQueries({
        queryKey: ["cart", userId],
        exact: true,
      });
    },
    onError: (error: any) => {
      toast.error("Error while removing product", error);
    },
  });
  return {
    deleteCartProduct: mutate,
    deleteCartProductPending: isPending,
    deleteCartProductError: isError,
  };
};

export default useDeleteCartProduct;
