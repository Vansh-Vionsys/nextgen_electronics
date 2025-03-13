import axios from "axios";
import { Address } from "@/components/user/CartCheckout";

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

interface OrderStatusResponse {
  paymentStatus: string;
  deliveryStatus: string;
  // Add other fields as needed
}

export const createOrder = async (
  payload: OrderPayload
): Promise<OrderResponse> => {
  const response = await axios.post<OrderResponse>("/api/orders", payload);
  return response.data;
};

export const fetchOrderStatus = async (
  dbOrderId: string
): Promise<OrderStatusResponse> => {
  const response = await axios.get<OrderStatusResponse>(
    `/api/orders?orderId=${dbOrderId}`
  );
  return response.data;
};
