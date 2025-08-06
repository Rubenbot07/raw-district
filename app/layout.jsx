export const dynamic = 'force-dynamic'
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Work_Sans } from "next/font/google";
import { Nav } from "@/components/nav/nav";
import { MarqueeBanner } from '@/components/banners/marquee-banner';
import { Footer } from '@/components/footer/footer';
import { GlobalSetupProvider } from "@/components/system/global-setup-provider";
import { BodyScrollLock } from "@/components/system/body-scroll-lock";
import SplashScreen  from "@/components/splash-screen";
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

const workSans = Work_Sans({ subsets: ['latin'], variable: '--font-work-sans', display: 'swap' });

export default function RootLayout({ children }) {


  return (
    <html lang="en" suppressHydrationWarning className={workSans.variable}>
      <body className="font-sans min-h-screen flex flex-col">
          <SplashScreen>
            <MarqueeBanner />
            <Nav />
            <BodyScrollLock />
            <main className="flex-grow">
              {children}
            </main>
            <GlobalSetupProvider />
            <ToastContainer position="top-left" autoClose={3000} />
            <Footer />
          </SplashScreen>
      </body>
    </html>
  );
}