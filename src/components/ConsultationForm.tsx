import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useApp } from "@/contexts/AppContext";

const objectives = [
  { EN: "Undervalued property for maximum capital growth resale", ID: "Properti undervalued untuk pertumbuhan modal maksimal" },
  { EN: "Rental income with maximum ROI", ID: "Pendapatan sewa dengan ROI maksimal" },
  { EN: "Dual strategy: maximum capital growth resale & ROI", ID: "Strategi ganda: pertumbuhan modal & ROI maksimal" },
  { EN: "Business purpose in a strategic location with high market potential", ID: "Tujuan bisnis di lokasi strategis dengan potensi pasar tinggi" },
  { EN: "Off-plan investment for maximum capital growth resale & ROI", ID: "Investasi off-plan untuk pertumbuhan modal & ROI maksimal" },
  { EN: "For personal use (to live in)", ID: "Untuk penggunaan pribadi (hunian)" },
];

const propertyTypes = [
  { EN: "Villa", ID: "Villa" },
  { EN: "Premium Residential", ID: "Residensial Premium" },
  { EN: "Land", ID: "Tanah" },
  { EN: "Office", ID: "Kantor" },
  { EN: "Warehouse / Industrial", ID: "Gudang / Industri" },
  { EN: "Apartment / Multifamily", ID: "Apartemen / Multifamily" },
  { EN: "Retail / Shophouse", ID: "Ritel / Ruko" },
  { EN: "Hotel / Resort / Hospitality", ID: "Hotel / Resort / Hospitality" },
  { EN: "Restaurant", ID: "Restoran" },
  { EN: "Off-Plan", ID: "Off-Plan" },
  { EN: "Medical / Healthcare", ID: "Medis / Layanan Kesehatan" },
  { EN: "Agribusiness", ID: "Agribisnis" },
  { EN: "Shopping Centers", ID: "Pusat Perbelanjaan" },
  { EN: "Entertainment / Sports", ID: "Hiburan / Olahraga" },
  { EN: "Showroom / Large Format Retail", ID: "Showroom / Ritel Format Besar" },
];

const locations = [
  { EN: "All Areas in Bali", ID: "Seluruh Area Bali" },
  { EN: "Canggu, Pererenan, Seseh, Kedungu, Tabanan", ID: "Canggu, Pererenan, Seseh, Kedungu, Tabanan" },
  { EN: "Seminyak, Petitenget, Kerobokan", ID: "Seminyak, Petitenget, Kerobokan" },
  { EN: "Kuta, Legian", ID: "Kuta, Legian" },
  { EN: "Bukit Peninsula (Nusa Dua, Jimbaran, Uluwatu, Pecatu)", ID: "Bukit Peninsula (Nusa Dua, Jimbaran, Uluwatu, Pecatu)" },
  { EN: "Sanur, Renon, Denpasar", ID: "Sanur, Renon, Denpasar" },
  { EN: "Ubud, Tegallalang, Payangan", ID: "Ubud, Tegallalang, Payangan" },
  { EN: "North Bali (Lovina, Singaraja)", ID: "Bali Utara (Lovina, Singaraja)" },
  { EN: "East Bali (Amed, Tulamben, Candidasa)", ID: "Bali Timur (Amed, Tulamben, Candidasa)" },
  { EN: "Nusa Penida, Nusa Lembongan, Nusa Ceningan", ID: "Nusa Penida, Nusa Lembongan, Nusa Ceningan" },
  { EN: "West Bali (Medewi, Negara)", ID: "Bali Barat (Medewi, Negara)" },
  { EN: "Jakarta", ID: "Jakarta" },
  { EN: "Tangerang", ID: "Tangerang" },
  { EN: "Bogor", ID: "Bogor" },
  { EN: "Bekasi", ID: "Bekasi" },
  { EN: "Depok", ID: "Depok" },
];

const budgets = [
  { EN: "Below IDR 3 Billion", ID: "Di bawah IDR 3 Miliar" },
  { EN: "IDR 3 Billion - IDR 5 Billion", ID: "IDR 3 Miliar - IDR 5 Miliar" },
  { EN: "IDR 5 Billion – IDR 10 Billion", ID: "IDR 5 Miliar – IDR 10 Miliar" },
  { EN: "IDR 10 Billion – IDR 20 Billion", ID: "IDR 10 Miliar – IDR 20 Miliar" },
  { EN: "Above IDR 20 Billion", ID: "Di atas IDR 20 Miliar" },
];

