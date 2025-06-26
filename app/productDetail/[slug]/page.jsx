import { supabase } from '@/lib/supabase/supabaseClient';
import { ProductDetailView } from '@/components/product-detail-view';
export default async function ProductDetailPage({ params }) {
    const { slug } = await params;
    // Fetch product details based on the slug
    const { data: product, error } = await supabase
        .from('products')
        .select(`*,
        product_images(
            image_url,
            thumbnail_url,
            position
        ),
        categories(
            name
        ),
        product_sizes(
            size,
            id,
            stock,
            sku
        )`)
        .eq('slug', slug)
        .single();

    if (error || !product) {
        return (
            <div>
                <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                <p className="text-red-500">The product you are looking for does not exist.</p>
            </div>
        );
    }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Product Detail</h1>
      <p>Product details will be displayed here.</p>
        <p className="text-lg mt-2">Product Slug: {slug}</p>
        <ProductDetailView product={product} />
    </div>
  );
}