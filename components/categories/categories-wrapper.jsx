import { getCategories } from "@/actions/get-categories";
import { CategoryInfinitiveLoopSlider } from '@/components/categories/categories-infinity-loop-slider.jsx';
import { getTranslations } from "next-intl/server";

export default async function CategoriesWrapper() {
  const { categories, error } = await getCategories();
  const t = await getTranslations('Categories');
  const tAriaLabel = await getTranslations('AriaLabel');
  if (error) {
    console.error('Error fetching categories:', error);
    return (
      <section
        role="region"
        aria-label={tAriaLabel('categoriesListError')}
        className="w-full text-red-600 text-sm text-center py-4"
      >
        {t('error')}
      </section>
    );
  }

  if (!categories?.length) {
    return (
      <section
        role="region"
        aria-label={tAriaLabel('noCategories')}
        className="w-full text-gray-600 text-sm text-center py-4"
      >
        {t('notFound')}
      </section>
    );
  }

  return (
    <section
      role="region"
      aria-label={tAriaLabel('browseByCategory')}
      className="w-full"
    >
      <CategoryInfinitiveLoopSlider categories={categories} />
    </section>
  );
}