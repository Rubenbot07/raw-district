import { getProductDetail } from '@/actions/get-product-detail';
import { ProductDetailView } from '@/components/product-detail-view';
export default async function ProductDetailPage({ params }) {
    const { slug } = await params;
    // Fetch product details based on the slug
    const { product, error } = await getProductDetail(slug);

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