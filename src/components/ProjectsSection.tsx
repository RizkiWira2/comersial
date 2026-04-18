import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { MapPin, Maximize, FileText, Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useApp } from "@/contexts/AppContext";
import whatsappIcon from "@/assets/whatsapp.svg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const categories = [
  "All",
  "Villa",
  "Premium Residential",
  "Land",
  "Office",
  "Warehouse / Industrial",
  "Apartment",
  "Retail / Shophouse",
  "Hotel / Resort",
  "Restaurant",
  "Off-Plan",
];

const fallbackProjects = [
  {
    id: "fallback-1",
    image_url: project1,
    title: "Beachfront Resort Complex",
    location: "Nusa Dua, Bali",
    category: "Hotel / Resort",
    tenure: "Freehold",
    price: "$850,000",
    market_value: "$1,700,000",
    profit_pct: "100%",
    exit_projection: "$3,060,000",
    exit_pct: "260%",
    roi: "12%",
    capital_growth: "8%",
    beds: 8,
    baths: 8,
    area: "1,200 m²",
    land_size: "1,200 m²",
    building_size: "800 m²",
  },
  {
    id: "fallback-2",
    image_url: project2,
    title: "Modern Pool Villa",
    location: "Canggu, Bali",
    category: "Villa",
    tenure: "Leasehold 90 Years",
    price: "$250,000",
    market_value: "$500,000",
    profit_pct: "100%",
    exit_projection: "$650,000",
    exit_pct: "160%",
    roi: "10%",
    capital_growth: "7%",
    beds: 3,
    baths: 3,
    area: "350 m²",
    land_size: "350 m²",
    building_size: "200 m²",
  },
  {
    id: "fallback-3",
    image_url: project3,
    title: "Premium Residential Tower",
    location: "Seminyak, Bali",
    category: "Apartment",
    tenure: "Freehold",
    price: "$120,000",
    market_value: "$240,000",
    profit_pct: "100%",
    exit_projection: "$312,000",
    exit_pct: "160%",
    roi: "11%",
    capital_growth: "7%",
    beds: 2,
    baths: 2,
    area: "85 m²",
    land_size: "85 m²",
    building_size: "85 m²",
  },
];

interface ProjectItem {
  id: string;
  image_url: string | null;
  title: string;
  location: string;
  category: string;
  tenure: string;
  price: string;
  market_value: string | null;
  profit_pct: string | null;
  exit_projection: string | null;
  exit_pct: string | null;
  roi: string | null;
  capital_growth: string | null;
  area: string | null;
  land_size: string | null;
  building_size: string | null;
  pdf_url?: string | null;
}

