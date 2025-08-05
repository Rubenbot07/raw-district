import { getCategories } from "@/actions/get-categories";
import { CategoryInfinitiveLoopSlider } from '@/components/categories/categories-infinity-loop-slider.jsx';

export default async function CategoriesWrapper() {
  const { categories, error } = await getCategories();

  if (error) {
    console.error('Error fetching categories:', error);
    return (
      <section
        role="region"
        aria-label="Category list error"
        className="w-full text-red-600 text-sm text-center py-4"
      >
        Error loading categories.
      </section>
    );
  }

  if (!categories?.length) {
    return (
      <section
        role="region"
        aria-label="No categories available"
        className="w-full text-gray-600 text-sm text-center py-4"
      >
        No categories available.
      </section>
    );
  }

  return (
    <section
      role="region"
      aria-label="Browse by category"
      className="w-full"
    >
      <CategoryInfinitiveLoopSlider categories={categories} />
    </section>
  );
}