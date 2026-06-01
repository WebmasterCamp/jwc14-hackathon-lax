// ─── Core Domain Types ────────────────────────────────────────────────────────

export type AnimalType =
  | "fox" | "owl" | "panda" | "bear" | "rabbit"
  | "cat" | "wolf" | "lion" | "tiger" | "hamster"
  | "elephant" | "monkey" | "penguin" | "duck" | "frog"
  | "horse" | "deer" | "koala" | "raccoon" | "capybara";

export type SubjectType =
  | "Reading" | "Coding" | "Mathematics" | "Physics"
  | "Chemistry" | "Biology" | "English" | "Science"
  | "TPAT3" | "TGAT" | "Language" | "Other";

export type TerritoryColor =
  | "amber" | "purple" | "blue" | "teal"
  | "crimson" | "emerald" | "rose" | "navy";

// ─── User ─────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  username: string;
  animal: AnimalType;
  color: string;          // hex color for their territory/avatar bg
  level: number;
  rank: number;
  totalStudyMinutes: number;
  streak: number;
  territoriesCount: number;
  achievements: string[];
  weeklyMinutes: number;
  isCurrentUser?: boolean;
}

// ─── Territory ────────────────────────────────────────────────────────────────

export interface Territory {
  id: string;
  name: string;
  type: "cafe" | "library" | "coworking" | "university";
  lat: number;
  lng: number;
  owner: User | null;
  color: TerritoryColor;
  influenceScore: number;
  totalStudyMinutes: number;
  popularSubjects: SubjectType[];
  sessionCount: number;
  localLeaderboard: LeaderboardEntry[];
  polygon: [number, number][];
  radius: number;
}

// ─── Leaderboard ──────────────────────────────────────────────────────────────

export interface LeaderboardEntry {
  rank: number;
  user: User;
  studyMinutes: number;
  territoriesCount: number;
  streak: number;
}

// ─── Session ──────────────────────────────────────────────────────────────────

export interface Session {
  id: string;
  startTime: string;        // ISO string
  endTime: string;
  durationMinutes: number;
  subjects: SubjectType[];
  locationId: string;
  locationName: string;
  focusRating: number;      // 1-5
  date: string;             // YYYY-MM-DD
}

// ─── Achievement ──────────────────────────────────────────────────────────────

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;             // emoji
  color: string;            // hex
  unlocked: boolean;
  unlockedAt?: string;
  requirement: string;
}

// ─── Notification ─────────────────────────────────────────────────────────────

export interface AppNotification {
  id: string;
  icon: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  type: "goal" | "streak" | "territory" | "challenge" | "achievement";
}

// ─── Analytics ────────────────────────────────────────────────────────────────

export interface DailyStats {
  date: string;
  totalMinutes: number;
  sessions: number;
  subjects: Partial<Record<SubjectType, number>>;
  hourlyData: { hour: number; minutes: number }[];
}

export interface SubjectDistribution {
  subject: SubjectType;
  minutes: number;
  percentage: number;
  color: string;
}

export interface WeeklyProgress {
  day: string;          // Mon, Tue...
  minutes: number;
  goal: number;
}

// ─── Avatar Config ────────────────────────────────────────────────────────────

export interface AvatarOption {
  animal: AnimalType;
  emoji: string;
  name: string;
  unlocked: boolean;
  requiresAchievement?: string;
}

// ─── Session State (UI) ───────────────────────────────────────────────────────

export type TimerPreset = 15 | 30 | 45 | 60;
export type TimerState = "idle" | "running" | "paused" | "complete";

export interface SessionState {
  timerState: TimerState;
  selectedPreset: TimerPreset;
  elapsedSeconds: number;
  selectedSubjects: SubjectType[];
  locationId: string | null;
  focusRating: number | null;
  dailyGoalMinutes: number;
  dailyStudiedMinutes: number;
}

// ─── Daily Goal ───────────────────────────────────────────────────────────────

export type GoalPreset = 60 | 120 | 180;

export interface DailyGoal {
  targetMinutes: number;
  studiedMinutes: number;
  percentage: number;
}