import logoFull from "@/assets/logo-full.svg";
import { useApp } from "@/contexts/AppContext";

export default function Footer() {
  const { t } = useApp();
  return (
    <footer className="bg-foreground py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <img src={logoFull} alt="Commercial Logo" className="h-8 w-auto mb-4 brightness-0 invert" />
            <p className="text-sm text-background/50">
              {t("footer.motto")}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-background mb-3">{t("footer.links")}</p>
            <div className="space-y-2">
              {[t("nav.about"), t("proj.title"), t("nav.services"), t("nav.research")].map((l) => (
                <span
                  key={l}
                  className="block text-sm text-background/50 hover:text-gold transition-colors cursor-pointer"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-background mb-3">Contact</p>
            <p className="text-sm text-background/50">Bali, Indonesia</p>
            <p className="text-sm text-background/50 mt-1">info@commercial.id</p>
          </div>
        </div>
        <div className="mt-10 border-t border-background/10 pt-6 text-center text-xs text-background/30">
          © {new Date().getFullYear()} Comersial Group. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
