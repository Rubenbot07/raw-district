import ProductsPage from '@/components/products/products';
import CategoriesWrapper from "@/components/categories/categories-wrapper";
import { RotatingBanner } from "@/components/rotating-banner";
import { MarqueeBanner } from '@/components/marquee-banner';
import { TrustBadges } from '@/components/trust-badges';
import { Footer } from '@/components/footer';

export default function Home() {
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
          <ProductsPage />
          <TrustBadges />
        </div>
        <Footer />
      </div>
    </main>
  );
}
