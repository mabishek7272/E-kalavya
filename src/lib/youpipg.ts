export const UPI_VPA = "banu17sathish-1@oksbi";
export const MERCHANT_NAME = "E-Kalavya";
export const MERCHANT_EMAIL = "class@e-kalavya.com";

/**
 * Generates a UPI deep link for payment
 */
export function generateUPILink(
  amount: number,
  txnId: string
): string {
  const params = new URLSearchParams({
    pa: UPI_VPA,
    pn: MERCHANT_NAME,
    am: amount.toFixed(2),
    cu: "INR",
    tr: txnId,
    tn: "E-Kalavya Course Enrollment",
  });
  return `upi://pay?${params.toString()}`;
}

/**
 * Generates a unique transaction ID
 */
export function generateTxnId(userId: string): string {
  return `UPI_${userId}_${Date.now()}`;
}

/**
 * Formats amount to Indian Rupee display string
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount);
}
