# E-kalavya

Modern Online Education & Learning Platform for State Board, CBSE, ICSE, and Competitive Examinations.

## Features
- **Renovated UI / UX**: Modern responsive Ed-Tech design with Tailwind CSS, Framer Motion, and frosted glass aesthetics.
- **YouPI-PG Gateway**: Direct UPI QR code payments with instant deep linking and 12-digit UTR confirmation.
- **Tax Invoice Generator**: Printable, downloadable system-generated tax invoices at `/invoice/[txnId]`.
- **Course Catalog**: Interactive board tabs (Matriculation, CBSE, ICSE, Competitive Exams) and live search.
- **Free Demo Booking & Expert Counseling**: Instant scheduling with dedicated appointment slots.
- **Student Dashboard & Wallet**: Real-time enrollment tracking and wallet balance management.

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/mabishek7272/E-kalavya.git
cd E-kalavya
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack
- **Framework**: Next.js 16 (App Router & Turbopack)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React & Custom Vector SVGs
- **Database & Auth**: Firebase Firestore & Firebase Authentication
- **Payments**: YouPI-PG (UPI)