export default function ProjectsSection() {
  const [active, setActive] = useState("All");
  const [projects, setProjects] = useState<ProjectItem[]>(fallbackProjects);
  const { convertPrice, t } = useApp();

  useEffect(() => {
    supabase
      .from("properties")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setProjects(data);
        }
      });
  }, []);

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category.includes(active));

  const itemsToShow = filtered.slice(0, 3);

  return (
    <section id="projects" className="py-24 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">{t("proj.tagline")}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{t("proj.title")}</h2>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-5 py-2 text-xs font-bold transition-all active:scale-95 ${
                active === c
                  ? "bg-gold text-foreground shadow-lg shadow-gold/20"
                  : "bg-card/40 border border-border text-muted-foreground hover:border-gold/30 hover:text-gold"
              }`}
            >
              {c}
            </button>
          ))}
        </motion.div>

        {/* Property Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {itemsToShow.map((p, i) => (
              <motion.div
                layout
                key={p.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative flex flex-col h-full glass-card rounded-[32px] border border-border/40 hover:border-gold/40 bg-card/40 transition-all duration-500 overflow-hidden shadow-2xl"
              >
                {/* Entire Card Clickable Overlay */}
                <Link
                  to="/properties/$id"
                  params={{ id: p.id }}
                  className="absolute inset-0 z-10 cursor-pointer"
                  aria-label={`View details for ${p.title}`}
                />

                {/* Image Area */}
                <div className="aspect-[16/10] overflow-hidden relative">
                  <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                    {p.exit_pct && (
                       <div className="bg-foreground/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-gold/30 text-[10px] font-black text-gold uppercase tracking-tighter shadow-xl">
                          {p.exit_pct} PROFIT EST.
                       </div>
                    )}
                    <span className="bg-surface/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-border/50 text-[10px] font-bold text-foreground uppercase tracking-widest w-fit shadow-lg">
                      {p.category}
                    </span>
                  </div>
                  
                  {p.image_url ? (
                    <img
                      src={p.image_url}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-gold/20 font-black tracking-tighter">COMERSIAL</span>
                    </div>
                  ) }
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent" />
                </div>

                {/* Content Area */}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-muted-foreground text-[10px] mb-3 uppercase tracking-widest font-bold">
                    <MapPin size={12} className="text-gold" />
                    {p.location}
                  </div>

                  <h3 className="text-2xl font-black text-foreground mb-1 leading-tight tracking-tight line-clamp-1 group-hover:text-gold transition-colors">
                    {p.title}
                  </h3>

                  <div className="mb-6">
                    <span className="inline-block rounded-full bg-gold/5 px-2.5 py-1 text-[9px] font-bold text-gold uppercase tracking-widest border border-gold/20">
                      {p.tenure || "Freehold"}
                    </span>
                  </div>
                  
                  {/* Detailed Investment Metrics */}
                  <div className="space-y-3 mb-8">
                    <MetricLine label={t("proj.price")} value={convertPrice(p.price)} bold />
                    {p.market_value && (
                      <MetricLine 
                        label={t("proj.market")} 
                        value={convertPrice(p.market_value)} 
                        sub={`${p.profit_pct || "100%"}`} 
                      />
                    )}
                    {p.exit_projection && (
                      <MetricLine 
                        label={t("proj.exit")} 
                        value={convertPrice(p.exit_projection)} 
                        sub={p.exit_pct} 
                        gold
                      />
                    )}
                  </div>

                  {/* Specs */}
                  <div className="flex items-center gap-6 text-muted-foreground text-[11px] mb-8 pt-6 border-t border-border/10">
                    <span className="flex items-center gap-2 font-bold"><Maximize size={14} className="text-gold" /> L: {p.land_size || p.area || "-"}</span>
                    <span className="flex items-center gap-2 font-bold"><Building2 size={14} className="text-gold" /> B: {p.building_size || "-"}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto relative z-20">
                    <Link
                      to="/properties/$id"
                      params={{ id: p.id }}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-foreground px-4 py-4 text-[10px] font-black text-background transition-all hover:bg-gold hover:text-foreground active:scale-95 shadow-xl shadow-foreground/5"
                    >
                      <FileText size={14} /> VIEW DETAILS
                    </Link>
                    <a
                      href={`https://wa.me/6285362254459?text=I'm interested in ${p.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-2xl border border-border/30 bg-surface/30 px-5 py-4 text-foreground transition-all hover:border-gold hover:bg-gold/5 active:scale-95"
                    >
                      <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <Link
            to="/projects"
            className="inline-flex items-center justify-center gap-3 rounded-full border-2 border-gold px-10 py-4 text-sm font-black text-foreground transition-all hover:bg-gold hover:text-background shadow-2xl hover:shadow-gold/30 group"
          >
            VIEW ALL INVESTMENT PROJECTS
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function MetricLine({ label, value, sub, gold, bold }: { label: string; value: string; sub?: string | null; gold?: boolean; bold?: boolean }) {
  return (
    <div className="flex justify-between items-center py-1 border-b border-border/5">
      <span className="text-muted-foreground font-medium">{label}</span>
      <span className={`${bold ? 'font-black text-sm' : 'font-bold'} ${gold ? 'text-gold' : 'text-foreground'}`}>
        {value} {sub && <span className={`text-[9px] ml-1 ${gold ? 'opacity-70' : 'text-gold opacity-100'}`}>({sub})</span>}
      </span>
    </div>
  );
}

function ArrowRight({ size, className }: { size: number; className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
