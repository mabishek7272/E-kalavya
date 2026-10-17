"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  X,
  IndianRupee,
  ChevronRight,
  QrCode,
  Sparkles,
  Sigma,
  FlaskRound,
  Atom,
  HeartPulse,
  Globe,
  Scroll,
  Compass,
  Laptop,
  Languages,
  Calculator,
  Briefcase,
  Brain,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";
import UPIPaymentModal from "@/components/UPIPaymentModal";

interface BoardCourseCardProps {
  title: string;
  slug: string;
  subjects?: string[];
  price?:
    | { monthly?: number; annual?: number }
    | number;
}

export default function BoardCourseCard({
  title,
  slug,
  subjects = [],
  price,
}: BoardCourseCardProps) {
  const [modal, setModal] = useState<null | "subjects" | "enroll">(null);
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual">("monthly");
  const [showUPIModal, setShowUPIModal] = useState(false);
  const { user } = useAuth();

  const monthly =
    typeof price === "object" && price !== null
      ? price.monthly
      : typeof price === "number"
      ? price
      : undefined;
  const annual =
    typeof price === "object" && price !== null ? price.annual : undefined;

  const hasPrice = monthly !== undefined || annual !== undefined;
  const currentAmount = selectedPlan === "annual" && annual ? annual : (monthly || 0);

  function getSubjectIcon(s: string) {
    switch (s.toLowerCase()) {
      case "english":
        return <BookOpen size={15} className="text-purple-600" />;
      case "maths":
        return <Sigma size={15} className="text-indigo-600" />;
      case "science":
        return <FlaskRound size={15} className="text-emerald-600" />;
      case "physics":
        return <Atom size={15} className="text-blue-600" />;
      case "chemistry":
        return <FlaskRound size={15} className="text-amber-600" />;
      case "biology":
        return <HeartPulse size={15} className="text-rose-600" />;
      case "social":
        return <Globe size={15} className="text-teal-600" />;
      case "history":
        return <Scroll size={15} className="text-orange-600" />;
      case "geography":
        return <Compass size={15} className="text-cyan-600" />;
      case "computer":
        return <Laptop size={15} className="text-violet-600" />;
      case "tamil":
      case "hindi":
        return <Languages size={15} className="text-red-600" />;
      case "accountancy":
        return <Calculator size={15} className="text-emerald-600" />;
      case "business studies":
        return <Briefcase size={15} className="text-blue-600" />;
      case "mental ability":
        return <Brain size={15} className="text-pink-600" />;
      default:
        return <Sparkles size={15} className="text-purple-600" />;
    }
  }

  function handleStartUPI() {
    setModal(null);
    setShowUPIModal(true);
  }

  return (
    <>
      <motion.div
        whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(124,58,237,0.12)" }}
        transition={{ duration: 0.25 }}
        className="rounded-3xl flex flex-col bg-white border border-purple-100/90 shadow-md shadow-purple-900/5 hover:border-purple-300 transition-all overflow-hidden"
      >
        {/* Top vibrant gradient strip */}
        <div className="h-2 w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-400" />

        <div className="flex flex-col flex-1 p-6 justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                Interactive Live
              </span>
              {monthly && (
                <span className="text-sm font-extrabold text-purple-900">
                  ₹{monthly.toLocaleString("en-IN")}<span className="text-xs text-slate-400 font-normal">/mo</span>
                </span>
              )}
            </div>

            <h3 className="font-extrabold text-lg text-slate-900 leading-snug tracking-tight mb-2">
              {title}
            </h3>

            <p className="text-xs text-slate-500 mb-4 line-clamp-2">
              Comprehensive live syllabus coverage with tests, doubt solving &amp; verified faculty.
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => setModal("subjects")}
              className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 rounded-xl border border-purple-200 text-purple-700 bg-purple-50/50 hover:bg-purple-100 transition-all duration-200"
            >
              <BookOpen size={13} /> Curriculum
            </button>

            <button
              onClick={() => setModal("enroll")}
              className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-600/20 hover:shadow-purple-600/40 transition-all duration-200"
            >
              Enroll <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* MODAL (Subjects or Enroll) */}
      <AnimatePresence>
        {modal && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setModal(null)}
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-md rounded-3xl overflow-hidden bg-white shadow-2xl border border-purple-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-purple-700 via-indigo-700 to-violet-800 text-white">
                <div>
                  <p className="text-[11px] font-bold tracking-widest uppercase text-amber-300">
                    {modal === "subjects" ? "Course Syllabus" : "Instant Enrollment"}
                  </p>
                  <h3 className="text-lg font-black mt-0.5">{title}</h3>
                </div>
                <button
                  onClick={() => setModal(null)}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white/15 hover:bg-white/25 text-white transition"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Body: Subjects */}
              {modal === "subjects" && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {subjects.length} Subjects Included
                    </p>
                    <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                      Live Doubt Clearing
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1">
                    {subjects.map((s) => (
                      <div
                        key={s}
                        className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 bg-purple-50/70 border border-purple-100"
                      >
                        <span className="w-7 h-7 rounded-lg bg-white border border-purple-100/80 shadow-xs flex items-center justify-center shrink-0">
                          {getSubjectIcon(s)}
                        </span>
                        <span className="text-xs font-bold text-slate-800">{s}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setModal("enroll")}
                    className="mt-6 w-full py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950 shadow-lg shadow-amber-400/25 transition-all flex items-center justify-center gap-2"
                  >
                    Proceed to Enroll <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {/* Modal Body: Enroll */}
              {modal === "enroll" && (
                <div className="p-6">
                  {hasPrice ? (
                    <>
                      <p className="text-xs font-bold uppercase tracking-wider text-purple-700 mb-3 flex items-center gap-1.5">
                        <IndianRupee size={13} /> Select Subscription Plan
                      </p>

                      <div className="space-y-3 mb-6">
                        {monthly !== undefined && (
                          <div
                            onClick={() => setSelectedPlan("monthly")}
                            className={`flex items-center justify-between rounded-2xl p-4 cursor-pointer transition-all border-2 ${
                              selectedPlan === "monthly"
                                ? "bg-purple-50/80 border-purple-600 shadow-md shadow-purple-600/10"
                                : "bg-white border-slate-200 hover:border-purple-200"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                selectedPlan === "monthly" ? "border-purple-600" : "border-slate-300"
                              }`}>
                                {selectedPlan === "monthly" && <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />}
                              </div>
                              <div>
                                <p className="font-extrabold text-sm text-slate-900">Monthly Plan</p>
                                <p className="text-xs text-slate-500">Billed monthly · Cancel anytime</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-black text-purple-700">₹{monthly.toLocaleString("en-IN")}</p>
                              <p className="text-[11px] text-slate-400">/month</p>
                            </div>
                          </div>
                        )}

                        {annual !== undefined && (
                          <div
                            onClick={() => setSelectedPlan("annual")}
                            className={`flex items-center justify-between rounded-2xl p-4 cursor-pointer transition-all border-2 relative ${
                              selectedPlan === "annual"
                                ? "bg-purple-50/80 border-purple-600 shadow-md shadow-purple-600/10"
                                : "bg-white border-slate-200 hover:border-purple-200"
                            }`}
                          >
                            <span className="absolute -top-2.5 right-4 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500 text-white shadow-xs">
                              Save Extra
                            </span>
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                selectedPlan === "annual" ? "border-purple-600" : "border-slate-300"
                              }`}>
                                {selectedPlan === "annual" && <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />}
                              </div>
                              <div>
                                <p className="font-extrabold text-sm text-slate-900">Full Academic Year</p>
                                <p className="text-xs text-slate-500">One-time payment</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-black text-purple-700">₹{annual.toLocaleString("en-IN")}</p>
                              <p className="text-[11px] text-slate-400">/year</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Primary UPI Payment Button */}
                      <button
                        onClick={handleStartUPI}
                        className="w-full py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 mb-3"
                      >
                        <QrCode size={18} /> Pay ₹{currentAmount.toLocaleString("en-IN")} via UPI (Instant)
                      </button>

                      {/* Or Course Details Link */}
                      <Link
                        href={`/courses/${encodeURIComponent(slug)}`}
                        onClick={() => setModal(null)}
                        className="w-full block py-2.5 text-center text-xs font-bold text-slate-600 hover:text-purple-700 transition"
                      >
                        Or view complete course syllabus &rarr;
                      </Link>

                      <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-slate-400">
                        <Sparkles size={12} className="text-amber-500" />
                        <span>Instant invoice &amp; onboarding upon UTR confirmation</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-sm text-slate-600 mb-5">Custom pricing available for this course.</p>
                      <Link
                        href={`/courses/${encodeURIComponent(slug)}`}
                        className="inline-block px-6 py-3 rounded-xl bg-purple-600 text-white font-bold text-sm"
                        onClick={() => setModal(null)}
                      >
                        View Course Details
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* YOUPI-PG UPI PAYMENT MODAL */}
      <UPIPaymentModal
        isOpen={showUPIModal}
        onClose={() => setShowUPIModal(false)}
        courseId={slug}
        courseName={title}
        amount={currentAmount}
        plan={selectedPlan}
        userId={user?.uid || `guest_${Date.now()}`}
        userEmail={user?.email || "student@e-kalavya.com"}
        userName={user?.displayName || "Student"}
      />
    </>
  );
}