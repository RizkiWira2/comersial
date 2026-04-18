import { useEffect, useState } from "react";
import { ArrowRight, Loader2, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import researchBg from "@/assets/research-bg.jpg";
import { useApp } from "@/contexts/AppContext";
import { Link } from "@tanstack/react-router";

type Article = {
  id: string;
  title: string;
  excerpt: string;
  published_at: string;
  image_url?: string;
};

export default function ResearchSection() {
  const { t } = useApp();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      const { data } = await supabase
        .from("articles")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(3);
      
      if (data && data.length > 0) {
        setArticles(data);
      }
      setLoading(false);
    }
    fetchArticles();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section id="research" className="py-24 bg-background border-t border-border/50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="animate-fade-in">
            <p className="text-gold text-[10px] font-bold tracking-[0.3em] uppercase mb-4">{t("res.tagline")}</p>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 tracking-tight leading-tight">{t("res.title")}</h2>
            <p className="text-muted-foreground leading-relaxed max-w-lg">{t("hero.quote")}</p>
          </div>
          <div className="rounded-3xl overflow-hidden relative group animate-scale-up">
            <img
              src={researchBg}
              alt="Modern commercial property"
              loading="lazy"
              className="w-full h-64 md:h-72 object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 glass-card border border-white/10 rounded-2xl">
              <p className="text-[10px] font-bold text-gold uppercase tracking-widest">Market Update</p>
              <p className="text-sm font-bold mt-1">2026 Commercial Real Estate Outlook</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-gold" size={32} />
          </div>
        ) : articles.length > 0 ? (
          <div className="space-y-12">
            <div className="grid gap-8 sm:grid-cols-3">
              {articles.map((a) => (
                <Link
                  key={a.id}
                  to="/research/$id"
                  params={{ id: a.id }}
                  className="group rounded-3xl border border-border/50 bg-card/40 overflow-hidden transition-all hover:shadow-[0_20px_50px_-12px_rgba(197,162,103,0.1)] hover:-translate-y-2 flex flex-col"
                >
                  {a.image_url && (
                    <div className="h-48 overflow-hidden relative">
                      <img src={a.image_url} alt={a.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}
                  <div className="p-8 flex flex-col flex-1">
                    <span className="text-[10px] font-bold text-gold tracking-[0.2em] uppercase">
                      {formatDate(a.published_at)}
                    </span>
                    <h3 className="mt-4 text-base font-bold text-foreground leading-tight group-hover:text-gold transition-colors duration-300 line-clamp-2">
                      {a.title}
                    </h3>
                    <p className="mt-4 text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">{a.excerpt}</p>
                    <div className="mt-8 pt-6 border-t border-border/30 flex items-center gap-2 text-[10px] font-bold text-foreground uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Explore Analysis <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex justify-center pt-8">
              <Link
                to="/research"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-gold/30 hover:border-gold bg-gold/5 text-[10px] font-black uppercase tracking-[0.3em] text-gold transition-all hover:bg-gold hover:text-foreground active:scale-95"
              >
                View all articles
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 glass-card rounded-3xl border border-dashed border-border/50 max-w-lg mx-auto">
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">{t("res.tagline")} Currently Curating...</p>
          </div>
        )}
      </div>
    </section>
  );
}
