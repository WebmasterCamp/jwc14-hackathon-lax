"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, TrendingUp, Flame, Trophy, Zap, Search } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import MobileShell from "@/components/layout/MobileShell";
import { fetchStatistics, fetchHistory } from "@/lib/mockApi";
import { CURRENT_USER, ANIMAL_EMOJI } from "@/lib/mockData";
import type { Session } from "@/lib/types";

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  value,
  label,
  color,
  delay,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay }}
      className="flex flex-col items-center gap-1 p-3 rounded-2xl flex-1 min-w-0"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <Icon size={16} style={{ color }} />
      <span className="text-sm font-bold text-white leading-none">{value}</span>
      <span className="text-[10px] text-white/40 text-center leading-tight">{label}</span>
    </motion.div>
  );
}

// ─── Custom tooltip for line chart ───────────────────────────────────────────
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-3 py-2 rounded-xl text-xs"
      style={{ background: "#1A1A2E", border: "1px solid rgba(255,255,255,0.1)" }}>
      <div className="font-semibold text-white mb-1">{label}</div>
      {payload.map((p) => (
        <div key={p.name} style={{ color: p.name === "today" ? "#FF8A00" : "rgba(255,255,255,0.4)" }}>
          {p.name === "today" ? "Today" : "Yesterday"}: {p.value}m
        </div>
      ))}
    </div>
  );
}

// ─── Subject Donut ────────────────────────────────────────────────────────────
const DONUT_COLORS = ["#FF8A00", "#5B60C8", "#1E8C82", "#7B4FD4"];

function fmtDuration(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function starRow(rating: number) {
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < rating ? "#FF8A00" : "rgba(255,255,255,0.15)", fontSize: 10 }}>★</span>
  ));
}

