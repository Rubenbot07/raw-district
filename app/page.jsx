import { Products } from '@/components/products/products';
import CategoriesWrapper from "@/components/categories/categories-wrapper";
import { RotatingBanner } from "@/components/banners/rotating-banner";
import { MarqueeBanner } from '@/components/banners/marquee-banner';
import { TrustBadges } from '@/components/sections/trust-badges';

export default function Home({ searchParams }) {
  const page = parseInt( searchParams?.page) || 1;
  const perPage = 15;
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  const { price_lt, category, sort } =  searchParams || {};
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
          <Products filters={filters} from={from} to={to}/>
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
