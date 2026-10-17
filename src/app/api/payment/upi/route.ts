import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { generateUPILink, generateTxnId, UPI_VPA } from "@/lib/youpipg";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, courseId, courseName, amount, plan, studentName, email } = body;

    if (!userId || !courseId || !amount) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const txnId = generateTxnId(userId);
    const upiLink = generateUPILink(amount, txnId);

    // Save pending enrollment to Firestore
    await setDoc(doc(db, "invoices", txnId), {
      txnId,
      userId,
      courseId,
      courseName,
      amount,
      plan: plan || "monthly",
      studentName: studentName || "",
      email: email || "",
      utr: "",
      status: "pending_verification",
      upiVPA: UPI_VPA,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      txnId,
      upiLink,
      upiVPA: UPI_VPA,
    });
  } catch (error) {
    console.error("UPI payment initiation error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to initiate payment" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { txnId, utr } = body;

    if (!txnId || !utr) {
      return NextResponse.json(
        { success: false, message: "txnId and UTR are required" },
        { status: 400 }
      );
    }

    // Validate UTR format (12 digits)
    const utrClean = utr.trim();
    if (!/^\d{12}$/.test(utrClean)) {
      return NextResponse.json(
        { success: false, message: "UTR must be a 12-digit number" },
        { status: 400 }
      );
    }

    await updateDoc(doc(db, "invoices", txnId), {
      utr: utrClean,
      status: "utr_submitted",
      utrSubmittedAt: serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      message: "UTR submitted successfully",
      txnId,
    });
  } catch (error) {
    console.error("UTR submission error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit UTR" },
      { status: 500 }
    );
  }
}
