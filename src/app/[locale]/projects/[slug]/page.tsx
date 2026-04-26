import ProjectDetailClient from "./ProjectDetailClient";

export async function generateStaticParams() {
  return [
    "villa-bosphorus",
    "aegean-retreat",
    "urban-minimalist",
    "heritage-estate",
  ].map((slug) => ({ slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProjectDetailClient slug={slug} />;
}
