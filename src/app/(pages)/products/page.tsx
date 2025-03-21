"use client";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import useGetAllProducts from "@/features/productMutations/useGetAllProducts";
import { IProduct } from "@/types/product.types";

interface ProductProps {
  selectedCategory: string | null;
}
const Product = ({ selectedCategory }: ProductProps) => {
  const { getAllProducts, getAllProductsLoading } = useGetAllProducts();

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? getAllProducts?.filter(
        (product: IProduct) => product.category === selectedCategory
      ) || []
    : getAllProducts || []; // Show all products if no category is selected

  if (getAllProductsLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {[...Array(8)].map((_, index) => (
          <Skeleton key={index} className="h-72 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-4 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: IProduct, index: number) => (
            <ProductCard key={product?.id || index} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">
              No products found
              {selectedCategory ? ` in ${selectedCategory} category` : ""}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
