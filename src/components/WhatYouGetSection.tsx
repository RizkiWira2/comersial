import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { 
  LineChart, 
  Search, 
  ShieldCheck, 
  FileSearch, 
  FileText, 
  Building2,
  Users,
  Handshake,
  CheckCircle2
} from "lucide-react";
import whatsappIcon from "@/assets/whatsapp.svg";

export default function WhatYouGetSection() {
  const { t } = useApp();

  const sections = [
    {
      title: t("wyg.res.title"),
      items: [
        { icon: LineChart, label: t("wyg.res.h1") },
        { icon: Search, label: t("wyg.res.h2") },
        { icon: ShieldCheck, label: t("wyg.res.h3") },
      ]
    },
    {
      title: t("wyg.leg.title"),
      items: [
        { icon: FileSearch, label: t("wyg.leg.h1") },
        { icon: FileText, label: t("wyg.leg.h2") },
        { icon: CheckCircle2, label: t("wyg.leg.h3") },
      ]
    },
    {
      title: t("wyg.buy.title"),
      items: [
        { icon: Users, label: t("wyg.buy.h1") },
        { icon: Handshake, label: t("wyg.buy.h2") },
        { icon: Building2, label: t("wyg.buy.h3") },
      ]
    }
  ];

  return (
    <section id="what-you-get" className="py-24 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">{t("wyg.tagline")}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{t("wyg.title")}</h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {sections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col h-full bg-card/40 backdrop-blur-sm border border-border rounded-[2.5rem] p-10 hover:border-gold/30 transition-all group"
            >
              <h3 className="text-xl font-bold text-foreground mb-10 group-hover:text-gold transition-colors">{section.title}</h3>
              
              <div className="space-y-8 flex-1">
                {section.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-5">
                    <div className="p-3 rounded-2xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-gold-dark transition-all">
                      <item.icon size={22} />
                    </div>
                    <span className="text-sm font-semibold text-foreground/80 leading-tight">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-border/50">
                <a
                  href="https://wa.me/6285362254459?text=I'd like to consult about your services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-foreground text-background font-bold py-4 rounded-2xl hover:bg-gold hover:text-foreground transition-all active:scale-[0.98] group/btn"
                >
                  <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5 brightness-0 invert group-hover/btn:brightness-100 group-hover/btn:invert-0 transition-all" />
                  <span className="text-xs uppercase tracking-widest">{t("wyg.contact")}</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
