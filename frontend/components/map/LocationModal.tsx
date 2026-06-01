"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Clock, Zap, Users, BookOpen, ChevronRight } from "lucide-react";
import type { Territory } from "@/lib/types";
import { ANIMAL_EMOJI, TERRITORY_COLORS } from "@/lib/mockData";

interface Props {
  territory: Territory | null;
  open: boolean;
  onClose: () => void;
  onSync: (t: Territory) => void;
}

function fmtTime(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export default function LocationModal({ territory, open, onClose, onSync }: Props) {
  if (!territory) return null;

  const colors = TERRITORY_COLORS[territory.color];
  const typeLabel = { cafe: "☕ Café", library: "📚 Library", coworking: "💼 Co-Working", university: "🎓 University" }[territory.type];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 32 }}
            className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50
                       rounded-t-[28px] overflow-hidden"
            style={{
              background: "#12121E",
              border: "1px solid rgba(255,255,255,0.08)",
              maxHeight: "80vh",
            }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            <div className="overflow-y-auto" style={{ maxHeight: "calc(80vh - 20px)" }}>
              {/* Header */}
              <div className="flex items-start justify-between px-5 pt-2 pb-4">
                <div className="flex-1">
                  <span className="section-label">{typeLabel}</span>
                  <h2 className="text-xl font-bold text-white mt-1">{territory.name}</h2>

                  {territory.owner ? (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xl">{ANIMAL_EMOJI[territory.owner.animal]}</span>
                      <div>
                        <div className="text-sm font-semibold" style={{ color: territory.owner.color }}>
                          {territory.owner.username}
                        </div>
                        <div className="text-xs text-white/40">Territory Owner</div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1
                                    rounded-full text-xs font-medium"
                         style={{ background: "rgba(255,138,0,0.1)", color: "#FF8A00" }}>
                      <Zap size={10} />
                      Unclaimed — Be the first!
                    </div>
                  )}
                </div>
                <button onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.08)" }}>
                  <X size={16} className="text-white/60" />
                </button>
              </div>

              {/* Color accent bar */}
              <div className="mx-5 h-px" style={{ background: colors.border, opacity: 0.4 }} />

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3 mx-5 mt-4">
                {[
                  { icon: Zap, label: "Influence", value: territory.influenceScore.toLocaleString() },
                  { icon: Clock, label: "Total Time", value: fmtTime(territory.totalStudyMinutes) },
                  { icon: Users, label: "Sessions", value: territory.sessionCount.toString() },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label}
                    className="flex flex-col items-center gap-1 p-3 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.04)" }}>
                    <Icon size={14} style={{ color: colors.border }} />
                    <span className="text-base font-bold text-white">{value}</span>
                    <span className="text-[10px] text-white/40">{label}</span>
                  </div>
                ))}
              </div>

              {/* Popular Subjects */}
              <div className="mx-5 mt-4">
                <p className="section-label mb-2">Popular Subjects</p>
                <div className="flex flex-wrap gap-2">
                  {territory.popularSubjects.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.7)" }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Local Leaderboard */}
              <div className="mx-5 mt-5">
                <p className="section-label mb-3">Local Leaderboard</p>
                <div className="space-y-2">
                  {territory.localLeaderboard.map((entry) => {
                    const medal = ["🥇", "🥈", "🥉"][entry.rank - 1] ?? `#${entry.rank}`;
                    return (
                      <div key={entry.user.id}
                        className="flex items-center gap-3 p-3 rounded-xl"
                        style={{ background: "rgba(255,255,255,0.04)" }}>
                        <span className="text-base w-6 text-center">{medal}</span>
                        <span className="text-xl">{ANIMAL_EMOJI[entry.user.animal]}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-white truncate">
                            {entry.user.username}
                          </div>
                          <div className="text-xs text-white/40">
                            {entry.streak}d streak · Lv.{entry.user.level}
                          </div>
                        </div>
                        <span className="text-sm font-bold" style={{ color: "#FF8A00" }}>
                          {fmtTime(entry.studyMinutes)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sync Button */}
              <div className="mx-5 mt-5 mb-6">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onSync(territory)}
                  className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #FF8A00, #FF6B00)",
                    boxShadow: "0 4px 20px rgba(255,138,0,0.35)",
                    color: "#fff",
                  }}
                >
                  <MapPin size={18} />
                  Sync & Start Session Here
                  <ChevronRight size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}