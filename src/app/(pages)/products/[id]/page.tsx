"use client";
import React, { useState, useEffect } from "react";
import useGetProductById from "@/features/productMutations/useGetProductById";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import useAddCartProduct from "@/features/cartMutations/useAddCartProduct";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/Spinner";
import { ShoppingCart } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const productId = id as string;
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { getProductDetail, getProductDetailsLoading } =
    useGetProductById(productId);
  // add to cart functionality
  const [quantity, setQuantity] = useState(1);
  const { addCartProduct, isAddingCart } = useAddCartProduct(userId || "");
  const [mainImage, setMainImage] = useState<string | null>(null);

  const handleQuantityChange = (value: string) => {
    const newQuantity = parseInt(value);
    if (newQuantity >= 1 && newQuantity <= getProductDetail.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleSubmit = (productId: string) => {
    const data = { productId, quantity };
    addCartProduct(data);
  };
  useEffect(() => {
    if (getProductDetail?.images?.length > 0) {
      setMainImage(getProductDetail.images[0].url);
    }
  }, [getProductDetail]);

  if (getProductDetailsLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-wrap items-start -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8">
            <Skeleton className="w-full max-w-[350px] h-64 mx-auto rounded-lg" />
            <div className="flex gap-4 py-4 justify-center">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="size-20 rounded-md" />
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/2 mb-4" />
            <Skeleton className="h-6 w-1/3 mb-4" />
            <Skeleton className="h-20 w-full mb-6" />
            <div className="flex space-x-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!getProductDetail) {
    return (
      <p className="text-center text-gray-500 text-lg">No product found</p>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200 py-8 px-4 container mx-auto">
      <div className="flex flex-wrap items-start -mx-4">
        {/* Image Section */}
        <div className="w-full md:w-1/2 px-4 mb-8">
          <Card className="bg-slate-800 max-w-[350px] mx-auto">
            <CardContent className="p-0">
              <img
                src={mainImage as string}
                alt={getProductDetail.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
            </CardContent>
          </Card>
          <div className="flex gap-4 py-4 justify-center overflow-x-auto">
            {getProductDetail.images.map((image: any, index: number) => (
              <img
                key={index}
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300 border-2 border-transparent hover:border-indigo-500 dark:hover:border-indigo-400"
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 px-4">
          <h2 className="text-3xl font-bold mb-2">{getProductDetail.name}</h2>

          {/* Rating with Stars */}
          <div className="flex items-center mb-2">
            <span className="text-yellow-400 text-lg">
              {"⭐".repeat(Math.round(getProductDetail.ratings))}
            </span>
            <span className="ml-2 text-gray-400">
              ({getProductDetail.ratings} / 5)
            </span>
          </div>

          {/* Price */}
          <div className="mb-4">
            <span className="text-2xl text-green-500 font-bold">
              ₹{getProductDetail.price}
            </span>
          </div>

          {/* Availability */}
          <div className="mb-4">
            <span className="font-bold text-gray-600 dark:text-gray-200">
              Availability:{" "}
            </span>
            <Badge
              variant="default"
              className={
                getProductDetail.stock > 10 ? "bg-green-500" : "bg-red-500"
              }
            >
              {getProductDetail.stock > 10
                ? `${getProductDetail.stock} left`
                : `${getProductDetail.stock} left only`}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {getProductDetail.description}
          </p>

          {/* Quantity Selector */}
          <div className="mb-6 flex items-center space-x-3">
            <span className="font-bold text-gray-600 dark:text-gray-200">
              Qty:{" "}
            </span>
            <Select
              value={quantity.toString()}
              onValueChange={handleQuantityChange}
            >
              <SelectTrigger className="w-16 h-10 border-0 bg-transparent focus:ring-0 text-gray-900 dark:text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                {Array.from(
                  { length: Math.min(getProductDetail.stock) },
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
          </div>

          {/* Buttons */}
          <Button onClick={() => handleSubmit(productId)} className="w-52">
            <ShoppingCart className="mr-2 h-2 w-5" />
            {isAddingCart ? <Spinner /> : "Add to cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
