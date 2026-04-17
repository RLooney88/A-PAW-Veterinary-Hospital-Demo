import React from "react";
import DynamicHero from "../components/DynamicHero";
import IntentSelector from "../components/IntentSelector";
import SubIntentPrompt from "../components/SubIntentPrompt";
import FeaturedCare from "../components/FeaturedCare";
import Testimonials from "../components/Testimonials";
import TeamSection from "../components/TeamSection";
import FAQSection from "../components/FAQSection";
import ContactSection from "../components/ContactSection";
import { Link } from "react-router-dom";
import { useSmartSite } from "../context/SmartSiteContext";

const CLINIC_IMG = "https://cdcssl.ibsrv.net/ibimg/smb/1152x1152_80/webmgr/02/s/r/13116461_1728398937399995_1801395013260039740_o.jpg.webp";
const EXAM_IMG = "https://cdcssl.ibsrv.net/ibimg/smb/1761x1293_80/webmgr/02/s/r/screen-shot-2019-06-21-at-91523-pm.png.webp";

export default function Home() {
  const { track } = useSmartSite();
  return (
    <div data-testid="home-page">
      {/* Full-bleed dynamic hero */}
      <DynamicHero />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <IntentSelector />
        <SubIntentPrompt />
        <FeaturedCare />

        {/* Editorial split */}
        <section className="mt-24 grid gap-8 lg:grid-cols-12 items-stretch" data-testid="home-story">
          <div className="lg:col-span-7 bg-clinic-red text-sand-50 rounded-[2rem] p-10 lg:p-14 relative overflow-hidden grain">
            <div className="text-xs uppercase tracking-[0.22em] font-semibold text-clinic-amber">
              Trusted Care · Annapolis, MD
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3 leading-[1.1]">
              Family-owned, neighborhood-first, and calmly thorough.
            </h2>
            <p className="mt-5 text-sand-50/90 leading-relaxed max-w-xl">
              For many people, pets are part of the family. You want to be able to trust a veterinarian the
              same way you trust your doctor. Dr. Karen Hamilton and the Annapolis Vet team have been caring
              for local pets for years &mdash; wellness, surgery, dental, laser therapy, regenerative medicine,
              and the occasional hospital kitty cameo from Titus.
            </p>
            <Link
              to="/about"
              onClick={() => track({ signalType: "cta_click", label: "story:learn-more" })}
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-clinic-amber hover:text-white underline underline-offset-4 decoration-2"
              data-testid="home-story-cta"
            >
              More about our clinic
            </Link>
            <div className="absolute -right-20 -bottom-16 h-72 w-72 rounded-full bg-clinic-amber/25 blur-3xl" />
            <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="rounded-[1.5rem] overflow-hidden bg-sand-200 col-span-2">
              <img src={EXAM_IMG} alt="Dr. Hamilton during an exam" className="h-64 w-full object-cover" />
            </div>
            <div className="rounded-[1.5rem] overflow-hidden bg-sand-200 col-span-2">
              <img src={CLINIC_IMG} alt="Annapolis Vet clinic" className="h-40 w-full object-cover" />
            </div>
          </div>
        </section>

        <Testimonials />
        <TeamSection />
        <FAQSection />
        <ContactSection />
      </div>
    </div>
  );
}
