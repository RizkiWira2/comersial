import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin as LinkedinIcon, Link as LinkIcon, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { buttonVariants } from "@/components/ui/button";

/** Simple helper to render bold and italic markdown */
function renderRichText(text: string) {
  // Bold: **text**
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-foreground font-bold">{part.slice(2, -2)}</strong>;
    }
    // Italic: *text* (simple)
    const subParts = part.split(/(\*.*?\*)/g);
    return subParts.map((sub, j) => {
      if (sub.startsWith('*') && sub.endsWith('*')) {
        return <em key={j} className="text-gold italic">{sub.slice(1, -1)}</em>;
      }
      return sub;
    });
  });
}

export const Route = createFileRoute("/research/$id")({
  head: () => ({
    meta: [{ title: "Research Detail — Comersial" }],
  }),
  component: ArticleDetail,
});

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string | null;
  image_url: string | null;
  published_at: string;
}

function ArticleDetail() {
  const { id } = useParams({ from: "/research/$id" });
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        setArticle(data);
      }
      setLoading(false);
    }

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex flex-col pt-20">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="h-12 w-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-surface flex flex-col pt-20">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Link to="/research" className={buttonVariants({ variant: "outline" })}>
            Back to Research
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col pt-20">
      <Navbar />
      
      <main className="flex-1">
        {/* Breadcrumb & Navigation */}
        <div className="bg-card/30 border-b border-border/50 py-4 px-4 sticky top-20 z-40 backdrop-blur-md">
          <div className="mx-auto max-w-4xl flex items-center justify-between">
            <Link to="/research" className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-gold transition-colors uppercase tracking-widest">
              <ArrowLeft size={16} /> Back to Insights
            </Link>
            <div className="flex items-center gap-4">
              <button className="p-2 text-muted-foreground hover:text-gold transition-colors" title="Share">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Image Header */}
        <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
          {article.image_url ? (
            <img 
              src={article.image_url} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
               <span className="text-gold/10 font-black tracking-tighter text-[15vw] italic uppercase">Insight</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
        </section>

        {/* Article Body */}
        <article className="px-4 -mt-32 relative z-10 pb-32">
          <div className="mx-auto max-w-4xl">
            {/* Title Card */}
            <div className="glass-card rounded-3xl border border-border/40 bg-card/60 p-8 md:p-12 shadow-2xl backdrop-blur-2xl mb-12">
              <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-8">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  {new Date(article.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  5 Minute Reading
                </div>
                <div className="flex items-center gap-2">
                  <User size={14} />
                  By Comersial Research Team
                </div>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-black text-foreground mb-10 leading-[1.1] tracking-tight">
                {article.title}
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed italic border-l-2 border-gold/50 pl-6 mb-2">
                {article.excerpt}
              </p>
            </div>

            {/* Main Content */}
            <div className="prose prose-invert prose-gold max-w-none">
              <div className="text-muted-foreground leading-[1.8] text-lg space-y-4 font-sans">
                {article.content ? (
                  article.content.split('\n').map((line, idx) => {
                    const trimmedLine = line.trim();
                    
                    // Headers
                    if (trimmedLine.startsWith('###')) {
                      return <h3 key={idx} className="text-foreground text-2xl font-black mt-12 mb-6 tracking-tight">{renderRichText(trimmedLine.replace('###', ''))}</h3>;
                    }
                    if (trimmedLine.startsWith('##')) {
                      return <h2 key={idx} className="text-foreground text-3xl font-black mt-14 mb-8 tracking-tight border-b border-gold/20 pb-4">{renderRichText(trimmedLine.replace('##', ''))}</h2>;
                    }
                    if (trimmedLine.startsWith('#')) {
                      return <h1 key={idx} className="text-foreground text-4xl font-black mt-16 mb-10 tracking-tight">{renderRichText(trimmedLine.replace('#', ''))}</h1>;
                    }

                    // Bullet lists
                    if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
                      return (
                        <div key={idx} className="flex gap-4 ml-4 my-2">
                          <div className="mt-2.5 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                          <p>{renderRichText(trimmedLine.substring(2))}</p>
                        </div>
                      );
                    }

                    // Empty lines for spacing
                    if (trimmedLine === '') {
                        return <div key={idx} className="h-4" />;
                    }

                    // Regular paragraphs
                    return <p key={idx} className="mb-4">{renderRichText(line)}</p>;
                  })
                ) : (
                  <p>No content available for this article.</p>
                )}
              </div>
            </div>

            {/* Share Footer */}
            <div className="mt-20 pt-12 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Share this insight</span>
                <div className="flex items-center gap-2">
                  {[Facebook, Twitter, LinkedinIcon, LinkIcon].map((Icon, i) => (
                    <button key={i} className="w-10 h-10 rounded-xl bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-all duration-300">
                      <Icon size={16} />
                    </button>
                  ))}
                </div>
              </div>
              
              <Link to="/research" className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-foreground hover:text-gold transition-colors">
                View all articles
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
