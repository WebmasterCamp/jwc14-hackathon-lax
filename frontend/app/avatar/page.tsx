"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Check, Sparkles } from "lucide-react";
import MobileShell from "@/components/layout/MobileShell";
import { AVATAR_OPTIONS, ACHIEVEMENTS, CURRENT_USER } from "@/lib/mockData";
import type { AvatarOption, Achievement } from "@/lib/types";

// ─── Avatar Cell ──────────────────────────────────────────────────────────────
function AvatarCell({
  option,
  selected,
  onSelect,
  delay,
}: {
  option: AvatarOption;
  selected: boolean;
  onSelect: () => void;
  delay: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 400, damping: 25 }}
      whileTap={{ scale: option.unlocked ? 0.9 : 1 }}
      onClick={option.unlocked ? onSelect : undefined}
      className="relative aspect-square rounded-2xl flex items-center justify-center text-2xl"
      style={{
        background: selected
          ? "rgba(255,138,0,0.15)"
          : option.unlocked
          ? "rgba(255,255,255,0.06)"
          : "rgba(255,255,255,0.03)",
        border: selected
          ? "2px solid #FF8A00"
          : option.unlocked
          ? "1px solid rgba(255,255,255,0.1)"
          : "1px solid rgba(255,255,255,0.05)",
        boxShadow: selected ? "0 0 16px rgba(255,138,0,0.3)" : "none",
        cursor: option.unlocked ? "pointer" : "default",
        opacity: option.unlocked ? 1 : 0.45,
      }}
    >
      <span className={option.unlocked ? "" : "grayscale opacity-50"}>{option.emoji}</span>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center"
          style={{ background: "#FF8A00" }}
        >
          <Check size={10} color="white" strokeWidth={3} />
        </motion.div>
      )}
      {!option.unlocked && (
        <div className="absolute inset-0 flex items-end justify-center pb-1.5 rounded-2xl">
          <Lock size={10} className="text-white/30" />
        </div>
      )}
    </motion.button>
  );
}

// ─── Achievement Badge ────────────────────────────────────────────────────────
function BadgeCard({ ach, delay }: { ach: Achievement; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 350, damping: 24 }}
      className="relative flex flex-col items-center gap-2 p-4 rounded-2xl"
      style={{
        background: ach.unlocked ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
        border: ach.unlocked
          ? `1px solid ${ach.color}40`
          : "1px solid rgba(255,255,255,0.06)",
        opacity: ach.unlocked ? 1 : 0.5,
      }}
    >
      {/* Lock overlay on locked */}
      {!ach.unlocked && (
        <div className="absolute top-2 right-2">
          <Lock size={11} className="text-white/30" />
        </div>
      )}

      {/* Icon */}
      <motion.div
        animate={ach.unlocked ? { rotate: [0, -5, 5, 0] } : {}}
        transition={{ delay: delay + 0.2, duration: 0.4 }}
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
        style={{
          background: ach.unlocked ? `${ach.color}20` : "rgba(255,255,255,0.05)",
          border: ach.unlocked ? `1px solid ${ach.color}30` : "none",
        }}
      >
        {ach.icon}
      </motion.div>

      <div className="text-center">
        <div className="text-xs font-bold" style={{ color: ach.unlocked ? ach.color : "rgba(255,255,255,0.3)" }}>
          {ach.name}
        </div>
        {ach.unlocked && ach.unlockedAt && (
          <div className="text-[10px] text-white/30 mt-0.5">{ach.unlockedAt}</div>
        )}
        {!ach.unlocked && (
          <div className="text-[10px] text-white/25 mt-0.5">{ach.requirement}</div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Selected Avatar Preview ──────────────────────────────────────────────────
function AvatarPreview({ option }: { option: AvatarOption }) {
  return (
    <motion.div
      key={option.animal}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative flex flex-col items-center py-4"
    >
      <motion.div
        className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-3"
        style={{
          background: CURRENT_USER.color,
          border: "3px solid #FF8A00",
          boxShadow: "0 0 30px rgba(255,138,0,0.35)",
        }}
        animate={{
          boxShadow: [
            "0 0 20px rgba(255,138,0,0.25)",
            "0 0 40px rgba(255,138,0,0.5)",
            "0 0 20px rgba(255,138,0,0.25)",
          ],
        }}
        transition={{ repeat: Infinity, duration: 2.5 }}
      >
        {option.emoji}
      </motion.div>
      <div className="text-white font-bold">{CURRENT_USER.username}</div>
      <div className="flex items-center gap-1.5 mt-1">
        <Sparkles size={12} style={{ color: "#FF8A00" }} />
        <span className="text-xs" style={{ color: "#FF8A00" }}>Lv.{CURRENT_USER.level} · #{CURRENT_USER.rank} Global</span>
      </div>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function AvatarPage() {
  const [selectedAnimal, setSelectedAnimal] = useState<string>(CURRENT_USER.animal);

  const selectedOption = AVATAR_OPTIONS.find((a) => a.animal === selectedAnimal) ?? AVATAR_OPTIONS[0];
  const unlockedCount = AVATAR_OPTIONS.filter((a) => a.unlocked).length;
  const unlockedAchievements = ACHIEVEMENTS.filter((a) => a.unlocked).length;

  return (
    <MobileShell>
      <div className="px-4 pt-12 pb-4 space-y-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="section-label">CHARACTER</p>
          <h1 className="text-2xl font-bold text-white mt-1">Avatar & Badges</h1>
        </motion.div>

        {/* Avatar Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <AvatarPreview key={selectedAnimal} option={selectedOption} />
          </AnimatePresence>
        </motion.div>

        {/* Avatar Grid */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="section-label">CHOOSE AVATAR</p>
            <span className="text-xs font-semibold" style={{ color: "#FF8A00" }}>
              {unlockedCount} / {AVATAR_OPTIONS.length} unlocked
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {AVATAR_OPTIONS.map((option, i) => (
              <AvatarCell
                key={option.animal}
                option={option}
                selected={selectedAnimal === option.animal}
                onSelect={() => setSelectedAnimal(option.animal)}
                delay={0.2 + i * 0.03}
              />
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-white/06" />

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="section-label">ACHIEVEMENTS</p>
            <span className="text-xs font-semibold" style={{ color: "#FF8A00" }}>
              {unlockedAchievements} / {ACHIEVEMENTS.length}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {ACHIEVEMENTS.map((ach, i) => (
              <BadgeCard key={ach.id} ach={ach} delay={0.35 + i * 0.04} />
            ))}
          </div>
        </motion.div>
      </div>
    </MobileShell>
  );
}