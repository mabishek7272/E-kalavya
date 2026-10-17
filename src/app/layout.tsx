import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "E-Kalavya - Virtual Learning Academy",
  description: "Live interactive online tuition for CBSE, ICSE, Matric, JEE & NEET. Expert educators with real results.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased bg-[#faf9ff] text-slate-900 font-sans">
        <AuthProvider>
          {/* HEADER */}
          <Header />

          {/* MAIN CONTENT */}
          <main className="flex-1">
            <Container>{children}</Container>
          </main>

          {/* FOOTER */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
