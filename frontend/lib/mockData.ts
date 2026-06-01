import type {
  User, Territory, LeaderboardEntry, Session,
  Achievement, AppNotification, DailyStats,
  SubjectDistribution, AvatarOption,
} from "./types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hexPoly(lat: number, lng: number, radiusKm: number, sides = 6, rot = 0): [number, number][] {
  const latDeg = 1 / 111.32;
  const lngDeg = 1 / (111.32 * Math.cos((lat * Math.PI) / 180));
  return Array.from({ length: sides }, (_, i) => {
    const angle = ((i * 360) / sides + rot) * (Math.PI / 180);
    const r = radiusKm * (0.85 + 0.15 * Math.sin(i * 1.9));
    return [lat + r * latDeg * Math.cos(angle), lng + r * lngDeg * Math.sin(angle)] as [number, number];
  });
}

// ─── Mock Users ───────────────────────────────────────────────────────────────

export const MOCK_USERS: User[] = [
  {
    id: "u1", username: "FoxReader", animal: "fox", color: "#FF8A00",
    level: 18, rank: 1, totalStudyMinutes: 2760, streak: 14,
    territoriesCount: 3, achievements: ["first_hour", "streak_7", "territory_king"],
    weeklyMinutes: 1260, isCurrentUser: true,
  },
  {
    id: "u2", username: "OwlScholar", animal: "owl", color: "#7B4FD4",
    level: 15, rank: 2, totalStudyMinutes: 2340, streak: 11,
    territoriesCount: 2, achievements: ["first_hour", "streak_7"],
    weeklyMinutes: 1080,
  },
  {
    id: "u3", username: "PandaLearns", animal: "panda", color: "#3B6BB0",
    level: 12, rank: 3, totalStudyMinutes: 1980, streak: 9,
    territoriesCount: 2, achievements: ["first_hour", "cafe_explorer"],
    weeklyMinutes: 930,
  },
  {
    id: "u4", username: "BearWrites", animal: "bear", color: "#1E8C82",
    level: 10, rank: 4, totalStudyMinutes: 1680, streak: 9,
    territoriesCount: 1, achievements: ["first_hour"],
    weeklyMinutes: 780,
  },
  {
    id: "u5", username: "LionReads", animal: "lion", color: "#C4762A",
    level: 9, rank: 5, totalStudyMinutes: 1440, streak: 6,
    territoriesCount: 1, achievements: ["first_hour"],
    weeklyMinutes: 690,
  },
  {
    id: "u6", username: "WolfStudy", animal: "wolf", color: "#5B60C8",
    level: 8, rank: 6, totalStudyMinutes: 1200, streak: 4,
    territoriesCount: 1, achievements: ["first_hour"],
    weeklyMinutes: 570,
  },
  {
    id: "u7", username: "RabbitBooks", animal: "rabbit", color: "#8C3C5C",
    level: 7, rank: 7, totalStudyMinutes: 960, streak: 2,
    territoriesCount: 0, achievements: ["first_hour"],
    weeklyMinutes: 420,
  },
  {
    id: "u8", username: "TigerFocus", animal: "tiger", color: "#8C3C3C",
    level: 6, rank: 8, totalStudyMinutes: 780, streak: 1,
    territoriesCount: 0, achievements: [],
    weeklyMinutes: 300,
  },
];

export const CURRENT_USER = MOCK_USERS[0];

// ─── Mock Territories (Bangkok Co-Working Spaces) ─────────────────────────────

