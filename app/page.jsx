import ProductsPage from '@/components/products/products';
import CategoriesWrapper from "@/components/categories/categories-wrapper";
import { RotatingBanner } from "@/components/rotating-banner";
import { MarqueeBanner } from '@/components/marquee-banner';
import { TrustBadges } from '@/components/trust-badges';

export default async function Home({ searchParams }) {
  const { price_lt, category, sort } = await searchParams || {};
    const filters = {
        price_lt: price_lt || null,
        category: category || null,
        sort: sort || null,
  };
  return (
    <main className="min-h-screen flex flex-col items-center w-full">
      <div className="w-full flex flex-col gap-10 items-center">
        <div className="flex flex-col gap-10 py-5 max-w-full">
          <RotatingBanner />
          <CategoriesWrapper /> 
          <MarqueeBanner z={10}>
              <p className='pl-10'><strong>BY DREAMERS,</strong> FOR DREAMERS</p>
              <p><strong>STREETWEAR PREMIUM</strong> MADE IN COLOMBIA</p>
          </MarqueeBanner>
          <ProductsPage filters={filters}/>
          <TrustBadges />
          <RotatingBanner 
            contentMessages={
              [
                { id: 1, content: <><strong>RAWDISTRIC</strong> TURNED INTO A BRAND</> },
                { id: 2, content: <>COLOMBIAN BRANDS YOU SHOULD KNOWN</>}
              ]
            }
          />
        </div>
      </div>
    </main>
  );
}
