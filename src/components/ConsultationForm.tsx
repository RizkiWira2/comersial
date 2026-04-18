import { motion } from "framer-motion";
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

    // Save to database
    await supabase.from("consultations").insert({
      objective,
      property_type: propertyType,
      preferred_location: location,
      budget: form.budget,
      name: form.name,
      email: form.email,
      phone: form.phone,
    });

    // Construct WhatsApp message
    const message = `Hello, I'd like to start a 1-on-1 consultation.

*Consultation Details:*
- Name: ${form.name}
- Email: ${form.email}
- Phone: ${form.phone}
- Objective: ${objective}
- Property Type: ${propertyType}
- Location: ${location}
- Budget Range: ${form.budget}

Please contact me to discuss further.`;

    const waUrl = `https://wa.me/6285362254459?text=${encodeURIComponent(message)}`;
    
    // Open WA in a new tab
    window.open(waUrl, "_blank");

    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="consult" className="py-24 bg-foreground overflow-hidden">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[2.5rem] bg-background p-16 shadow-2xl"
          >
            <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-4xl text-gold">✓</span>
            </div>
            <h2 className="text-3xl font-black text-foreground mb-4">{t("form.success.h")}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("form.success.p")}
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="consult" className="py-24 bg-foreground overflow-hidden">
      <div className="mx-auto max-w-2xl px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">{t("form.tagline")}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-background">{t("form.title")}</h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-[2.5rem] bg-background p-8 sm:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl -mr-16 -mt-16" />
          
          <div className="flex gap-1.5 mb-10 relative z-10">
            {[...steps, null].map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= step ? "bg-gold" : "bg-muted"}`}
              />
            ))}
          </div>

          {!isLast && currentStep ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-xl font-black text-foreground mb-6">{currentStep.q}</h3>
              <div className="space-y-2.5 mb-8 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {currentStep.options.map((o: any) => (
                  <button
                    key={o.EN}
                    onClick={() => select(currentStep.field, o.EN)}
                    className={`w-full text-left rounded-2xl border-2 px-6 py-4 text-sm transition-all active:scale-[0.99] ${
                      form[currentStep.field as keyof typeof form] === o.EN
                        ? "border-gold bg-gold/5 font-bold text-foreground"
                        : "border-transparent bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    }`}
                  >
                    {o[language]}
                  </button>
                ))}
                {currentStep.otherField && (
                  <div>
                    <button
                      onClick={() => select(currentStep.field, "__other__")}
                      className={`w-full text-left rounded-2xl border-2 px-6 py-4 text-sm transition-all active:scale-[0.99] ${
                        form[currentStep.field as keyof typeof form] === "__other__"
                          ? "border-gold bg-gold/5 font-bold text-foreground"
                          : "border-transparent bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
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
                        className="mt-3 w-full rounded-2xl border-2 border-border bg-background px-6 py-4 text-sm text-foreground outline-none focus:border-gold transition-colors"
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center mt-10">
                <button
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                  className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                >
                  ← {t("form.back")}
                </button>
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!form[currentStep.field as keyof typeof form]}
                  className="rounded-full bg-foreground px-10 py-4 text-xs font-black uppercase tracking-widest text-background transition-all hover:bg-gold hover:text-foreground active:scale-95 disabled:opacity-30 shadow-xl shadow-foreground/10"
                >
                  {t("form.next")} →
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-xl font-black text-foreground mb-6">{t("form.details")}</h3>
              <div className="space-y-4">
                <div className="group">
                  <input
                    type="text"
                    placeholder={t("form.name")}
                    value={form.name}
                    onChange={(e) => select("name", e.target.value)}
                    className="w-full rounded-2xl border-2 border-muted/50 bg-muted/20 px-6 py-4 text-sm text-foreground outline-none focus:border-gold focus:bg-background transition-all"
                  />
                </div>
                <div className="group">
                  <input
                    type="email"
                    placeholder={t("form.email")}
                    value={form.email}
                    onChange={(e) => select("email", e.target.value)}
                    className="w-full rounded-2xl border-2 border-muted/50 bg-muted/20 px-6 py-4 text-sm text-foreground outline-none focus:border-gold focus:bg-background transition-all"
                  />
                </div>
                <div className="group">
                  <input
                    type="tel"
                    placeholder={t("form.phone")}
                    value={form.phone}
                    onChange={(e) => select("phone", e.target.value)}
                    className="w-full rounded-2xl border-2 border-muted/50 bg-muted/20 px-6 py-4 text-sm text-foreground outline-none focus:border-gold focus:bg-background transition-all"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mt-10">
                <button
                  onClick={() => setStep(step - 1)}
                  className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← {t("form.back")}
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!form.name || !form.email || !form.phone || submitting}
                  className="rounded-full bg-gold px-12 py-4 text-xs font-black uppercase tracking-widest text-foreground transition-all hover:bg-gold-dark hover:scale-105 active:scale-95 disabled:opacity-30 shadow-2xl shadow-gold/20"
                >
                  {submitting ? t("form.submitting") : "Start Consultation"}
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