export const MOCK_TERRITORIES: Territory[] = [
  {
    id: "t1",
    name: "Samyan Mitr Town",
    type: "coworking",
    lat: 13.7316, lng: 100.5263,
    owner: MOCK_USERS[0],
    color: "amber",
    influenceScore: 2760,
    totalStudyMinutes: 5420,
    popularSubjects: ["Reading", "Coding", "Mathematics"],
    sessionCount: 89,
    localLeaderboard: [
      { rank: 1, user: MOCK_USERS[0], studyMinutes: 2760, territoriesCount: 3, streak: 14 },
      { rank: 2, user: MOCK_USERS[2], studyMinutes: 1980, territoriesCount: 2, streak: 9 },
      { rank: 3, user: MOCK_USERS[4], studyMinutes: 1440, territoriesCount: 1, streak: 6 },
    ],
    polygon: hexPoly(13.7316, 100.5263, 0.55, 6, 15),
    radius: 0.55,
  },
  {
    id: "t2",
    name: "Siam Paragon Study",
    type: "cafe",
    lat: 13.7459, lng: 100.5351,
    owner: MOCK_USERS[1],
    color: "purple",
    influenceScore: 2340,
    totalStudyMinutes: 4800,
    popularSubjects: ["English", "TGAT", "Science"],
    sessionCount: 72,
    localLeaderboard: [
      { rank: 1, user: MOCK_USERS[1], studyMinutes: 2340, territoriesCount: 2, streak: 11 },
      { rank: 2, user: MOCK_USERS[3], studyMinutes: 1680, territoriesCount: 1, streak: 9 },
      { rank: 3, user: MOCK_USERS[6], studyMinutes: 960, territoriesCount: 0, streak: 2 },
    ],
    polygon: hexPoly(13.7459, 100.5351, 0.6, 7, 0),
    radius: 0.6,
  },
  {
    id: "t3",
    name: "The Commons Thonglor",
    type: "cafe",
    lat: 13.7298, lng: 100.5762,
    owner: MOCK_USERS[2],
    color: "blue",
    influenceScore: 1980,
    totalStudyMinutes: 3960,
    popularSubjects: ["Coding", "Language", "Physics"],
    sessionCount: 58,
    localLeaderboard: [
      { rank: 1, user: MOCK_USERS[2], studyMinutes: 1980, territoriesCount: 2, streak: 9 },
      { rank: 2, user: MOCK_USERS[5], studyMinutes: 1200, territoriesCount: 1, streak: 4 },
      { rank: 3, user: MOCK_USERS[7], studyMinutes: 780, territoriesCount: 0, streak: 1 },
    ],
    polygon: hexPoly(13.7298, 100.5762, 0.5, 6, 30),
    radius: 0.5,
  },
  {
    id: "t4",
    name: "WeWork One Bangkok",
    type: "coworking",
    lat: 13.7237, lng: 100.5453,
    owner: MOCK_USERS[3],
    color: "teal",
    influenceScore: 1680,
    totalStudyMinutes: 3200,
    popularSubjects: ["Coding", "Mathematics", "TPAT3"],
    sessionCount: 51,
    localLeaderboard: [
      { rank: 1, user: MOCK_USERS[3], studyMinutes: 1680, territoriesCount: 1, streak: 9 },
      { rank: 2, user: MOCK_USERS[0], studyMinutes: 1420, territoriesCount: 3, streak: 14 },
      { rank: 3, user: MOCK_USERS[4], studyMinutes: 900, territoriesCount: 1, streak: 6 },
    ],
    polygon: hexPoly(13.7237, 100.5453, 0.65, 8, 10),
    radius: 0.65,
  },
  {
    id: "t5",
    name: "TCDC Resource Center",
    type: "library",
    lat: 13.7244, lng: 100.5152,
    owner: MOCK_USERS[4],
    color: "crimson",
    influenceScore: 1440,
    totalStudyMinutes: 2800,
    popularSubjects: ["Reading", "TGAT", "Biology"],
    sessionCount: 44,
    localLeaderboard: [
      { rank: 1, user: MOCK_USERS[4], studyMinutes: 1440, territoriesCount: 1, streak: 6 },
      { rank: 2, user: MOCK_USERS[6], studyMinutes: 960, territoriesCount: 0, streak: 2 },
      { rank: 3, user: MOCK_USERS[7], studyMinutes: 780, territoriesCount: 0, streak: 1 },
    ],
    polygon: hexPoly(13.7244, 100.5152, 0.58, 6, 45),
    radius: 0.58,
  },
  {
    id: "t6",
    name: "Hubba-TO Ekkamai",
    type: "coworking",
    lat: 13.7215, lng: 100.5879,
    owner: null,
    color: "emerald",
    influenceScore: 0,
    totalStudyMinutes: 1200,
    popularSubjects: ["Coding", "English"],
    sessionCount: 23,
    localLeaderboard: [
      { rank: 1, user: MOCK_USERS[5], studyMinutes: 480, territoriesCount: 1, streak: 4 },
      { rank: 2, user: MOCK_USERS[2], studyMinutes: 360, territoriesCount: 2, streak: 9 },
    ],
    polygon: hexPoly(13.7215, 100.5879, 0.5, 6, 20),
    radius: 0.5,
  },
  {
    id: "t7",
    name: "True Digital Park",
    type: "coworking",
    lat: 13.6669, lng: 100.5978,
    owner: null,
    color: "navy",
    influenceScore: 0,
    totalStudyMinutes: 890,
    popularSubjects: ["Coding", "Mathematics"],
    sessionCount: 17,
    localLeaderboard: [
      { rank: 1, user: MOCK_USERS[6], studyMinutes: 360, territoriesCount: 0, streak: 2 },
    ],
    polygon: hexPoly(13.6669, 100.5978, 0.7, 7, 5),
    radius: 0.7,
  },
  {
    id: "t8",
    name: "Mango Laman Ratchada",
    type: "cafe",
    lat: 13.7650, lng: 100.5650,
    owner: null,
    color: "rose",
    influenceScore: 0,
    totalStudyMinutes: 650,
    popularSubjects: ["Reading", "Language"],
    sessionCount: 12,
    localLeaderboard: [
      { rank: 1, user: MOCK_USERS[7], studyMinutes: 280, territoriesCount: 0, streak: 1 },
    ],
    polygon: hexPoly(13.765, 100.565, 0.55, 6, 35),
    radius: 0.55,
  },
];

