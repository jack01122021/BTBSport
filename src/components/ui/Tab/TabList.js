import Tab from "./Tab";
import React from "react";

export default function TabList({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-wrap items-center justify-start w-2/3 py-4 md:py-8">
        {categories.map((category) => (
          <Tab
            key={category.name}
            label={category.name}
            isFocus={selectedCategory === category.name}
            onClick={() => setSelectedCategory(category.name)}
          />
        ))}
      </div>
    </div>
  );
}
