export const dynamic = 'force-dynamic'
import "./globals.css";
import { Nav } from "@/components/nav";
import { MarqueeBanner } from '@/components/marquee-banner';
import { GlobalSetupProvider } from "@/components/system/global-setup-provider";
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

// Si necesitas metadata, puedes exportarla como objeto JS, pero Next.js solo la usa en .ts/.tsx
// export const metadata = { ... }


export default function RootLayout({ children }) {


  return (
    <html lang="en" suppressHydrationWarning>
      <body>
          <MarqueeBanner />
          <Nav />
          {children}
          <GlobalSetupProvider />
      </body>
    </html>
  );
}