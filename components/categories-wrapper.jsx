import { supabase } from "@/lib/supabase/supabaseClient"
import { CategoryCard } from "./category-card"
export default async function CategoriesWrapper() {
    const { data: categories, error } = await supabase.from('categories').select('*')
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