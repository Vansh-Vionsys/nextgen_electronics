import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toINR } from "@/helpers/convertToINR";
import useVerifyVoucher from "@/features/voucherMutations/useVerifyVoucher";
import Spinner from "../Spinner";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import useCreateOrder from "@/features/orderMutations/useCreateOrder";
import { useRouter } from "next/navigation"; // Add router for redirection

interface CartCheckoutProps {
  cartItems: any[];
  cartQuantities: { [key: string]: number };
}

interface Voucher {
  name: string;
  amount: number;
  _id: string;
}

export interface Address {
  name: string;
  phone: string;
  addressLine: string;
  city: string;
  zipCode: string;
}

const CartCheckout = ({ cartItems, cartQuantities }: CartCheckoutProps) => {
  const router = useRouter(); // Initialize router for redirection
  const { verifyVoucher, verifyVoucherPending, verifyVoucherError } =
    useVerifyVoucher();
  const totalItems = cartItems.length;
  const subtotal = cartItems.reduce((acc, item) => {
    const quantity = cartQuantities[item.product._id] || item.quantity;
    return acc + item.product.price * quantity;
  }, 0);
  const [voucher, setVoucher] = useState<Voucher | null>(null);
  const [voucherCode, setVoucherCode] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const totalCost = subtotal - (voucher?.amount || 0);

  // State for address popup
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [address, setAddress] = useState<Address>({
    name: "",
    phone: "",
    addressLine: "",
    city: "",
    zipCode: "",
  });

  // React Query mutation for creating order
  const { mutate: createOrder, isPending } = useCreateOrder();

  // Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handle verifying voucher
  const handleVoucher = (data: FormData) => {
    const code = data.get("voucher") as string;
    setVoucherCode(code);
    verifyVoucher(
      { code, subTotal: totalCost },
      {
        onSuccess: ({ voucher }: { voucher: Voucher }) => setVoucher(voucher),
        onError: () => setVoucherCode(""),
      }
    );
  };

  // Handle removing the voucher
  const handleRemoveVoucher = () => {
    setVoucher(null);
    setVoucherCode("");
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  // Handle address input change
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // Handle address form submission
  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !address.name ||
      !address.phone ||
      !address.addressLine ||
      !address.city ||
      !address.zipCode
    ) {
      alert("Please fill in all address fields");
      return;
    }
    setShowAddressPopup(false);

    // Format items for the order
    const formattedItems = cartItems.map((item) => ({
      product: item.product._id,
      quantity: cartQuantities[item.product._id] || item.quantity,
    }));

    // Create order with the payload
    createOrder(
      {
        items: formattedItems,
        totalAmount: totalCost,
        address,
        voucherAmount: voucher?.amount,
        voucherId: voucher?._id,
      },
      {
        onSuccess: async (data) => {
          if (data?.orderId && data?.amount && data?.currency) {
            await openRazorpay(
              data.orderId,
              data.amount,
              data.currency,
              data.dbOrderId
            );
          } else {
            alert("Failed to get Razorpay order details.");
          }
        },
        onError: () => {
          alert("Failed to create order. Please try again.");
        },
      }
    );
  };

  // Handle checkout button click
  const handleCheckout = () => {
    setShowAddressPopup(true); // Open address popup
  };

  // Open Razorpay checkout modal
  const openRazorpay = async (
    orderId: string,
    amount: number,
    currency: string,
    dbOrderId: string // Add dbOrderId to track the order
  ) => {
    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      alert("Failed to load Razorpay script. Please refresh and try again.");
      return;
    }

    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
      alert("Razorpay Key ID not found. Please contact support.");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount,
      currency,
      name: "NextGen Electronics",
      description: "Order Payment",
      order_id: orderId,
      handler: async (response: any) => {
        try {
          console.log("Razorpay payment response:", response);

          // Show a success message and redirect to an order confirmation page
          alert(
            "Payment initiated successfully! Redirecting to order confirmation..."
          );
          router.push(`/order-confirmation?orderId=${dbOrderId}`);

          // Optionally: Poll for the updated order status (if needed)
          /*
          const checkOrderStatus = async (orderId: string) => {
            try {
              const response = await fetch(`/api/orders?orderId=${orderId}`);
              const result = await response.json();
              if (result.paymentStatus === "completed") {
                alert("Payment confirmed!");
                router.push(`/order-confirmation?orderId=${dbOrderId}`);
              } else if (result.paymentStatus === "failed") {
                alert("Payment failed. Please try again.");
              }
            } catch (error) {
              console.error("Error checking order status:", error);
            }
          };
          setTimeout(() => checkOrderStatus(orderId), 5000); // Check after 5 seconds
          */
        } catch (error) {
          console.error("Payment handling error:", error);
          alert(
            "Error processing payment response. Please check your order status."
          );
        }
      },
      prefill: {
        name: address.name || "John Doe",
        email: "johndoe@example.com",
        contact: address.phone || "9876543210",
      },
      theme: {
        color: "#6366F1",
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.on("payment.failed", (response: any) => {
      console.error("Payment failed:", response.error);
      alert("Payment failed. Please try again.");
    });
    razorpayInstance.open();
  };

  return (
    <div>
      <Card className="shadow-xl dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden sticky top-8">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent">
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm uppercase text-gray-700 dark:text-gray-300">
              {totalItems} Item{totalItems !== 1 ? "s" : ""}
            </span>
            <span className="font-semibold text-sm text-gray-900 dark:text-white">
              {toINR(subtotal)}
            </span>
          </div>
          <div className="space-y-2">
            <Label className="font-medium text-sm uppercase text-gray-700 dark:text-gray-300">
              Shipping
            </Label>
            <Select defaultValue="standard">
              <SelectTrigger className="w-full h-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <SelectValue placeholder="Select shipping" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                <SelectItem value="standard">
                  Standard Shipping - free
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Voucher Section */}
          <div className="space-y-2">
            <Label className="font-semibold text-sm uppercase text-gray-700 dark:text-gray-300">
              Promo Code
            </Label>
            <form
              ref={formRef}
              onSubmit={(e) => {
                e.preventDefault();
                handleVoucher(new FormData(e.currentTarget));
              }}
              className="relative"
            >
              <div className="relative">
                <input
                  name="voucher"
                  type="text"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  placeholder={voucher ? "" : "Enter your code"}
                  className="w-full mb-2 p-2 pr-10 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={voucher !== null}
                />
                {voucher && (
                  <button
                    type="button"
                    onClick={handleRemoveVoucher}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              {!voucher && (
                <Button
                  disabled={verifyVoucherPending}
                  variant="destructive"
                  className="w-full uppercase text-sm font-semibold"
                >
                  {verifyVoucherPending ? <Spinner /> : "Apply Code"}
                </Button>
              )}
            </form>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            {/* Voucher Discount Display */}
            <AnimatePresence>
              {voucher && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-between items-center mb-2"
                >
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    Discount ({voucher.name})
                  </span>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                    - {toINR(voucher.amount)}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex justify-between items-center font-semibold text-sm uppercase text-gray-800 dark:text-white">
              <span>Total Cost</span>
              <span>{toINR(totalCost)}</span>
            </div>
            <Button
              onClick={handleCheckout}
              className="w-full mt-4 uppercase font-semibold text-sm"
              disabled={isPending}
            >
              {isPending ? "Processing..." : "Checkout"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Address Popup Modal */}
      <AnimatePresence>
        {showAddressPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-xl relative"
            >
              <button
                onClick={() => setShowAddressPopup(false)}
                className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
              >
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Shipping Address
              </h3>
              <form onSubmit={handleAddressSubmit} className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name
                  </Label>
                  <Input
                    name="name"
                    type="text"
                    value={address.name}
                    onChange={handleAddressChange}
                    placeholder="Enter your full name"
                    className="w-full mt-1 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                  </Label>
                  <Input
                    name="phone"
                    type="text"
                    value={address.phone}
                    onChange={handleAddressChange}
                    placeholder="Enter your phone number"
                    className="w-full mt-1 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Address Line
                  </Label>
                  <Input
                    name="addressLine"
                    type="text"
                    value={address.addressLine}
                    onChange={handleAddressChange}
                    placeholder="Enter your full address"
                    className="w-full mt-1 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    City
                  </Label>
                  <Input
                    name="city"
                    type="text"
                    value={address.city}
                    onChange={handleAddressChange}
                    placeholder="Enter your city"
                    className="w-full mt-1 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Zip Code
                  </Label>
                  <Input
                    name="zipCode"
                    type="text"
                    value={address.zipCode}
                    onChange={handleAddressChange}
                    placeholder="Enter your zip code"
                    className="w-full mt-1 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full mt-4 uppercase font-semibold text-sm"
                >
                  Save & Proceed
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartCheckout;
