"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";

interface Props {
  open: boolean;
  onAlwaysAllow: () => void;
  onWhileUsing: () => void;
  onDeny: () => void;
}

export default function GPSPermissionModal({ open, onAlwaysAllow, onWhileUsing, onDeny }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop — subtle, map still visible */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
          />

          {/* Dialog — centered like iOS system alert */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-10"
          >
            <div
              className="w-full max-w-[272px] rounded-[14px] overflow-hidden"
              style={{
                background: "rgba(242, 242, 247, 0.98)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.45), 0 4px 16px rgba(0,0,0,0.2)",
              }}
            >
              {/* ── Header ─────────────────────────────────────── */}
              <div className="flex flex-col items-center px-5 pt-5 pb-4 gap-2 text-center">
                {/* App icon */}
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.08, type: "spring", stiffness: 400, damping: 22 }}
                  className="w-14 h-14 rounded-[14px] flex items-center justify-center mb-0.5"
                  style={{
                    background: "linear-gradient(145deg, #FF9A20, #FF6B00)",
                    boxShadow: "0 4px 12px rgba(255,138,0,0.4)",
                  }}
                >
                  <MapPin size={28} color="#fff" fill="rgba(255,255,255,0.25)" />
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 }}
                  className="text-[17px] font-semibold leading-snug"
                  style={{ color: "#000", letterSpacing: "-0.2px" }}
                >
                  Allow &ldquo;readdiva&rdquo; to access your location?
                </motion.h2>

                {/* Body text */}
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16 }}
                  className="text-[13px] leading-relaxed"
                  style={{ color: "rgba(0,0,0,0.55)" }}
                >
                  Used to detect nearby study spots and claim
                  territory on the conquest map.
                </motion.p>
              </div>

              {/* ── Buttons ────────────────────────────────────── */}

              {/* Separator */}
              <div style={{ height: "0.5px", background: "rgba(0,0,0,0.18)" }} />

              {/* อนุญาตครั้งเดียว */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                onClick={onAlwaysAllow}
                className="w-full py-[13px] text-[17px] font-normal transition-colors duration-100
                           active:bg-black/10"
                style={{ color: "#007AFF" }}
              >
                Allow Once
              </motion.button>

              {/* Separator */}
              <div style={{ height: "0.5px", background: "rgba(0,0,0,0.18)" }} />

              {/* อนุญาตในขณะที่ใช้งานแอพ */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.24 }}
                onClick={onWhileUsing}
                className="w-full py-[13px] text-[17px] font-normal transition-colors duration-100
                           active:bg-black/10"
                style={{ color: "#007AFF" }}
              >
                Allow While Using App
              </motion.button>

              {/* Separator */}
              <div style={{ height: "0.5px", background: "rgba(0,0,0,0.18)" }} />

              {/* ไม่อนุญาต */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28 }}
                onClick={onDeny}
                className="w-full py-[13px] text-[17px] font-normal transition-colors duration-100
                           active:bg-black/10"
                style={{ color: "#007AFF" }}
              >
                Don&apos;t Allow
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}