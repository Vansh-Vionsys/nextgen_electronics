"use client";
import { Card } from "@/components/ui/card";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { Bot, ChevronDown } from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CategoryFilter } from "@/components/category-filter";
import Products from "./products/page";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden">
        {/* <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" />  */}
        <div className="flex h-full relative">
          {/* Left content */}
          <div className="flex-1 p-8 z-10 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Next-Gen Electronics
            </h1>
            <p className="mt-4 text-neutral-300 max-w-lg">
              Discover the latest in technology with our curated selection of
              premium electronic devices and accessories
            </p>

            <div className="pt-4">
              <HoverBorderGradient
                onClick={() =>
                  alert("AI Assistant feature is not available right now")
                }
                containerClassName="rounded-full"
                as="button"
                className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
              >
                <Bot size={20} />
                <span>Ask AI Assistant</span>
              </HoverBorderGradient>
            </div>
          </div>

          {/* Right content */}
          <div className="flex-1 relative">
            {/*  <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            /> */}
          </div>

          {/* Browse Products Button */}
          <div className="absolute bottom-8 left-0 right-0 text-center z-20">
            <button
              className="text-white flex flex-col items-center gap-2 mx-auto hover:transform hover:translate-y-1 transition-transform duration-300 bg-transparent border-none cursor-pointer"
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
      </Card>

      {/* Products Section */}
      <motion.section
        className="w-full max-w-7xl  py-20 px-6 rounded-t-3xl relative z-10 shadow-lg bg-white text-gray-900 dark:bg-black dark:text-white"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        <CategoryFilter
          onCategorySelect={(category) => {
            setSelectedCategory(category);
          }}
        />
        <Products selectedCategory={selectedCategory} />
      </motion.section>
    </div>
  );
};

export default Home;
