import { getCategories } from "@/actions/get-categories"
import { CategoryCard } from '@/components/categories/category-card.jsx'
export default async function CategoriesWrapper() {
    const { categories, error } = await getCategories()
    if (error) {
        console.error('Error fetching categories:', error)
        return <div>Error loading categories</div>
    }
    return (
        <section>
            <ul className="flex flex-wrap">
                {categories?.map(category => (
                    <li key={category.id}>
                        <CategoryCard category={category} />
                    </li>
                ))}
            </ul>
        </section>
    )
}