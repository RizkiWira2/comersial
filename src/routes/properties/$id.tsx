import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  MapPin, Bed, Bath, Maximize, FileText, 
  ArrowLeft, Calendar, Shield, TrendingUp, DollarSign, 
  ChevronRight, Share2, Heart, Info, Waves, Wifi, Wind, 
  Car, Utensils, TreePine, Eye, Dumbbell, Sofa
} from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import whatsappIcon from "@/assets/whatsapp.svg";

const featureIcons: Record<string, any> = {
  "Swimming Pool": Waves,
  "Fully Furnished": Sofa,
  "High Speed WiFi": Wifi,
  "Security 24/7": Shield,
  "Parking Area": Car,
  "Air Conditioning": Wind,
  "Modern Kitchen": Utensils,
  "Garden": TreePine,
  "Ocean View": Eye,
  "Gym / Fitness Center": Dumbbell,
};

export const Route = createFileRoute("/properties/$id")({
  head: ({ params }) => ({
    meta: [{ title: `Property Detail — Comersial` }],
  }),
  component: PropertyDetail,
});

function PropertyDetail() {
  const { id } = useParams({ from: "/properties/$id" });
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { convertPrice, t } = useApp();

  useEffect(() => {
    const fetchProperty = async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setProperty(data);
      }
      setLoading(false);
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gold border-t-transparent" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-foreground mb-4">Property not found</h2>
        <Link to="/" className="text-gold hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-24 sm:py-32">
        {/* Breadcrumbs & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-widest">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-gold">Property Detail</span>
            <ChevronRight size={12} />
            <span className="text-foreground/50 truncate max-w-[150px]">{property.title}</span>
          </nav>
          
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full bg-card border border-border hover:bg-muted transition-colors text-muted-foreground">
              <Share2 size={18} />
            </button>
            <button className="p-2 rounded-full bg-card border border-border hover:bg-muted transition-colors text-muted-foreground">
              <Heart size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Image Gallery */}
            <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              {property.images && property.images.length > 0 ? (
                <>
                  <div className="col-span-4 sm:col-span-3 row-span-2 relative group cursor-pointer overflow-hidden">
                    <img 
                      src={property.images[0]} 
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  {property.images[1] && (
                    <div className="hidden sm:block overflow-hidden cursor-pointer relative group">
                      <img src={property.images[1]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                  )}
                  {property.images[2] && (
                    <div className="hidden sm:block overflow-hidden cursor-pointer relative group">
                      <img src={property.images[2]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                  )}
                  {!property.images[1] && (
                     <div className="hidden sm:flex items-center justify-center bg-muted/50 border border-border/50 text-muted-foreground text-[10px] font-bold uppercase tracking-widest text-center px-4">More photos coming soon</div>
                  )}
                </>
              ) : (
                <div className="col-span-4 row-span-2 relative group cursor-pointer overflow-hidden">
                  <img 
                    src={property.image_url || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200"} 
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              )}
            </div>

            {/* Title & Key Stats */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-widest">{property.category}</span>
                <span className="px-3 py-1 rounded-full bg-foreground/10 text-foreground text-[10px] font-bold uppercase tracking-widest">{property.tenure}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{property.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground group">
                <div className="p-2 rounded-full bg-gold/10 text-gold scale-75">
                  <MapPin size={24} />
                </div>
                <span className="text-sm font-medium">{property.location}</span>
                <a href="#" className="ml-2 text-[10px] font-bold text-gold uppercase underline tracking-wider">View on Map</a>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-3xl bg-card border border-border shadow-sm">
              <div className="flex flex-col items-center justify-center p-4 border-r border-border last:border-0 sm:border-r">
                <Bed className="text-gold mb-2" size={20} />
                <span className="text-lg font-bold text-foreground">{property.beds || "0"}</span>
                <span className="text-[10px] uppercase text-muted-foreground font-semibold">Bedrooms</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 border-r border-border last:border-0 sm:border-r">
                <Bath className="text-gold mb-2" size={20} />
                <span className="text-lg font-bold text-foreground">{property.baths || "0"}</span>
                <span className="text-[10px] uppercase text-muted-foreground font-semibold">Bathrooms</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 border-r border-border last:border-0 sm:border-r">
                <Maximize className="text-gold mb-2" size={20} />
                <span className="text-lg font-bold text-foreground truncate max-w-full">{property.area || "0 m²"}</span>
                <span className="text-[10px] uppercase text-muted-foreground font-semibold">Living Area</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 last:border-0">
                <Shield className="text-gold mb-2" size={20} />
                <span className="text-lg font-bold text-foreground">Safe</span>
                <span className="text-[10px] uppercase text-muted-foreground font-semibold">Zoning</span>
              </div>
            </div>

            {/* Features & Amenities List */}
            {property.features && property.features.length > 0 && (
              <div className="space-y-6">
                <h4 className="text-sm font-bold text-foreground uppercase tracking-widest border-l-2 border-gold pl-4">Features & Amenities</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {property.features.map((f: string) => {
                    const Icon = featureIcons[f] || Shield;
                    return (
                      <div key={f} className="flex items-center gap-3 group">
                        <div className="p-2.5 rounded-xl bg-card border border-border group-hover:bg-gold/10 group-hover:border-gold/30 transition-all">
                          <Icon size={18} className="text-gold" />
                        </div>
                        <span className="text-xs font-semibold text-foreground">{f}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-foreground uppercase tracking-widest border-l-2 border-gold pl-4">Property Description</h4>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Experience unparalleled luxury and strategic investment opportunity with this premium {property.category.toLowerCase()} located in the heart of {property.location}. 
                This project has been meticulously designed to maximize both comfort for residents and capital appreciation for investors. 
                With Bali's tourism market reaching new heights in 2026, this property represents a secure entry point into a high-yield market.
              </p>
              <div className="flex gap-4 flex-wrap">
                <span className="flex items-center gap-2 text-xs font-semibold text-foreground bg-muted/50 px-3 py-2 rounded-xl">
                  <Calendar size={14} className="text-gold" /> Available Now
                </span>
                <span className="flex items-center gap-2 text-xs font-semibold text-foreground bg-muted/50 px-3 py-2 rounded-xl">
                  <TrendingUp size={14} className="text-gold" /> High Capital Growth
                </span>
              </div>
            </div>

            {/* Investment Details Table */}
            <div className="space-y-6">
              <h4 className="text-sm font-bold text-foreground uppercase tracking-widest border-l-2 border-gold pl-4">Financial Projections</h4>
              <div className="overflow-hidden rounded-3xl border border-border bg-card">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <tbody>
                    <tr className="border-b border-border bg-muted/30">
                      <td className="p-5 font-medium text-muted-foreground">{t("proj.price")}</td>
                      <td className="p-5 font-bold text-foreground text-right">{convertPrice(property.price)}</td>
                    </tr>
                    {property.market_value && (
                      <tr className="border-b border-border">
                        <td className="p-5 font-medium text-muted-foreground">{t("proj.market")}</td>
                        <td className="p-5 font-bold text-foreground text-right">
                          {convertPrice(property.market_value)} <span className="text-gold-dark ml-2">({property.profit_pct})</span>
                        </td>
                      </tr>
                    )}
                    {property.exit_projection && (
                      <tr className="border-b border-border bg-gold/5">
                        <td className="p-5 font-medium text-gold-dark font-bold">{t("proj.exit")}</td>
                        <td className="p-5 font-bold text-gold-dark text-right">
                          {convertPrice(property.exit_projection)} <span className="ml-2">({property.exit_pct})</span>
                        </td>
                      </tr>
                    )}
                    <tr className="border-b border-border">
                      <td className="p-5 font-medium text-muted-foreground">{t("proj.roi")}</td>
                      <td className="p-5 font-bold text-foreground text-right">{property.roi || "12%"} Yearly</td>
                    </tr>
                    <tr>
                      <td className="p-5 font-medium text-muted-foreground">{t("proj.growth")}</td>
                      <td className="p-5 font-bold text-foreground text-right">{property.capital_growth || "8%"} Yearly</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar (Right) */}
          <div className="space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* Inquiry Card */}
              <div className="glass-card rounded-3xl border border-border bg-card/60 p-8 shadow-xl backdrop-blur-xl animate-scale-up">
                <div className="mb-6">
                  <p className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-1">Starting From</p>
                  <h2 className="text-2xl font-bold font-serif text-foreground">{convertPrice(property.price)}</h2>
                  <div className="flex items-center gap-2 mt-2 group cursor-pointer">
                    <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground group-hover:bg-gold group-hover:text-gold-dark transition-colors">?</div>
                    <span className="text-xs text-muted-foreground">About pricing in USD/IDR</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-muted/30 border border-border/50 text-center">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Investment Status</p>
                    <p className="text-sm font-bold text-foreground">Open for Private Registration</p>
                  </div>
                  
                  <button className="w-full flex items-center justify-center gap-3 bg-foreground text-background font-bold py-4 rounded-2xl hover:bg-foreground/90 transition-all active:scale-[0.98] shadow-lg shadow-foreground/10 uppercase text-xs tracking-widest">
                    <FileText size={18} /> Request ROI Details
                  </button>
                  
                  <a 
                    href={`https://wa.me/6281234567890?text=I'm interested in ${property.title}`}
                    target="_blank"
                    className="w-full flex items-center justify-center gap-3 bg-white/5 border border-border text-foreground font-bold py-4 rounded-2xl hover:bg-gold/10 hover:border-gold/30 hover:text-gold transition-all uppercase text-xs tracking-widest"
                  >
                    <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5" /> WhatsApp Agent
                  </a>
                </div>

              </div>

              {/* Secure Info */}
              <div className="p-6 rounded-3xl border border-border bg-muted/20 flex gap-4">
                <Info className="text-gold shrink-0" size={20} />
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  All property transactions are secured through legal notaries and strictly follow Indonesian property laws (HGB/Hak Pakai). ROI projections are estimates based on current market performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
