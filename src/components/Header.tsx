"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Menu, X, Wallet, LayoutDashboard, LogOut, Sparkles } from "lucide-react";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/book-demo", label: "Book Demo" },
    { href: "/study-materials", label: "Study Materials" },
    { href: "/about", label: "About Founder" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-purple-100/70 shadow-[0_4px_24px_rgba(124,58,237,0.06)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">

          {/* BRAND LOGO */}
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 p-0.5 shadow-md shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center overflow-hidden">
                  <Image
                    src="/logo-new.png"
                    alt="E-Kalavya Logo"
                    width={34}
                    height={34}
                    priority
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-purple-700 via-indigo-700 to-violet-800 bg-clip-text text-transparent">
                  E-Kalavya
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600 -mt-1 flex items-center gap-1">
                  <Sparkles size={10} className="text-amber-500" /> Virtual Academy
                </span>
              </div>
            </Link>
          </motion.div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-purple-50/70 p-1.5 rounded-full border border-purple-100/80">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "text-white shadow-md shadow-purple-600/20"
                      : "text-slate-600 hover:text-purple-700 hover:bg-white/60"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* AUTH & ACTIONS */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/wallet"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200/60 transition-all shadow-xs"
                >
                  <Wallet size={14} /> Wallet
                </Link>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md shadow-purple-500/25"
                >
                  <LayoutDashboard size={14} /> Dashboard
                </Link>
                <button
                  onClick={() => logout()}
                  title="Logout"
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  href="/login"
                  className="px-5 py-2.5 rounded-full text-sm font-bold text-purple-700 hover:bg-purple-50 transition border border-purple-200/80"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-6 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:shadow-lg hover:shadow-purple-600/30 hover:scale-[1.02] transition-all"
                >
                  Sign Up Free
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 transition"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden border-t border-purple-100 py-4 space-y-2 bg-white"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-semibold transition ${
                    isActive(link.href)
                      ? "bg-purple-600 text-white font-bold"
                      : "text-slate-700 hover:bg-purple-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 mt-2 border-t border-purple-100 space-y-2">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="block w-full py-3 text-center text-sm font-bold text-white bg-purple-600 rounded-xl"
                    >
                      My Dashboard
                    </Link>
                    <Link
                      href="/wallet"
                      onClick={() => setIsOpen(false)}
                      className="block w-full py-2.5 text-center text-sm font-bold text-purple-700 bg-purple-50 rounded-xl"
                    >
                      Wallet
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="block w-full py-2 text-center text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/signup"
                      onClick={() => setIsOpen(false)}
                      className="block w-full py-3 text-center text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-md shadow-purple-500/20"
                    >
                      Sign Up Free
                    </Link>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="block w-full py-2.5 text-center text-sm font-bold text-purple-700 bg-purple-50 rounded-xl border border-purple-200/60"
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}