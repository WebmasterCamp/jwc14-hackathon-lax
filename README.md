# readdiva — Read. Conquer. Repeat.

A gamification platform that turns reading time into territorial conquest. Study at real Bangkok co-working spaces, accumulate influence, and conquer zones on a live territory map.

---

## Architecture

**Frontend-only** — all data is served from an in-memory mock API layer (`lib/mockApi.ts` + `lib/mockData.ts`). No backend or database required. The code structure is production-ready and can be extended to a real API at any time by swapping the imports in `mockApi.ts`.

```
readdiva/
└── frontend/
    ├── app/                    # Next.js App Router pages
    │   ├── page.tsx            # Home — Territory Map (hero)
    │   ├── focus/page.tsx      # Study Timer + Focus Mode
    │   ├── leaderboard/page.tsx
    │   ├── history/page.tsx    # Analytics + Charts
    │   └── avatar/page.tsx     # Avatar & Achievements
    ├── components/
    │   ├── layout/             # BottomNav, MobileShell
    │   ├── map/                # TerritoryMap (Leaflet), LocationModal
    │   ├── modals/             # GPSPermissionModal
    │   └── session/            # DailyGoalWidget, SessionComplete, AFKWarning
    ├── hooks/
    │   ├── useTimer.ts         # Countdown timer with state machine
    │   └── useAFK.ts           # Away-from-keyboard detection
    └── lib/
        ├── types.ts            # All TypeScript interfaces
        ├── mockData.ts         # Bangkok territories, users, sessions, achievements
        └── mockApi.ts          # Async mock endpoints (drop-in replaceable)
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Map | React Leaflet + CartoDB Dark tiles |
| Charts | Recharts |
| Icons | Lucide React |

---

## Features

### Territory Map (Hero)
- Interactive React Leaflet map centered on Bangkok
- 8 real co-working spaces with actual lat/lng coordinates
- GeoJSON polygon territories colored by owner
- Animal avatar pins for each conquered zone
- Unclaimed zones shown as dashed outlines
- Click any territory → Location modal with local leaderboard + Sync button

### Focus / Study Timer
- Circular progress ring (Framer Motion animated)
- Preset durations: 15 / 30 / 45 / 60 min
- Play, Pause, Reset controls
- **Focus Mode** — fullscreen distraction-free overlay
- **AFK Warning** — detects inactivity after 5 minutes
- **Session Complete** — star rating popup (1–5) saved to state
- Daily Goal Widget with animated progress ring

### Leaderboard
- Daily / Weekly / Monthly tabs
- Top-3 animated podium with crowns and medals
- Ranked list with avatar, zones, streak, and study hours

### History / Analytics
- 5 stat cards: Today, Weekly, Streak, Rank, Level
- Line chart: Today vs Yesterday hourly progress (Recharts)
- Subject Breakdown donut chart
- Monthly mini calendar with session highlights
- Session log with search + inline star ratings

### Avatar & Badges
- 4×5 animal grid — 5 unlocked, 15 locked (requires achievements)
- Live avatar preview card with pulsing glow
- 12 achievement badges (animated, locked/unlocked states)

### GPS Permission Modal
- iPhone-style prompt on first launch
- "Allow While Using App" in orange CTA style
- Persisted in localStorage

---

## Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn** or **pnpm**

---

## Install & Run

```bash
# 1. Go to the frontend folder
cd frontend

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Open in browser
# http://localhost:3000
```

That's it — no environment variables, no database, no backend process.

---

## Mock Data Overview

| Resource | Count |
|---|---|
| Bangkok co-working locations | 8 |
| Mock users | 8 (FoxReader, OwlScholar, PandaLearns…) |
| Session history entries | 8 |
| Achievement badges | 12 |
| Animal avatars | 20 (5 unlocked) |
| Notifications | 5 |

### Extending to a real API

Replace any function in `lib/mockApi.ts` with a real `fetch()` call:

```typescript
// Before (mock)
export async function fetchTerritories(): Promise<Territory[]> {
  await delay(300);
  return MOCK_TERRITORIES;
}

// After (real API)
export async function fetchTerritories(): Promise<Territory[]> {
  const res = await fetch("/api/territories");
  return res.json();
}
```

No other files need to change.

---

## Build for Production

```bash
cd frontend
npm run build
npm start
```

---

## Design System

| Token | Value |
|---|---|
| Background | `#08080F` |
| Surface | `#10101C` / `#18182A` |
| Orange accent | `#FF8A00` |
| Purple | `#6C3FC4` |
| Indigo | `#5B60C8` |
| Border | `rgba(255,255,255,0.07)` |

---

*Built for readdiva.in.th prototype — Hackathon / Pitch ready.*# jwc14-hackathon-lax
