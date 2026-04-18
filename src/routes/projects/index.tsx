import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useApp } from "@/contexts/AppContext";
import { 
  Building2, MapPin, TrendingUp, DollarSign, 
  ChevronRight, Filter, Search, Grid, List as ListIcon 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [{ title: "Investment Projects — Comersial" }],
  }),
  component: ProjectsIndex,
});

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  category: string;
  tenure: string | null;
  exit_pct: string | null;
  market_value: string | null;
  profit_pct: string | null;
  exit_projection: string | null;
  roi: string | null;
  capital_growth: string | null;
  beds: number | null;
  baths: number | null;
  area: string | null;
  image_url: string | null;
  is_published: boolean;
}

const categories = [
  "All",
  "Villa",
  "Premium Residential",
  "Land",
  "Office",
  "Warehouse / Industrial",
  "Apartment / Multifamily",
  "Retail / Shophouse",
  "Hotel / Resort / Hospitality",
  "Off-Plan",
];

function ProjectsIndex() {
  const { t } = useApp();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filtered, setFiltered] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchProperties() {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setProperties(data);
        setFiltered(data);
      }
      setLoading(false);
    }
    fetchProperties();
  }, []);

  useEffect(() => {
    let result = properties;
    if (activeCategory !== "All") {
      result = result.filter(p => p.category === activeCategory);
    }
    if (searchQuery) {
        result = result.filter(p => 
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            p.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    setFiltered(result);
  }, [activeCategory, searchQuery, properties]);

  return (
    <div className="min-h-screen bg-surface flex flex-col pt-20">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Header */}
        <section className="py-20 px-4 relative overflow-hidden bg-background">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 blur-[120px] rounded-full -z-10 translate-x-1/2" />
          <div className="mx-auto max-w-7xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-6 shadow-sm">
              {t("proj.tagline")}
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight leading-tight">
                    {t("proj.title")}
                </h1>
                <p className="text-muted-foreground leading-relaxed text-lg italic border-l-2 border-gold/30 pl-6">
                    Curated high-yield commercial property investments with verified exit projections and ROI potential.
                </p>
              </div>
              <div className="flex items-center gap-4 bg-card/30 p-2 rounded-2xl border border-border/50 backdrop-blur-md">
                 <div className="px-6 py-4 text-center">
                    <p className="text-[10px] font-bold text-gold uppercase tracking-widest mb-1">Total Assets</p>
                    <p className="text-2xl font-black">{properties.length}</p>
                 </div>
                 <div className="w-[1px] h-10 bg-border/50" />
                 <div className="px-6 py-4 text-center">
                    <p className="text-[10px] font-bold text-gold uppercase tracking-widest mb-1">Avg. ROI</p>
                    <p className="text-2xl font-black">12-18%</p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters & Search */}
        <section className="px-4 py-8 border-y border-border/30 bg-card/10 sticky top-16 z-40 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto no-scrollbar">
              <Filter size={16} className="text-gold shrink-0 mr-2" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                    activeCategory === cat
                      ? "bg-gold text-foreground border-gold shadow-lg shadow-gold/10"
                      : "bg-surface/50 text-muted-foreground border-border/50 hover:border-gold/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4 w-full lg:w-96">
                <div className="relative w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search location or title..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-surface/50 border border-border/50 rounded-full pl-11 pr-6 py-3 text-sm text-foreground outline-none focus:border-gold transition-colors"
                    />
                </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="px-4 py-20 pb-40">
          <div className="mx-auto max-w-7xl">
            {loading ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="h-[450px] rounded-3xl bg-card/20 animate-pulse border border-border/20" />
                ))}
              </div>
            ) : filtered.length > 0 ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    className="group relative flex flex-col h-full glass-card rounded-[32px] border border-border/40 hover:border-gold/40 bg-card/40 transition-all duration-500 hover:-translate-y-2 overflow-hidden shadow-2xl"
                  >
                    {/* Image Area */}
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                        {item.exit_pct && (
                           <div className="bg-foreground/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-gold/30 text-[10px] font-black text-gold uppercase tracking-tighter">
                              {item.exit_pct} PROFIT EST.
                           </div>
                        )}
                        <span className="bg-surface/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-border/50 text-[10px] font-bold text-foreground uppercase tracking-widest w-fit">
                          {item.category}
                        </span>
                      </div>
                      
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <Building2 size={40} className="text-gold/20" />
                        </div>
                      ) }
                      <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent" />
                    </div>

                    {/* Content Area */}
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
                        <MapPin size={14} className="text-gold" />
                        {item.location}
                      </div>

                      <h3 className="text-2xl font-black text-foreground mb-2 leading-tight tracking-tight">
                        {item.title}
                      </h3>

                      <div className="mb-6">
                        <span className="inline-block rounded-full bg-gold/10 px-3 py-1 text-[10px] font-bold text-gold uppercase tracking-widest border border-gold/20">
                          {item.tenure || "Freehold"}
                        </span>
                      </div>
                      
                      {/* Detailed Investment Metrics */}
                      <div className="space-y-3 mb-8 text-sm">
                        <div className="flex justify-between items-center py-1 border-b border-border/10">
                          <span className="text-muted-foreground">{t("proj.price")}</span>
                          <span className="font-bold text-foreground">{convertPrice(item.price)}</span>
                        </div>
                        {item.market_value && (
                          <div className="flex justify-between items-center py-1 border-b border-border/10">
                            <span className="text-muted-foreground">{t("proj.market")}</span>
                            <span className="font-bold text-foreground">
                              {convertPrice(item.market_value)} <span className="text-gold text-xs ml-1">({item.profit_pct || "100%"})</span>
                            </span>
                          </div>
                        )}
                        {item.exit_projection && (
                          <div className="flex justify-between items-center py-1 border-b border-border/10">
                            <span className="text-muted-foreground">{t("proj.exit")}</span>
                            <span className="font-bold text-gold">
                              {convertPrice(item.exit_projection)} <span className="text-xs ml-1 opacity-70">({item.exit_pct})</span>
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between items-center py-1">
                          <span className="text-muted-foreground">{t("proj.roi")}</span>
                          <span className="font-bold text-foreground">{item.roi || "12.5%"} Yearly</span>
                        </div>
                      </div>

                      {/* Specs */}
                      <div className="flex items-center gap-6 text-muted-foreground text-xs mb-8 pt-6 border-t border-border/30">
                        <span className="flex items-center gap-2 font-bold"><Bed size={15} className="text-gold" /> {item.beds || 3}</span>
                        <span className="flex items-center gap-2 font-bold"><Bath size={15} className="text-gold" /> {item.baths || 3}</span>
                        <span className="flex items-center gap-2 font-bold"><Maximize size={15} className="text-gold" /> {item.area || "350 m²"}</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-auto pt-2">
                        <Link
                          to="/properties/$id"
                          params={{ id: item.id }}
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
            ) : (
              <div className="text-center py-32 glass-card rounded-[40px] border border-dashed border-border/30 max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Search size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4">No projects match your filter</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">Try adjusting your filters or search keywords to find alternative investment opportunities.</p>
                <button 
                    onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                    className="mt-8 text-gold font-bold text-sm underline underline-offset-8"
                >
                    Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
