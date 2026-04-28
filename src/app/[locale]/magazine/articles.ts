export interface Article {
  slug: string;
  titleTr: string;
  titleEn: string;
  categoryTr: string;
  categoryEn: string;
  dateTr: string;
  dateEn: string;
  imageUrl: string;
  readTimeTr: string;
  readTimeEn: string;
  excerptTr: string;
  excerptEn: string;
  bodyTr: string[];
  bodyEn: string[];
}

export const articles: Article[] = [
  {
    slug: "selecting-fine-woods",
    titleTr: "En Kaliteli Ahşapları Seçmenin Sanatı",
    titleEn: "The Art of Selecting Fine Woods",
    categoryTr: "Malzemeler",
    categoryEn: "Materials",
    dateTr: "12 Ekim 2025",
    dateEn: "12 October 2025",
    imageUrl: "/images/magazine-1.jpg",
    readTimeTr: "5 dk",
    readTimeEn: "5 min",
    excerptTr: "Mobilya üretiminde ahşap seçimi, bir ürünün hem estetiğini hem de ömrünü doğrudan belirler. Doğru ahşabı seçmek bir bilim olduğu kadar bir sanattır.",
    excerptEn: "In furniture production, wood selection directly determines both the aesthetics and longevity of a piece. Choosing the right wood is as much a science as it is an art.",
    bodyTr: [
      "Vitem atölyesinde her proje, doğru malzemeyi seçme kararıyla başlar. Ahşap, doğanın bize sunduğu en kadim ve en çok yönlü malzemelerden biridir; ancak her ahşap eşit yaratılmamıştır.",
      "Meşe, sertliği ve belirgin doku yapısıyla mutfak dolabı kapılarında tercih ettiğimiz birincil ahşap türlerimizden biridir. Yıllarca dayanıklılığını korurken zamanla güzelleşen bir patina kazanır. Ceviz ise koyu, zengin tonu ve ipeksi yüzeyiyle daha sofistike iç mekanlar için ideal bir seçimdir.",
      "Ahşap seçiminde nem içeriği kritik bir faktördür. Mobilya üretiminde kullanılan ahşabın nem oranı yüzde altı ile sekiz arasında olmalıdır; aksi takdirde genleşme ve çatlama kaçınılmaz hale gelir. Vitem'de tüm ahşap malzemeler, işlenmeden önce kontrollü ortamlarda en az dört hafta boyunca kurutulur.",
      "Ahşabın yaşı da kaliteyi doğrudan etkiler. Yavaş büyüyen ağaçlardan elde edilen ahşap, daha sık büyüme halkaları nedeniyle daha yoğun ve dayanıklı bir yapıya sahiptir. Bu nedenle hızlı büyüyen plantasyon ahşabı yerine sertifikalı ormanlardan temin edilen doğal ahşabı tercih ediyoruz.",
      "Sonuç olarak ahşap seçimi, bir mobilyanın ruhunu belirler. Doğru ahşap, yıllar içinde evinizin ayrılmaz bir parçası haline gelir; bir nesil sonraki için değer taşıyan bir miras olur.",
    ],
    bodyEn: [
      "At the Vitem workshop, every project begins with the decision to select the right material. Wood is one of the most ancient and versatile materials nature offers us; yet not all wood is created equal.",
      "Oak, with its hardness and distinctive grain pattern, is one of our primary wood species for kitchen cabinet doors. It maintains its durability for years while developing a beautiful patina over time. Walnut, with its dark, rich tone and silky surface, is an ideal choice for more sophisticated interiors.",
      "Moisture content is a critical factor in wood selection. Wood used in furniture production should have a moisture content between six and eight percent; otherwise expansion and cracking become inevitable. At Vitem, all wood materials are dried in controlled environments for at least four weeks before processing.",
      "The age of the wood also directly affects quality. Wood from slow-growing trees has a denser and more durable structure due to closer growth rings. For this reason, we prefer natural wood sourced from certified forests over fast-growing plantation wood.",
      "Ultimately, wood selection determines the soul of a piece of furniture. The right wood becomes an inseparable part of your home over the years; a legacy that carries value for the next generation.",
    ],
  },
  {
    slug: "minimalism-kitchen-design",
    titleTr: "Modern Mutfak Tasarımında Minimalizm",
    titleEn: "Minimalism in Modern Kitchen Design",
    categoryTr: "Trendler",
    categoryEn: "Trends",
    dateTr: "28 Eylül 2025",
    dateEn: "28 September 2025",
    imageUrl: "/images/magazine-2.jpg",
    readTimeTr: "4 dk",
    readTimeEn: "4 min",
    excerptTr: "Minimalist mutfak tasarımı yalnızca estetik bir tercih değil; işlevselliği, temizliği ve zihinsel huzuru ön plana çıkaran bir yaşam felsefesidir.",
    excerptEn: "Minimalist kitchen design is not merely an aesthetic choice; it is a philosophy of living that prioritizes functionality, cleanliness, and mental clarity.",
    bodyTr: [
      "Son on yılda mutfak tasarımında en belirgin dönüşüm, karmaşıklıktan sadeleşmeye doğru yaşanan köklü değişimdir. Kulpsuz kapaklar, gizli ankastre cihazlar ve tek tonlu renk paletleri artık lüks mutfakların temel dili haline geldi.",
      "Minimalizm yalnızca görsel bir sadelik değildir; aynı zamanda işlevsel bir organizasyonu zorunlu kılar. Her nesne, her çekmece ve her dolap bir amaca hizmet etmelidir. Vitem'in minimalist koleksiyonlarında depolama çözümleri, yüzeyden gizlenecek şekilde tasarlanır; böylece tezgah üstleri her zaman temiz kalır.",
      "Renk seçimi minimalist mutfaklarda belirleyici bir rol oynar. Kırık beyaz, sıcak gri ve yumuşak bej tonları mekanı büyütürken doğal ışığı maksimum düzeyde kullanmayı sağlar. Bu nötr zeminin üzerine ahşap ve metal aksesuarlar eklenerek sıcaklık ve derinlik kazandırılır.",
      "Minimalist tasarımın uzun vadeli avantajı, hiçbir zaman modası geçmemesidir. Klasik bir estetikle tasarlanmış minimalist mutfak, on yıl sonra da aynı zarafetle durmaya devam eder. Bu da onu hem sürdürülebilir hem de ekonomik bir tercih haline getirir.",
    ],
    bodyEn: [
      "The most prominent transformation in kitchen design over the last decade has been the fundamental shift from complexity towards simplicity. Handleless doors, hidden built-in appliances, and monochromatic color palettes have now become the essential language of luxury kitchens.",
      "Minimalism is not merely visual simplicity; it also necessitates functional organization. Every object, every drawer, and every cabinet must serve a purpose. In Vitem's minimalist collections, storage solutions are designed to be hidden from surfaces, keeping countertops always clean.",
      "Color selection plays a decisive role in minimalist kitchens. Broken white, warm grey, and soft beige tones expand the space while maximizing natural light usage. Wood and metal accessories are added on this neutral base to introduce warmth and depth.",
      "The long-term advantage of minimalist design is that it never goes out of style. A minimalist kitchen designed with a timeless aesthetic will continue to stand with the same elegance ten years later. This makes it both a sustainable and economical choice.",
    ],
  },
  {
    slug: "vitem-in-milan",
    titleTr: "Global Fuarlar: Vitem Milano'da",
    titleEn: "Global Exhibitions: Vitem in Milan",
    categoryTr: "Etkinlikler",
    categoryEn: "Events",
    dateTr: "15 Eylül 2025",
    dateEn: "15 September 2025",
    imageUrl: "/images/magazine-3.jpg",
    readTimeTr: "3 dk",
    readTimeEn: "3 min",
    excerptTr: "Eurocucina 2025'te Vitem, Anadolu'nun zanaatkarlık mirasını uluslararası tasarım dünyasına taşıdı.",
    excerptEn: "At Eurocucina 2025, Vitem brought Anatolia's craftsmanship heritage to the international design world.",
    bodyTr: [
      "Nisan 2025'te Milano'da düzenlenen Eurocucina fuarı, mutfak tasarımının dünya sahnesinde buluştuğu en prestijli etkinliktir. Bu yıl Vitem, 120 metrekarelik standıyla dünyanın en yenilikçi mutfak markaları arasında yerini aldı.",
      "Vitem standı, Hatay'ın el sanatları geleneğinden ilham alan özel bir ahşap çerçeveleme sistemiyle çevriliydi. Ziyaretçileri karşılayan ilk unsur, Modena koleksiyonunun bütünleşik quartz adalı tam donanımlı modeliydi. Fuar boyunca 48 ülkeden profesyonel ziyaretçi standı gezdi.",
      "Bu yılki fuarın en önemli çıktısı, sürdürülebilirlik temasıydı. Vitem olarak yalnızca FSC sertifikalı ahşap kullandığımızı ve üretim süreçlerimizde atık oranını 2022'ye kıyasla yüzde kırk azalttığımızı açıkladık. Bu açıklama Avrupa basınında geniş yankı uyandırdı.",
      "Milano deneyimi, uluslararası pazardaki bilinirliğimizi önemli ölçüde artırdı. Fuarın ardından Almanya, İsviçre ve Birleşik Krallık'tan üç yeni distribütörlük görüşmesi başladı. Vitem'in dünya sahnesindeki yolculuğu hız kazanıyor.",
    ],
    bodyEn: [
      "The Eurocucina fair held in Milan in April 2025 is the most prestigious event where kitchen design meets on the world stage. This year, Vitem took its place among the world's most innovative kitchen brands with its 120 square meter stand.",
      "The Vitem stand was surrounded by a special wooden framing system inspired by Hatay's handicraft tradition. The first element to welcome visitors was the fully equipped model of the Modena collection with an integrated quartz island. Throughout the fair, professional visitors from 48 countries toured the stand.",
      "The most important outcome of this year's fair was the sustainability theme. As Vitem, we announced that we use only FSC-certified wood and have reduced the waste ratio in our production processes by forty percent compared to 2022. This announcement resonated widely in the European press.",
      "The Milan experience significantly increased our recognition in the international market. Following the fair, three new distributorship discussions began from Germany, Switzerland, and the United Kingdom. Vitem's journey on the world stage is gaining momentum.",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
