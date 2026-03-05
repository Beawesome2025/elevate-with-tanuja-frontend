"use client";

import { useState, useEffect } from "react";
import { MasterclassData } from "@/lib/strapi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Calendar,
  Clock,
  Users,
  ArrowRight,
  Mic,
  Award,
  TrendingUp,
  Zap,
  Star,
  CheckCircle2,
} from "lucide-react";

// --- REUSABLE COMPONENTS ---
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="h-px w-8 bg-[#FF7F2E]" />
      <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#FF7F2E]">
        {children}
      </span>
      <div className="h-px w-8 bg-[#FF7F2E]" />
    </div>
  );
}

function CTAButton({ href, children, size = "default" }: { href: string; children: React.ReactNode; size?: "default" | "large" }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 font-bold transition-all duration-300 bg-[#FF7F2E] hover:bg-[#E66A1F] text-white rounded-none uppercase tracking-widest shadow-lg ${size === "large" ? "px-10 py-4 text-lg" : "px-8 py-4 text-sm"}`}
    >
      {children}
      <ArrowRight size={size === "large" ? 22 : 16} />
    </a>
  );
}

export default function MasterclassLandingPage({ initialData }: { initialData: MasterclassData }) {
  const data = initialData;

  return (
    <main className="min-h-screen bg-white text-[#333333] selection:bg-[#FF7F2E]/30 overflow-x-hidden font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
        h1, h2, h3, .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Hero Header - Condensed for Above-the-Fold */}
      <header className="pt-6 pb-2 text-center px-4">
        <h1 className="text-base md:text-lg font-bold uppercase tracking-[0.2em] mb-3 text-gray-800">
          Online Masterclass for Working Women Professionals
        </h1>

        <div className="inline-block bg-[#FF7F2E] px-6 py-1.5 mb-3">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-white">
            Live session : 2 hours
          </span>
        </div>

        <div className="block">
          <img src="https://pub-f375394ca02f40d18bb1daf616854eef.r2.dev/Elevate-image-hub-logo.jpeg" alt="Logo" className="h-16 mx-auto" />
        </div>
      </header>

      {/* Main Hero Content */}
      <section className="max-w-7xl mx-auto px-6 py-0 grid lg:grid-cols-2 gap-4 lg:gap-12 items-center min-h-[55vh]">
        <div className="flex flex-col justify-center py-2">
          {/* FIX: Forced single line with responsive text size */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-tight mb-4 font-serif whitespace-nowrap overflow-visible">
            {data.programName}
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-xl leading-relaxed">
            {data.tagline}
          </p>

          <div className="flex flex-wrap gap-6 mb-8 text-sm font-medium">
            <div className="flex items-center gap-3 font-semibold text-gray-700">
              <Calendar size={18} className="text-[#FF7F2E]"/> {data.date}
            </div>
            <div className="flex items-center gap-3 font-semibold text-gray-700">
              <Clock size={18} className="text-[#FF7F2E]"/> {data.time} IST
            </div>
            <div className="flex items-center gap-3 font-semibold text-gray-700">
              <Users size={18} className="text-[#FF7F2E]"/> Women Only
            </div>
          </div>

          <div className="flex">
            <CTAButton href={data.checkoutUrl} size="large">
              {data.ctaLabel} · {data.currency}{data.price}
            </CTAButton>
          </div>
        </div>

        <div className="relative flex flex-col justify-end items-center lg:items-end">
          <img
            src="https://pub-f375394ca02f40d18bb1daf616854eef.r2.dev/Hero%20Pic.avif"
            alt="Hero"
            className="w-full h-auto max-h-[50vh] lg:max-h-[52vh] object-contain object-bottom mb-2 pointer-events-none"
          />

          <div className="grid grid-cols-2 gap-3 w-full pb-4">
            {[
              { icon: <Mic size={22} />, label: "Command Every Room" },
              { icon: <TrendingUp size={22} />, label: "Accelerate Growth" },
              { icon: <Award size={22} />, label: "Build Authority" },
              { icon: <Zap size={22} />, label: "Apply Next Day" },
            ].map((item, i) => (
              <div key={i} className="bg-[#FFF5F0] p-4 border border-[#FF7F2E]/20 flex items-center gap-3">
                <div className="text-[#FF7F2E] flex-shrink-0">{item.icon}</div>
                <span className="font-sans font-bold text-[10px] uppercase tracking-wider leading-tight">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Is This For You Section */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <SectionLabel>Recognize Yourself?</SectionLabel>
          <h2 className="text-4xl font-bold font-serif mb-16">This Masterclass is for you if..</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            {data.painPoints.map((point, i) => (
              <div key={i} className="flex gap-6 p-8 bg-[#FFF5F0] border-l-4 border-[#FF7F2E] items-start">
                <div className="mt-1">
                  <Star size={24} className="text-[#FF7F2E] fill-[#FF7F2E]" />
                </div>
                <p className="text-lg font-medium leading-relaxed font-sans">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offline Seminar Glimpses */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionLabel>Our Community</SectionLabel>
            <h2 className="text-4xl font-bold font-serif">Glimpses from our Offline Seminar</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <img src="https://pub-f375394ca02f40d18bb1daf616854eef.r2.dev/Seminar-pic-1.avif" alt="Seminar 1" className="w-full h-auto shadow-lg" />
            <img src="https://pub-f375394ca02f40d18bb1daf616854eef.r2.dev/Seminar-Pic-2.avif" alt="Seminar 2" className="w-full h-auto shadow-lg" />
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section className="py-24 bg-[#FFF5F0]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionLabel>The Transformation</SectionLabel>
            <h2 className="text-4xl font-bold font-serif">By the end of this masterclass, you will learn</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-y-8 gap-x-12">
            {data.outcomes.map((outcome, i) => (
              <div key={i} className="flex gap-4 items-start">
                <CheckCircle2 size={24} className="text-[#FF7F2E] flex-shrink-0 mt-1" />
                <p className="text-lg font-semibold font-sans text-gray-800 leading-snug">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionLabel>Testimonials</SectionLabel>
            <h2 className="text-4xl font-bold font-serif">See What Other People Have To Say About Tanuja</h2>
          </div>
          <div className="grid gap-8">
            {[
              { text: "Working with Tanuja has been one of the most rewarding experiences of my professional journey. She brought warmth, clarity, and genuine care...", author: "Divya AS - Associate Director" },
              { text: "You are very organised, caring and a matured coach. You understand the depth of the problem and give the right solutions...", author: "Vrinda - Team Lead" },
              { text: "Working with her has been a game-changer for me. She’s dedicated, knowledgeable...", author: "Pragathe Murugan - Founder and CEO" }
            ].map((t, i) => (
              <div key={i} className="bg-white p-10 shadow-sm border border-gray-100 italic">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">"{t.text}"</p>
                <p className="font-bold text-[#FF7F2E] not-italic">— {t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About The Host */}
      <section className="py-24 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <img src="https://pub-f375394ca02f40d18bb1daf616854eef.r2.dev/Profile%20Pic.avif" alt="Tanuja" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500 shadow-xl" />
        <div>
          <h2 className="text-5xl font-bold mb-4 font-serif">{data.hostName}</h2>
          <div className="mb-8">
            <p className="text-xl font-bold text-[#FF7F2E] mb-1">Executive Presence Coach for Women Leaders</p>
            <p className="text-lg text-gray-500 font-sans">Helping Women Leaders build Confidence, Visibility & Career Growth</p>
          </div>
          <div className="space-y-6 text-lg leading-relaxed font-sans text-gray-700">
            <p>
              Certified Life Coach – Life By Design (Puja Puneet)<br />
              Certified Image Consultant – Image Consulting Business Institute (ICBI)<br />
              Certified in Soft Skills & Train the Trainer – Scottish Qualifications Authority (SQA) & NABET
            </p>
            <p>
              Tanuja works with women managers and aspiring leaders who are technically strong yet often overlooked in high-stakes conversations and growth opportunities. Through a structured approach focused on executive presence, leadership communication, and self-image, she enables women to command respect, articulate value, and position themselves for advancement.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 pt-10 border-t border-gray-100 mt-8">
            <div>
              <p className="text-4xl font-bold text-[#FF7F2E] mb-1">13 Years</p>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400">Corporate Experience</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#FF7F2E] mb-1">8 Years</p>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400">Coaching Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white px-6 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>FAQ</SectionLabel>
          <Accordion type="single" collapsible className="w-full">
            {data.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-[#FF7F2E]/20">
                <AccordionTrigger className="text-left font-bold text-xl py-8 font-sans hover:text-[#FF7F2E] transition-colors leading-snug">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-xl leading-relaxed pb-8 font-sans">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-[#FFF5F0] border-y border-[#FF7F2E]/10 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold font-serif mb-6">Ready to Elevate Your Executive Presence?</h2>
          <p className="text-xl text-gray-600 mb-10">Limited seats available for this exclusive live session. Secure your spot today.</p>
          <CTAButton href={data.checkoutUrl} size="large">
            Reserve My Seat Now · {data.currency}{data.price}
          </CTAButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 text-center border-t border-gray-50">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-300 mb-6">
          © 2026 {data.programName} · All Rights Reserved
        </p>
        <div className="flex justify-center gap-8 text-[10px] uppercase tracking-widest font-bold text-gray-400">
          <a href="#" className="hover:text-[#FF7F2E] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#FF7F2E] transition-colors">Terms & Conditions</a>
          <a href="#" className="hover:text-[#FF7F2E] transition-colors">Refunds and Cancellation</a>
        </div>
      </footer>
    </main>
  );
}
