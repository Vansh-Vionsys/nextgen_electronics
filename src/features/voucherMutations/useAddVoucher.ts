import { addVoucherApi } from "@/services/voucherAPI";
import { IVoucher } from "@/types/voucher.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useAddVoucher = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: IVoucher) => addVoucherApi(data),
    onSuccess: () => {
      toast.success("Voucher Code Added Successfully");
      queryClient.invalidateQueries({
        queryKey: ["voucher"],
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error);
    },
  });
  return {
    addVoucher: mutate,
    isAddingVoucher: isPending,
    isVoucherError: error,
  };
};

export default useAddVoucher;
