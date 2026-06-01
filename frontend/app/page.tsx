"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Bell, MapPin, Zap } from "lucide-react";
import MobileShell from "@/components/layout/MobileShell";
import TerritoryMap from "@/components/map/TerritoryMap";
import LocationModal from "@/components/map/LocationModal";
import GPSPermissionModal from "@/components/modals/GPSPermissionModal";
import type { Territory } from "@/lib/types";
import { CURRENT_USER, MOCK_NOTIFICATIONS } from "@/lib/mockData";

export default function HomePage() {
  const [gpsGranted, setGpsGranted] = useState<boolean | null>(null);
  const [showGPS, setShowGPS] = useState(false);
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showNotifDot, setShowNotifDot] = useState(true);

  // Show GPS modal on first visit
  useEffect(() => {
    const granted = localStorage.getItem("gps_granted");
    if (!granted) {
      const t = setTimeout(() => setShowGPS(true), 800);
      return () => clearTimeout(t);
    } else {
      setGpsGranted(true);
    }
  }, []);

  const handleGPSAllow = () => {
    localStorage.setItem("gps_granted", "true");
    setGpsGranted(true);
    setShowGPS(false);
  };

  const handleGPSDeny = () => {
    localStorage.setItem("gps_granted", "denied");
    setGpsGranted(false);
    setShowGPS(false);
  };

  const handleSelectTerritory = (t: Territory | null) => {
    setSelectedTerritory(t);
    if (t) setShowLocationModal(true);
  };

  const handleSync = (t: Territory) => {
    setShowLocationModal(false);
    // Navigate to focus page with pre-selected location
    window.location.href = `/focus?location=${t.id}`;
  };

  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <MobileShell fullHeight>
      {/* GPS Modal */}
      <GPSPermissionModal
        open={showGPS}
        onAllow={handleGPSAllow}
        onDeny={handleGPSDeny}
      />

      {/* Location Modal */}
      <LocationModal
        territory={selectedTerritory}
        open={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onSync={handleSync}
      />

      {/* Page content */}
      <div className="relative flex flex-col h-screen max-h-screen">
        {/* ── Header overlay (floating above map) ─────────── */}
        <div className="absolute top-0 left-0 right-0 z-30 px-4 pt-12 pb-3
                        bg-gradient-to-b from-[#08080F] via-[#08080F]/70 to-transparent">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-start justify-between"
          >
            <div>
              <p className="section-label">TERRITORY MAP</p>
              <h1 className="text-2xl font-bold text-white leading-tight mt-0.5">Bangkok</h1>
            </div>

            <div className="flex items-center gap-2 mt-1">
              {/* Streak badge */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{ background: "rgba(255,138,0,0.15)", border: "1px solid rgba(255,138,0,0.25)" }}>
                <Flame size={13} style={{ color: "#FF8A00" }} />
                <span className="text-xs font-bold" style={{ color: "#FF8A00" }}>
                  {CURRENT_USER.streak} streak
                </span>
              </div>

              {/* Notification bell */}
              <motion.button
                whileTap={{ scale: 0.92 }}
                className="relative w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.08)" }}
                onClick={() => setShowNotifDot(false)}
              >
                <Bell size={17} className="text-white/70" />
                {showNotifDot && unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                    style={{ background: "#FF8A00" }} />
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* GPS warning if denied */}
          <AnimatePresence>
            {gpsGranted === false && (
              <motion.div
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                className="mt-2 flex items-center gap-2 px-3 py-2 rounded-xl text-xs"
                style={{ background: "rgba(255,138,0,0.1)", color: "#FF8A00" }}
              >
                <MapPin size={12} />
                Location access denied — you can still browse territories manually.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Map (full screen) ────────────────────────────── */}
        <div className="flex-1 relative">
          <TerritoryMap
            onSelectTerritory={handleSelectTerritory}
            selectedId={selectedTerritory?.id ?? null}
          />
        </div>

        {/* ── Bottom floating legend ───────────────────────── */}
        <div className="absolute bottom-16 left-0 right-0 z-20 px-4 pb-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-2xl px-4 py-3 flex items-center gap-4"
          >
            {/* User stats mini */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-base"
                style={{ background: CURRENT_USER.color }}>
                🦊
              </div>
              <div>
                <div className="text-xs font-semibold text-white">{CURRENT_USER.username}</div>
                <div className="text-[10px] text-white/40">Lv.{CURRENT_USER.level} · #{CURRENT_USER.rank}</div>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-end gap-3">
              <div className="flex items-center gap-1.5">
                <MapPin size={12} style={{ color: "#FF8A00" }} />
                <span className="text-xs text-white/60">
                  <span className="font-bold text-white">{CURRENT_USER.territoriesCount}</span> zones
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap size={12} style={{ color: "#FF8A00" }} />
                <span className="text-xs text-white/60">
                  <span className="font-bold text-white">{CURRENT_USER.totalStudyMinutes.toLocaleString()}</span> pts
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MobileShell>
  );
}