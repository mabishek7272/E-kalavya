"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, CheckCircle, Loader2, AlertCircle, Smartphone, CheckCircle2, Receipt, ShieldCheck } from "lucide-react";
import { UPI_VPA, generateUPILink, formatINR } from "@/lib/youpipg";

interface UPIPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  courseName: string;
  amount: number;
  plan: "monthly" | "annual";
  userId: string;
  userEmail: string;
  userName: string;
}

type ModalState = "idle" | "loading" | "qr_shown" | "utr_entry" | "submitting" | "success" | "error";

export default function UPIPaymentModal({
  isOpen,
  onClose,
  courseId,
  courseName,
  amount,
  plan,
  userId,
  userEmail,
  userName,
}: UPIPaymentModalProps) {
  const [state, setState] = useState<ModalState>("idle");
  const [txnId, setTxnId] = useState("");
  const [upiLink, setUpiLink] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [utr, setUtr] = useState("");
  const [utrError, setUtrError] = useState("");
  const [copied, setCopied] = useState(false);
  const utrRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && state === "idle") {
      initiatePayment();
    }
    if (!isOpen) {
      setState("idle");
      setUtr("");
      setUtrError("");
      setQrDataUrl("");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  async function initiatePayment() {
    setState("loading");
    try {
      const res = await fetch("/api/payment/upi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          courseId,
          courseName,
          amount,
          plan,
          studentName: userName,
          email: userEmail,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      setTxnId(data.txnId);
      setUpiLink(data.upiLink);

      // Generate QR code client-side
      const QRCode = (await import("qrcode")).default;
      const qr = await QRCode.toDataURL(data.upiLink, {
        width: 240,
        margin: 2,
        color: { dark: "#1e0a3c", light: "#ffffff" },
      });
      setQrDataUrl(qr);
      setState("qr_shown");
    } catch (err) {
      console.error(err);
      setState("error");
    }
  }

  async function submitUTR() {
    const clean = utr.trim();
    if (!/^\d{12}$/.test(clean)) {
      setUtrError("UTR must be exactly 12 digits");
      return;
    }
    setState("submitting");
    try {
      const res = await fetch("/api/payment/upi", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ txnId, utr: clean }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setState("success");
    } catch (err) {
      console.error(err);
      setUtrError("Failed to submit. Please try again.");
      setState("utr_entry");
    }
  }

  function copyUPI() {
    navigator.clipboard.writeText(UPI_VPA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="upi-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{ background: "rgba(15,7,40,0.75)", backdropFilter: "blur(6px)" }}
        onClick={onClose}
      >
        <motion.div
          key="upi-modal"
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full max-w-md rounded-3xl overflow-hidden"
          style={{ background: "white", boxShadow: "0 32px 80px rgba(15,7,40,0.4)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div
            className="flex items-center justify-between px-6 py-5"
            style={{ background: "linear-gradient(135deg, #1e0a3c, #3b1a7a)" }}
          >
            <div>
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "#c4b5fd" }}>
                Secure UPI Payment
              </p>
              <h3 className="text-lg font-extrabold text-white mt-0.5">
                {courseName}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="text-2xl font-extrabold"
                style={{ color: "#f59e0b" }}
              >
                {formatINR(amount)}
              </span>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* BODY */}
          <div className="p-6">

            {/* LOADING */}
            {state === "loading" && (
              <div className="flex flex-col items-center py-10">
                <Loader2 size={40} className="animate-spin" style={{ color: "#7c3aed" }} />
                <p className="mt-4 text-sm font-medium" style={{ color: "#6b7280" }}>
                  Preparing payment...
                </p>
              </div>
            )}

            {/* ERROR */}
            {state === "error" && (
              <div className="flex flex-col items-center py-8">
                <AlertCircle size={40} style={{ color: "#ef4444" }} />
                <p className="mt-3 font-semibold" style={{ color: "#1e0a3c" }}>Something went wrong</p>
                <button
                  onClick={initiatePayment}
                  className="mt-4 px-6 py-2 rounded-xl font-bold text-white text-sm"
                  style={{ background: "linear-gradient(135deg,#7c3aed,#5b21b6)" }}
                >
                  Try Again
                </button>
              </div>
            )}

            {/* QR CODE SHOWN */}
            {state === "qr_shown" && (
              <div className="flex flex-col items-center">
                <p className="text-sm font-semibold mb-4" style={{ color: "#4b4068" }}>
                  Scan with any UPI app (GPay, PhonePe, Paytm, BHIM)
                </p>

                {/* QR */}
                <div
                  className="p-3 rounded-2xl mb-4"
                  style={{ border: "2px solid #ede9fe", background: "white" }}
                >
                  {qrDataUrl && (
                    <img
                      src={qrDataUrl}
                      alt="UPI QR Code"
                      width={220}
                      height={220}
                      style={{ display: "block" }}
                    />
                  )}
                </div>

                {/* OR divider */}
                <div className="flex items-center gap-3 w-full mb-4">
                  <div className="flex-1 h-px" style={{ background: "#e5e7eb" }} />
                  <span className="text-xs font-bold" style={{ color: "#9ca3af" }}>OR PAY TO UPI ID</span>
                  <div className="flex-1 h-px" style={{ background: "#e5e7eb" }} />
                </div>

                {/* UPI ID copy */}
                <div
                  className="flex items-center gap-2 w-full rounded-xl px-4 py-3 mb-6"
                  style={{ background: "#f5f3ff", border: "1.5px solid #c4b5fd" }}
                >
                  <span className="flex-1 font-bold text-sm" style={{ color: "#1e0a3c" }}>
                    {UPI_VPA}
                  </span>
                  <button
                    onClick={copyUPI}
                    className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                    style={{
                      background: copied ? "#dcfce7" : "white",
                      color: copied ? "#16a34a" : "#7c3aed",
                      border: "1px solid currentColor",
                    }}
                  >
                    {copied ? <CheckCircle size={12} /> : <Copy size={12} />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>

                {/* Open UPI App button (mobile) */}
                <a
                  href={upiLink}
                  className="w-full block text-center py-3 rounded-xl font-bold text-sm mb-3"
                  style={{
                    background: "linear-gradient(135deg, #22c55e, #16a34a)",
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Smartphone size={16} />
                    <span>Open UPI App</span>
                  </span>
                </a>

                <button
                  onClick={() => { setState("utr_entry"); setTimeout(() => utrRef.current?.focus(), 100); }}
                  className="w-full py-3 rounded-xl font-bold text-sm transition-all"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
                    color: "white",
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>I have paid — Enter UTR</span>
                  </span>
                </button>
              </div>
            )}

            {/* UTR ENTRY */}
            {state === "utr_entry" && (
              <div>
                <div className="flex items-center gap-3 mb-6 p-4 rounded-xl" style={{ background: "#f0fdf4", border: "1px solid #86efac" }}>
                  <CheckCircle size={20} style={{ color: "#16a34a", flexShrink: 0 }} />
                  <p className="text-sm font-semibold" style={{ color: "#14532d" }}>
                    Payment sent! Please enter your 12-digit UTR to confirm enrollment.
                  </p>
                </div>

                <label
                  className="block text-xs font-extrabold uppercase tracking-widest mb-2"
                  style={{ color: "#7c3aed" }}
                >
                  UTR Number (12 digits)
                </label>
                <input
                  ref={utrRef}
                  type="text"
                  inputMode="numeric"
                  maxLength={12}
                  placeholder="e.g. 123456789012"
                  value={utr}
                  onChange={(e) => { setUtr(e.target.value.replace(/\D/g, "")); setUtrError(""); }}
                  className="w-full px-4 py-3 rounded-xl font-mono text-lg tracking-widest mb-1"
                  style={{
                    border: `2px solid ${utrError ? "#ef4444" : "#c4b5fd"}`,
                    outline: "none",
                    background: "white",
                    color: "#1e0a3c",
                    letterSpacing: "0.15em",
                  }}
                />
                {utrError && (
                  <p className="text-xs text-red-500 mb-3">{utrError}</p>
                )}
                <p className="text-xs mb-4" style={{ color: "#9ca3af" }}>
                  Find UTR in your UPI app → Payment History → Transaction Details
                </p>

                <button
                  onClick={submitUTR}
                  disabled={utr.length !== 12}
                  className="w-full py-3 rounded-xl font-bold text-sm transition-all mb-2"
                  style={{
                    background: utr.length === 12
                      ? "linear-gradient(135deg, #f59e0b, #d97706)"
                      : "#e5e7eb",
                    color: utr.length === 12 ? "#1a0a00" : "#9ca3af",
                    cursor: utr.length !== 12 ? "not-allowed" : "pointer",
                  }}
                >
                  Confirm Enrollment
                </button>
                <button
                  onClick={() => setState("qr_shown")}
                  className="w-full py-2 rounded-xl font-semibold text-sm"
                  style={{ background: "transparent", color: "#6b7280" }}
                >
                  ← Back to QR
                </button>
              </div>
            )}

            {/* SUBMITTING */}
            {state === "submitting" && (
              <div className="flex flex-col items-center py-10">
                <Loader2 size={40} className="animate-spin" style={{ color: "#7c3aed" }} />
                <p className="mt-4 text-sm font-medium" style={{ color: "#6b7280" }}>Confirming enrollment...</p>
              </div>
            )}

            {/* SUCCESS */}
            {state === "success" && (
              <div className="flex flex-col items-center py-6 text-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
                >
                  <CheckCircle size={40} color="white" />
                </div>
                <h3 className="text-xl font-extrabold mb-2" style={{ color: "#1e0a3c" }}>
                  Enrollment Submitted!
                </h3>
                <p className="text-sm mb-1" style={{ color: "#4b5563" }}>
                  Your enrollment for <strong>{courseName}</strong> is pending verification.
                </p>
                <p className="text-xs mb-6" style={{ color: "#9ca3af" }}>
                  We'll confirm your payment within 24 hours.
                </p>
                <a
                  href={`/invoice/${txnId}`}
                  className="w-full block text-center py-3 rounded-xl font-bold text-sm mb-3"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Receipt size={16} />
                    <span>View Invoice</span>
                  </span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full py-2 rounded-xl font-semibold text-sm"
                  style={{ background: "#f3f4f6", color: "#374151" }}
                >
                  Close
                </button>
              </div>
            )}

          </div>

          {/* FOOTER */}
          {(state === "qr_shown" || state === "utr_entry") && (
            <div
              className="px-6 py-4 flex items-center justify-center gap-2"
              style={{ background: "#fafafa", borderTop: "1px solid #f0f0f0" }}
            >
              <ShieldCheck size={14} className="text-violet-600 flex-shrink-0" />
              <span className="text-xs" style={{ color: "#9ca3af" }}>
                Secure UPI payment · No card details needed · Zero platform fees
              </span>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
