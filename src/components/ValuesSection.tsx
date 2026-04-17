import { Shield, Heart, Leaf } from "lucide-react";
import baliAerial from "@/assets/bali-aerial.jpg";
import { useApp } from "@/contexts/AppContext";

export default function ValuesSection() {
  const { t } = useApp();

  const values = [
    {
      icon: Shield,
      title: t("val.h1"),
      desc: t("val.d1"),
    },
    {
      icon: Heart,
      title: t("val.h2"),
      desc: t("val.d2"),
    },
    {
      icon: Leaf,
      title: t("val.h3"),
      desc: t("val.d3"),
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={baliAerial}
          alt="Aerial view of Bali landscape"
          loading="lazy"
          width={1280}
          height={720}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/85" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4">
        <div className="text-center mb-12">
          <p className="text-gradient-gold text-sm font-semibold tracking-[0.15em] uppercase mb-3">{t("val.tagline")}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-background">{t("val.title")}</h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
                <v.icon size={24} className="text-gold" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-background mb-2">{v.title}</h3>
              <p className="text-sm text-background/70">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
