import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, Bed, Bath, Maximize, MessageCircle, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useApp } from "@/contexts/AppContext";
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
  beds: number | null;
  baths: number | null;
  area: string | null;
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

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-10">
          <p className="text-gradient-gold text-sm font-semibold tracking-[0.15em] uppercase mb-3">
            {t("proj.tagline")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{t("proj.title")}</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                active === c
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-foreground/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, 3).map((p) => (
            <div
              key={p.id}
              className="group relative flex flex-col h-full glass-card rounded-[32px] border border-border/40 hover:border-gold/40 bg-card/40 transition-all duration-500 hover:-translate-y-2 overflow-hidden shadow-2xl"
            >
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
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
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
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
                  <MapPin size={14} className="text-gold" />
                  {p.location}
                </div>

                <h3 className="text-2xl font-black text-foreground mb-2 leading-tight tracking-tight group-hover:text-gold transition-colors">
                  {p.title}
                </h3>

                <div className="mb-6">
                  <span className="inline-block rounded-full bg-gold/10 px-3 py-1 text-[10px] font-bold text-gold uppercase tracking-widest border border-gold/20">
                    {p.tenure || "Freehold"}
                  </span>
                </div>
                
                {/* Detailed Investment Metrics */}
                <div className="space-y-3 mb-8 text-sm">
                  <div className="flex justify-between items-center py-1 border-b border-border/10">
                    <span className="text-muted-foreground">{t("proj.price")}</span>
                    <span className="font-bold text-foreground">{convertPrice(p.price)}</span>
                  </div>
                  {p.market_value && (
                    <div className="flex justify-between items-center py-1 border-b border-border/10">
                      <span className="text-muted-foreground">{t("proj.market")}</span>
                      <span className="font-bold text-foreground">
                        {convertPrice(p.market_value)} <span className="text-gold text-xs ml-1">({p.profit_pct || "100%"})</span>
                      </span>
                    </div>
                  )}
                  {p.exit_projection && (
                    <div className="flex justify-between items-center py-1 border-b border-border/10">
                      <span className="text-muted-foreground">{t("proj.exit")}</span>
                      <span className="font-bold text-gold">
                        {convertPrice(p.exit_projection)} <span className="text-xs ml-1 opacity-70">({p.exit_pct})</span>
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">{t("proj.roi")}</span>
                    <span className="font-bold text-foreground">{p.roi || "12.5%"} Yearly</span>
                  </div>
                </div>

                {/* Specs */}
                <div className="flex items-center gap-6 text-muted-foreground text-xs mb-8 pt-6 border-t border-border/30">
                  <span className="flex items-center gap-2 font-bold"><Bed size={15} className="text-gold" /> {p.beds || 3}</span>
                  <span className="flex items-center gap-2 font-bold"><Bath size={15} className="text-gold" /> {p.baths || 3}</span>
                  <span className="flex items-center gap-2 font-bold"><Maximize size={15} className="text-gold" /> {p.area || "350 m²"}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto pt-2">
                  <Link
                    to="/properties/$id"
                    params={{ id: p.id }}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-foreground px-4 py-3.5 text-xs font-black text-background transition-all hover:bg-gold hover:text-foreground shadow-lg active:scale-95"
                  >
                    <FileText size={14} /> {t("proj.research")}
                  </Link>
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-2xl border border-border/50 bg-surface/50 px-4 py-3.5 text-foreground transition-all hover:border-gold hover:bg-gold/5 active:scale-95"
                  >
                    <MessageCircle size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gold px-8 py-3 text-sm font-black text-foreground transition-all hover:bg-gold hover:text-background shadow-xl hover:shadow-gold/20"
          >
            View All Investment Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
