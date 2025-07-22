import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
const NotFound = () => {
    return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-black text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Page not found</h1>
      <p className="text-base mb-6">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium border border-black px-4 py-2 rounded hover:bg-black hover:text-white transition"
      >
        <ArrowLeft size={16} />
        Back to Home
      </Link>
    </div>
    );
};

export default NotFound;