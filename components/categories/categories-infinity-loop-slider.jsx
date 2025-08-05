'use client'
import { CategoryCard } from "@/components/categories/category-card";
export const CategoryInfinitiveLoopSlider = ({ categories }) => {

    return (
        <section 
            className="flex gap-x-2 xl:gap-x-0 overflow-x-scroll lg:grid lg:grid-cols-3 lg:gap-0 w-full xl:grid-cols-6 show-scrollbar"
            role="region"
            aria-label="Category list"
        >
        {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
        ))}
        </section>
    )
};