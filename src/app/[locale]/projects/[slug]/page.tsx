"use client";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { ArrowLeft, MapPin, Calendar, Tag } from "lucide-react";
import { Link } from "@/i18n/routing";
import Footer from "@/sections/Footer";

const projectsData: Record<string, {
  name: string;
  location: string;
  year: string;
  category: string;
  description: string;
  scope: string[];
  images: string[];
}> = {
  "villa-bosphorus": {
    name: "Villa Bosphorus",
    location: "İstanbul",
    year: "2025",
    category: "Mutfak & Yaşam Alanları",
    description:
      "İstanbul Boğazı manzaralı bu özel villa projesinde modern minimalist çizgiler ve doğal malzeme seçimleriyle benzersiz bir yaşam deneyimi yaratıldı. Açık plan mutfak ve yaşam alanı tasarımı ile aile dinamiklerine uygun, ferah ve şık bir ortam oluşturuldu.",
    scope: ["Ada mutfak tasarımı", "Özel ankastre entegrasyonu", "Banyo mobilyası", "Yaşam alanı dolapları"],
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80",
    ],
  },
  "aegean-retreat": {
    name: "Aegean Retreat",
    location: "Bodrum",
    year: "2024",
    category: "Mutfak & Banyo",
    description:
      "Ege kıyısında konumlanan bu tatil villasında deniz mavisi ve beyaz tonların hakim olduğu sade ve şık bir iç mekan anlayışı benimsendi. Mutfak ve banyo projelerinde su dirençli malzemeler ve deniz estetiğine uygun renk paleti kullanıldı.",
    scope: ["Sahil vilası mutfak tasarımı", "İkili banyo projesi", "Özel renk paleti danışmanlığı"],
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80",
    ],
  },
  "urban-minimalist": {
    name: "Urban Minimalist",
    location: "Ankara",
    year: "2024",
    category: "Mutfak",
    description:
      "Başkentin kalbindeki bu modern daire projesinde gri-beyaz renk paleti ve mat kapak seçimleriyle minimalist bir estetik yakalandı. Sınırlı alan içinde maksimum depolama çözümü sunan akıllı tasarım anlayışı benimsendi.",
    scope: ["Kompakt mutfak çözümü", "Gizli depolama sistemleri", "Ankastre fırın ve bulaşık makinesi entegrasyonu"],
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
    ],
  },
  "heritage-estate": {
    name: "Heritage Estate",
    location: "Hatay",
    year: "2023",
    category: "Mutfak & Banyo & Yaşam Alanları",
    description:
      "Hatay'ın tarihi dokusuna uygun olarak tasarlanan bu köşk projesinde Anadolu mimari motiflerinden ilham alınan sıcak tonlar ve ahşap dokular kullanıldı. Geniş aile yaşamına uygun, misafirperver ve işlevsel bir iç mekan planlaması yapıldı.",
    scope: [
      "Geniş aile mutfağı",
      "4 adet banyo projesi",
      "Misafir odası mobilyası",
      "Yaşam alanı duvar panelleri",
      "Özel ahşap işçiliği",
    ],
    images: [
      "https://images.unsplash.com/photo-1556910103-1c02745aae4f?w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80",
    ],
  },
};

export default function ProjectDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "";
  const project = projectsData[slug];

  if (!project) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-vitem-600">Proje bulunamadı.</p>
        <Link href="/projects" className="mt-4 text-xs uppercase tracking-widest border-b border-vitem-300 pb-1">
          Projelere Dön
        </Link>
      </main>
    );
  }

  const [hero, ...rest] = project.images;

  return (
    <main>
      {/* Hero Image */}
      <section className="relative h-[60vh] sm:h-[75vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img src={hero} alt={project.name} className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 lg:p-16">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link
                href="/projects"
                className="flex items-center gap-2 text-white/80 hover:text-white text-xs uppercase tracking-widest mb-6 transition-colors w-fit"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Tüm Projeler
              </Link>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-light text-white tracking-tight">
                {project.name}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Info */}
      <section className="py-16 sm:py-20 bg-white border-b border-vitem-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Meta */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-4 space-y-8"
            >
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 text-vitem-600">
                  <MapPin className="w-4 h-4 text-vitem-400 shrink-0" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-3 text-vitem-600">
                  <Calendar className="w-4 h-4 text-vitem-400 shrink-0" />
                  <span>{project.year}</span>
                </div>
                <div className="flex items-center gap-3 text-vitem-600">
                  <Tag className="w-4 h-4 text-vitem-400 shrink-0" />
                  <span>{project.category}</span>
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-vitem-500 mb-4">Proje Kapsamı</h3>
                <ul className="space-y-2">
                  {project.scope.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-vitem-700 font-light">
                      <span className="mt-2 w-1 h-1 bg-vitem-400 rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-8"
            >
              <p className="text-lg sm:text-xl font-light text-vitem-700 leading-relaxed">
                {project.description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {rest.length > 0 && (
        <section className="py-16 sm:py-20 bg-vitem-50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <span className="text-[11px] tracking-[0.25em] uppercase text-vitem-500 font-medium">Galeri</span>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rest.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`overflow-hidden bg-vitem-200 ${index === 0 && rest.length >= 3 ? "sm:col-span-2 lg:col-span-2" : ""}`}
                >
                  <img
                    src={img}
                    alt={`${project.name} - ${index + 2}`}
                    className="w-full h-64 sm:h-80 object-cover hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-vitem-950">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-sans font-light text-white mb-6">
              Benzer bir proje mi planlıyorsunuz?
            </h2>
            <p className="text-sm text-vitem-400 font-light mb-8 max-w-xl mx-auto leading-relaxed">
              Ekibimizle iletişime geçin, vizyonunuzu birlikte hayata geçirelim.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-vitem-900 px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-vitem-100 transition-colors"
            >
              Bize Ulaşın
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
