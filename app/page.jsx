import ProductsPage from '@/components/products/products';
import CategoriesWrapper from "@/components/categories/categories-wrapper";
import { RotatingBanner } from "@/components/rotating-banner";
import { MarqueeBanner } from '@/components/marquee-banner';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="w-full flex flex-col gap-10 items-center">
        <div className="flex flex-col gap-10 py-5 max-w-full">
          <RotatingBanner />
          <CategoriesWrapper /> 
          <MarqueeBanner z={10}>
              <p className='pl-10'><strong>BY DREAMERS,</strong> FOR DREAMERS</p>
              <p><strong>STREETWEAR PREMIUM</strong> MADE IN COLOMBIA</p>
          </MarqueeBanner>
          <ProductsPage />
        </div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>
            Powered by{""}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Supabase
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
