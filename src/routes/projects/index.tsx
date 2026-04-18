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
  roi: string | null;
  capital_growth: string | null;
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
        .select("id, title, location, price, category, roi, capital_growth, image_url, is_published")
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
                  <Link
                    key={item.id}
                    to="/properties/$id"
                    params={{ id: item.id }}
                    className="group relative flex flex-col h-full glass-card rounded-[32px] border border-border/40 hover:border-gold/40 bg-card/40 transition-all duration-500 hover:-translate-y-3 overflow-hidden"
                  >
                    {/* Image Area */}
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <div className="absolute top-6 left-6 z-20">
                        <span className="bg-surface/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-border/50 text-[10px] font-bold text-gold uppercase tracking-widest shadow-xl">
                          {item.category}
                        </span>
                      </div>
                      
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <Building2 size={40} className="text-gold/20" />
                        </div>
                      ) }
                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />
                      
                      <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                         <div className="bg-gold text-foreground px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter">
                            Check Due Diligence
                         </div>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
                        <MapPin size={14} className="text-gold" />
                        {item.location}
                      </div>

                      <h3 className="text-xl font-bold text-foreground mb-6 leading-tight group-hover:text-gold transition-colors duration-300 line-clamp-2">
                        {item.title}
                      </h3>
                      
                      {/* Investment Metrics */}
                      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/30 mt-auto">
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                             <DollarSign size={10} className="text-gold" /> Price
                          </p>
                          <p className="text-sm font-black text-foreground">{item.price}</p>
                        </div>
                        <div className="space-y-1 text-right">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5 justify-end">
                             <TrendingUp size={10} className="text-gold" /> ROI Est.
                          </p>
                          <p className="text-sm font-black text-gold">{item.roi || "12.5%"}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
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
