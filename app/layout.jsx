import { Geist } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";


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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}