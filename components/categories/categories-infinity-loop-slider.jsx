'use client'
import { CategoryCard } from "@/components/categories/category-card";
export const CategoryInfinitiveLoopSlider = ({ categories }) => {

    return (
        <div className="flex gap-x-2 xl:gap-x-0 overflow-x-scroll lg:grid lg:grid-cols-3 lg:gap-0 w-full xl:grid-cols-6 show-scrollbar">
        {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} />
        ))}
        </div>
    )
};