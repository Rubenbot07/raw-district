import { getProductDetail } from '@/actions/get-product-detail';
import { ProductDetailView } from '@/components/products/product-detail-view';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const { product } = await getProductDetail(slug);

  if (!product) {
    return {
      title: 'Product not found',
      description: 'This product does not exist or is unavailable.',
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = params;

  const { product, error } = await getProductDetail(slug);

  if (error || !product) {
    return (
      <main className="flex flex-col items-center justify-center h-screen text-center">
        <section
          role="alert"
          className="max-w-md bg-red-50 border border-red-200 p-6 rounded-lg"
        >
          <h1 className="text-2xl font-bold mb-2 text-red-700">Product Not Found</h1>
          <p className="text-red-600">
            The product you are looking for does not exist or may have been removed.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="md:pt-16" aria-label={`Product detail: ${product.name}`}>
      <ProductDetailView product={product} />
    </main>
  );
}