export const dynamic = 'force-dynamic'
import "./globals.css";
import { Work_Sans } from "next/font/google";
import { Nav } from "@/components/nav";
import { MarqueeBanner } from '@/components/marquee-banner';
import { GlobalSetupProvider } from "@/components/system/global-setup-provider";
import { BodyScrollLock } from "@/components/body-scroll-lock";
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

// Si necesitas metadata, puedes exportarla como objeto JS, pero Next.js solo la usa en .ts/.tsx
// export const metadata = { ... }

const workSans = Work_Sans({ subsets: ['latin'], variable: '--font-work-sans' });

export default function RootLayout({ children }) {


  return (
    <html lang="en" suppressHydrationWarning className={workSans.variable}>
      <body className="font-sans">
          <MarqueeBanner />
          <Nav />
          <BodyScrollLock />
          {children}
          <GlobalSetupProvider />
      </body>
    </html>
  );
}