import { getAllCategories } from "../../../../api/queries/products";
import CollectionsClient from "./CollectionsClient";
import Footer from "@/sections/Footer";

export default async function CollectionsPage() {
  const categories = await getAllCategories();

  return (
    <main>
      <CollectionsClient categories={categories} />
      <Footer />
    </main>
  );
}
