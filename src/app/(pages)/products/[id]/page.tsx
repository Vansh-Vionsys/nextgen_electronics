// "use client";
// import useGetProductById from "@/features/productMutations/useGetProductById";
// import { useParams } from "next/navigation";
// import { useState } from "react";

// const ProductDetails = () => {
//   /* const product = {
//     name: "Premium Wireless Headphones",
//     price: 349.99,
//     rating: 4.5,
//     description:
//       "Experience premium sound quality and industry-leading noise cancellation with these wireless headphones. Perfect for music lovers and frequent travelers.",
//     images: [
//       "https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
//       "https://images.unsplash.com/photo-1484704849700-f032a568e944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
//       "https://images.unsplash.com/photo-1496957961599-e35b69ef5d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
//       "https://images.unsplash.com/photo-1528148343865-51218c4a13e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
//     ],
//   }; */

//   const { id } = useParams();
//   const productId = id as string;

//   const { getProductDetail, getProductDetailError, getProductDetailsLoading } =
//     useGetProductById(productId);

//   console.log("getProductDetail", getProductDetail);
//   const [mainImage, setMainImage] = useState(getProductDetail.images[0]);

//   return (
//     <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200 py-8 px-4 container mx-auto">
//       <div className="flex flex-wrap -mx-4">
//         <div className="w-full md:w-1/2 px-4 mb-8">
//           <img
//             src={mainImage}
//             alt="Product"
//             className="w-full h-auto rounded-lg shadow-md mb-4"
//           />
//           <div className="flex gap-4 py-4 justify-center overflow-x-auto">
//             {getProductDetail.images.map((image: string, index: number) => (
//               <img
//                 key={index}
//                 src={image}
//                 alt={`Thumbnail ${index + 1}`}
//                 className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300 border-2 border-transparent hover:border-indigo-500 dark:hover:border-indigo-400"
//                 onClick={() => setMainImage(image)}
//               />
//             ))}
//           </div>
//         </div>
//         <div className="w-full md:w-1/2 px-4">
//           <h2 className="text-3xl font-bold mb-2">{getProductDetail.name}</h2>
//           <div className="mb-4">
//             <span className="text-2xl font-bold mr-2">
//               ${getProductDetail.price}
//             </span>
//           </div>
//           <p className="text-gray-700 dark:text-gray-300 mb-6">
//             {getProductDetail.description}
//           </p>

//           <div className="mb-6">
//             <label
//               htmlFor="quantity"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//             >
//               Quantity:
//             </label>
//             <input
//               type="number"
//               id="quantity"
//               min="1"
//               defaultValue="1"
//               className="w-12 text-center rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 dark:focus:border-indigo-500 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-800 focus:ring-opacity-50 dark:bg-gray-800 dark:text-gray-200"
//             />
//           </div>
//           <div className="flex space-x-4 mb-6">
//             <button className="bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-2 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-400">
//               Add to Cart
//             </button>
//             <button className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-6 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600">
//               Wishlist
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

"use client";
import useGetProductById from "@/features/productMutations/useGetProductById";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const Page = () => {
  const { id } = useParams();
  const productId = id as string;
  const { getProductDetail, getProductDetailError, getProductDetailsLoading } =
    useGetProductById(productId);

  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    if (getProductDetail?.images?.length > 0) {
      setMainImage(getProductDetail.images[0].url);
    }
  }, [getProductDetail]);

  if (getProductDetailsLoading) {
    return (
      <p className="text-center text-gray-500">Loading product details...</p>
    );
  }

  if (getProductDetailError) {
    return (
      <p className="text-center text-red-500">Error fetching product details</p>
    );
  }

  if (!getProductDetail) {
    return <p className="text-center text-gray-500">No product found</p>;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200 py-8 px-4 container mx-auto">
      <div className="flex flex-wrap items-start -mx-4">
        {/* Image Section */}
        <div className="w-full md:w-1/2 px-4 mb-8">
          <img
            src={mainImage as string}
            alt="Product"
            className="w-full bg-slate-800 max-w-[350px] mx-auto rounded-lg shadow-md mb-4"
          />
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
            <span className="text-2xl text-green-500 font-bold mr-2">
              ${getProductDetail.price}
            </span>
          </div>

          {/* Availability */}
          <div className="mb-4">
            <span className="font-bold text-gray-200">Availability: </span>
            <span
              className={`font-bold ${
                getProductDetail?.stock > 0
                  ? "text-red-500"
                  : "text-gray-300 underline"
              }`}
            >
              {getProductDetail?.stock > 0
                ? `${getProductDetail?.stock} items left`
                : "Out of Stock"}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {getProductDetail.description}
          </p>

          {/* Quantity Selector */}
          <div className="mb-6 flex items-center space-x-3">
            <label htmlFor="quantity" className="font-bold text-gray-200">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              defaultValue="1"
              className="w-14 border text-center rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 dark:focus:border-indigo-500 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-800 focus:ring-opacity-50 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 mb-6">
            <button className="bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-2 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-400">
              Add to Cart
            </button>
            <button className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-6 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600">
              Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
