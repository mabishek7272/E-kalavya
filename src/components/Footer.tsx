"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Instagram, Linkedin, Facebook, ShieldCheck, Award, Heart, Sparkles } from "lucide-react";

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <footer className="relative bg-[#0d0722] text-slate-200 overflow-hidden pt-20 pb-12 border-t border-purple-900/50">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* TOP GLOW LINE */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* TRUST BADGES STRIP */}
        <div className="mb-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-md">
          {[
            { icon: <ShieldCheck className="text-amber-400" size={24} />, title: "Government Aligned", desc: "CBSE, ICSE & Matriculation" },
            { icon: <Award className="text-purple-400" size={24} />, title: "Expert Educators", desc: "Top M.Sc. & Ph.D. Faculty" },
            { icon: <Sparkles className="text-amber-400" size={24} />, title: "Interactive 1-on-1", desc: "Customized Doubts & Mentoring" },
            { icon: <Heart className="text-rose-400" size={24} />, title: "Loved by 10,000+", desc: "Students Across India" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3.5 p-2">
              <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08]">
                {item.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white tracking-wide">{item.title}</h4>
                <p className="text-[11px] text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >

          {/* BRAND COLUMN */}
          <motion.div variants={itemVariants} className="md:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center p-1.5 shadow-lg group-hover:border-purple-400 transition-colors">
                <Image
                  src="/logo-new.png"
                  alt="E-Kalavya Logo"
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-serif">
                E-Kalavya
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-slate-400 mb-6 max-w-sm">
              Empowering students across India with world-class live online tuition for CBSE, ICSE, Matric, JEE &amp; NEET. Where personalized mentorship unlocks true potential.
            </p>

            {/* Social Links */}
            <div className="flex gap-2.5">
              {[
                { icon: Instagram, href: "https://www.instagram.com/e_kalavya_academy/", label: "Instagram" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/e-kalavya-b32452399?utm_source=share_via&utm_content=profile&utm_medium=member_android", label: "LinkedIn" },
                { icon: Facebook, href: "https://www.facebook.com/", label: "Facebook" },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-purple-300 hover:text-white hover:bg-purple-600/30 hover:border-purple-500/50 transition-all duration-200"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={17} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* QUICK LINKS */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <h4 className="font-bold text-xs uppercase tracking-widest text-amber-400 mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "All Courses", href: "/courses" },
                { label: "Book Free Demo", href: "/book-demo" },
                { label: "Study Materials", href: "/study-materials" },
                { label: "About Founder", href: "/about" },
                { label: "Inspiration", href: "/inspiration" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-white hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-200"
                  >
                    <span className="w-1 h-1 rounded-full bg-purple-400" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ACADEMICS & POLICIES */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <h4 className="font-bold text-xs uppercase tracking-widest text-amber-400 mb-5">
              Policies
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms & Conditions", href: "/terms-and-conditions" },
                { label: "Refund Policy", href: "/refund-policy" },
                { label: "Shipping Policy", href: "/shipping-policy" },
                { label: "Student Dashboard", href: "/dashboard" },
                { label: "Wallet Balance", href: "/wallet" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-white hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-200"
                  >
                    <span className="w-1 h-1 rounded-full bg-purple-400" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CONTACT INFO */}
          <motion.div variants={itemVariants} className="md:col-span-4">
            <h4 className="font-bold text-xs uppercase tracking-widest text-amber-400 mb-5">
              Get in Touch
            </h4>
            <ul className="space-y-3.5 mb-6">
              <li>
                <a
                  href="tel:+917550101893"
                  className="flex items-center gap-3 text-sm text-slate-300 hover:text-white group transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <Phone size={15} />
                  </div>
                  <span className="font-medium">+91 75501 01893</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:class@e-kalavya.com"
                  className="flex items-center gap-3 text-sm text-slate-300 hover:text-white group transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                    <Mail size={15} />
                  </div>
                  <span className="font-medium">class@e-kalavya.com</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <MapPin size={15} />
                </div>
                <span className="font-medium">Tamil Nadu, India</span>
              </li>
            </ul>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center w-full py-3 px-5 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-900/30 hover:shadow-purple-600/30 transition-all duration-200"
            >
              Contact Support →
            </Link>
          </motion.div>

        </motion.div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} E-Kalavya Education. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-purple-300 transition-colors">Privacy</Link>
            <Link href="/terms-and-conditions" className="hover:text-purple-300 transition-colors">Terms</Link>
            <Link href="/refund-policy" className="hover:text-purple-300 transition-colors">Refund</Link>
            <a
              href="https://www.linkedin.com/in/rupashree-nt"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors inline-flex items-center gap-1"
            >
              Designed by Rupashree NT <Linkedin size={12} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}