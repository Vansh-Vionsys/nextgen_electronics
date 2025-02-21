import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full text-center px-6 py-16 sm:py-20 bg-gradient-to-r from-green-50/50 via-teal-50 to-green-50/50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 h-screen">
      {/* Small Tagline */}
      <div className="border border-gray-300 dark:border-gray-500 rounded-lg py-2 px-4 text-gray-700 dark:text-gray-300 text-xs sm:text-sm mb-4 sm:mb-5 transition hover:text-gray-500 dark:hover:text-gray-400">
        Forget about spending hundreds $
      </div>

      {/* Main Heading */}
      <h1 className="max-w-3xl font-display text-4xl sm:text-6xl font-bold tracking-normal text-gray-900 dark:text-gray-300">
        <span className="relative text-orange-500 dark:text-orange-300">
          <svg
            aria-hidden="true"
            viewBox="0 0 418 42"
            className="absolute top-2/3 left-0 h-[0.58em] w-full fill-orange-500 dark:fill-orange-300/60"
            preserveAspectRatio="none"
          >
            <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.780 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.540-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.810 23.239-7.825 27.934-10.149 28.304-14.005 .417-4.348-3.529-6-16.878-7.066Z"></path>
          </svg>
          <span className="relative">NextGenElectronics</span>
        </span>
      </h1>

      {/* Subtitle */}
      <h2 className="mx-auto mt-6 sm:mt-12 max-w-xl text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        Experience the future of insurance with our cutting-edge AI tool. From
        underwriting to claims processing, our intelligent system streamlines
        and enhances every aspect of your insurance operations.
      </h2>

      {/* Call-to-Action Button */}
      <Link
        className="bg-orange-600 dark:bg-gray-800 rounded-lg text-white dark:text-gray-300 font-medium px-5 py-3 mt-6 sm:mt-10 text-sm sm:text-base hover:bg-orange-500 dark:hover:bg-gray-600 transition"
        href="/products"
      >
        Browse Products
      </Link>
    </div>
  );
};

export default Page;
