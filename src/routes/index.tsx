import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import WhatYouGetSection from "@/components/WhatYouGetSection";
import WhyUsSection from "@/components/WhyUsSection";
import ValuesSection from "@/components/ValuesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ServicesSection from "@/components/ServicesSection";
import ConsultationForm from "@/components/ConsultationForm";
import ResearchSection from "@/components/ResearchSection";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Comersial — Premium Property Investment" },
      {
        name: "description",
        content:
          "1-on-1 commercial property investment services with 100%+ profit potential. Data-driven research for secure and profitable investments in Bali and Indonesia.",
      },
      { property: "og:title", content: "Comersial — Premium Property Investment" },
      {
        property: "og:description",
        content:
          "Invest with confidence through data-driven research. Curated commercial properties with 100%+ profit potential.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <WhatYouGetSection />
      <WhyUsSection />
      <ValuesSection />
      <ProjectsSection />
      <ServicesSection />
      <ConsultationForm />
      <ResearchSection />
      <Footer />
    </>
  );
}
