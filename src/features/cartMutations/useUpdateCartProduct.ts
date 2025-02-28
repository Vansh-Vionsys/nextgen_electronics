import { updateCartProductApi } from "@/services/cartAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useUpdateCartProduct = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({
      userId,
      productId,
      quantity,
    }: {
      userId: string;
      productId: string;
      quantity: number;
    }) => updateCartProductApi({ userId, productId, quantity }),

    onSuccess: ({ userId }) => {
      toast.success("Cart Item Updated Successfully");
      queryClient.invalidateQueries({
        queryKey: ["cart", userId],
      });
    },
  });

  return {
    updateCartProduct: mutate,
    isPendingUpdateCart: isPending,
    isUpdateCartError: isError,
  };
};

export default useUpdateCartProduct;
