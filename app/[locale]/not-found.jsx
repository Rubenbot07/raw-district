import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'

export const metadata = {
  title: "Not Found",
  description: "Page not found",
} 

export default function NotFoundPage() {
  const t = useTranslations("NotFound");
  return (
    <main
      className="min-h-screen bg-white flex flex-col items-center justify-center text-black text-center px-4"
      role="alert"
      aria-labelledby="not-found-title"
    >
      <h1 id="not-found-title" className="text-4xl font-bold mb-4">
        {t("title")}
      </h1>
      <p className="text-base mb-6 max-w-md">
        {t("description")}
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium border border-black px-4 py-2 rounded hover:bg-black hover:text-white transition"
      >
        <ArrowLeft size={16} />
        {t("backToHome")}
      </Link>
    </main>
  )
}