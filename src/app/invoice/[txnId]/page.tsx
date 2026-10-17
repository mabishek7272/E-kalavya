"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Clock, CheckCircle2, AlertCircle, Search, GraduationCap, Printer, ArrowRight } from "lucide-react";
import { getInvoice, InvoiceData } from "@/lib/invoiceClient";
import { UPI_VPA, formatINR } from "@/lib/youpipg";

export default function InvoicePage() {
  const params = useParams<{ txnId: string }>();
  const txnId = params.txnId;

  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getInvoice(txnId);
        if (!data) setNotFound(true);
        else setInvoice(data);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    if (txnId) load();
  }, [txnId]);

  function handlePrint() {
    window.print();
  }

  function formatDate(ts: { toDate?: () => Date } | null | undefined): string {
    if (!ts) return new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
    const d = ts.toDate ? ts.toDate() : new Date();
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  }

  const statusInfo = {
    pending_verification: { label: "Pending Verification", icon: Clock, color: "#d97706", bg: "#fffbeb" },
    utr_submitted: { label: "UTR Submitted — Under Review", icon: Clock, color: "#d97706", bg: "#fffbeb" },
    verified: { label: "Payment Verified", icon: CheckCircle2, color: "#16a34a", bg: "#f0fdf4" },
    rejected: { label: "Payment Rejected", icon: AlertCircle, color: "#dc2626", bg: "#fef2f2" },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#f5f3ff" }}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p style={{ color: "#6b7280" }}>Loading invoice...</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center" style={{ background: "#f5f3ff" }}>
        <div className="w-20 h-20 rounded-2xl bg-violet-100 flex items-center justify-center mb-4 text-violet-600">
          <Search size={40} />
        </div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: "#1e0a3c" }}>Invoice Not Found</h2>
        <p className="mb-6 max-w-sm text-sm" style={{ color: "#6b7280" }}>This invoice does not exist or has expired.</p>
        <Link
          href="/courses"
          className="px-6 py-3 rounded-xl font-bold text-white shadow-lg shadow-purple-500/20"
          style={{ background: "linear-gradient(135deg, #7c3aed, #5b21b6)" }}
        >
          Browse Courses
        </Link>
      </div>
    );
  }

  const status = statusInfo[(invoice!.status as keyof typeof statusInfo)] || statusInfo.pending_verification;

  return (
    <>
      {/* Print-only styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .invoice-container { box-shadow: none !important; margin: 0 !important; border-radius: 0 !important; }
        }
      `}</style>

      {/* TOP NAV (hidden on print) */}
      <div className="no-print py-4 px-6 flex items-center justify-between" style={{ background: "white", borderBottom: "1px solid #ede9fe" }}>
        <Link href="/" className="text-xl font-extrabold flex items-center gap-2" style={{ color: "#7c3aed" }}>
          <GraduationCap size={24} className="text-violet-600" />
          <span>E-Kalavya</span>
        </Link>
        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #7c3aed, #5b21b6)", color: "white" }}
          >
            <Printer size={16} />
            <span>Print / Download</span>
          </button>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm"
            style={{ border: "2px solid #7c3aed", color: "#7c3aed", background: "white" }}
          >
            <span>Dashboard</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* INVOICE CONTAINER */}
      <div style={{ background: "#f5f3ff", minHeight: "100vh", padding: "32px 16px" }}>
        <div
          className="invoice-container"
          style={{
            maxWidth: 720,
            margin: "0 auto",
            background: "white",
            borderRadius: 24,
            boxShadow: "0 24px 64px rgba(124,58,237,0.12)",
            overflow: "hidden",
          }}
        >
          {/* INVOICE HEADER */}
          <div style={{ background: "linear-gradient(135deg, #1e0a3c, #3b1a7a)", padding: "40px 48px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div className="w-10 h-10 rounded-xl bg-violet-800/80 border border-violet-400/30 flex items-center justify-center text-amber-400 shadow-sm">
                    <GraduationCap size={22} />
                  </div>
                  <span style={{ fontSize: 22, fontWeight: 900, color: "#f59e0b", letterSpacing: "-0.02em" }}>
                    E-Kalavya
                  </span>
                </div>
                <p style={{ color: "#c4b5fd", fontSize: 13 }}>class@e-kalavya.com</p>
                <p style={{ color: "#c4b5fd", fontSize: 13 }}>Tamil Nadu, India</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ color: "#a78bfa", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Tax Invoice
                </p>
                <p style={{ color: "white", fontSize: 13, fontWeight: 700, marginTop: 4 }}>
                  #{invoice!.txnId}
                </p>
                <p style={{ color: "#c4b5fd", fontSize: 12, marginTop: 2 }}>
                  {formatDate(invoice!.createdAt as Parameters<typeof formatDate>[0])}
                </p>
              </div>
            </div>
          </div>

          {/* BILLING INFO */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderBottom: "2px dashed #ede9fe" }}>
            <div style={{ padding: "28px 48px", borderRight: "1px solid #ede9fe" }}>
              <p style={{ fontSize: 10, fontWeight: 800, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
                Billed To
              </p>
              <p style={{ fontWeight: 700, color: "#1e0a3c", fontSize: 15 }}>{invoice!.studentName || "Student"}</p>
              <p style={{ color: "#6b7280", fontSize: 13, marginTop: 3 }}>{invoice!.email}</p>
            </div>
            <div style={{ padding: "28px 48px" }}>
              <p style={{ fontSize: 10, fontWeight: 800, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
                From
              </p>
              <p style={{ fontWeight: 700, color: "#1e0a3c", fontSize: 15 }}>E-Kalavya Education</p>
              <p style={{ color: "#6b7280", fontSize: 13, marginTop: 3 }}>class@e-kalavya.com</p>
              <p style={{ color: "#6b7280", fontSize: 13 }}>Tamil Nadu, India</p>
            </div>
          </div>

          {/* ITEMS TABLE */}
          <div style={{ padding: "0 48px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 0 }}>
              <thead>
                <tr style={{ background: "#f5f3ff" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 800, color: "#7c3aed", letterSpacing: "0.08em", textTransform: "uppercase" }}>#</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 800, color: "#7c3aed", letterSpacing: "0.08em", textTransform: "uppercase" }}>Description</th>
                  <th style={{ padding: "12px 16px", textAlign: "center", fontSize: 11, fontWeight: 800, color: "#7c3aed", letterSpacing: "0.08em", textTransform: "uppercase" }}>Plan</th>
                  <th style={{ padding: "12px 16px", textAlign: "right", fontSize: 11, fontWeight: 800, color: "#7c3aed", letterSpacing: "0.08em", textTransform: "uppercase" }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #f5f3ff" }}>
                  <td style={{ padding: "20px 16px", fontSize: 14, color: "#6b7280", fontWeight: 600 }}>1</td>
                  <td style={{ padding: "20px 16px" }}>
                    <p style={{ fontWeight: 700, color: "#1e0a3c", fontSize: 15 }}>{invoice!.courseName}</p>
                    <p style={{ color: "#9ca3af", fontSize: 12, marginTop: 2 }}>Online Live Classes</p>
                  </td>
                  <td style={{ padding: "20px 16px", textAlign: "center" }}>
                    <span style={{
                      fontSize: 12, fontWeight: 700, padding: "3px 10px",
                      borderRadius: 20, background: "#ede9fe", color: "#5b21b6",
                      textTransform: "capitalize"
                    }}>
                      {invoice!.plan}
                    </span>
                  </td>
                  <td style={{ padding: "20px 16px", textAlign: "right", fontWeight: 800, fontSize: 16, color: "#7c3aed" }}>
                    {formatINR(invoice!.amount)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* TOTAL */}
          <div style={{ padding: "0 48px 28px" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{ width: 240 }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: "2px solid #ede9fe", marginTop: 12 }}>
                  <span style={{ fontWeight: 600, color: "#6b7280", fontSize: 14 }}>Subtotal</span>
                  <span style={{ fontWeight: 700, color: "#1e0a3c" }}>{formatINR(invoice!.amount)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
                  <span style={{ fontWeight: 600, color: "#6b7280", fontSize: 14 }}>GST</span>
                  <span style={{ fontWeight: 700, color: "#1e0a3c" }}>Included</span>
                </div>
                <div style={{
                  display: "flex", justifyContent: "space-between", padding: "14px 16px",
                  borderRadius: 12, background: "linear-gradient(135deg, #1e0a3c, #3b1a7a)",
                  marginTop: 8
                }}>
                  <span style={{ fontWeight: 800, color: "white", fontSize: 16 }}>TOTAL</span>
                  <span style={{ fontWeight: 900, color: "#f59e0b", fontSize: 20 }}>{formatINR(invoice!.amount)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* PAYMENT DETAILS */}
          <div style={{ margin: "0 48px 28px", borderRadius: 16, background: "#f5f3ff", border: "1.5px solid #ede9fe", padding: 24 }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: "#7c3aed", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
              Payment Details
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 32px" }}>
              {[
                { label: "Payment Method", value: "UPI (YouPI-PG)" },
                { label: "UPI ID", value: UPI_VPA },
                { label: "UTR Number", value: invoice!.utr || "—" },
                { label: "Transaction ID", value: invoice!.txnId },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ fontSize: 11, color: "#9ca3af", marginBottom: 2 }}>{label}</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#1e0a3c", wordBreak: "break-all" }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Status badge */}
            <div style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 20, background: status.bg }}>
              <status.icon size={15} style={{ color: status.color }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: status.color }}>{status.label}</span>
            </div>
          </div>

          {/* FOOTER NOTE */}
          <div style={{ padding: "20px 48px", borderTop: "1px solid #f5f3ff", textAlign: "center" }}>
            <p style={{ fontSize: 12, color: "#9ca3af" }}>
              Thank you for choosing E-Kalavya! For support contact{" "}
              <a href="mailto:class@e-kalavya.com" style={{ color: "#7c3aed", fontWeight: 600 }}>
                class@e-kalavya.com
              </a>
            </p>
            <p style={{ fontSize: 11, color: "#d1d5db", marginTop: 6 }}>
              This is a system-generated invoice. No signature required.
            </p>
          </div>

          {/* PRINT BUTTON (no-print) */}
          <div className="no-print" style={{ padding: "0 48px 40px", display: "flex", justifyContent: "center" }}>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2"
              style={{
                padding: "14px 40px",
                borderRadius: 16,
                background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
                color: "white",
                fontWeight: 800,
                fontSize: 15,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(124,58,237,0.35)",
                transition: "all 0.2s",
              }}
            >
              <Printer size={18} />
              <span>Print / Download Invoice</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
