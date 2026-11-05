"use client";

import React from "react";
import { useModals } from "@/components/ModalContext";
import { HomepageHero } from "@/components/home/journey/HomepageHero";
import { ProgramJourney } from "@/components/home/programs/ProgramJourney";
import { MentorStorySection } from "@/components/home/mentor/MentorStorySection";
import { CoreBeliefSection } from "@/components/home/belief/CoreBeliefSection";
import { FaqSection } from "@/components/home/faq/FaqSection";
import { ClosingCtaSection } from "@/components/home/cta/ClosingCtaSection";

export default function HomeClient() {
  const { openOrientation } = useModals();

  return (
    <div className="os-theme bg-[#FAF7F2] text-[#211C1D] overflow-x-clip">
      {/* ========================================================================= */}
      {/* 1. CINEMATIC HERO & FIRST SCROLL SEQUENCE (Near Black & Burgundy)        */}
      {/* ========================================================================= */}
      <HomepageHero onBookCall={() => openOrientation("general")} />

      {/* ========================================================================= */}
      {/* 2. THE THREE PATHS JOURNEY (ONE GUIDING THREAD BECOMES THREE PATHS)       */}
      {/* ========================================================================= */}
      <ProgramJourney />

      {/* ========================================================================= */}
      {/* 3. WHY WE NEED A MENTOR (Student + Mentor Visual Storytelling)            */}
      {/* ========================================================================= */}
      <MentorStorySection onBookCall={() => openOrientation("general")} />



      {/* ========================================================================= */}
      {/* 4. OUR CORE BELIEF & FOUNDER (Editorial Manifesto & Colophon)             */}
      {/* ========================================================================= */}
      <CoreBeliefSection />

      {/* ========================================================================= */}
      {/* 5. FREQUENTLY ASKED QUESTIONS (Warm Cream Editorial Accordion)           */}
      {/* ========================================================================= */}
      <FaqSection onBookCall={() => openOrientation("general")} />

      {/* ========================================================================= */}
      {/* 6. FINAL HIGH-IMPACT CALL TO ACTION (Near Black Grounded Anchor)          */}
      {/* ========================================================================= */}
      <ClosingCtaSection onBookCall={() => openOrientation("general")} />
    </div>
  );
}
