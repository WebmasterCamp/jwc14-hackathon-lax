"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle2 } from "lucide-react";

interface Props {
  open: boolean;
  durationMinutes: number;
  locationName: string;
  onSave: (rating: number) => void;
}

export default function SessionComplete({ open, durationMinutes, locationName, onSave }: Props) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [saved, setSaved] = useState(false);

  const h = Math.floor(durationMinutes / 60);
  const m = durationMinutes % 60;
  const timeStr = h > 0 ? `${h}h ${m}m` : `${m}m`;

  const handleSave = () => {
    if (!rating) return;
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setRating(0);
      onSave(rating);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-5"
          >
            <div className="w-full max-w-[340px] rounded-[28px] p-6"
              style={{
                background: "#14142A",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              }}>

              {saved ? (
                <motion.div
                  key="saved"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center gap-3 py-4"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle2 size={52} style={{ color: "#FF8A00" }} />
                  </motion.div>
                  <p className="text-lg font-bold text-white">Session Saved!</p>
                  <p className="text-sm text-white/50">Great work today 🎉</p>
                </motion.div>
              ) : (
                <>
                  {/* Session summary */}
                  <div className="text-center mb-5">
                    <div className="text-4xl mb-2">🎉</div>
                    <h2 className="text-xl font-bold text-white">Session Complete!</h2>
                    <p className="text-sm text-white/50 mt-1">
                      {timeStr} at <span className="text-white/70">{locationName}</span>
                    </p>

                    <div className="mt-4 py-3 px-4 rounded-xl"
                      style={{ background: "rgba(255,138,0,0.1)" }}>
                      <span className="text-2xl font-bold" style={{ color: "#FF8A00" }}>+{durationMinutes}</span>
                      <span className="text-sm text-white/60 ml-1">influence points</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="text-center">
                    <p className="text-sm font-semibold text-white mb-3">
                      How focused were you today?
                    </p>

                    <div className="flex justify-center gap-2 mb-5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          whileTap={{ scale: 0.85 }}
                          onMouseEnter={() => setHovered(star)}
                          onMouseLeave={() => setHovered(0)}
                          onClick={() => setRating(star)}
                        >
                          <Star
                            size={34}
                            fill={(hovered || rating) >= star ? "#FF8A00" : "none"}
                            style={{
                              color: (hovered || rating) >= star ? "#FF8A00" : "rgba(255,255,255,0.2)",
                              transition: "all 0.15s",
                            }}
                          />
                        </motion.button>
                      ))}
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleSave}
                      disabled={!rating}
                      className="w-full py-3.5 rounded-xl font-bold text-sm transition-all"
                      style={{
                        background: rating ? "linear-gradient(135deg, #FF8A00, #FF6B00)" : "rgba(255,255,255,0.08)",
                        color: rating ? "#fff" : "rgba(255,255,255,0.3)",
                        boxShadow: rating ? "0 4px 16px rgba(255,138,0,0.3)" : "none",
                      }}
                    >
                      Save Session
                    </motion.button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}