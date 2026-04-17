import { useEffect, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import researchBg from "@/assets/research-bg.jpg";
import { useApp } from "@/contexts/AppContext";

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
    <section id="research" className="py-20 bg-background">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <p className="text-gradient-gold text-sm font-semibold tracking-[0.15em] uppercase mb-3">{t("res.tagline")}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t("res.title")}</h2>
            <p className="text-muted-foreground">{t("hero.quote")}</p>
          </div>
          <div className="rounded-xl overflow-hidden relative">
            <img
              src={researchBg}
              alt="Modern commercial property"
              loading="lazy"
              width={1280}
              height={720}
              className="w-full h-56 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-gold" size={32} />
          </div>
        ) : articles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-3">
            {articles.map((a) => (
              <article
                key={a.id}
                className="group rounded-xl border border-border bg-card overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1 cursor-pointer flex flex-col"
              >
                {a.image_url && (
                  <div className="h-40 overflow-hidden">
                    <img src={a.image_url} alt={a.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] font-semibold text-gold tracking-widest uppercase">
                    {formatDate(a.published_at)}
                  </span>
                  <h3 className="mt-2 text-sm font-bold text-foreground leading-snug group-hover:text-gold-dark transition-colors line-clamp-2">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-3 flex-1">{a.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-gold-dark hover:gap-2 transition-all">
                    Read more <ArrowRight size={12} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border border-dashed border-border rounded-xl">
            <p className="text-sm text-muted-foreground">Belum ada artikel riset yang dipublikasikan.</p>
          </div>
        )}
      </div>
    </section>
  );
}
