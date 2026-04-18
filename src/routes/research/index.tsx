import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useApp } from "@/contexts/AppContext";
import { ArrowRight, Calendar, Bookmark, Search, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/research/")({
  head: () => ({
    meta: [{ title: "Research & Insight — Comersial" }],
  }),
  component: ResearchIndex,
});

interface Article {
  id: string;
  title: string;
  excerpt: string;
  image_url: string | null;
  published_at: string;
}

function ResearchIndex() {
  const { t } = useApp();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      const { data, error } = await supabase
        .from("articles")
        .select("id, title, excerpt, image_url, published_at")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (!error && data) {
        setArticles(data);
      }
      setLoading(false);
    }

    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-surface flex flex-col pt-20">
      <Navbar />
      
      <main className="flex-1">
        {/* Header Section */}
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gold/5 blur-[120px] rounded-full -z-10" />
          
          <div className="mx-auto max-w-7xl text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-6 animate-fade-in">
              {t("res.tagline")}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight animate-fade-in">
              {t("res.title")}
            </h1>
            <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed animate-fade-in delay-100">
              In-depth analysis, market trends, and investment strategies from our commercial real estate experts.
            </p>
          </div>
        </section>

        {/* Search & Filter (Static placeholder for now) */}
        <section className="px-4 mb-16">
          <div className="mx-auto max-w-7xl">
            <div className="glass-card rounded-2xl border border-border/50 bg-card/30 p-2 flex items-center gap-2 max-w-xl mx-auto">
              <div className="pl-4 text-muted-foreground">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Search investment insights..." 
                className="w-full bg-transparent border-none outline-none py-3 text-sm text-foreground placeholder:text-muted-foreground/50"
              />
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="px-4 pb-32">
          <div className="mx-auto max-w-7xl">
            {loading ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-96 rounded-3xl bg-card/20 animate-pulse border border-border/20" />
                ))}
              </div>
            ) : articles.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <Link
                    key={article.id}
                    to="/research/$id"
                    params={{ id: article.id }}
                    className="group flex flex-col h-full glass-card rounded-3xl border border-border/40 hover:border-gold/30 bg-card/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(197,162,103,0.15)] overflow-hidden"
                  >
                    {/* Image Area */}
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <div className="absolute top-4 right-4 z-20">
                        <div className="bg-surface/80 backdrop-blur-md p-2 rounded-xl border border-border/50 text-gold">
                          <Bookmark size={16} />
                        </div>
                      </div>
                      
                      {article.image_url ? (
                        <img
                          src={article.image_url}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <span className="text-gold/20 font-bold tracking-tighter text-4xl italic">Comersial</span>
                        </div>
                      ) }
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Content Area */}
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-[10px] font-bold text-gold uppercase tracking-widest mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} />
                          {new Date(article.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={12} />
                          5 Min Read
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-foreground mb-4 leading-tight group-hover:text-gold transition-colors duration-300">
                        {article.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                        {article.excerpt}
                      </p>

                      <div className="mt-auto flex items-center gap-2 text-xs font-bold text-foreground uppercase tracking-widest group/btn">
                        Read Analysis 
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 glass-card rounded-3xl border border-border/20 max-w-lg mx-auto">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bookmark size={24} className="text-gold" />
                </div>
                <h3 className="text-xl font-bold mb-2">No research found</h3>
                <p className="text-muted-foreground text-sm px-8"> We're curating our latest market insights. Please check back soon.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
