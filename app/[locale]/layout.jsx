import "@/app/globals.css";
import 'react-toastify/dist/ReactToastify.css';

import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import { Work_Sans } from "next/font/google";

import { Nav } from "@/components/nav/nav";
import { MarqueeBanner } from '@/components/banners/marquee-banner';
import { Footer } from '@/components/footer/footer';
import { GlobalSetupProvider } from "@/components/system/global-setup-provider";
import { BodyScrollLock } from "@/components/system/body-scroll-lock";
import SplashScreen from "@/components/ui/splash-screen";
import { ScrollTopButton } from "@/components/ui/scroll-top-button";

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap'
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  title: {
    default: "Rawdistric",
    template: "%s | Rawdistric",
  },
  description: "Buy fast and easy. Shipping to all Colombia.",
  metadataBase: new URL(defaultUrl),
  openGraph: {
    title: "Rawdistric",
    description: "Buy fast and easy. Shipping to all Colombia.",
    url: defaultUrl,
    siteName: "Rawdistric",
    images: [
      {
        url: "/LogoRD.webp",
        width: 1200,
        height: 630,
        alt: "Rawdistric promotion banner",
      },
    ],
    type: "website",
    locale: "es_CO",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default async function RootLayout({ children, params }) {
  const locale = params?.locale || "es";

  // Validar si el locale es válido
  const supportedLocales = ['es', 'en'];
  if (!hasLocale(supportedLocales, locale)) notFound();

  return (
    <html lang={locale} suppressHydrationWarning className={workSans.variable}>
      <head>
        {/* Preconnect para acelerar fonts y Supabase */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://pbylxfkmoxfnmiayople.supabase.co" />

        {/* Preload de fuente principal */}
        <link
          rel="preload"
          as="font"
          href="/_next/static/media/your-work-sans-font-file.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Preload de imagen clave para LCP */}
        <link
          rel="preload"
          as="image"
          href="/LogoRD.webp"
          type="image/webp"
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col">
        <NextIntlClientProvider locale={locale}>
          <SplashScreen>
            <MarqueeBanner />
            <Nav />
            <BodyScrollLock />
            <main className="flex-grow">
              {children}
            </main>
            <ScrollTopButton />
            <GlobalSetupProvider />
            <ToastContainer position="top-left" autoClose={3000} />
            <Footer />
          </SplashScreen>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}