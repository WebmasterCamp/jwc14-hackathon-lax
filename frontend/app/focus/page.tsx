"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, BookOpen, CheckSquare } from "lucide-react";
import MobileShell from "@/components/layout/MobileShell";
import DailyGoalWidget from "@/components/session/DailyGoalWidget";
import SessionComplete from "@/components/session/SessionComplete";
import AFKWarning from "@/components/session/AFKWarning";
import { useTimer } from "@/hooks/useTimer";
import { useAFK } from "@/hooks/useAFK";
import type { SubjectType, TimerPreset } from "@/lib/types";

const PRESETS: TimerPreset[] = [15, 30, 45, 60];
const SUBJECTS: SubjectType[] = ["Reading", "Coding", "Mathematics", "Physics", "English", "Science", "TGAT", "TPAT3", "Language"];
const GOAL_PRESETS = [60, 120, 180] as const;

export default function FocusPage() {
  const [preset, setPreset] = useState<TimerPreset>(25 as TimerPreset);
  const [subjects, setSubjects] = useState<SubjectType[]>(["Reading"]);
  const [showComplete, setShowComplete] = useState(false);
  const [goalMinutes, setGoalMinutes] = useState(180);
  const [studiedToday, setStudiedToday] = useState(135);
  const [showGoalPicker, setShowGoalPicker] = useState(false);
  const [focusMode, setFocusMode] = useState(false);

  const { formattedTime, state, progress, start, pause, resume, reset, setDuration } = useTimer(30);

  const isRunning = state === "running";
  const isPaused = state === "paused";

  // Show complete modal when timer finishes
  useEffect(() => {
    if (state === "complete") {
      setTimeout(() => setShowComplete(true), 300);
    }
  }, [state]);

  // AFK detection only while timer is running
  const handleAFK = useCallback(() => {}, []);
  const { isAFK, dismissAFK } = useAFK(isRunning, handleAFK);

  const handlePreset = (p: TimerPreset) => {
    setPreset(p);
    setDuration(p);
  };

  const toggleSubject = (s: SubjectType) => {
    setSubjects((prev) =>
      prev.includes(s) ? (prev.length > 1 ? prev.filter((x) => x !== s) : prev) : [...prev, s]
    );
  };

  const handlePlayPause = () => {
    if (state === "idle") start();
    else if (isRunning) pause();
    else if (isPaused) resume();
  };

  const handleSessionSave = (rating: number) => {
    setStudiedToday((prev) => prev + preset);
    setShowComplete(false);
    reset();
  };

  const handleAFKContinue = () => dismissAFK();
  const handleAFKBreak = () => {
    dismissAFK();
    reset();
  };

  // Timer ring values
  const RADIUS = 80;
  const STROKE = 6;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const ringOffset = CIRCUMFERENCE - progress * CIRCUMFERENCE;

  const activeSubjectLabel = subjects.length === 1 ? subjects[0].toUpperCase() : "MIXED";

  return (
    <MobileShell>
      <SessionComplete
        open={showComplete}
        durationMinutes={preset}
        locationName="Samyan Mitr Town"
        onSave={handleSessionSave}
      />
      <AFKWarning
        open={isAFK}
        onContinue={handleAFKContinue}
        onBreak={handleAFKBreak}
      />

      {/* Focus Mode Overlay */}
      <AnimatePresence>
        {focusMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ background: "#08080F" }}
          >
            <p className="section-label mb-6">FOCUS MODE</p>
            <svg width={220} height={220} viewBox="0 0 220 220">
              <circle cx={110} cy={110} r={RADIUS} fill="none"
                stroke="rgba(255,255,255,0.06)" strokeWidth={STROKE} />
              <motion.circle
                cx={110} cy={110} r={RADIUS}
                fill="none" stroke="#FF8A00" strokeWidth={STROKE} strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                animate={{ strokeDashoffset: ringOffset }}
                transition={{ duration: 0.3 }}
                style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
              />
              <text x={110} y={100} textAnchor="middle" fill="white"
                fontSize="36" fontWeight="700" fontFamily="Inter, sans-serif">
                {formattedTime}
              </text>
              <text x={110} y={128} textAnchor="middle"
                fill="rgba(255,255,255,0.4)" fontSize="12" fontFamily="Inter, sans-serif">
                {activeSubjectLabel}
              </text>
            </svg>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setFocusMode(false)}
              className="mt-8 px-6 py-2.5 rounded-full text-sm font-medium"
              style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
            >
              Exit Focus Mode
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-4 pt-12 pb-4 space-y-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="section-label">FOCUS SESSION</p>
          <h1 className="text-2xl font-bold text-white mt-1">Study Timer</h1>
        </motion.div>

        {/* Daily Goal Widget */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}>
          <DailyGoalWidget
            studiedMinutes={studiedToday}
            goalMinutes={goalMinutes}
            onChangeGoal={() => setShowGoalPicker(!showGoalPicker)}
          />
        </motion.div>

        {/* Goal Picker */}
        <AnimatePresence>
          {showGoalPicker && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="glass rounded-2xl p-4">
                <p className="section-label mb-3">SET DAILY GOAL</p>
                <div className="flex gap-2">
                  {GOAL_PRESETS.map((g) => (
                    <button
                      key={g}
                      onClick={() => { setGoalMinutes(g); setShowGoalPicker(false); }}
                      className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                      style={{
                        background: goalMinutes === g ? "#FF8A00" : "rgba(255,255,255,0.06)",
                        color: goalMinutes === g ? "#fff" : "rgba(255,255,255,0.6)",
                      }}
                    >
                      {g / 60}h
                    </button>
                  ))}
                  <button
                    onClick={() => setShowGoalPicker(false)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                    style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)" }}
                  >
                    Custom
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Timer Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass rounded-2xl p-5"
        >
          {/* Timer Ring */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <svg width={180} height={180} viewBox="0 0 180 180">
                <circle cx={90} cy={90} r={RADIUS} fill="none"
                  stroke="rgba(255,255,255,0.06)" strokeWidth={STROKE} />
                <motion.circle
                  cx={90} cy={90} r={RADIUS}
                  fill="none" stroke="#FF8A00" strokeWidth={STROKE} strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  animate={{ strokeDashoffset: ringOffset }}
                  transition={{ duration: 0.3 }}
                  style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
                />
              </svg>
              {/* Timer text overlaid */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[2.2rem] font-bold text-white tracking-tight leading-none">
                  {formattedTime}
                </span>
                <span className="text-xs mt-1 font-medium tracking-widest"
                  style={{ color: "#7B4FD4" }}>
                  {activeSubjectLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="flex gap-2 justify-center mb-5">
            {PRESETS.map((p) => (
              <motion.button
                key={p}
                whileTap={{ scale: 0.93 }}
                onClick={() => handlePreset(p)}
                className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: preset === p ? "rgba(255,138,0,0.2)" : "rgba(255,255,255,0.06)",
                  color: preset === p ? "#FF8A00" : "rgba(255,255,255,0.5)",
                  border: preset === p ? "1px solid rgba(255,138,0,0.4)" : "1px solid transparent",
                }}
              >
                {p}m
              </motion.button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            {/* Reset */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={reset}
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ border: "1.5px solid rgba(255,255,255,0.15)" }}
            >
              <RotateCcw size={18} className="text-white/60" />
            </motion.button>

            {/* Play/Pause */}
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={handlePlayPause}
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #FF8A00, #FF6B00)",
                boxShadow: "0 4px 20px rgba(255,138,0,0.45)",
              }}
              animate={isRunning ? { boxShadow: ["0 4px 20px rgba(255,138,0,0.45)", "0 4px 30px rgba(255,138,0,0.65)", "0 4px 20px rgba(255,138,0,0.45)"] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {isRunning ? (
                <div className="flex gap-1">
                  <div className="w-1.5 h-5 bg-white rounded-sm" />
                  <div className="w-1.5 h-5 bg-white rounded-sm" />
                </div>
              ) : (
                <svg width={22} height={22} viewBox="0 0 24 24" fill="white">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              )}
            </motion.button>

            {/* Focus Mode */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => isRunning && setFocusMode(true)}
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                border: "1.5px solid rgba(255,255,255,0.15)",
                opacity: isRunning ? 1 : 0.4,
              }}
            >
              <BookOpen size={18} className="text-white/60" />
            </motion.button>
          </div>

          {/* Status text */}
          <div className="text-center mt-3">
            <span className="text-xs"
              style={{ color: isRunning ? "#FF8A00" : "rgba(255,255,255,0.3)" }}>
              {isRunning ? "● Session in progress" : isPaused ? "⏸ Paused" : "Ready to start"}
            </span>
          </div>
        </motion.div>

        {/* Subject Tags */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}>
          <p className="section-label mb-2.5">TAG SUBJECT</p>
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map((s) => {
              const active = subjects.includes(s);
              return (
                <motion.button
                  key={s}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => toggleSubject(s)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all"
                  style={{
                    background: active ? "rgba(255,138,0,0.15)" : "rgba(255,255,255,0.06)",
                    color: active ? "#FF8A00" : "rgba(255,255,255,0.55)",
                    border: active ? "1px solid rgba(255,138,0,0.35)" : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {s === "Reading" && <BookOpen size={11} />}
                  {s === "Coding" && <CheckSquare size={11} />}
                  {s}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </MobileShell>
  );
}