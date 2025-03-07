import React from "react";
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

interface CartCheckoutProps {
  cartItems: any[];
  cartQuantities: { [key: string]: number };
}

const CartCheckout = ({ cartItems, cartQuantities }: CartCheckoutProps) => {
  const totalItems = cartItems.length;
  const subtotal = cartItems.reduce((acc, item) => {
    const quantity = cartQuantities[item.product._id] || item.quantity;
    return acc + item.product.price * quantity;
  }, 0);
  const shippingCost = 10.0; // Fixed shipping cost for now
  const totalCost = subtotal + shippingCost;

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
            ₹{subtotal.toFixed(2)}
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
                Standard Shipping - ₹10.00
              </SelectItem>
              <SelectItem value="express">Express Shipping - ₹25.00</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="font-semibold text-sm uppercase text-gray-700 dark:text-gray-300">
            Promo Code
          </Label>
          <input
            type="text"
            id="promo"
            placeholder="Enter your code"
            className="w-full p-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button
            variant="destructive"
            className="w-full uppercase text-sm font-semibold"
          >
            Apply
          </Button>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex justify-between items-center font-semibold text-sm uppercase text-gray-800 dark:text-white">
            <span>Total Cost</span>
            <span>₹{totalCost.toFixed(2)}</span>
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
