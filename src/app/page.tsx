"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Award,
  Users,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BookOpen,
  Atom,
  FlaskRound,
  HeartPulse,
  Sigma,
  Star,
  Clock,
  Video,
  FileCheck,
  MessageSquare,
  HelpCircle
} from "lucide-react";
import { bookDemo } from "@/lib/bookingClient";
import useAuth from "@/hooks/useAuth";

function CustomSubjectAvatar({ type }: { type: string }) {
  if (type === "founder-bio") {
    return (
      <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-rose-500/10 via-purple-500/15 to-indigo-500/10 border-2 border-purple-200 flex items-center justify-center p-3 shadow-inner group-hover:scale-105 transition-transform">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="44" stroke="#ec4899" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
          <path d="M34 26 C46 38, 54 38, 66 26 M34 74 C46 62, 54 62, 66 74" stroke="#9333ea" strokeWidth="3" strokeLinecap="round" />
          <path d="M32 38 C44 50, 56 50, 68 38 M32 62 C44 50, 56 50, 68 62" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />
          <line x1="42" y1="33" x2="58" y2="33" stroke="#9333ea" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="42" y1="67" x2="58" y2="67" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="50" cy="50" r="7" fill="#ec4899" />
          <circle cx="50" cy="50" r="3" fill="white" />
        </svg>
      </div>
    );
  }
  if (type === "maths-english") {
    return (
      <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-indigo-500/10 via-purple-500/15 to-blue-500/10 border-2 border-indigo-200 flex items-center justify-center p-3 shadow-inner group-hover:scale-105 transition-transform">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="44" stroke="#6366f1" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
          <path d="M34 30 H66 L48 50 L66 70 H34" stroke="#6366f1" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M68 28 L72 32 M68 72 L72 68" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
          <circle cx="48" cy="50" r="3" fill="#8b5cf6" />
        </svg>
      </div>
    );
  }
  if (type === "physics") {
    return (
      <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-cyan-500/10 via-blue-500/15 to-indigo-500/10 border-2 border-cyan-200 flex items-center justify-center p-3 shadow-inner group-hover:scale-105 transition-transform">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="44" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
          <ellipse cx="50" cy="50" rx="32" ry="13" stroke="#2563eb" strokeWidth="2.5" transform="rotate(35 50 50)" />
          <ellipse cx="50" cy="50" rx="32" ry="13" stroke="#06b6d4" strokeWidth="2.5" transform="rotate(-35 50 50)" />
          <circle cx="50" cy="50" r="7" fill="#2563eb" />
          <circle cx="50" cy="50" r="3" fill="#67e8f9" />
          <circle cx="74" cy="40" r="3.5" fill="#06b6d4" />
          <circle cx="26" cy="60" r="3.5" fill="#2563eb" />
        </svg>
      </div>
    );
  }
  if (type === "chemistry") {
    return (
      <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-amber-500/10 via-emerald-500/15 to-teal-500/10 border-2 border-emerald-200 flex items-center justify-center p-3 shadow-inner group-hover:scale-105 transition-transform">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="44" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
          <path d="M43 28 H57 V40 L70 65 C72 69, 69 73, 64 73 H36 C31 73, 28 69, 30 65 L43 40 Z" stroke="#10b981" strokeWidth="3" strokeLinejoin="round" />
          <path d="M36 60 H64" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 2" />
          <circle cx="45" cy="54" r="3" fill="#f59e0b" />
          <circle cx="55" cy="62" r="3.5" fill="#f59e0b" />
          <circle cx="48" cy="66" r="2.5" fill="#10b981" />
        </svg>
      </div>
    );
  }
  // adv-maths
  return (
    <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-fuchsia-500/10 via-purple-500/15 to-violet-500/10 border-2 border-fuchsia-200 flex items-center justify-center p-3 shadow-inner group-hover:scale-105 transition-transform">
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="44" stroke="#c026d3" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
        <path d="M40 32 C40 26, 46 26, 49 30 L45 68 C43 74, 49 76, 52 71" stroke="#9333ea" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M56 46 Q 64 38 71 46 Q 78 54 71 60 Q 64 54 56 46" stroke="#c026d3" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="71" cy="46" r="3" fill="#c026d3" />
      </svg>
    </div>
  );
}

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [demoSuccess, setDemoSuccess] = useState(false);

  async function handleDemoSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (!user) {
      alert("Please login or create an account to book your free demo!");
      router.push("/login");
      return;
    }

    setSubmitting(true);
    try {
      await bookDemo(
        user.uid,
        formData.get("name") as string,
        formData.get("email") as string,
        formData.get("course") as string
      );
      setDemoSuccess(true);
      form.reset();
    } catch {
      alert("Failed to book demo. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#faf9ff] overflow-hidden">

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-12 pb-24 md:py-24 bg-gradient-to-b from-white via-purple-50/40 to-[#faf9ff]">
        {/* Ambient background blur blobs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-purple-400/20 via-indigo-300/20 to-amber-300/15 blur-3xl rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* LEFT: VALUE PROPOSITION (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase px-4 py-2 rounded-full mb-6 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-900 border border-purple-200/80 shadow-xs">
              <GraduationCap size={16} className="text-purple-700" />
              <span>India&apos;s Trusted Virtual Academy</span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-slate-900 tracking-tight leading-[1.08] mb-6 font-serif">
              Learn Smarter, <br />
              <span className="bg-gradient-to-r from-purple-700 via-indigo-600 to-amber-500 bg-clip-text text-transparent">
                Excel Confidently
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-xl leading-relaxed mb-8">
              Live, interactive classes for <strong>CBSE, ICSE, Matric, JEE &amp; NEET</strong>. Master foundational concepts with award-winning educators who personally care.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                href="/courses"
                className="px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 hover:from-purple-800 hover:to-indigo-800 shadow-xl shadow-purple-600/30 hover:scale-[1.02] transition-all text-base flex items-center gap-2 group"
              >
                <span>Explore All Courses</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="px-7 py-4 rounded-2xl font-bold text-slate-700 hover:text-purple-700 bg-white hover:bg-purple-50 border border-slate-200 transition-all text-base shadow-xs"
              >
                About Our Founder
              </Link>
            </div>

            {/* TRUST BADGES ROW */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-purple-100/80 max-w-lg">
              <div>
                <p className="text-2xl font-black text-purple-900">10,000+</p>
                <p className="text-xs font-semibold text-slate-500">Mentored Students</p>
              </div>
              <div>
                <p className="text-2xl font-black text-purple-900">95%</p>
                <p className="text-xs font-semibold text-slate-500">Board Distinctions</p>
              </div>
              <div>
                <p className="text-2xl font-black text-amber-600 flex items-center gap-1">
                  4.9 <Star size={18} fill="#f59e0b" className="text-amber-500 inline" />
                </p>
                <p className="text-xs font-semibold text-slate-500">Parent Rating</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: LIVE DEMO BOOKING CARD (5 cols) */}
          <motion.div
            id="demo"
            initial={{ opacity: 0, scale: 0.95, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl p-8 sm:p-9 bg-white shadow-2xl shadow-purple-950/10 border border-purple-100">
              {/* Highlight ribbon */}
              <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 font-black text-xs uppercase tracking-wider shadow-sm">
                100% Free
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-black text-slate-900 font-serif">
                  Book a Free Live Demo
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Experience a live interactive session with top subject experts.
                </p>
              </div>

              {demoSuccess ? (
                <div className="py-8 text-center bg-purple-50 rounded-2xl border border-purple-100">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 size={32} className="text-emerald-600" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-lg">Demo Class Booked!</h4>
                  <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
                    Our academic counselor will contact you shortly with the demo meeting link.
                  </p>
                  <button
                    onClick={() => setDemoSuccess(false)}
                    className="mt-4 px-4 py-2 text-xs font-bold text-purple-700 bg-white rounded-xl border border-purple-200"
                  >
                    Book Another Slot
                  </button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleDemoSubmit}>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-purple-800 mb-1.5">
                      Student Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      placeholder="e.g. Ananya Sharma"
                      required
                      className="w-full rounded-2xl px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-purple-600 focus:ring-4 focus:ring-purple-500/10 transition-all text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-purple-800 mb-1.5">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="parent@example.com"
                      required
                      className="w-full rounded-2xl px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-purple-600 focus:ring-4 focus:ring-purple-500/10 transition-all text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-purple-800 mb-1.5">
                      Grade / Course
                    </label>
                    <select
                      name="course"
                      required
                      defaultValue=""
                      className="w-full rounded-2xl px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-purple-600 focus:ring-4 focus:ring-purple-500/10 transition-all text-sm outline-none"
                    >
                      <option value="" disabled>Select Target Course</option>
                      <option value="class-9">Class 9 (CBSE / ICSE / Matric)</option>
                      <option value="class-10">Class 10 (Board Exam Batch)</option>
                      <option value="class-11">Class 11 (PCMB / Commerce)</option>
                      <option value="class-12">Class 12 (Board Exam Batch)</option>
                      <option value="jee">JEE Main &amp; Advanced</option>
                      <option value="neet">NEET Medical Foundation</option>
                      <option value="1-on-1">Personal 1-on-1 Mentorship</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full font-bold py-4 rounded-2xl text-amber-950 bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 shadow-lg shadow-amber-400/25 transition-all hover:scale-[1.01] text-sm disabled:opacity-50"
                  >
                    {submitting ? "Booking Your Slot..." : "Reserve Free Demo Class →"}
                  </button>
                </form>
              )}

              <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-slate-400">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>Zero obligation · No credit card required</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ================= STATS TICKER STRIP ================= */}
      <section className="bg-gradient-to-r from-[#17082e] via-[#240b49] to-[#17082e] py-10 text-white relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { num: "10,000+", label: "Successful Students", sub: "Across India & Abroad" },
            { num: "95%+", label: "Average Board Score", sub: "CBSE, ICSE & Matric" },
            { num: "15+", label: "Master Educators", sub: "M.Sc., Ph.D. Faculty" },
            { num: "1-on-1", label: "Personalized Focus", sub: "Doubt Solving Daily" },
          ].map((stat, i) => (
            <div key={i} className="p-2">
              <p className="text-3xl sm:text-4xl font-black text-amber-400 font-mono tracking-tight">{stat.num}</p>
              <p className="text-sm font-bold text-white mt-1">{stat.label}</p>
              <p className="text-xs text-purple-200/70">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHY CHOOSE E-KALAVYA ================= */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100 mb-3 inline-block">
              The E-Kalavya Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-serif">
              Why Parents &amp; Students Choose Us
            </h2>
            <p className="text-base text-slate-600 mt-3">
              We combine elite pedagogical rigor with personalized warmth so every child thrives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Video className="text-purple-600" size={28} />,
                title: "Live Interactive Classes",
                desc: "Real-time two-way audio & video sessions. Never prerecorded dull videos — students ask questions instantly.",
              },
              {
                icon: <Users className="text-indigo-600" size={28} />,
                title: "Small Batch Sizes (Max 15)",
                desc: "No crowded lecture halls. Every child receives focused attention and proactive doubt clearing.",
              },
              {
                icon: <Award className="text-amber-500" size={28} />,
                title: "Vetted Faculty & Mentors",
                desc: "Led by Founder Banupriya Sathishkumar (M.Sc., B.Ed., CMT) and seasoned M.Sc./Ph.D. subject experts.",
              },
              {
                icon: <FileCheck className="text-emerald-600" size={28} />,
                title: "Structured Tests & Analysis",
                desc: "Weekly chapter tests, board simulation papers, and in-depth performance analytics shared with parents.",
              },
              {
                icon: <BookOpen className="text-rose-500" size={28} />,
                title: "Comprehensive Study Notes",
                desc: "Downloadable PDF summaries, formula revision sheets, and solved question banks aligned to latest patterns.",
              },
              {
                icon: <MessageSquare className="text-purple-600" size={28} />,
                title: "24/7 WhatsApp Doubt Support",
                desc: "Homework query or tricky formula? Send questions anytime for fast, detailed explanations.",
              },
            ].map((f, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-slate-50/70 hover:bg-white border border-slate-100 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-900/5 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 group-hover:scale-110 shadow-sm flex items-center justify-center mb-6 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HELP BANNER WITH FOUNDER ================= */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-[#1e0a3c] via-[#3b1a7a] to-[#240b49]"
        >
          <div className="grid md:grid-cols-12 gap-8 items-center">

            {/* LEFT TEXT (7 cols) */}
            <div className="p-8 sm:p-12 md:p-16 md:col-span-7">
              <span className="inline-block text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full mb-6 bg-amber-400/20 text-amber-300 border border-amber-400/30">
                Personal Guidance &amp; Mentorship
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight font-serif">
                Direct Guidance from <br />Our Founder
              </h2>
              <p className="text-base sm:text-lg mb-8 leading-relaxed text-purple-200 max-w-lg">
                Need tailored academic advice for your child? Schedule a personalized session with Founder <strong>Banupriya Sathishkumar</strong> to plan the ideal learning roadmap.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/expert-appointment"
                  className="font-bold px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950 shadow-lg shadow-amber-400/20 transition-all hover:scale-[1.02] text-sm"
                >
                  Speak to Founder →
                </Link>
                <Link
                  href="/about"
                  className="font-bold px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all text-sm"
                >
                  Read Founder&apos;s Profile
                </Link>
              </div>
            </div>

            {/* RIGHT IMAGE (5 cols) */}
            <div className="md:col-span-5 flex justify-center items-center p-6 md:p-8">
              <div className="relative w-72 sm:w-80 h-80 sm:h-96 rounded-3xl overflow-hidden border-2 border-purple-400/30 shadow-2xl bg-purple-900/40">
                <Image
                  src="/new-founder.jpeg"
                  alt="Banupriya Sathishkumar - Founder of E-Kalavya"
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, 320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 inset-x-4 p-3 rounded-xl bg-white/90 backdrop-blur-md text-slate-900 text-center">
                  <p className="font-bold text-xs">Banupriya Sathishkumar</p>
                  <p className="text-[10px] text-purple-700 font-semibold">Founder &amp; Chief Mentor</p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* ================= EXPERT TEACHERS SECTION ================= */}
      <section className="py-20 sm:py-24 bg-[#f6f4fe]">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full bg-purple-100 text-purple-800 mb-3">
              Elite Academic Faculty
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-serif">
              Our Expert Teachers
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Passionate educators committed to student clarity, patience, and top performance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Ms. Banupriya Sathishkumar",
                degree: "M.Sc., B.Ed., CMT, CFD",
                role: "Founder & Biology Expert",
                type: "founder-bio",
                icon: <HeartPulse size={18} className="text-rose-500" />,
                exp: "12+ Years",
              },
              {
                name: "Ms. Kanimozhi",
                degree: "M.Sc., Mathematics",
                role: "Mathematics & English Expert",
                type: "maths-english",
                icon: <Sigma size={18} className="text-purple-600" />,
                exp: "8+ Years",
              },
              {
                name: "Ms. Dharshini",
                degree: "M.Sc., Ph.D – Physics",
                role: "Physics Specialist",
                type: "physics",
                icon: <Atom size={18} className="text-indigo-600" />,
                exp: "9+ Years",
              },
              {
                name: "Ms. Ilakiya",
                degree: "M.Sc., Biochemistry",
                role: "Chemistry Specialist",
                type: "chemistry",
                icon: <FlaskRound size={18} className="text-amber-500" />,
                exp: "7+ Years",
              },
              {
                name: "Ms. Subasree",
                degree: "M.Sc., Mathematics",
                role: "Mathematics Specialist",
                type: "adv-maths",
                icon: <Sigma size={18} className="text-purple-600" />,
                exp: "6+ Years",
              },
            ].map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-7 shadow-lg shadow-purple-900/5 hover:shadow-2xl border border-purple-100 flex flex-col items-center text-center transition-all duration-300 group"
              >
                <div className="relative mb-5">
                  <CustomSubjectAvatar type={t.type} />
                  <span className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl flex items-center justify-center bg-white shadow-md border border-purple-100">
                    {t.icon}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 leading-snug">
                  {t.name}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-1 mb-3">
                  {t.degree}
                </p>

                <div className="mt-auto flex items-center gap-2">
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                    {t.role}
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-1 rounded-md bg-amber-50 text-amber-700">
                    {t.exp}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION ================= */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 mb-3 inline-block">
              Real Transformations
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-serif">
              Loved by Students &amp; Parents
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Hear from our learners who elevated their confidence and marks with E-Kalavya.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Banupriya ma'am made Biology feel effortless! Her structured diagrams and doubt-clearing sessions helped me secure 98% in my 12th board exams.",
                name: "Kavya R.",
                role: "Class 12 Matric Student",
                score: "98% in Biology",
              },
              {
                quote: "My son used to dread Physics and Maths formulas. Within 3 months at E-Kalavya, his fear disappeared. The small batch attention makes all the difference.",
                name: "S. Murugan",
                role: "Parent of Class 10 CBSE Student",
                score: "Top of Class",
              },
              {
                quote: "The NEET Foundation sessions are brilliant. Complex organic chemistry concepts and physics numericals are broken down into easy step-by-step logic.",
                name: "Arjun Vignesh",
                role: "Class 11 NEET Aspirant",
                score: "NEET Foundation",
              },
            ].map((test, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-purple-50/50 border border-purple-100/90 flex flex-col justify-between hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <div className="flex gap-1 text-amber-400 mb-4">
                    {[...Array(5)].map((_, starIndex) => (
                      <Star key={starIndex} size={16} fill="#f59e0b" className="text-amber-500" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                    &ldquo;{test.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-purple-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">{test.name}</h4>
                    <p className="text-xs text-slate-500">{test.role}</p>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-800">
                    {test.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA SECTION ================= */}
      <section className="py-20 bg-gradient-to-br from-[#120524] via-[#240b49] to-[#120524] text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-purple-600/15 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-white/10 text-amber-300 border border-white/15 mb-6 inline-block">
            Start Your Journey Today
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 font-serif tracking-tight leading-tight">
            Unlock Your Academic Excellence with E-Kalavya
          </h2>
          <p className="text-base sm:text-lg text-purple-200 max-w-xl mx-auto mb-10 leading-relaxed">
            Join thousands of students who learn with clarity and confidence. Secure your seat today with seamless zero-fee UPI enrollment.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/courses"
              className="px-8 py-4 rounded-2xl font-bold text-amber-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 shadow-xl shadow-amber-400/20 text-sm transition-all hover:scale-105"
            >
              Browse All Courses →
            </Link>
            <Link
              href="/book-demo"
              className="px-8 py-4 rounded-2xl font-bold text-white bg-white/10 hover:bg-white/15 border border-white/20 text-sm transition-all"
            >
              Book a Free Demo Class
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}