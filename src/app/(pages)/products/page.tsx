"use client";
import React from "react";
import useGetAllProducts from "@/features/productMutations/useGetAllProducts";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Products = () => {
  const { getAllProducts, getAllProductsError, getAllProductsLoading } =
    useGetAllProducts();

  if (getAllProductsLoading)
    return <p className="text-center text-lg">Loading...</p>;
  if (getAllProductsError)
    return <p className="text-center text-red-500">Error fetching products</p>;
  console.log(getAllProducts);
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Our Products</h1>
      <div className="dark:text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {getAllProducts?.map((product: any) => (
          <div
            key={product._id}
            className="dark:bg-gray-800 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform transform"
          >
            <img
              src={product.images[0]?.url}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div
              className={`absolute top-4 right-4 text-xs text-white font-bold px-2 py-1 rounded-full z-20 transform rotate-12 ${
                product.stock > 10 ? "bg-green-600" : "bg-red-700"
              }`}
            >
              {product.stock} Left
            </div>
            <div className="p-4">
              <Link href={`/products/${product._id}`}>
                <h1 className="dark:text-white text-gray-800 font-semibold text-lg mb-3 border-b cursor-pointer">
                  {product.name}
                </h1>
              </Link>

              <p className="dark:text-gray-300 text-gray-600 text-sm mb-3">
                {product.description.substring(0, 70)}...
              </p>
              <div className="flex justify-between items-center mb-3">
                <span className="dark:text-indigo-300 text-indigo-600 font-bold text-lg">
                  ${product.price}
                </span>
                <span className="text-yellow-500 text-sm">
                  ⭐ {product.ratings}
                </span>
              </div>
              <Button>Add to Cart</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
