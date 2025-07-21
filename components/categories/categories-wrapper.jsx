import { getCategories } from "@/actions/get-categories"
import { CategoryCard } from '@/components/categories/category-card.jsx'
import { CategoryInfinitiveLoopSlider } from '@/components/categories/categories-infinity-loop-slider.jsx'
export default async function CategoriesWrapper() {
    const { categories, error } = await getCategories()
    if (error) {
        console.error('Error fetching categories:', error)
        return <div>Error loading categories</div>
    }
    return (
        <section className="w-full">
            <CategoryInfinitiveLoopSlider categories={categories} />
        </section>
    )
}