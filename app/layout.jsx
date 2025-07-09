import { Geist } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { PreCartModal } from "@/components/precart-modal";
import { Providers } from '@/app/context/Providers'
import { getUser } from "@/actions/get-user";
import { ProgressBar } from '@/components/progress-bar'
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

// Si necesitas metadata, puedes exportarla como objeto JS, pero Next.js solo la usa en .ts/.tsx
// export const metadata = { ... }

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default async function RootLayout({ children }) {
  const { user } = await getUser();


  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <Providers initialUser={user}>
          <Nav />
          <ProgressBar />
          <PreCartModal />
          {children}
        </Providers>
      </body>
    </html>
  );
}