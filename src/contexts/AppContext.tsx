import { createContext, useContext, useState, type ReactNode } from "react";

export type Language = "EN" | "ID";
export type Currency = "USD" | "IDR" | "EUR" | "AUD";

const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1,
  IDR: 15800,
  EUR: 0.92,
  AUD: 1.53,
};

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$",
  IDR: "Rp",
  EUR: "€",
  AUD: "A$",
};

interface AppContextType {
  language: Language;
  setLanguage: (l: Language) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  convertPrice: (usdString: string) => string;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

/** Parse a USD price string like "$850,000" or "850000" into a number */
function parseUSD(s: string | number): number | null {
  const str = typeof s === "number" ? s.toString() : s;
  const cleaned = str.replace(/[^0-9.]/g, "");
  const n = parseFloat(cleaned);
  return isNaN(n) ? null : n;
}


const translations: Record<string, Record<Language, string>> = {
  // Navbar
  "nav.services": { EN: "Services", ID: "Layanan" },
  "nav.research": { EN: "Research & Insight", ID: "Riset & Insight" },
  "nav.about": { EN: "About Us", ID: "Tentang Kami" },
  "nav.consult": { EN: "Free Consultation", ID: "Konsultasi Gratis" },

  // Hero
  "hero.tagline": { EN: "Invest with Confidence, Powered by Data", ID: "Investasi dengan Percaya Diri, Berbasis Data" },
  "hero.title": { EN: "1-on-1 Commercial Property Investment Services", ID: "Layanan Investasi Properti Komersial 1-on-1" },
  "hero.desc": {
    EN: "We help you buy or lease curated commercial properties from 2 million+ listings across Bali and Indonesia with 100%+ profit potential through data-driven research tailored to your investment objectives.",
    ID: "Kami membantu Anda membeli atau menyewa properti komersial pilihan dari 2 juta+ listing di Bali dan Indonesia dengan potensi keuntungan 100%+ melalui riset berbasis data yang disesuaikan dengan tujuan investasi Anda.",
  },
  "hero.quote": {
    EN: "We don't just help you buy property, we help you invest with confidence through data-driven research for secure and profitable commercial property investments.",
    ID: "Kami tidak hanya membantu Anda membeli properti, kami membantu Anda berinvestasi dengan percaya diri melalui riset berbasis data untuk investasi properti komersial yang aman dan menguntungkan.",
  },
  "hero.consult": { EN: "Start Consulting", ID: "Mulai Konsultasi" },
  "hero.cta2": { EN: "View Projects", ID: "Lihat Proyek" },

  // Stats
  "stats.profit": { EN: "Profit Potential", ID: "Potensi Keuntungan" },
  "stats.projects": { EN: "Investment Projects", ID: "Proyek Investasi" },
  "stats.satisfaction": { EN: "Client Satisfaction", ID: "Kepuasan Klien" },
  "stats.banks": { EN: "Bank Partners", ID: "Mitra Bank" },
  "stats.experience": { EN: "Years Area Experience", ID: "Tahun Pengalaman Area" },

  // What You Get
  "wyg.tagline": { EN: "Our Services", ID: "Layanan Kami" },
  "wyg.title": { EN: "What You Get", ID: "Apa Yang Anda Dapatkan" },
  "wyg.res.title": { EN: "Investment Research", ID: "Riset Investasi" },
  "wyg.res.h1": { EN: "Financial Research", ID: "Riset Finansial" },
  "wyg.res.h2": { EN: "Market Research", ID: "Riset Pasar" },
  "wyg.res.h3": { EN: "Legal & Risk Research", ID: "Riset Hukum & Risiko" },
  "wyg.leg.title": { EN: "Independent Legal & Risk Services", ID: "Layanan Hukum & Risiko Independen" },
  "wyg.leg.h1": { EN: "Due Diligence", ID: "Due Diligence" },
  "wyg.leg.h2": { EN: "Property Agreements", ID: "Perjanjian Properti" },
  "wyg.leg.h3": { EN: "Licenses & Permits", ID: "Lisensi & Perizinan" },
  "wyg.buy.title": { EN: "Buy & Lease Assistance", ID: "Bantuan Pembelian & Sewa" },
  "wyg.buy.h1": { EN: "Lawyer & Notary Assistance", ID: "Bantuan Pengacara & Notaris" },
  "wyg.buy.h2": { EN: "Nominee Structure", ID: "Struktur Nominee" },
  "wyg.buy.h3": { EN: "Post Purchase Support", ID: "Dukungan Pasca Pembelian" },
  "wyg.contact": { EN: "Contact Us", ID: "Hubungi Kami" },

  // Why Us
  "why.tagline": { EN: "Why Choose Us", ID: "Mengapa Memilih Kami" },
  "why.title": { EN: "The Commercial Difference", ID: "Perbedaan Commercial" },

  // Projects
  "proj.tagline": { EN: "Curated Opportunities", ID: "Peluang Terkurasi" },
  "proj.title": { EN: "Investment Projects", ID: "Proyek Investasi" },
  "proj.price": { EN: "Price", ID: "Harga" },
  "proj.market": { EN: "Market Value (Resale)", ID: "Nilai Pasar (Jual Kembali)" },
  "proj.exit": { EN: "Exit Projection (5Y)", ID: "Proyeksi Exit (5Th)" },
  "proj.roi": { EN: "ROI Est.", ID: "Est. ROI" },
  "proj.growth": { EN: "Capital Growth Est.", ID: "Est. Pertumbuhan Modal" },
  "proj.research": { EN: "Investment Research", ID: "Riset Investasi" },

  // Services
  "svc.tagline": { EN: "How We Work", ID: "Cara Kami Bekerja" },
  "svc.title": { EN: "1-on-1 Investment Services", ID: "Layanan Investasi 1-on-1" },
  "svc.h1": { EN: "1-on-1 Consulting", ID: "Konsultasi 1-on-1" },
  "svc.d1": { EN: "We discuss your investment objectives, target location, and preferred price range through a private 1-on-1 consultation", ID: "Kami mendiskusikan tujuan investasi, lokasi target, dan kisaran harga pilihan Anda melalui konsultasi pribadi 1-on-1" },
  "svc.h2": { EN: "Investment Research", ID: "Riset Investasi" },
  "svc.d2": { EN: "We provide comprehensive valuation analysis, market data, and legal research to identify high-return commercial properties with 100%+ profit potential", ID: "Kami memberikan analisis valuasi yang komprehensif, data pasar, dan riset hukum untuk mengidentifikasi properti komersial dengan imbal hasil tinggi dengan potensi keuntungan 100%+" },
  "svc.h3": { EN: "End-to-End Investment Services", ID: "Layanan Investasi End-to-End" },
  "svc.d3": { EN: "We assist with negotiation, transaction closing, and post-purchase support through a specialized property legal team", ID: "Kami membantu negosiasi, penutupan transaksi, dan dukungan pasca-pembelian melalui tim hukum properti khusus" },
  "svc.step": { EN: "STEP", ID: "LANGKAH" },

  // Consultation
  "form.tagline": { EN: "Get Started", ID: "Mulai Sekarang" },
  "form.title": { EN: "Start Your 1-on-1 Consultation", ID: "Mulai Konsultasi 1-on-1 Anda" },
  "form.q1": { EN: "1. What is your commercial property investment objective?", ID: "1. Apa tujuan investasi properti komersial Anda?" },
  "form.q2": { EN: "2. What type of commercial property are you looking for?", ID: "2. Tipe properti komersial apa yang Anda cari?" },
  "form.q3": { EN: "3. What are your preferred locations?", ID: "3. Di mana lokasi pilihan Anda?" },
  "form.q4": { EN: "4. What is your budget range?", ID: "4. Berapa kisaran budget Anda?" },
  "form.details": { EN: "Please provide your details", ID: "Silakan isi detail kontak Anda" },
  "form.name": { EN: "Full Name", ID: "Nama Lengkap" },
  "form.email": { EN: "Email", ID: "Email" },
  "form.phone": { EN: "Phone / WhatsApp", ID: "Telepon / WhatsApp" },
  "form.submit": { EN: "Start Consulting", ID: "Mulai Konsultasi" },
  "form.submitting": { EN: "Submitting...", ID: "Mengirim..." },
  "form.next": { EN: "Next", ID: "Lanjut" },
  "form.back": { EN: "Back", ID: "Kembali" },
  "form.other": { EN: "Others (please specify)", ID: "Lainnya (mohon sebutkan)" },
  "form.other.p": { EN: "Please specify...", ID: "Mohon sebutkan..." },
  "form.success.h": { EN: "Thank You!", ID: "Terima Kasih!" },
  "form.success.p": { EN: "We've received your consultation request. Our team will contact you within 24 hours.", ID: "Kami telah menerima permintaan konsultasi Anda. Tim kami akan menghubungi Anda dalam 24 jam." },

  // Research
  "res.tagline": { EN: "Market Intelligence", ID: "Intelijen Pasar" },
  "res.title": { EN: "Research & Insight", ID: "Riset & Insight" },

  // Why Us Comparison
  "why.comp.agent": { EN: "Property Agent", ID: "Agen Properti" },
  "why.comp.h1": { EN: "100% Lifetime Support Guarantee", ID: "Jaminan Support Seumur Hidup 100%" },
  "why.comp.d1": { EN: "We guarantee lifetime support for any issues after purchase", ID: "Kami menjamin bantuan seumur hidup untuk masalah apa pun setelah pembelian" },
  "why.comp.h2": { EN: "Curated High-Return Investments", ID: "Investasi Kurasi dengan Laba Tinggi" },
  "why.comp.d2": { EN: "We find carefully selected property investments with 100%+ profit potential", ID: "Kami menemukan investasi properti pilihan dengan potensi keuntungan 100%+" },
  "why.comp.h3": { EN: "Data-Driven Investments", ID: "Investasi Berbasis Data" },
  "why.comp.d3": { EN: "We use valuation analysis, market data, and legal research to guide every investment decision", ID: "Kami menggunakan analisis valuasi, data pasar, dan riset hukum untuk setiap keputusan investasi" },
  "why.comp.h4": { EN: "Independent Property Legal Specialists", ID: "Spesialis Hukum Properti Independen" },
  "why.comp.d4": { EN: "We work with specialized property lawyers to ensure secure and compliant transactions", ID: "Kami bekerja dengan pengacara properti spesialis untuk transaksi yang aman dan patuh hukum" },
  "why.comp.h5": { EN: "End-to-End Investment Services", ID: "Layanan Investasi End-to-End" },
  "why.comp.d5": { EN: "We provide end-to-end services from property search to closing and ownership transfer", ID: "Kami menyediakan layanan menyeluruh mulai dari pencarian properti hingga penutupan dan transfer kepemilikan" },

  // Values
  "val.tagline": { EN: "Our Principles", ID: "Prinsip Kami" },
  "val.title": { EN: "Our Values", ID: "Nilai-Nilai Kami" },
  "val.h1": { EN: "Integrity", ID: "Integritas" },
  "val.d1": { EN: "We work with transparency, accountability, and the highest standards", ID: "Kami bekerja dengan transparansi, akuntabilitas, dan standar tertinggi" },
  "val.h2": { EN: "Client Success", ID: "Kesuksesan Klien" },
  "val.d2": { EN: "We build long-term partnerships with a people-first approach where client success is our commitment", ID: "Kami membangun kemitraan jangka panjang dengan pendekatan yang mengutamakan orang di mana kesuksesan klien adalah komitmen kami" },
  "val.h3": { EN: "ESG Commitment", ID: "Komitmen ESG" },
  "val.d3": { EN: "We commit to responsible practices that respect people and the environment", ID: "Kami berkomitmen pada praktik yang bertanggung jawab yang menghormati orang dan lingkungan" },

  // Footer
  "footer.rights": { EN: "All rights reserved.", ID: "Hak cipta dilindungi." },
  "footer.motto": { EN: "Premium Commercial Real Estate Investment in Bali", ID: "Investasi Real Estate Komersial Premium di Bali" },
  "footer.links": { EN: "Quick Links", ID: "Tautan Cepat" },
  "footer.legal": { EN: "Legal", ID: "Legalitas" },
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN");
  const [currency, setCurrency] = useState<Currency>("USD");

  function convertPrice(val: string | number): string {
    if (!val) return "$-";
    
    // Always parse the number first
    const usdAmount = parseUSD(val);
    if (usdAmount === null) return String(val);

    // Convert to target currency
    const converted = usdAmount * EXCHANGE_RATES[currency];
    
    // Format according to target currency rules
    const symbol = CURRENCY_SYMBOLS[currency];
    
    if (currency === "IDR") {
      if (converted >= 1_000_000_000) return `${symbol}${(converted / 1_000_000_000).toFixed(1)}B`;
      if (converted >= 1_000_000) return `${symbol}${(converted / 1_000_000).toFixed(0)}M`;
      return `${symbol}${converted.toLocaleString("id-ID", { maximumFractionDigits: 0 })}`;
    }
    
    // For USD, EUR, AUD
    if (converted >= 1_000_000) return `${symbol}${(converted / 1_000_000).toFixed(2)}M`;
    return `${symbol}${converted.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  }

  function t(key: string): string {
    return translations[key]?.[language] ?? key;
  }

  return (
    <AppContext.Provider value={{ language, setLanguage, currency, setCurrency, convertPrice, t }}>
      {children}
    </AppContext.Provider>
  );
}
