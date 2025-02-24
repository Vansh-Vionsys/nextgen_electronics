"use client";
import React from "react";
import useGetAllProducts from "@/features/productMutations/useGetAllProducts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ProductCard = () => {
  const { getAllProducts, getAllProductsError, getAllProductsLoading } =
    useGetAllProducts();

  if (getAllProductsLoading)
    return <p className="text-center text-lg">Loading...</p>;
  if (getAllProductsError)
    return <p className="text-center text-red-500">Error fetching products</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {getAllProducts?.map((product: any) => (
        <Card
          key={product._id}
          className="rounded-xl shadow-lg overflow-hidden"
        >
          <img
            src={product.images?.[0]?.url || "/placeholder.jpg"}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-lg font-bold">₹{product.price}</span>
              <span className="text-sm text-yellow-500">
                ⭐ {product.ratings} ({product.stock} left)
              </span>
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="outline" className="w-full mr-2">
                Update
              </Button>
              <Button variant="destructive" className="w-full">
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductCard;
