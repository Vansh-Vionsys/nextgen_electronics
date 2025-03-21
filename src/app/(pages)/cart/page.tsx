// "use client";
// import React, { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import useGetCartProduct from "@/features/cartMutations/useGetCartProduct";
// import useDeleteCartProduct from "@/features/cartMutations/useDeleteCartProduct";
// import useUpdateCartProduct from "@/features/cartMutations/useUpdateCartProduct";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Label } from "@/components/ui/label";
// import { ArrowLeft, Trash2 } from "lucide-react";
// import Image from "next/image";
// import { TbShoppingCartExclamation } from "react-icons/tb";
// import Link from "next/link";
// import CartCheckout from "@/components/user/CartCheckout";
// import { toINR } from "@/helpers/convertToINR";

// const Cart = () => {
//   const { data: session } = useSession();
//   const userId = session?.user?.id || null;
//   const { getAllCartProduct, getCartLoading } = useGetCartProduct(userId);
//   const { updateCartProduct } = useUpdateCartProduct();
//   const { deleteCartProduct, deleteCartProductPending } = useDeleteCartProduct(
//     userId || ""
//   );
//   const [cartQuantities, setCartQuantities] = useState<{
//     [key: string]: number;
//   }>({});

//   useEffect(() => {
//     if (getAllCartProduct) {
//       const initialQuantities = getAllCartProduct.reduce(
//         (acc: any, item: any) => {
//           acc[item.product._id] = item.quantity;
//           return acc;
//         },
//         {}
//       );
//       setCartQuantities(initialQuantities);
//     }
//   }, [userId, getAllCartProduct]);

//   if (getCartLoading) {
//     return (
//       <div className="container mx-auto py-8 px-4">
//         <Skeleton className="h-8 w-1/4 mb-6 rounded-full" />
//         <div className="space-y-6">
//           {[...Array(3)].map((_, index) => (
//             <Skeleton
//               key={index}
//               className="h-32 w-full rounded-xl shadow-md"
//             />
//           ))}
//         </div>
//       </div>
//     );
//   }
//   const totalItems = getAllCartProduct?.length || 0;

//   const handleQuantityChange = (productId: string, quantity: number) => {
//     if (quantity < 1) return;
//     setCartQuantities((prev) => ({ ...prev, [productId]: quantity }));
//     updateCartProduct({ userId: userId || "", productId, quantity });
//   };

//   const handleRemoveItem = (productId: string) => {
//     if (confirm("Are you sure you want to remove this item?")) {
//       deleteCartProduct(productId);
//     }
//   };

//   if (!getAllCartProduct || getAllCartProduct.length === 0) {
//     return (
//       <div className="container mx-auto py-8 px-4 text-center flex flex-col items-center h-screen">
//         <p className="text-xl text-gray-700 dark:text-gray-200 font-medium pt-24">
//           Your cart is empty
//         </p>
//         <TbShoppingCartExclamation className="h-10 w-20 mt-4" />
//         <Button className="mt-4">
//           <a href="/products" className="flex items-center">
//             <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
//             Continue Shopping
//           </a>
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
//       <div className="flex flex-col lg:flex-row gap-8">
//         <div className="w-full lg:w-3/4">
//           <Card className="shadow-xl dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
//             <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent">
//               <div className="flex justify-between items-center">
//                 <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">
//                   Shopping Cart
//                 </CardTitle>
//                 <span className="text-lg font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
//                   {totalItems} Item{totalItems !== 1 ? "s" : ""}
//                 </span>
//               </div>
//             </CardHeader>
//             <CardContent className="p-6 space-y-6">
//               {getAllCartProduct.map((item: any) => (
//                 <div
//                   key={item.product._id}
//                   className="flex flex-col sm:flex-row items-start sm:items-center gap-6 py-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg p-4"
//                 >
//                   <div className="w-full sm:w-1/4 flex-shrink-0">
//                     <Image
//                       src={
//                         item.product.images[0]?.url ||
//                         "https://via.placeholder.com/150"
//                       }
//                       width={200}
//                       height={80}
//                       alt={item.product.name}
//                       className="object-cover rounded-lg shadow-md sm:h-36 w-full hover:scale-105 transition-transform"
//                     />
//                   </div>
//                   <div className="flex-1 space-y-3">
//                     <div className="flex justify-between items-center">
//                       <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 hover:text-primary transition-colors">
//                         {item.product.name}
//                       </h3>
//                       <span className="text-xl font-bold text-gray-900 dark:text-white">
//                         {toINR(
//                           item.product.price *
//                             (cartQuantities[item.product._id] || item.quantity)
//                         )}
//                       </span>
//                     </div>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       Price: {toINR(item.product.price)}
//                     </p>
//                     <div className="flex items-center gap-4 flex-wrap">
//                       <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                         Qty:
//                       </Label>
//                       <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
//                       <Select
//                         value={(
//                           cartQuantities[item.product._id] || item.quantity
//                         ).toString()}
//                         onValueChange={(value) =>
//                           handleQuantityChange(
//                             item.product._id,
//                             parseInt(value)
//                           )
//                         }
//                       >
//                         <SelectTrigger className="w-16 h-10 border-0 bg-transparent focus:ring-0">
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent className="max-h-60 overflow-y-auto bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
//                           {Array.from(
//                             { length: Math.min(item.product.stock) },
//                             (_, i) => i + 1
//                           ).map((qty) => (
//                             <SelectItem
//                               key={qty}
//                               value={qty.toString()}
//                               className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                             >
//                               {qty}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors rounded-full p-2"
//                       onClick={() => handleRemoveItem(item.product._id)}
//                       disabled={deleteCartProductPending}
//                     >
//                       <Trash2 className="h-5 w-5" />
//                       <span className="sr-only">Remove</span>
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//               <Button className="mt-6">
//                 <Link href="/products" className="flex items-center">
//                   <ArrowLeft className="h-4 w-4" /> Continue Shopping
//                 </Link>
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//         {/* Add CartCheckout Component Here */}
//         <div className="w-full lg:w-1/4">
//           <CartCheckout
//             cartItems={getAllCartProduct}
//             cartQuantities={cartQuantities}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useGetCartProduct from "@/features/cartMutations/useGetCartProduct";
import useDeleteCartProduct from "@/features/cartMutations/useDeleteCartProduct";
import useUpdateCartProduct from "@/features/cartMutations/useUpdateCartProduct";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Trash2 } from "lucide-react";
import Image from "next/image";
import { TbShoppingCartExclamation } from "react-icons/tb";
import Link from "next/link";
import CartCheckout from "@/components/user/CartCheckout";
import { toINR } from "@/helpers/convertToINR";

