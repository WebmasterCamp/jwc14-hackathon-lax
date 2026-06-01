"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, MapPin, Flame } from "lucide-react";
import MobileShell from "@/components/layout/MobileShell";
import { fetchLeaderboard } from "@/lib/mockApi";
import { ANIMAL_EMOJI } from "@/lib/mockData";
import type { LeaderboardEntry } from "@/lib/types";

type Tab = "daily" | "weekly" | "monthly";
const TABS: { key: Tab; label: string }[] = [
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
];

function fmtHours(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}.${Math.floor((m / 60) * 10)}h`;
}

function TopThree({ entries }: { entries: LeaderboardEntry[] }) {
  const [first, second, third] = entries;
  return (
    <div className="relative flex items-end justify-center gap-2 px-4 py-6">
      {/* 2nd */}
      {second && (
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col items-center gap-2 pb-0"
        >
          <div className="relative">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
              style={{ background: second.user.color, border: "2px solid rgba(255,255,255,0.3)" }}>
              {ANIMAL_EMOJI[second.user.animal]}
            </div>
            <span className="absolute -bottom-1.5 -right-1.5 text-base">🥈</span>
          </div>
          <div className="text-center">
            <div className="text-xs font-semibold text-white/80 truncate max-w-[70px]">
              {second.user.username}
            </div>
            <div className="text-xs font-bold" style={{ color: "#FF8A00" }}>
              {fmtHours(second.studyMinutes)}
            </div>
          </div>
          <div className="w-16 h-12 rounded-t-lg flex items-center justify-center text-xs font-bold text-white/40"
            style={{ background: "rgba(255,255,255,0.06)" }}>
            2
          </div>
        </motion.div>
      )}

      {/* 1st */}
      {first && (
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex flex-col items-center gap-2 -mb-0"
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            <Crown size={22} style={{ color: "#FF8A00" }} />
          </motion.div>
          <div className="relative">
            <motion.div
              className="w-18 h-18 rounded-full flex items-center justify-center text-3xl"
              style={{
                width: 72, height: 72,
                background: first.user.color,
                border: "3px solid #FF8A00",
                boxShadow: "0 0 20px rgba(255,138,0,0.4)",
              }}
              animate={{ boxShadow: ["0 0 20px rgba(255,138,0,0.4)", "0 0 35px rgba(255,138,0,0.7)", "0 0 20px rgba(255,138,0,0.4)"] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {ANIMAL_EMOJI[first.user.animal]}
            </motion.div>
            <span className="absolute -bottom-1.5 -right-1.5 text-lg">🥇</span>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-white truncate max-w-[80px]">
              {first.user.username}
            </div>
            <div className="text-sm font-bold" style={{ color: "#FF8A00" }}>
              {fmtHours(first.studyMinutes)}
            </div>
          </div>
          <div className="w-16 h-16 rounded-t-lg flex items-center justify-center text-xs font-bold text-white/40"
            style={{ background: "rgba(255,138,0,0.12)", border: "1px solid rgba(255,138,0,0.2)" }}>
            1
          </div>
        </motion.div>
      )}

      {/* 3rd */}
      {third && (
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="relative">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
              style={{ background: third.user.color, border: "2px solid rgba(255,255,255,0.3)" }}>
              {ANIMAL_EMOJI[third.user.animal]}
            </div>
            <span className="absolute -bottom-1.5 -right-1.5 text-base">🥉</span>
          </div>
          <div className="text-center">
            <div className="text-xs font-semibold text-white/80 truncate max-w-[70px]">
              {third.user.username}
            </div>
            <div className="text-xs font-bold" style={{ color: "#FF8A00" }}>
              {fmtHours(third.studyMinutes)}
            </div>
          </div>
          <div className="w-16 h-8 rounded-t-lg flex items-center justify-center text-xs font-bold text-white/40"
            style={{ background: "rgba(255,255,255,0.06)" }}>
            3
          </div>
        </motion.div>
      )}
    </div>
  );
}

function LeaderboardRow({ entry, index }: { entry: LeaderboardEntry; index: number }) {
  const isCurrentUser = entry.user.isCurrentUser;
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 + 0.2 }}
      className="flex items-center gap-3 px-4 py-3 rounded-2xl"
      style={{
        background: isCurrentUser ? "rgba(255,138,0,0.08)" : "rgba(255,255,255,0.03)",
        border: isCurrentUser ? "1px solid rgba(255,138,0,0.2)" : "1px solid transparent",
      }}
    >
      {/* Rank */}
      <span className="text-sm font-bold w-7 text-center"
        style={{ color: "rgba(255,255,255,0.35)" }}>
        #{entry.rank}
      </span>

      {/* Avatar */}
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
        style={{ background: entry.user.color }}>
        {ANIMAL_EMOJI[entry.user.animal]}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-white truncate">
            {entry.user.username}
          </span>
          {isCurrentUser && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
              style={{ background: "rgba(255,138,0,0.2)", color: "#FF8A00" }}>
              You
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="flex items-center gap-0.5 text-[11px] text-white/35">
            <MapPin size={9} />
            {entry.territoriesCount} zones
          </span>
          <span className="flex items-center gap-0.5 text-[11px] text-white/35">
            <Flame size={9} />
            {entry.streak}d
          </span>
        </div>
      </div>

      {/* Hours */}
      <span className="text-base font-bold flex-shrink-0" style={{ color: "#FF8A00" }}>
        {fmtHours(entry.studyMinutes)}
      </span>
    </motion.div>
  );
}

export default function LeaderboardPage() {
  const [tab, setTab] = useState<Tab>("daily");
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchLeaderboard(tab).then((data) => {
      setEntries(data);
      setLoading(false);
    });
  }, [tab]);

  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3);

  return (
    <MobileShell>
      <div className="px-4 pt-12 pb-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="section-label">RANKINGS</p>
          <h1 className="text-2xl font-bold text-white mt-1">Leaderboard</h1>
        </motion.div>

        {/* Tab Pills */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mt-4"
        >
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className="relative flex-1 py-2.5 rounded-full text-sm font-semibold transition-colors"
              style={{
                background: tab === key ? "#FF8A00" : "rgba(255,255,255,0.06)",
                color: tab === key ? "#fff" : "rgba(255,255,255,0.5)",
              }}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Podium */}
        <AnimatePresence mode="wait">
          {!loading && (
            <motion.div
              key={tab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass rounded-2xl mt-4 overflow-hidden"
            >
              <TopThree entries={top3} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rest of list */}
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: "rgba(255,138,0,0.3)", borderTopColor: "#FF8A00" }} />
          </div>
        ) : (
          <div className="space-y-2 mt-3">
            {rest.map((entry, i) => (
              <LeaderboardRow key={entry.user.id} entry={entry} index={i} />
            ))}
          </div>
        )}
      </div>
    </MobileShell>
  );
}