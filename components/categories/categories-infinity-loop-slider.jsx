'use client'
import { CategoryCard } from "@/components/categories/category-card";
import { useTranslations } from "next-intl";
export const CategoryInfinitiveLoopSlider = ({ categories }) => {
    const t = useTranslations("AriaLabel");
    return (
        <section 
            className="flex gap-x-2 xl:gap-x-0 overflow-x-scroll lg:grid lg:grid-cols-3 lg:gap-0 w-full xl:grid-cols-6 show-scrollbar"
            role="region"
            aria-label={t("categoriesList")}
        >
        {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
        ))}
        </section>
    )
};