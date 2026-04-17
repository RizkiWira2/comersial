import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import {
  Search,
  TrendingUp,
  ShieldCheck,
  FileCheck,
  ScrollText,
  Stamp,
  Gavel,
  UserCheck,
  HeadphonesIcon,
  ChevronDown,
} from "lucide-react";

interface ServiceCategory {
  title: string;
  items: { heading: string; pills: string[] }[];
}

const categories: ServiceCategory[] = [
  {
    title: "Investment Research",
    items: [
      {
        heading: "Financial Research",
        pills: ["Appraisal & Valuation", "Capital Growth & ROI Forecast", "Exit Strategy"],
      },
      {
        heading: "Market Research",
        pills: ["Highest & Best Use (HBU) Analysis", "Market Data & Trends", "Location Analysis"],
      },
      {
        heading: "Legal & Risk Research",
        pills: ["Ownership & Due Diligence", "Land Zoning & Tax Matrix", "Risk Analysis"],
      },
    ],
  },
  {
    title: "Independent Legal & Risk Services",
    items: [
      {
        heading: "Due Diligence",
        pills: ["Building Permits (PBG, SLF)", "Zoning & Site Inspection", "Ownership & Tax Verification"],
      },
      {
        heading: "Property Agreements",
        pills: ["Freehold & Leasehold Agreements", "Sale & Purchase Agreement (SPA)", "Contractor & Management Agreements"],
      },
      {
        heading: "Licenses & Permits",
        pills: ["PT PMA & Visa Services", "Airbnb & Hospitality Licenses", "Contractor & Broker Licenses"],
      },
    ],
  },
  {
    title: "Buy & Lease Assistance",
    items: [
      {
        heading: "Lawyer & Notary Assistance",
        pills: ["Signing Assistance (On-Site / Remote)", "Land Title Transfer", "Transaction Coordination & Representation"],
      },
      {
        heading: "Nominee Structure",
        pills: ["Nominee Arrangement for Freehold Ownership", "Legal Structuring & Agreement Setup", "Ownership Protection & Compliance"],
      },
      {
        heading: "Post Purchase Support",
        pills: ["Ownership Documentation", "Transaction Follow-Up", "Assistance with Any Issues after Purchase"],
      },
    ],
  },
];

const columnIcons: React.ElementType[][] = [
  [Search, TrendingUp, ShieldCheck],
  [FileCheck, ScrollText, Stamp],
  [Gavel, UserCheck, HeadphonesIcon],
];

function AccordionItem({
  heading,
  pills,
  Icon,
}: {
  heading: string;
  pills: string[];
  Icon: React.ElementType;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border/50 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center gap-3 py-4 text-left transition-colors"
      >
        <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 transition-colors group-hover:border-gold group-hover:bg-gold/10">
          <Icon size={16} className="text-gold" strokeWidth={1.5} />
        </div>
        <h4 className="flex-1 text-sm font-bold text-foreground transition-colors group-hover:text-gold">
          {heading}
        </h4>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 transition-all duration-300 ${
            open ? "rotate-180 text-gold" : "text-muted-foreground"
          }`}
          strokeWidth={2}
        />
      </button>

      {/* CSS Grid interpolation for smooth height animation */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="flex flex-wrap gap-2 pb-4 pt-1">
            {pills.map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center rounded-full border border-gold/20 bg-gold/5 px-3 py-1.5 text-xs font-medium text-foreground/80"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WhatYouGetSection() {
  const { t } = useApp();

  const categories: ServiceCategory[] = [
    {
      title: t("wyg.res.title"),
      items: [
        {
          heading: t("wyg.res.h1"),
          pills: ["Appraisal & Valuation", "Capital Growth & ROI Forecast", "Exit Strategy"],
        },
        {
          heading: t("wyg.res.h2"),
          pills: ["Highest & Best Use (HBU) Analysis", "Market Data & Trends", "Location Analysis"],
        },
        {
          heading: t("wyg.res.h3"),
          pills: ["Ownership & Due Diligence", "Land Zoning & Tax Matrix", "Risk Analysis"],
        },
      ],
    },
    {
      title: t("wyg.leg.title"),
      items: [
        {
          heading: t("wyg.leg.h1"),
          pills: ["Building Permits (PBG, SLF)", "Zoning & Site Inspection", "Ownership & Tax Verification"],
        },
        {
          heading: t("wyg.leg.h2"),
          pills: ["Freehold & Leasehold Agreements", "Sale & Purchase Agreement (SPA)", "Contractor & Management Agreements"],
        },
        {
          heading: t("wyg.leg.h3"),
          pills: ["PT PMA & Visa Services", "Airbnb & Hospitality Licenses", "Contractor & Broker Licenses"],
        },
      ],
    },
    {
      title: t("wyg.buy.title"),
      items: [
        {
          heading: t("wyg.buy.h1"),
          pills: ["Signing Assistance (On-Site / Remote)", "Land Title Transfer", "Transaction Coordination & Representation"],
        },
        {
          heading: t("wyg.buy.h2"),
          pills: ["Nominee Arrangement for Freehold Ownership", "Legal Structuring & Agreement Setup", "Ownership Protection & Compliance"],
        },
        {
          heading: t("wyg.buy.h3"),
          pills: ["Ownership Documentation", "Transaction Follow-Up", "Assistance with Any Issues after Purchase"],
        },
      ],
    },
  ];

  const columnIcons: React.ElementType[][] = [
    [Search, TrendingUp, ShieldCheck],
    [FileCheck, ScrollText, Stamp],
    [Gavel, UserCheck, HeadphonesIcon],
  ];

  return (
    <section id="what-you-get" className="py-20 bg-background">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-14">
          <p className="text-gradient-gold text-sm font-semibold tracking-[0.15em] uppercase mb-3">
            {t("wyg.tagline")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            {t("wyg.title")}
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {categories.map((cat, ci) => (
            <div key={ci} className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-bold text-foreground mb-4 pb-3 border-b border-gold/30">
                {cat.title}
              </h3>
              <div>
                {cat.items.map((item, ii) => (
                  <AccordionItem
                    key={ii}
                    heading={item.heading}
                    pills={item.pills}
                    Icon={columnIcons[ci][ii]}
                  />
                ))}
              </div>
              <a
                href="#consult"
                className="mt-4 inline-flex items-center justify-center w-full rounded-md bg-gold/10 border border-gold/20 px-4 py-2.5 text-xs font-semibold text-gold transition-colors hover:bg-gold hover:text-foreground"
              >
                {t("wyg.contact")}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
