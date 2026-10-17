import { db } from "@/lib/firebaseClient";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

export interface InvoiceData {
  txnId: string;
  userId: string;
  studentName: string;
  email: string;
  courseId: string;
  courseName: string;
  amount: number;
  plan: "monthly" | "annual";
  utr: string;
  status: "pending_verification" | "verified" | "rejected";
  upiVPA: string;
  createdAt?: Timestamp;
}

/**
 * Save invoice to Firestore
 */
export async function saveInvoice(data: Omit<InvoiceData, "createdAt">): Promise<void> {
  await setDoc(doc(db, "invoices", data.txnId), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

/**
 * Retrieve invoice from Firestore
 */
export async function getInvoice(txnId: string): Promise<InvoiceData | null> {
  const snap = await getDoc(doc(db, "invoices", txnId));
  if (!snap.exists()) return null;
  return snap.data() as InvoiceData;
}
