import { updateProductApi } from "@/services/productsAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) =>
      updateProductApi({ id, data }),

    onSuccess: () => {
      toast.success("Product updated successfully.");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  return {
    updateProduct: mutate,
    isPendingUpdate: isPending,
    isUpdateError: isError,
  };
};

export default useUpdateProduct;
