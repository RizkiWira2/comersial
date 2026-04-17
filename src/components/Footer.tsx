import logoFull from "@/assets/logo-full.svg";
import { useApp } from "@/contexts/AppContext";
import { 
  Instagram, 
  Linkedin, 
  Youtube, 
  Facebook, 
  MessageCircle,
  Music2, // Used as TikTok placeholder
  MapPin,
  Mail
} from "lucide-react";

export default function Footer() {
  const { t } = useApp();
  
  const socialLinks = [
    { icon: <MessageCircle size={18} />, label: "WhatsApp" },
    { icon: <Instagram size={18} />, label: "Instagram" },
    { icon: <Linkedin size={18} />, label: "LinkedIn" },
    { icon: <Music2 size={18} />, label: "TikTok" },
    { icon: <Facebook size={18} />, label: "Facebook" },
    { icon: <Youtube size={18} />, label: "Youtube" },
  ];

  return (
    <footer className="bg-foreground py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-12 sm:grid-cols-3">
          <div className="space-y-6">
            <img src={logoFull} alt="Commercial Logo" className="h-8 w-auto brightness-0 invert" />
            <p className="text-sm text-background/50 leading-relaxed max-w-xs">
              {t("footer.motto")}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="w-10 h-10 rounded-full border border-background/10 flex items-center justify-center text-background/50 hover:text-gold hover:border-gold transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-sm font-bold text-background uppercase tracking-[0.2em] mb-6">{t("footer.links")}</p>
            <div className="space-y-4">
              {[t("nav.about"), t("proj.title"), t("nav.services"), t("nav.research")].map((l) => (
                <span
                  key={l}
                  className="block text-sm text-background/40 hover:text-gold transition-colors cursor-pointer"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-bold text-background uppercase tracking-[0.2em] mb-6">Contact Us</p>
            <div className="space-y-5">
              <div className="flex gap-3">
                <MapPin className="text-gold shrink-0 mt-1" size={18} />
                <p className="text-sm text-background/50 leading-relaxed">
                  Jalan Nuansa Utama XXX No. 16, Jimbaran, Kuta Selatan, Badung, Bali, Indonesia, 80361
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-gold shrink-0" size={18} />
                <p className="text-sm text-background/50">info@commercial.id</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 border-t border-background/5 pt-8 text-center text-[10px] text-background/20 uppercase tracking-[0.3em]">
          © {new Date().getFullYear()} Comersial Group. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
