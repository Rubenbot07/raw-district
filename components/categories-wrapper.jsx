import { getCategories } from "@/actions/get-categories"
import { CategoryCard } from "./category-card"
export default async function CategoriesWrapper() {
    const { categories, error } = await getCategories()
    if (error) {
        console.error('Error fetching categories:', error)
        return <div>Error loading categories</div>
    }
    return (
        <section>
            <h1 className='text-2xl text-red-500'>Categories</h1>
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