const Cart = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id || null;
  const { getAllCartProduct, getCartLoading } = useGetCartProduct(userId);
  const { updateCartProduct } = useUpdateCartProduct();
  const { deleteCartProduct, deleteCartProductPending } = useDeleteCartProduct(
    userId || ""
  );
  const [cartQuantities, setCartQuantities] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    if (getAllCartProduct) {
      const initialQuantities = getAllCartProduct.reduce(
        (acc: any, item: any) => {
          acc[item.product._id] = item.quantity;
          return acc;
        },
        {}
      );
      setCartQuantities(initialQuantities);
    }
  }, [userId, getAllCartProduct]);

  if (getCartLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Skeleton className="h-8 w-1/4 mb-6 rounded-full" />
        <div className="space-y-6">
          {[...Array(3)].map((_, index) => (
            <Skeleton
              key={index}
              className="h-32 w-full rounded-xl shadow-md"
            />
          ))}
        </div>
      </div>
    );
  }
  const totalItems = getAllCartProduct?.length || 0;

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCartQuantities((prev) => ({ ...prev, [productId]: quantity }));
    updateCartProduct({ userId: userId || "", productId, quantity });
  };

  const handleRemoveItem = (productId: string) => {
    if (confirm("Are you sure you want to remove this item?")) {
      deleteCartProduct(productId);
    }
  };

  if (!getAllCartProduct || getAllCartProduct.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4 text-center flex flex-col items-center h-screen">
        <p className="text-xl text-gray-700 dark:text-gray-200 font-medium pt-24">
          Your cart is empty
        </p>
        <TbShoppingCartExclamation className="h-10 w-20 mt-4" />
        <Button className="mt-4">
          <a href="/products" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-3/4">
          <Card className="shadow-xl dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent">
              <div className="flex justify-between items-center">
                <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">
                  Shopping Cart
                </CardTitle>
                <span className="text-lg font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                  {totalItems} Item{totalItems !== 1 ? "s" : ""}
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {getAllCartProduct.map((item: any) => (
                <div
                  key={item.product._id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-6 py-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg p-4"
                >
                  <div className="w-full sm:w-1/4 flex-shrink-0">
                    <Image
                      src={
                        item.product.images[0]?.url ||
                        "https://via.placeholder.com/150"
                      }
                      width={200}
                      height={80}
                      alt={item.product.name}
                      className="object-cover rounded-lg shadow-md sm:h-36 w-full hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 hover:text-primary transition-colors">
                        {item.product.name}
                      </h3>
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        {toINR(
                          item.product.price *
                            (cartQuantities[item.product._id] || item.quantity)
                        )}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Price: {toINR(item.product.price)}
                    </p>
                    <div className="flex items-center gap-4 flex-wrap">
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Qty:
                      </Label>
                      <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
                      <Select
                        value={(
                          cartQuantities[item.product._id] || item.quantity
                        ).toString()}
                        onValueChange={(value) =>
                          handleQuantityChange(
                            item.product._id,
                            parseInt(value)
                          )
                        }
                      >
                        <SelectTrigger className="w-16 h-10 border-0 bg-transparent focus:ring-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="max-h-60 overflow-y-auto bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                          {Array.from(
                            { length: Math.min(item.product.stock) },
                            (_, i) => i + 1
                          ).map((qty) => (
                            <SelectItem
                              key={qty}
                              value={qty.toString()}
                              className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              {qty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors rounded-full p-2"
                      onClick={() => handleRemoveItem(item.product._id)}
                      disabled={deleteCartProductPending}
                    >
                      <Trash2 className="h-5 w-5" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </div>
              ))}
              <Button className="mt-6">
                <Link href="/products" className="flex items-center">
                  <ArrowLeft className="h-4 w-4" /> Continue Shopping
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        {/* Add CartCheckout Component Here */}
        <div className="w-full lg:w-1/4">
          <CartCheckout
            cartItems={getAllCartProduct}
            cartQuantities={cartQuantities}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
