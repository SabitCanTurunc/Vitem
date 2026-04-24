import Hero from "@/sections/Hero";
import FeaturedCollections from "@/sections/FeaturedCollections";
import FeaturedProducts from "@/sections/FeaturedProducts";
import Philosophy from "@/sections/Philosophy";
import Craftsmanship from "@/sections/Craftsmanship";
import Magazine from "@/sections/Magazine";
import Newsletter from "@/sections/Newsletter";
import Footer from "@/sections/Footer";

import { getActiveHeroSlides, getAllCategories, getFeaturedProducts } from "../../../api/queries/products";

export default async function Home() {
  const [heroSlides, categories, featuredProducts] = await Promise.all([
    getActiveHeroSlides(),
    getAllCategories(),
    getFeaturedProducts(),
  ]);

  return (
    <main>
      <Hero slides={heroSlides} />
      <FeaturedCollections categories={categories} />
      <Philosophy />
      <Craftsmanship />
      <FeaturedProducts products={featuredProducts} />
      <Magazine />
      <Newsletter />
      <Footer />
    </main>
  );
}
