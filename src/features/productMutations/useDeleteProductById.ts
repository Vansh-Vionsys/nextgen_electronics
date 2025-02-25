import { deleteProductByIdAPI } from "@/services/productsAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useDeleteProductById = () => {
  const queryClient = useQueryClient();

  const { mutate, isError, isPending } = useMutation({
    mutationFn: async (id: string) => deleteProductByIdAPI(id),

    onSuccess: () => {
      toast.success("product deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["products"],
        exact: true,
      });
    },
    onError: (error: any) => {
      toast.error("Error while deleting product", error);
    },
  });

  return {
    deleteProduct: mutate,
    isDeletingError: isError,
    isDeletePending: isPending,
  };
};

export default useDeleteProductById;