// ─── Leaderboard Data ─────────────────────────────────────────────────────────

export const LEADERBOARD_DAILY: LeaderboardEntry[] = MOCK_USERS.map((u, i) => ({
  rank: i + 1,
  user: u,
  studyMinutes: Math.round(u.totalStudyMinutes / 15) - i * 12,
  territoriesCount: u.territoriesCount,
  streak: u.streak,
}));

export const LEADERBOARD_WEEKLY: LeaderboardEntry[] = MOCK_USERS.map((u, i) => ({
  rank: i + 1,
  user: u,
  studyMinutes: u.weeklyMinutes,
  territoriesCount: u.territoriesCount,
  streak: u.streak,
}));

export const LEADERBOARD_MONTHLY: LeaderboardEntry[] = MOCK_USERS.map((u, i) => ({
  rank: i + 1,
  user: u,
  studyMinutes: u.totalStudyMinutes,
  territoriesCount: u.territoriesCount,
  streak: u.streak,
}));

// ─── Session History ──────────────────────────────────────────────────────────

export const MOCK_SESSIONS: Session[] = [
  {
    id: "s1", startTime: "2026-06-01T08:00:00", endTime: "2026-06-01T09:00:00",
    durationMinutes: 60, subjects: ["Reading", "Mathematics"],
    locationId: "t1", locationName: "Samyan Mitr Town", focusRating: 5,
    date: "2026-06-01",
  },
  {
    id: "s2", startTime: "2026-06-01T10:30:00", endTime: "2026-06-01T11:15:00",
    durationMinutes: 45, subjects: ["Coding"],
    locationId: "t1", locationName: "Samyan Mitr Town", focusRating: 4,
    date: "2026-06-01",
  },
  {
    id: "s3", startTime: "2026-06-01T13:00:00", endTime: "2026-06-01T13:30:00",
    durationMinutes: 30, subjects: ["English", "TGAT"],
    locationId: "t2", locationName: "Siam Paragon Study", focusRating: 3,
    date: "2026-06-01",
  },
  {
    id: "s4", startTime: "2026-05-31T09:00:00", endTime: "2026-05-31T10:00:00",
    durationMinutes: 60, subjects: ["Reading"],
    locationId: "t3", locationName: "The Commons Thonglor", focusRating: 5,
    date: "2026-05-31",
  },
  {
    id: "s5", startTime: "2026-05-31T14:00:00", endTime: "2026-05-31T14:45:00",
    durationMinutes: 45, subjects: ["Coding", "Mathematics"],
    locationId: "t1", locationName: "Samyan Mitr Town", focusRating: 4,
    date: "2026-05-31",
  },
  {
    id: "s6", startTime: "2026-05-30T10:00:00", endTime: "2026-05-30T11:30:00",
    durationMinutes: 90, subjects: ["Physics", "Mathematics"],
    locationId: "t4", locationName: "WeWork One Bangkok", focusRating: 4,
    date: "2026-05-30",
  },
  {
    id: "s7", startTime: "2026-05-29T08:30:00", endTime: "2026-05-29T09:30:00",
    durationMinutes: 60, subjects: ["Reading"],
    locationId: "t5", locationName: "TCDC Resource Center", focusRating: 5,
    date: "2026-05-29",
  },
  {
    id: "s8", startTime: "2026-05-28T15:00:00", endTime: "2026-05-28T15:30:00",
    durationMinutes: 30, subjects: ["Language", "English"],
    locationId: "t2", locationName: "Siam Paragon Study", focusRating: 3,
    date: "2026-05-28",
  },
];

// ─── Subject Distribution ─────────────────────────────────────────────────────

