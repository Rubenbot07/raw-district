import { supabase } from "@/lib/supabase/supabaseClient";
import { ProductCard } from "@/components/product-card";

export default async function Page({ params }) {
    const { slug } = await params;

    // Primero, busca la categoría por slug para obtener su id
    const { data: category, error: catError } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', slug)
        .single();

    if (!category) {
        return (
            <div>
                <h1>Category not found</h1>
            </div>
        )
    }
    const { data: prodData, error: prodError } = await supabase
        .from('products')
        .select(`*,
        product_images(
            image_url,
            thumbnail_url,
            position
        )`)
        .eq('category_id', category.id);

    return (
        <div className="">
            <div className="w-full max-w-sm">
                <h1>Category</h1>
                <p>{slug}</p>
                <ul>
                    {prodData?.map(product => (
                        <li key={product?.id}>
                            <ProductCard product={product} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}