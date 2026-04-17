import { Check, X } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import villaInterior from "@/assets/villa-interior.jpg";
import logoFull from "@/assets/logo-full.svg";


export default function WhyUsSection() {
  const { t } = useApp();

  const comparisons = [
    {
      feature: t("why.comp.h1"),
      desc: t("why.comp.d1"),
      us: true,
      them: false,
    },
    {
      feature: t("why.comp.h2"),
      desc: t("why.comp.d2"),
      us: true,
      them: false,
    },
    {
      feature: t("why.comp.h3"),
      desc: t("why.comp.d3"),
      us: true,
      them: false,
    },
    {
      feature: t("why.comp.h4"),
      desc: t("why.comp.d4"),
      us: true,
      them: false,
    },
    {
      feature: t("why.comp.h5"),
      desc: t("why.comp.d5"),
      us: true,
      them: false,
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-background">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-[1fr_320px] gap-12 items-start">
          <div>
            <div className="mb-8">
              <p className="text-gradient-gold text-sm font-semibold tracking-[0.15em] uppercase mb-3">{t("why.tagline")}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{t("why.title")}</h2>
            </div>

            <div className="rounded-xl border border-border overflow-hidden">
              <div className="grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_120px_120px] bg-foreground text-background">
                <div className="px-4 py-3 text-sm font-semibold" />
                <div className="px-4 py-3 flex items-center justify-center">
                  <img src={logoFull} alt="Commercial Logo" className="h-4 w-auto brightness-0 invert" />
                </div>
                <div className="px-4 py-3 text-center text-sm font-medium text-background/60">{t("why.comp.agent")}</div>
              </div>

              {comparisons.map((c, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_120px_120px] border-t border-border"
                >
                  <div className="px-4 py-4">
                    <p className="text-sm font-semibold text-foreground">{c.feature}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{c.desc}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/15">
                      <Check size={16} className="text-gold-dark" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
                      <X size={16} className="text-muted-foreground" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:block sticky top-24 space-y-4">
            <div className="rounded-xl overflow-hidden">
              <img
                src={villaInterior}
                alt="Luxury villa interior in Bali"
                loading="lazy"
                width={800}
                height={600}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="rounded-xl bg-card border border-border p-5">
              <p className="text-xs text-gold font-semibold tracking-widest uppercase mb-2">Our Promise</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("hero.quote")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