export const SUBJECT_DISTRIBUTION: SubjectDistribution[] = [
  { subject: "Reading",     minutes: 225, percentage: 42, color: "#FF8A00" },
  { subject: "Coding",      minutes: 135, percentage: 25, color: "#5B60C8" },
  { subject: "Science",     minutes: 97,  percentage: 18, color: "#1E8C82" },
  { subject: "Language",    minutes: 81,  percentage: 15, color: "#7B4FD4" },
];

// ─── Hourly Progress Data ─────────────────────────────────────────────────────

export const TODAY_HOURLY = [
  { hour: "8am",  today: 0,  yesterday: 0 },
  { hour: "9am",  today: 55, yesterday: 30 },
  { hour: "10am", today: 55, yesterday: 45 },
  { hour: "11am", today: 100, yesterday: 45 },
  { hour: "12pm", today: 100, yesterday: 60 },
  { hour: "1pm",  today: 115, yesterday: 60 },
  { hour: "2pm",  today: 135, yesterday: 90 },
  { hour: "3pm",  today: 165, yesterday: 105 },
  { hour: "4pm",  today: 195, yesterday: 130 },
  { hour: "5pm",  today: 215, yesterday: 155 },
  { hour: "6pm",  today: 225, yesterday: 165 },
];

// ─── Achievements ─────────────────────────────────────────────────────────────

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_hour",
    name: "First Hour",
    description: "Complete your first study hour",
    icon: "📚",
    color: "#FF8A00",
    unlocked: true,
    unlockedAt: "2026-05-15",
    requirement: "Study 1 hour total",
  },
  {
    id: "streak_7",
    name: "7-Day Streak",
    description: "Study 7 days in a row",
    icon: "🔥",
    color: "#FF6B00",
    unlocked: true,
    unlockedAt: "2026-05-22",
    requirement: "7 consecutive days",
  },
  {
    id: "cafe_explorer",
    name: "Cafe Explorer",
    description: "Visit 3 different study locations",
    icon: "☕",
    color: "#C4762A",
    unlocked: true,
    unlockedAt: "2026-05-25",
    requirement: "Study at 3 locations",
  },
  {
    id: "territory_king",
    name: "Territory King",
    description: "Conquer 3 territories simultaneously",
    icon: "👑",
    color: "#7B4FD4",
    unlocked: true,
    unlockedAt: "2026-05-28",
    requirement: "Hold 3 territories",
  },
  {
    id: "night_owl",
    name: "Night Owl",
    description: "Study after midnight",
    icon: "🦉",
    color: "#3B6BB0",
    unlocked: false,
    requirement: "Study past 12am",
  },
  {
    id: "speed_reader",
    name: "Speed Reader",
    description: "Complete 5 sessions in one day",
    icon: "⚡",
    color: "#1E8C82",
    unlocked: false,
    requirement: "5 sessions in a day",
  },
  {
    id: "bookworm",
    name: "Bookworm",
    description: "Accumulate 50 hours of reading",
    icon: "🐛",
    color: "#5B60C8",
    unlocked: false,
    requirement: "50 total hours",
  },
  {
    id: "streak_30",
    name: "30-Day Streak",
    description: "Study 30 days in a row",
    icon: "🏆",
    color: "#C4762A",
    unlocked: false,
    requirement: "30 consecutive days",
  },
  {
    id: "math_master",
    name: "Math Master",
    description: "10 hours of Mathematics",
    icon: "🧮",
    color: "#FF8A00",
    unlocked: false,
    requirement: "10 hours Mathematics",
  },
  {
    id: "top3",
    name: "Top 3",
    description: "Reach Top 3 on the leaderboard",
    icon: "🥉",
    color: "#7B4FD4",
    unlocked: false,
    requirement: "Rank 1–3 globally",
  },
  {
    id: "conqueror",
    name: "Conqueror",
    description: "Conquer 5 territories",
    icon: "⚔️",
    color: "#8C3C3C",
    unlocked: false,
    requirement: "Hold 5 territories",
  },
  {
    id: "zen_master",
    name: "Zen Master",
    description: "Rate focus 5 stars 10 times",
    icon: "🧘",
    color: "#1E8C82",
    unlocked: false,
    requirement: "10× five-star focus",
  },
];

