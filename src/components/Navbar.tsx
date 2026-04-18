import { Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useApp, type Language, type Currency } from "@/contexts/AppContext";

import logoFull from "@/assets/logo-full.svg";

const currencies: Currency[] = ["USD", "IDR", "EUR", "AUD"];
const languages: { code: Language; label: string }[] = [
  { code: "EN", label: "EN" },
  { code: "ID", label: "ID" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, currency, setCurrency, t } = useApp();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCurrencyOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links = [
    { label: t("nav.services"), href: "/#what-you-get", isExternal: false },
    { label: t("nav.projects"), href: "/projects", isExternal: true },
    { label: t("nav.research"), href: "/research", isExternal: true },
    { label: t("nav.about"), href: "/#why-us", isExternal: false },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logoFull} alt="Commercial Logo" className="h-6 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => 
              l.isExternal ? (
                <Link
                  key={l.href}
                  to={l.href}
                  className="text-sm font-medium text-muted-foreground hover:text-gold transition-colors"
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm font-medium text-muted-foreground hover:text-gold transition-colors"
                >
                  {l.label}
                </a>
              )
            )}

            {/* Language Toggle */}
            <div className="flex items-center rounded-full border border-border overflow-hidden">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                    language === l.code
                      ? "bg-gold text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Currency Selector - Sleek Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-[10px] font-bold text-foreground hover:bg-muted transition-all active:scale-95"
              >
                <Globe size={13} className="text-gold" />
                {currency}
                <ChevronDown size={12} className={`transition-transform duration-300 ${currencyOpen ? "rotate-180" : ""}`} />
              </button>

              {currencyOpen && (
                <div className="absolute right-0 mt-2 w-24 overflow-hidden rounded-xl border border-border bg-background shadow-2xl animate-scale-up z-[60]">
                  {currencies.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCurrency(c);
                        setCurrencyOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-[10px] font-bold transition-colors ${
                        currency === c
                          ? "bg-gold text-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#consult"
              className="inline-flex items-center justify-center rounded-md bg-gold px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-gold-dark"
            >
              {t("nav.consult")}
            </a>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background px-4 pb-4">
          {links.map((l) => 
            l.isExternal ? (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm font-medium text-muted-foreground hover:text-gold"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm font-medium text-muted-foreground hover:text-gold"
              >
                {l.label}
              </a>
            )
          )}

          {/* Mobile Language & Currency */}
          <div className="flex items-center gap-3 py-3">
            <div className="flex items-center rounded-full border border-border overflow-hidden">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                    language === l.code
                      ? "bg-gold text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <div className="flex items-center rounded-full border border-border overflow-hidden">
              {currencies.map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                    currency === c
                      ? "bg-gold text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <a
            href="#consult"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-md bg-gold px-5 py-2.5 text-center text-sm font-semibold text-foreground"
          >
            {t("nav.consult")}
          </a>
        </div>
      )}
    </nav>
  );
}
