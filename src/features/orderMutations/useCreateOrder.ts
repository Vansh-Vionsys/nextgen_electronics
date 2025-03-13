import { useMutation } from "@tanstack/react-query";
import { createOrder } from "@/services/orderAPI";
import { Address } from "@/components/user/CartCheckout"; // Adjust path if needed

interface OrderPayload {
  items: { product: string; quantity: number }[];
  totalAmount: number;
  address: Address;
  voucherAmount?: number;
  voucherId?: string;
}

interface OrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  dbOrderId: string;
}

export default function useCreateOrder() {
  return useMutation<OrderResponse, Error, OrderPayload>({
    mutationFn: createOrder,
    onError: (error) => {
      console.error("Order creation failed:", error);
    },
  });
}