// ─── Notifications ────────────────────────────────────────────────────────────

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: "n1", icon: "🏆", title: "Territory Conquered!",
    body: "You've taken over Samyan Mitr Town. Keep reading to defend it!",
    time: "2m ago", read: false, type: "territory",
  },
  {
    id: "n2", icon: "🔥", title: "14-Day Streak!",
    body: "You've studied 14 days in a row. You're unstoppable!",
    time: "1h ago", read: false, type: "streak",
  },
  {
    id: "n3", icon: "⚔️", title: "Territory Under Attack!",
    body: "OwlScholar is closing in on your Siam Paragon zone. Study more to defend!",
    time: "3h ago", read: true, type: "challenge",
  },
  {
    id: "n4", icon: "📚", title: "Almost There!",
    body: "Only 45 minutes left to reach your daily reading goal.",
    time: "5h ago", read: true, type: "goal",
  },
  {
    id: "n5", icon: "🎉", title: "Achievement Unlocked!",
    body: "You've earned the 'Territory King' badge!",
    time: "Yesterday", read: true, type: "achievement",
  },
];

// ─── Avatar Options ───────────────────────────────────────────────────────────

export const AVATAR_OPTIONS: AvatarOption[] = [
  { animal: "fox",      emoji: "🦊", name: "Fox",      unlocked: true },
  { animal: "owl",      emoji: "🦉", name: "Owl",      unlocked: true },
  { animal: "panda",    emoji: "🐼", name: "Panda",    unlocked: true },
  { animal: "bear",     emoji: "🐻", name: "Bear",     unlocked: true },
  { animal: "rabbit",   emoji: "🐰", name: "Rabbit",   unlocked: true },
  { animal: "cat",      emoji: "🐱", name: "Cat",      unlocked: false, requiresAchievement: "streak_7" },
  { animal: "wolf",     emoji: "🐺", name: "Wolf",     unlocked: false, requiresAchievement: "territory_king" },
  { animal: "lion",     emoji: "🦁", name: "Lion",     unlocked: false, requiresAchievement: "streak_7" },
  { animal: "tiger",    emoji: "🐯", name: "Tiger",    unlocked: false, requiresAchievement: "math_master" },
  { animal: "hamster",  emoji: "🐹", name: "Hamster",  unlocked: false },
  { animal: "elephant", emoji: "🐘", name: "Elephant", unlocked: false, requiresAchievement: "bookworm" },
  { animal: "monkey",   emoji: "🐒", name: "Monkey",   unlocked: false },
  { animal: "penguin",  emoji: "🐧", name: "Penguin",  unlocked: false, requiresAchievement: "night_owl" },
  { animal: "duck",     emoji: "🦆", name: "Duck",     unlocked: false },
  { animal: "frog",     emoji: "🐸", name: "Frog",     unlocked: false },
  { animal: "horse",    emoji: "🐴", name: "Horse",    unlocked: false, requiresAchievement: "streak_30" },
  { animal: "deer",     emoji: "🦌", name: "Deer",     unlocked: false },
  { animal: "koala",    emoji: "🐨", name: "Koala",    unlocked: false, requiresAchievement: "zen_master" },
  { animal: "raccoon",  emoji: "🦝", name: "Raccoon",  unlocked: false },
  { animal: "capybara", emoji: "🦫", name: "Capybara", unlocked: false, requiresAchievement: "conqueror" },
];

// ─── Animal emoji helper ──────────────────────────────────────────────────────

export const ANIMAL_EMOJI: Record<string, string> = Object.fromEntries(
  AVATAR_OPTIONS.map((a) => [a.animal, a.emoji])
);

// ─── Territory color hex map ──────────────────────────────────────────────────

export const TERRITORY_COLORS: Record<string, { fill: string; border: string; shadow: string }> = {
  amber:   { fill: "rgba(196,118,42,0.55)",  border: "#C4762A", shadow: "rgba(196,118,42,0.4)" },
  purple:  { fill: "rgba(123,79,212,0.55)",  border: "#7B4FD4", shadow: "rgba(123,79,212,0.4)" },
  blue:    { fill: "rgba(59,107,176,0.55)",  border: "#3B6BB0", shadow: "rgba(59,107,176,0.4)" },
  teal:    { fill: "rgba(30,140,130,0.55)",  border: "#1E8C82", shadow: "rgba(30,140,130,0.4)" },
  crimson: { fill: "rgba(140,60,60,0.55)",   border: "#8C3C3C", shadow: "rgba(140,60,60,0.4)" },
  emerald: { fill: "rgba(46,125,110,0.55)",  border: "#2E7D6E", shadow: "rgba(46,125,110,0.4)" },
  rose:    { fill: "rgba(140,60,92,0.55)",   border: "#8C3C5C", shadow: "rgba(140,60,92,0.4)" },
  navy:    { fill: "rgba(46,74,125,0.55)",   border: "#2E4A7D", shadow: "rgba(46,74,125,0.4)" },
};