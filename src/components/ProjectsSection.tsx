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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="group relative overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
            >
              {p.exit_pct && (
                <div className="absolute top-3 left-3 z-10 rounded-md bg-foreground/90 px-3 py-1">
                  <span className="text-xs font-bold text-gold">{p.exit_pct} Profit Est.</span>
                </div>
              )}

              <div className="relative h-52 overflow-hidden bg-muted">
                {p.image_url ? (
                  <img
                    src={p.image_url}
                    alt={p.title}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                    No image
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center gap-1 text-muted-foreground mb-1">
                  <MapPin size={13} />
                  <span className="text-xs">{p.location}</span>
                </div>
                <h3 className="text-base font-bold text-foreground mb-1">{p.title}</h3>
                <span className="inline-block rounded-full bg-gold/10 px-2.5 py-0.5 text-[10px] font-semibold text-gold-dark mb-3">
                  {p.tenure}
                </span>

                <div className="space-y-1.5 text-xs mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("proj.price")}</span>
                    <span className="font-semibold text-foreground">{convertPrice(p.price)}</span>
                  </div>
                  {p.market_value && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("proj.market")}</span>
                      <span className="font-semibold text-foreground">
                        {convertPrice(p.market_value)}{" "}
                        {p.profit_pct && <span className="text-gold-dark">({p.profit_pct})</span>}
                      </span>
                    </div>
                  )}
                  {p.exit_projection && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("proj.exit")}</span>
                      <span className="font-semibold text-gold-dark">
                        {convertPrice(p.exit_projection)} {p.exit_pct && `(${p.exit_pct})`}
                      </span>
                    </div>
                  )}
                  {p.roi && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("proj.roi")}</span>
                      <span className="font-semibold text-foreground">{p.roi} Yearly</span>
                    </div>
                  )}
                  {p.capital_growth && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("proj.growth")}</span>
                      <span className="font-semibold text-foreground">{p.capital_growth} Yearly</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 text-muted-foreground text-xs mb-4 border-t border-border pt-3">
                  {p.beds != null && <span className="flex items-center gap-1"><Bed size={13} /> {p.beds}</span>}
                  {p.baths != null && <span className="flex items-center gap-1"><Bath size={13} /> {p.baths}</span>}
                  {p.area && <span className="flex items-center gap-1"><Maximize size={13} /> {p.area}</span>}
                </div>

                <div className="flex gap-2">
                  <Link
                    to="/properties/$id"
                    params={{ id: p.id }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-md bg-foreground px-3 py-2 text-xs font-semibold text-background transition hover:bg-foreground/90"
                  >
                    <FileText size={13} /> {t("proj.research")}
                  </Link>
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md border border-border px-3 py-2 text-xs font-medium text-foreground transition hover:bg-muted"
                  >
                    <MessageCircle size={13} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
