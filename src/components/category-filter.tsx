"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Category = {
  id: string;
  name: string;
  image: string;
  label: string;
};

const categories: Category[] = [
  {
    id: "Mobile & Accessories",
    name: "Mobile & Accessories",
    image: "/images/MobileAccessories.jpeg",
    label: "Mobile & Accessories",
  },
  {
    id: "Gaming & Entertainment",
    name: "Gaming & Entertainment",
    image: "/images/GamingEntertainment.jpeg",
    label: "Gaming & Entertainment",
  },
  {
    id: "Cameras & Accessories",
    name: "Cameras & Accessories",
    image: "/images/CamerasAccessories.jpeg",
    label: "Cameras & Accessories",
  },
  {
    id: "Computers & Laptops",
    name: "Computers & Laptops",
    image: "/images/ComputersLaptops.jpeg",
    label: "Computers & Laptops",
  },
  {
    id: "Home Appliances",
    name: "Home Appliances",
    image: "/images/HomeAppliances.jpeg",
    label: "Home Appliances",
  },
];

interface CategoryFilterProps {
  onCategorySelect?: (category: string) => void;
}

export function CategoryFilter({ onCategorySelect }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    const newSelected = selectedCategory === categoryId ? null : categoryId;
    setSelectedCategory(newSelected);
    if (onCategorySelect) {
      onCategorySelect(newSelected || "");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleCategoryClick(category.id)}
          >
            <div
              className={cn(
                "w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center overflow-hidden",
                "bg-gradient-to-br from-purple-600 to-blue-400",
                "transition-transform hover:scale-105",
                selectedCategory === category.id ? "ring-4 ring-white" : ""
              )}
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                width={144} // Increase width for better responsiveness
                height={144} // Increase height for better responsiveness
                className="rounded-full object-cover w-full h-full"
              />
            </div>
            <p className="mt-3 text-center font-medium text-gray-800 dark:text-gray-200">
              {category.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
