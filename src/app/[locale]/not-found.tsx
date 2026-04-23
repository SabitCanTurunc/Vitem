import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/sections/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col">
      <section className="flex-1 flex items-center justify-center pt-32 pb-20 bg-white">
        <div className="text-center px-4">
          <h1 className="text-6xl sm:text-8xl font-sans font-light text-vitem-200 tracking-tight">
            404
          </h1>
          <h2 className="mt-4 text-2xl sm:text-3xl font-sans font-light text-vitem-900 tracking-tight">
            Page Not Found
          </h2>
          <p className="mt-4 text-vitem-600 max-w-md mx-auto">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-vitem-900 text-white text-sm tracking-[0.15em] uppercase font-medium hover:bg-vitem-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