// ─── Calendar ─────────────────────────────────────────────────────────────────
function MiniCalendar({ data }: { data: { date: string; minutes: number; hasSession: boolean }[] }) {
  const today = new Date("2026-06-01");
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const sessionMap = new Map(data.map((d) => [d.date, d]));

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push({ day: d, session: sessionMap.get(dateStr) ?? null });
  }

  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="font-semibold text-white text-sm">June 2026</p>
        <p className="section-label">CALENDAR</p>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((d) => (
          <div key={d} className="text-center text-[10px] text-white/30 font-medium">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, i) =>
          cell === null ? (
            <div key={`e${i}`} />
          ) : (
            <div
              key={cell.day}
              className="aspect-square rounded-lg flex items-center justify-center text-xs font-medium relative"
              style={{
                background: cell.session?.hasSession
                  ? "rgba(255,138,0,0.2)"
                  : cell.day === today.getDate() ? "rgba(255,255,255,0.08)" : "transparent",
                color: cell.day === today.getDate() ? "#FF8A00" : cell.session?.hasSession ? "#FFB347" : "rgba(255,255,255,0.4)",
                border: cell.day === today.getDate() ? "1px solid rgba(255,138,0,0.5)" : "none",
              }}
            >
              {cell.day}
              {cell.session?.hasSession && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: "#FF8A00" }} />
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function HistoryPage() {
  const [stats, setStats] = useState<{
    today: { totalMinutes: number; sessions: number; maxFocusMinutes: number; startTime: string; endTime: string };
    yesterday: { totalMinutes: number; sessions: number; maxFocusMinutes: number; startTime: string; endTime: string };
    subjectDistribution: { subject: string; minutes: number; percentage: number; color: string }[];
    hourlyProgress: { hour: string; today: number; yesterday: number }[];
    weeklyCalendar: { date: string; minutes: number; hasSession: boolean }[];
  } | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchStatistics().then((s) => setStats(s as typeof stats));
    fetchHistory().then(setSessions);
  }, []);

  const filtered = sessions.filter((s) =>
    !query ||
    s.locationName.toLowerCase().includes(query.toLowerCase()) ||
    s.subjects.some((sub) => sub.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <MobileShell>
      <div className="px-4 pt-12 pb-4 space-y-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="section-label">ANALYTICS</p>
          <h1 className="text-2xl font-bold text-white mt-1">Your History</h1>
        </motion.div>

        {/* Stats Row */}
        <div className="flex gap-2">
          <StatCard icon={Clock} value={fmtDuration(stats?.today.totalMinutes ?? 225)} label="Today" color="#FF8A00" delay={0.1} />
          <StatCard icon={TrendingUp} value={fmtDuration(CURRENT_USER.weeklyMinutes)} label="Weekly" color="#5B60C8" delay={0.15} />
          <StatCard icon={Flame} value={`${CURRENT_USER.streak} days`} label="Streak" color="#FF8A00" delay={0.2} />
          <StatCard icon={Trophy} value={`#${CURRENT_USER.rank}`} label="Rank" color="#C4762A" delay={0.25} />
          <StatCard icon={Zap} value={`Lv.${CURRENT_USER.level}`} label="Level" color="#7B4FD4" delay={0.3} />
        </div>

        {/* Daily Progress Chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-white text-sm">Daily Progress</p>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-0.5 rounded" style={{ background: "#FF8A00" }} />
                <span className="text-white/50">Today</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-0.5 rounded border-t border-dashed border-white/30" />
                <span className="text-white/50">Yesterday</span>
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={stats?.hourlyProgress ?? []} margin={{ top: 4, right: 4, left: -30, bottom: 0 }}>
              <XAxis
                dataKey="hour" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }}
                axisLine={false} tickLine={false}
              />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone" dataKey="today" stroke="#FF8A00"
                strokeWidth={2.5} dot={false} activeDot={{ r: 4, fill: "#FF8A00" }}
              />
              <Line
                type="monotone" dataKey="yesterday" stroke="rgba(255,255,255,0.25)"
                strokeWidth={1.5} dot={false} strokeDasharray="4 4"
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Summary row */}
          {stats && (
            <div className="grid grid-cols-4 gap-2 mt-2 pt-2 border-t border-white/05">
              {[
                { label: "Total", value: fmtDuration(stats.today.totalMinutes) },
                { label: "Peak", value: fmtDuration(stats.today.maxFocusMinutes) },
                { label: "Start", value: stats.today.startTime },
                { label: "End", value: stats.today.endTime },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <div className="text-xs font-semibold text-white">{value}</div>
                  <div className="text-[10px] text-white/35">{label}</div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Subject Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-4"
        >
          <p className="font-semibold text-white text-sm mb-3">Subject Breakdown</p>
          <div className="flex items-center gap-3">
            <div style={{ flexShrink: 0 }}>
              <PieChart width={110} height={110}>
                <Pie
                  data={stats?.subjectDistribution ?? []}
                  cx={55} cy={55}
                  innerRadius={32} outerRadius={52}
                  dataKey="percentage"
                  paddingAngle={2}
                  startAngle={90}
                  endAngle={-270}
                >
                  {(stats?.subjectDistribution ?? []).map((entry, i) => (
                    <Cell key={entry.subject} fill={DONUT_COLORS[i % DONUT_COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </div>
            <div className="flex-1 space-y-2">
              {(stats?.subjectDistribution ?? []).map((entry, i) => (
                <div key={entry.subject} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: DONUT_COLORS[i % DONUT_COLORS.length] }} />
                    <span className="text-xs text-white/70">{entry.subject}</span>
                  </div>
                  <span className="text-xs font-bold" style={{ color: DONUT_COLORS[i % DONUT_COLORS.length] }}>
                    {entry.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}>
          <MiniCalendar data={stats?.weeklyCalendar ?? []} />
        </motion.div>

        {/* Session Log */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}>
          {/* Search */}
          <div className="relative mb-3">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sessions…"
              className="w-full pl-9 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
            />
          </div>

          <div className="space-y-2">
            {filtered.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 + 0.1 }}
                className="flex items-center gap-3 p-3.5 rounded-xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                {/* Time indicator */}
                <div className="w-1 self-stretch rounded-full flex-shrink-0"
                  style={{ background: "#FF8A00", opacity: 0.6 }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-semibold text-white">{s.locationName}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {s.subjects.map((sub) => (
                      <span key={sub} className="text-[10px] px-1.5 py-0.5 rounded-full"
                        style={{ background: "rgba(255,138,0,0.12)", color: "#FF8A00" }}>
                        {sub}
                      </span>
                    ))}
                  </div>
                  <div className="text-[10px] text-white/30 mt-1">
                    {s.startTime.slice(11, 16)} – {s.endTime.slice(11, 16)} · {s.date}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-bold" style={{ color: "#FF8A00" }}>
                    {fmtDuration(s.durationMinutes)}
                  </div>
                  <div className="flex justify-end mt-0.5">{starRow(s.focusRating)}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </MobileShell>
  );
}