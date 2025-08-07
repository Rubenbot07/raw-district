import { Products } from '@/components/products/products';
import CategoriesWrapper from '@/components/categories/categories-wrapper';
import { RotatingBanner } from '@/components/banners/rotating-banner';
import { MarqueeBanner } from '@/components/banners/marquee-banner';
import { TrustBadges } from '@/components/sections/trust-badges';
import { useTranslations } from 'next-intl';

export default function Home({ searchParams }) {
  const page = parseInt(searchParams?.page, 10) || 1;
  const perPage = 15;

  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  const filters = {
    price_lt: searchParams?.price_lt ?? null,
    category: searchParams?.category ?? null,
    sort: searchParams?.sort ?? null,
  };
  const tRotatingBanner = useTranslations('RotatingBanner');
  const tMarquee = useTranslations('Marquee');
  return (
    <main className="min-h-screen flex flex-col items-center w-full">
      <div className="w-full flex flex-col gap-10 items-center">
        <div className="flex flex-col gap-10 py-5 max-w-full">
          
          <header aria-label="Main Banners">
            <RotatingBanner />
          </header>
          <section aria-label="Categories">
            <CategoriesWrapper />
          </section>

          <section aria-label="Brand Statement">
            <MarqueeBanner z={10}>
              <p className="pl-10">
                <strong>{tMarquee('byDreamers')},</strong> {tMarquee('forDreamers')}
              </p>
              <p>
                <strong>{tMarquee('streetwearPremium')}</strong> {tMarquee('madeInColombia')}
              </p>
            </MarqueeBanner>
          </section>

          <section aria-label="Product List" className="w-full">
            <Products filters={filters} from={from} to={to} />
          </section>

          <section aria-label="Trust Badges">
            <TrustBadges />
          </section>

          <footer aria-label="Secondary Banner">
            <RotatingBanner
              contentMessages={[
                {
                  id: 1,
                  content: (
                    <>
                      {tRotatingBanner("rawdistricBrand")}
                    </>
                  ),
                },
                {
                  id: 2,
                  content: <>{tRotatingBanner("colombianBrands")}</>,
                },
              ]}
            />
          </footer>
        </div>
      </div>
    </main>
  );
}