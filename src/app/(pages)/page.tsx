"use client";
import Products from "./products/page";
import { motion } from "framer-motion";
import { CategoryFilter } from "@/components/category-filter";
import { Bot, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");
  return (
    <section>
      {/* Hero Section */}
      <div className="relative min-h-screen">
        {/* Hero Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black/50" /> {/* Overlay */}
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Navigation Bar */}
          <div className="relative z-10">
            {/* Navigation Bar */}
            <nav className="p-6">
              <button
                className="float-right bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full
                       backdrop-blur-sm border border-white/20 transition-all duration-300 flex items-center gap-2"
                onClick={() =>
                  alert("Ai Assistant feature is not available right now")
                }
              >
                <Bot size={20} />
                Ask AI Assistant
              </button>
            </nav>
          </div>

          {/* Hero Content */}
          <div className="container mx-auto px-6 pt-14 pb-24 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Next-Gen Electronics
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto">
              Discover the latest in technology with our curated selection of
              premium electronic devices and accessories
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold
                             hover:bg-gray-100 transition-colors duration-300"
              >
                Shop Now
              </button>
              <button
                className="px-8 py-4 bg-transparent border-2 border-white text-white
                             rounded-full font-semibold hover:bg-white/10 transition-colors duration-300"
              >
                View Deals
              </button>
            </div>

            {/* Browse Products Section */}
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <button
                className="text-white flex flex-col items-center gap-2 mx-auto
                         hover:transform hover:translate-y-1 transition-transform duration-300"
                onClick={() =>
                  window.scrollTo({
                    top: window.innerHeight,
                    behavior: "smooth",
                  })
                }
              >
                <span className="text-lg font-medium">Browse Products</span>
                <ChevronDown size={24} className="animate-bounce" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <motion.section
        className="w-full max-w-7xl mx-auto py-20 px-6 rounded-t-3xl -mt-10 relative z-10 shadow-lg bg-white text-gray-900 dark:bg-black dark:text-white"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        <h2 className="text-xl md:text-2xl mb-10 flex justify-center items-center">
          Featured Products
        </h2>
        <CategoryFilter
          onCategorySelect={(category) => {
            setSelectedCategory(category);
          }}
        />
        <Products selectedCategory={selectedCategory} />
      </motion.section>
    </section>
  );
}
