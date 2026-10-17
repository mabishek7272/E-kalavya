"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { COURSE_BOARDS } from "@/lib/courses";
import BoardCourseCard from "@/components/BoardCourseCard";
import { BookOpen, Sparkles, Search, CheckCircle2 } from "lucide-react";

export default function CoursesPage() {
  const [selectedBoard, setSelectedBoard] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const boardOptions = ["All", ...COURSE_BOARDS.map((b) => b.board)];

  const filteredBoards = COURSE_BOARDS.filter((board) => {
    if (selectedBoard !== "All" && board.board !== selectedBoard) return false;
    return true;
  }).map((board) => {
    if (!searchQuery.trim()) return board;
    const filteredCourses = board.courses.filter(
      (c) =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.subjects.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    return { ...board, courses: filteredCourses };
  }).filter((board) => board.courses.length > 0);

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50/70 via-white to-purple-50/50 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* PAGE HERO */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 text-purple-800 text-xs font-bold uppercase tracking-wider mb-4 border border-purple-200/50">
            <Sparkles size={14} className="text-amber-500" /> Academic Programs 2025–2026
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-5 tracking-tight font-serif">
            Interactive Courses for <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-purple-700 via-indigo-700 to-violet-800 bg-clip-text text-transparent">
              Every Board &amp; Aspirant
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Live interactive tuition aligned with curriculum standards. Led by specialized educators with continuous assessments and real-time doubt solving.
          </p>
        </motion.div>

        {/* SEARCH & BOARD FILTER BAR */}
        <div className="mb-14 flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl shadow-lg shadow-purple-900/5 border border-purple-100">
          
          {/* Board Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {boardOptions.map((board) => (
              <button
                key={board}
                onClick={() => setSelectedBoard(board)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  selectedBoard === board
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                    : "text-slate-600 hover:text-purple-700 hover:bg-purple-50"
                }`}
              >
                {board}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search subject or class..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:bg-white focus:border-purple-500 transition-all outline-none"
            />
          </div>
        </div>

        {/* FEATURED QUICK STRIP */}
        <div className="mb-16 p-6 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-[#1e0a3c] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles size={14} /> High Demand Batches
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif">
              NEET, JEE &amp; 1-on-1 Customized Batches Open Now
            </h3>
            <p className="text-xs sm:text-sm text-purple-200 mt-1">
              Limited seats of 15 students per batch for maximum teacher attention.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
              <CheckCircle2 size={14} /> Zero Platform Fee UPI
            </div>
          </div>
        </div>

        {/* BOARD SECTIONS */}
        <div className="space-y-20">
          {filteredBoards.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-purple-100">
              <BookOpen size={40} className="mx-auto text-purple-300 mb-3" />
              <h3 className="text-lg font-bold text-slate-800">No courses match your query</h3>
              <p className="text-xs text-slate-500 mt-1">Try searching for &quot;Maths&quot;, &quot;Physics&quot;, or selecting &quot;All&quot; boards.</p>
            </div>
          ) : (
            filteredBoards.map((board) => (
              <motion.section
                key={board.board}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {/* Board Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-purple-100/80 gap-2">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif">
                        {board.board}
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 ml-5">
                      {board.description}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full self-start sm:self-auto border border-purple-100">
                    {board.courses.length} Courses
                  </span>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {board.courses.map((course) => (
                    <BoardCourseCard
                      key={course.slug}
                      title={course.title}
                      slug={course.slug}
                      subjects={course.subjects}
                      price={course.price}
                    />
                  ))}
                </div>
              </motion.section>
            ))
          )}
        </div>

      </div>
    </main>
  );
}
