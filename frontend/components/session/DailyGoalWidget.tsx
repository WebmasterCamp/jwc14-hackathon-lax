"use client";

import { motion } from "framer-motion";

interface Props {
  studiedMinutes: number;
  goalMinutes: number;
  onChangeGoal: () => void;
}

export default function DailyGoalWidget({ studiedMinutes, goalMinutes, onChangeGoal }: Props) {
  const pct = Math.min(100, Math.round((studiedMinutes / goalMinutes) * 100));
  const h = Math.floor(studiedMinutes / 60);
  const m = studiedMinutes % 60;
  const gh = Math.floor(goalMinutes / 60);
  const gm = goalMinutes % 60;

  const RADIUS = 34;
  const STROKE = 5;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const offset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;

  const dots = Array.from({ length: 8 }, (_, i) => i < Math.round((pct / 100) * 8));

  return (
    <div className="glass rounded-2xl px-4 py-4 flex items-center gap-4">
      {/* Ring */}
      <div className="relative flex-shrink-0">
        <svg width={86} height={86} viewBox="0 0 86 86">
          {/* Track */}
          <circle
            cx={43} cy={43} r={RADIUS}
            fill="none" stroke="rgba(255,255,255,0.08)"
            strokeWidth={STROKE}
          />
          {/* Progress */}
          <motion.circle
            cx={43} cy={43} r={RADIUS}
            fill="none"
            stroke="#FF8A00"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            initial={{ strokeDashoffset: CIRCUMFERENCE }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
          />
          {/* Percentage text */}
          <text
            x={43} y={43}
            textAnchor="middle" dominantBaseline="central"
            fill="#FF8A00" fontSize="13" fontWeight="700"
            fontFamily="var(--font-inter), Inter, sans-serif"
          >
            {pct}%
          </text>
        </svg>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-bold text-white">
            {h > 0 ? `${h}h ${m}m` : `${m}m`}
          </span>
          <span className="text-sm text-white/40">
            / {gh > 0 ? `${gh}h` : ""}{gm > 0 ? ` ${gm}m` : ""}
          </span>
        </div>
        <p className="text-xs text-white/50 mt-0.5">Daily reading goal</p>

        {/* Progress dots */}
        <div className="flex gap-1 mt-2.5">
          {dots.map((filled, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.05 + 0.3 }}
              className="w-2 h-2 rounded-full"
              style={{ background: filled ? "#FF8A00" : "rgba(255,255,255,0.15)" }}
            />
          ))}
        </div>
      </div>

      {/* Change goal button */}
      <button
        onClick={onChangeGoal}
        className="text-xs text-white/30 hover:text-white/60 transition-colors px-1"
      >
        Edit
      </button>
    </div>
  );
}