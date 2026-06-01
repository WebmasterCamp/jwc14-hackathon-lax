import {
  MOCK_TERRITORIES, LEADERBOARD_DAILY, LEADERBOARD_WEEKLY, LEADERBOARD_MONTHLY,
  MOCK_SESSIONS, SUBJECT_DISTRIBUTION, TODAY_HOURLY, MOCK_NOTIFICATIONS,
  CURRENT_USER, MOCK_USERS,
} from "./mockData";
import type { LeaderboardEntry, Territory, Session } from "./types";

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

// ─── Dashboard ────────────────────────────────────────────────────────────────

export async function fetchDashboard() {
  await delay(200);
  return {
    user: CURRENT_USER,
    dailyGoal: { targetMinutes: 180, studiedMinutes: 135, percentage: 75 },
    todayStats: {
      studiedMinutes: 135,
      sessions: 3,
      topSubject: "Reading",
      territoriesHeld: 3,
    },
    weeklyStats: {
      studiedMinutes: CURRENT_USER.weeklyMinutes,
      sessionsCount: 18,
      streak: CURRENT_USER.streak,
    },
    recentSessions: MOCK_SESSIONS.slice(0, 3),
    notifications: MOCK_NOTIFICATIONS.filter((n) => !n.read),
  };
}

// ─── Statistics ───────────────────────────────────────────────────────────────

export async function fetchStatistics() {
  await delay(250);
  return {
    today: {
      totalMinutes: 135,
      sessions: 3,
      maxFocusMinutes: 60,
      startTime: "08:00",
      endTime: "13:30",
    },
    yesterday: {
      totalMinutes: 105,
      sessions: 2,
      maxFocusMinutes: 60,
      startTime: "09:00",
      endTime: "14:45",
    },
    subjectDistribution: SUBJECT_DISTRIBUTION,
    hourlyProgress: TODAY_HOURLY,
    weeklyCalendar: [
      { date: "2026-05-26", minutes: 90,  hasSession: true  },
      { date: "2026-05-27", minutes: 120, hasSession: true  },
      { date: "2026-05-28", minutes: 30,  hasSession: true  },
      { date: "2026-05-29", minutes: 60,  hasSession: true  },
      { date: "2026-05-30", minutes: 90,  hasSession: true  },
      { date: "2026-05-31", minutes: 105, hasSession: true  },
      { date: "2026-06-01", minutes: 135, hasSession: true  },
    ],
  };
}

// ─── Territories ──────────────────────────────────────────────────────────────

export async function fetchTerritories(): Promise<Territory[]> {
  await delay(300);
  return MOCK_TERRITORIES;
}

export async function fetchTerritory(id: string): Promise<Territory | null> {
  await delay(150);
  return MOCK_TERRITORIES.find((t) => t.id === id) ?? null;
}

// ─── Leaderboard ─────────────────────────────────────────────────────────────

type LeaderboardTab = "daily" | "weekly" | "monthly";

export async function fetchLeaderboard(tab: LeaderboardTab = "daily"): Promise<LeaderboardEntry[]> {
  await delay(200);
  const map: Record<LeaderboardTab, LeaderboardEntry[]> = {
    daily: LEADERBOARD_DAILY,
    weekly: LEADERBOARD_WEEKLY,
    monthly: LEADERBOARD_MONTHLY,
  };
  return map[tab];
}

// ─── History ──────────────────────────────────────────────────────────────────

export async function fetchHistory(): Promise<Session[]> {
  await delay(250);
  return MOCK_SESSIONS;
}

export async function searchHistory(query: string): Promise<Session[]> {
  await delay(150);
  const q = query.toLowerCase();
  return MOCK_SESSIONS.filter(
    (s) =>
      s.locationName.toLowerCase().includes(q) ||
      s.subjects.some((sub) => sub.toLowerCase().includes(q))
  );
}

// ─── Notifications ────────────────────────────────────────────────────────────

export async function fetchNotifications() {
  await delay(100);
  return MOCK_NOTIFICATIONS;
}

export async function markNotificationRead(id: string) {
  await delay(50);
  return { success: true, id };
}

// ─── Session ─────────────────────────────────────────────────────────────────

export async function submitSession(session: Omit<Session, "id">) {
  await delay(400);
  return { success: true, session: { ...session, id: `s${Date.now()}` } };
}

// ─── Sync Location ────────────────────────────────────────────────────────────

export async function syncLocation(territoryId: string) {
  await delay(500);
  const territory = MOCK_TERRITORIES.find((t) => t.id === territoryId);
  return {
    success: true,
    territory,
    nearbyUsers: MOCK_USERS.slice(0, 4).map((u) => ({
      user: u,
      isActive: true,
      minutesStudied: Math.floor(Math.random() * 60) + 15,
    })),
  };
}