// "use client";
// import React from "react";
// import useGetAllProducts from "@/features/productMutations/useGetAllProducts";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import useAddCartProduct from "@/features/cartMutations/useAddCartProduct";
// import { useSession } from "next-auth/react";

// const Products = () => {
//   const { data: session } = useSession();
//   const userId = session?.user.id;
//   const { getAllProducts, getAllProductsError, getAllProductsLoading } =
//     useGetAllProducts();
//   const { addCartProduct, isAddingCart } = useAddCartProduct(userId || "");
//   const handleSubmit = (productId: string) => {
//     addCartProduct(productId);
//   };
//   if (getAllProductsLoading) {
//     return (
//       <div className="p-6">
//         <h1 className="text-3xl font-bold text-center mb-6">Our Products</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {[...Array(4)].map((_, index) => (
//             <Skeleton key={index} className="h-64 w-full rounded-lg" />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (getAllProductsError) {
//     return (
//       <p className="text-center text-red-500 text-lg">
//         Error fetching products
//       </p>
//     );
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">Our Products</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {getAllProducts?.map((product: any) => (
//           <Card
//             key={product._id}
//             className="dark:bg-gray-800 bg-white hover:shadow-xl transition-shadow overflow-hidden"
//           >
//             <CardHeader className="p-0 relative">
//               <img
//                 src={product.images[0]?.url}
//                 alt={product.name}
//                 className="w-full h-48 object-cover"
//               />
//               <Badge
//                 className={`absolute top-4 right-4 text-xs font-bold transform rotate-12 ${
//                   product.stock > 10 ? "bg-green-600" : "bg-red-700"
//                 }`}
//               >
//                 {product.stock} Left
//               </Badge>
//             </CardHeader>
//             <CardContent className="p-4">
//               <Link href={`/products/${product._id}`}>
//                 <CardTitle className="dark:text-white text-gray-800 font-semibold text-lg mb-3 border-b cursor-pointer hover:text-indigo-600">
//                   {product.name}
//                 </CardTitle>
//               </Link>
//               <p className="dark:text-gray-300 text-gray-600 text-sm mb-3">
//                 {product.description.substring(0, 70)}...
//               </p>
//               <div className="flex justify-between items-center">
//                 <span className="dark:text-indigo-300 text-indigo-600 font-bold text-lg">
//                   ₹{product.price}
//                 </span>
//                 <span className="text-yellow-500 text-sm">
//                   ⭐ {product.ratings}
//                 </span>
//               </div>
//             </CardContent>
//             <CardFooter className="p-4 pt-0">
//               <Button
//                 onClick={() => handleSubmit(product._id)}
//                 className="w-full"
//                 disabled={isAddingCart}
//               >
//                 {isAddingCart ? "Adding..." : "Add to Cart"}
//               </Button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Products;

"use client";
import ProductCard from "@/components/ProductCard";
import React from "react";

const page = () => {
  return (
    <div>
      <ProductCard />
    </div>
  );
};

export default page;
