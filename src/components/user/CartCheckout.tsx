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
import { toINR } from "@/helpers/convertToINR";
import useVerifyVoucher from "@/features/voucherMutations/useVerifyVoucher";
import Spinner from "../Spinner";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react"; // Import the X icon from lucide-react

interface CartCheckoutProps {
  cartItems: any[];
  cartQuantities: { [key: string]: number };
}

interface Voucher {
  name: string;
  amount: number;
  _id: string;
}

const CartCheckout = ({ cartItems, cartQuantities }: CartCheckoutProps) => {
  const { verifyVoucher, verifyVoucherPending, verifyVoucherError } =
    useVerifyVoucher();
  const totalItems = cartItems.length;
  const subtotal = cartItems.reduce((acc, item) => {
    const quantity = cartQuantities[item.product._id] || item.quantity;
    return acc + item.product.price * quantity;
  }, 0);
  const [voucher, setVoucher] = useState<Voucher | null>(null);
  const [voucherCode, setVoucherCode] = useState<string>(""); // Track the input value
  const formRef = useRef<HTMLFormElement>(null); // Ref to reset the form
  const totalCost = subtotal - (voucher?.amount || 0);

  // Handle verifying voucher
  const handleVoucher = (data: FormData) => {
    const code = data.get("voucher") as string;
    setVoucherCode(code); // Update the input value
    verifyVoucher(
      { code, subTotal: totalCost },
      {
        onSuccess: ({ voucher }: { voucher: Voucher }) => setVoucher(voucher),
        onError: () => setVoucherCode(""), // Clear input on error
      }
    );
  };

  // Handle removing the voucher
  const handleRemoveVoucher = () => {
    setVoucher(null);
    setVoucherCode("");
    if (formRef.current) {
      formRef.current.reset(); // Reset the form input
    }
  };

  return (
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
              <SelectItem value="standard">Standard Shipping - free</SelectItem>
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
                disabled={voucher !== null} // Disable input when voucher is applied
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
          <Button className="w-full mt-4 uppercase font-semibold text-sm">
            Checkout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartCheckout;
