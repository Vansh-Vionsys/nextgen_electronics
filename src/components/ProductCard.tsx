"use client";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import useGetAllProducts from "@/features/productMutations/useGetAllProducts";
import { IProduct } from "@/types/product.types";
import Link from "next/link";
import { useSession } from "next-auth/react";
import useDeleteProductById from "@/features/productMutations/useDeleteProductById";
import EditProduct from "./admin/EditProduct";
import { Skeleton } from "./ui/skeleton";
import useAddCartProduct from "@/features/cartMutations/useAddCartProduct";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const ProductCard = ({ product }: { product: any }) => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";
  const userId = session?.user?.id;
  const [quantity, setQuantity] = useState(1);
  const { addCartProduct, isAddingCart } = useAddCartProduct(userId || "");
  const { deleteProduct, isDeletePending } = useDeleteProductById();

  const handleSubmit = (productId: string) => {
    const data = { productId, quantity };
    addCartProduct(data);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  const handleQuantityChange = (value: string) => {
    const newQuantity = parseInt(value);
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const maxStars = 5;
    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${
            i <= Math.floor(rating)
              ? "fill-yellow-400"
              : "fill-gray-300 dark:fill-gray-600"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <Card className="w-full bg-white dark:bg-black text-gray-900 dark:text-white border border-gray-200 dark:border-0 overflow-hidden h-[480px] flex flex-col">
      <div className="relative h-48 flex-shrink-0">
        <Image
          width={500}
          height={200}
          src={product.images[0]?.url}
          alt={product.name}
          className="object-cover w-full h-full"
        />
        <Badge className="absolute top-2 right-4 bg-gray-200 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-800 text-gray-900 dark:text-white rounded-full py-1 px-2">
          {product.category}
        </Badge>
      </div>

      <CardContent className="p-4 space-y-2 flex-grow">
        <h2 className="text-lg font-semibold line-clamp-1">{product.name}</h2>
        <div className="flex items-center gap-2">
          {renderStars(product.ratings)}
          <span className="text-gray-500 dark:text-zinc-500 ml-1">
            ({product.ratings})
          </span>
        </div>
        <p className="text-gray-600 dark:text-zinc-400 text-sm line-clamp-3">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xl">₹{product.price}</span>
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold ${
              product.stock >= 10 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock} Left
          </span>
        </div>
      </CardContent>

      {isAdmin ? (
        <EditProduct product={product} />
      ) : (
        <div className="px-6 pb-4 flex gap-4 flex-shrink-0">
          <Select
            value={quantity.toString()}
            onValueChange={handleQuantityChange}
          >
            <SelectTrigger className="w-16 h-10 border-0 bg-transparent focus:ring-0 text-gray-900 dark:text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
              {Array.from(
                { length: Math.min(product.stock) },
                (_, i) => i + 1
              ).map((qty) => (
                <SelectItem
                  key={qty}
                  value={qty.toString()}
                  className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {qty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={() => handleSubmit(product._id)}
            className="flex-1 bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-zinc-200 text-white dark:text-black text-sm rounded-md"
            disabled={isAddingCart}
          >
            <ShoppingCart className="mr-2 h-2 w-5" />{" "}
            {isAddingCart ? "Adding..." : "Add to cart"}
          </Button>
        </div>
      )}

      {isAdmin ? (
        <CardFooter className="p-0 flex-shrink-0">
          <Button
            onClick={() => handleDeleteProduct(product._id)}
            variant="ghost"
            className="w-full hover:underline hover:text-red-700 text-red-700 hover:bg-gray-100 dark:hover:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 rounded-none h-10"
            disabled={isDeletePending}
          >
            {isDeletePending ? "Deleting..." : "Delete"}
          </Button>
        </CardFooter>
      ) : (
        <Link href={`/products/${product._id}`}>
          <CardFooter className="p-0 flex-shrink-0">
            <Button
              variant="ghost"
              className="w-full hover:underline text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 rounded-none h-10"
            >
              View Details
            </Button>
          </CardFooter>
        </Link>
      )}
    </Card>
  );
};

const ProductGrid = () => {
  const { getAllProducts, getAllProductsLoading } = useGetAllProducts();

  if (getAllProductsLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {[...Array(6)].map((_, index) => (
          <Skeleton key={index} className="h-72 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center bg-gray-100 dark:bg-slate-800 p-4 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full">
        {getAllProducts?.map((product: IProduct, index: number) => (
          <ProductCard key={product?.id || index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