export default function ConsultationForm() {
  const { t, language } = useApp();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    objective: "",
    objectiveOther: "",
    propertyType: "",
    propertyTypeOther: "",
    location: "",
    locationOther: "",
    budget: "",
    name: "",
    email: "",
    phone: "",
  });

  const select = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const steps = [
    {
      q: t("form.q1"),
      options: objectives,
      field: "objective",
      otherField: "objectiveOther",
    },
    {
      q: t("form.q2"),
      options: propertyTypes,
      field: "propertyType",
      otherField: "propertyTypeOther",
    },
    {
      q: t("form.q3"),
      options: locations,
      field: "location",
      otherField: "locationOther",
    },
    {
      q: t("form.q4"),
      options: budgets,
      field: "budget",
      otherField: "",
    },
  ];

  const currentStep = steps[step];
  const isLast = step === steps.length;

  const handleSubmit = async () => {
    setSubmitting(true);
    const objective = form.objective === "__other__" ? form.objectiveOther : form.objective;
    const propertyType = form.propertyType === "__other__" ? form.propertyTypeOther : form.propertyType;
    const location = form.location === "__other__" ? form.locationOther : form.location;

    await supabase.from("consultations").insert({
      objective,
      property_type: propertyType,
      preferred_location: location,
      budget: form.budget,
      name: form.name,
      email: form.email,
      phone: form.phone,
    });

    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="consult" className="py-20 bg-foreground">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <div className="rounded-xl bg-background p-10">
            <p className="text-3xl mb-3 text-gold">✓</p>
            <h2 className="text-2xl font-bold text-foreground mb-2">{t("form.success.h")}</h2>
            <p className="text-sm text-muted-foreground">
              {t("form.success.p")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="consult" className="py-20 bg-foreground">
      <div className="mx-auto max-w-2xl px-4">
        <div className="text-center mb-10">
          <p className="text-gold text-sm font-semibold tracking-[0.15em] uppercase mb-3">{t("form.tagline")}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-background">{t("form.title")}</h2>
        </div>

        <div className="rounded-xl bg-background p-6 sm:p-8">
          <div className="flex gap-1 mb-8">
            {[...steps, null].map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-gold" : "bg-muted"}`}
              />
            ))}
          </div>

          {!isLast && currentStep ? (
            <div>
              <h3 className="text-base font-bold text-foreground mb-4">{currentStep.q}</h3>
              <div className="space-y-2 mb-4 max-h-[400px] overflow-y-auto">
                {currentStep.options.map((o: any) => (
                  <button
                    key={o.EN}
                    onClick={() => select(currentStep.field, o.EN)}
                    className={`w-full text-left rounded-lg border px-4 py-3 text-sm transition ${
                      form[currentStep.field as keyof typeof form] === o.EN
                        ? "border-gold bg-gold/5 font-medium text-foreground"
                        : "border-border text-muted-foreground hover:border-gold/40"
                    }`}
                  >
                    {o[language]}
                  </button>
                ))}
                {currentStep.otherField && (
                  <div>
                    <button
                      onClick={() => select(currentStep.field, "__other__")}
                      className={`w-full text-left rounded-lg border px-4 py-3 text-sm transition ${
                        form[currentStep.field as keyof typeof form] === "__other__"
                          ? "border-gold bg-gold/5 font-medium text-foreground"
                          : "border-border text-muted-foreground hover:border-gold/40"
                      }`}
                    >
                      {t("form.other")}
                    </button>
                    {form[currentStep.field as keyof typeof form] === "__other__" && (
                      <input
                        type="text"
                        placeholder={t("form.other.p")}
                        value={form[currentStep.otherField as keyof typeof form]}
                        onChange={(e) => select(currentStep.otherField, e.target.value)}
                        className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-gold"
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                  className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-30"
                >
                  {t("form.back")}
                </button>
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!form[currentStep.field as keyof typeof form]}
                  className="rounded-md bg-foreground px-6 py-2 text-sm font-semibold text-background transition hover:bg-foreground/90 disabled:opacity-30"
                >
                  {t("form.next")}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-base font-bold text-foreground mb-4">{t("form.details")}</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder={t("form.name")}
                  value={form.name}
                  onChange={(e) => select("name", e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-gold"
                />
                <input
                  type="email"
                  placeholder={t("form.email")}
                  value={form.email}
                  onChange={(e) => select("email", e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-gold"
                />
                <input
                  type="tel"
                  placeholder={t("form.phone")}
                  value={form.phone}
                  onChange={(e) => select("phone", e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-gold"
                />
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep(step - 1)}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t("form.back")}
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!form.name || !form.email || !form.phone || submitting}
                  className="rounded-md bg-gold px-8 py-2.5 text-sm font-bold text-foreground transition hover:bg-gold-dark disabled:opacity-30"
                >
                  {submitting ? t("form.submitting") : t("form.submit")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
