import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { 
  Instagram, 
  Linkedin, 
  Youtube, 
  Facebook, 
  MapPin,
  Mail
} from "lucide-react";
import tiktokIcon from "@/assets/tik-tok.svg";
import whatsappIcon from "@/assets/whatsapp.svg";
import logoFull from "@/assets/logo-full.svg";
import { useApp } from "@/contexts/AppContext";

export default function Footer() {
  const { t } = useApp();
  
  const socialLinks = [
    { icon: <img src={whatsappIcon} alt="WhatsApp" className="w-[18px] h-[18px] brightness-0 invert opacity-50" />, label: "WhatsApp" },
    { icon: <Instagram size={18} />, label: "Instagram" },
    { icon: <Linkedin size={18} />, label: "LinkedIn" },
    { icon: <img src={tiktokIcon} alt="TikTok" className="w-[18px] h-[18px] brightness-0 invert opacity-50" />, label: "TikTok" },
    { icon: <Facebook size={18} />, label: "Facebook" },
    { icon: <Youtube size={18} />, label: "Youtube" },
  ];

  return (
    <footer className="bg-foreground py-16 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-7xl px-4"
      >
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
                  href={social.label === "WhatsApp" ? "https://wa.me/6285362254459" : "#"}
                  target={social.label === "WhatsApp" ? "_blank" : undefined}
                  rel={social.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 rounded-full border border-background/10 flex items-center justify-center text-background/50 hover:text-gold hover:border-gold transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-sm font-bold text-background uppercase tracking-[0.2em] mb-6">Company</p>
            <div className="space-y-4">
              <Link to="/" className="block text-sm text-background/40 hover:text-gold transition-colors">
                Home
              </Link>
              <Link to="/projects" className="block text-sm text-background/40 hover:text-gold transition-colors">
                Investment Projects
              </Link>
              <a 
                href="https://wa.me/6285362254459?text=I'm interested in 1-on-1 Investment Services"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-background/40 hover:text-gold transition-colors"
              >
                1-on-1 Investment Services
              </a>
              <Link to="/research" className="block text-sm text-background/40 hover:text-gold transition-colors">
                Research & Insight
              </Link>
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
                <a href="mailto:raza@comersial.com" className="text-sm text-background/50 hover:text-gold transition-colors">
                  raza@comersial.com
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 border-t border-background/5 pt-8 text-center text-[10px] text-background/20 uppercase tracking-[0.3em]">
          © {new Date().getFullYear()} Comersial Group. {t("footer.rights")}
        </div>
      </motion.div>
    </footer>
  );
}
