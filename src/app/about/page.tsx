"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, BookOpen, GraduationCap, Heart, Sparkles, CheckCircle2, ArrowRight, Star } from "lucide-react";

export default function AboutFounder() {
  const credentials = [
    { title: "M.Sc.", desc: "Master of Science in Zoology/Biology" },
    { title: "B.Ed.", desc: "Bachelor of Education (Certified Pedagogy)" },
    { title: "CMT", desc: "Certified Master Trainer" },
    { title: "CFD", desc: "Certified Faculty Developer" },
  ];

  const highlights = [
    "Over 12+ years of teaching excellence across CBSE, ICSE, and State Matriculation boards.",
    "Mentored 10,000+ students towards top scores in Board Exams, NEET & Foundation tests.",
    "Pioneered customized 1-on-1 pedagogical approaches designed for every child's learning speed.",
    "Driven by the legacy of an illustrious educator family dedicated to transformative learning.",
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50/60 via-white to-purple-50/40 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* HERO SECTION */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">

          {/* LEFT CONTENT (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider mb-6">
              <GraduationCap size={16} /> Founder &amp; Chief Academic Mentor
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6 font-serif">
              Meet <span className="bg-gradient-to-r from-purple-700 via-indigo-700 to-violet-800 bg-clip-text text-transparent">Banupriya Sathishkumar</span>
            </h1>

            <p className="text-xl font-medium text-purple-900/80 mb-6 leading-relaxed">
              &ldquo;Education isn’t about merely completing a syllabus. It is about unlocking curiosity, building unshakeable confidence, and shaping character.&rdquo;
            </p>

            <div className="space-y-4 text-slate-600 text-base leading-relaxed mb-8">
              <p>
                My journey began not in a corporate boardroom, but in a vibrant classroom filled with curious minds and heartfelt questions. Over the past decade, I realized that true education thrives when students are listened to, understood, and encouraged to embrace mistakes as the stepping stones to mastery.
              </p>
              <p>
                At <strong>E-Kalavya</strong>, we have cultivated an empowering virtual learning sanctuary. Our mission is to bridge the gap between rote memorization and deep conceptual clarity — ensuring that every student across CBSE, ICSE, Matric, JEE, and NEET receives elite academic mentorship from their very own home.
              </p>
            </div>

            {/* CREDENTIAL BADGES */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {credentials.map((c) => (
                <div key={c.title} className="p-3.5 rounded-2xl bg-white border border-purple-100 shadow-sm text-center">
                  <span className="block text-lg font-black text-purple-700 font-mono">{c.title}</span>
                  <span className="text-[11px] font-medium text-slate-500 leading-tight block mt-0.5">{c.desc}</span>
                </div>
              ))}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/inspiration"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-bold text-sm shadow-lg shadow-purple-600/25 transition-all hover:scale-[1.02]"
              >
                Read Founder&apos;s Inspiration <ArrowRight size={16} />
              </Link>
              <Link
                href="/expert-appointment"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-sm shadow-md shadow-amber-400/20 transition-all hover:scale-[1.02]"
              >
                Book 1-on-1 Guidance
              </Link>
            </div>
          </motion.div>

          {/* RIGHT IMAGE (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Decorative back layers */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-purple-600 via-amber-400 to-violet-600 rounded-3xl opacity-20 blur-xl animate-pulse" />
              
              <div className="relative rounded-3xl overflow-hidden bg-white p-3 shadow-2xl border border-purple-100">
                <div className="relative h-[480px] sm:h-[540px] w-full rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src="/new-founder.jpeg"
                    alt="Banupriya Sathishkumar - Founder of E-Kalavya"
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-700"
                    priority
                    sizes="(max-width: 768px) 100vw, 420px"
                  />
                  
                  {/* Subtle bottom gradient overlay for readability of badge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* Caption badge */}
                  <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/80 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base">
                          Banupriya Sathishkumar
                        </h3>
                        <p className="text-xs font-semibold text-purple-700">
                          Founder &amp; Chief Academic Mentor
                        </p>
                      </div>
                      <span className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center">
                        <Star size={16} fill="#f59e0b" className="text-amber-500" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating experience pill */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-purple-100 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-sm">
                  12+
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-900">Years of</p>
                  <p className="text-[11px] text-purple-700 font-bold">Academic Mastery</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* HIGHLIGHTS & VISION */}
        <div className="grid md:grid-cols-2 gap-8 pt-10 border-t border-purple-100">
          
          {/* Mission Card */}
          <div className="p-8 rounded-3xl bg-white border border-purple-100 shadow-xl shadow-purple-900/5">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-6">
              <BookOpen size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 font-serif">
              Our Educational Philosophy
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              Every child has a unique rhythm of learning. We reject one-size-fits-all factory schooling in favor of interactive, compassionate, and question-driven sessions where real understanding replaces stressful cramming.
            </p>
            <div className="space-y-3">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inspiration preview */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#1e0a3c] to-[#3b1a7a] text-white shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-amber-400 flex items-center justify-center mb-6">
                <Heart size={24} />
              </div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 mb-2 block">
                Heritage &amp; Lineage
              </span>
              <h3 className="text-2xl font-bold text-white mb-4 font-serif">
                Carrying Forward a Sacred Legacy
              </h3>
              <p className="text-purple-200 text-sm leading-relaxed mb-6">
                Inspired by my late grandfather — an esteemed Tamil Pandit and Government School Teacher who lived by discipline, humility, and unwavering ethics. At E-Kalavya, we instill those timeless values alongside modern academic prowess.
              </p>
            </div>

            <Link
              href="/inspiration"
              className="inline-flex items-center justify-between p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all text-sm font-bold text-white group"
            >
              <span>Explore The Grandfather&apos;s Inspiration</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-amber-400" />
            </Link>
          </div>

        </div>

      </div>
    </main>
  );
}
