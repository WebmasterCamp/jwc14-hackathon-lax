"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen } from "lucide-react";

interface Props {
  onDone: () => void;
}

export default function SplashScreen({ onDone }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 400);
    }, 2600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "#08080F" }}
          onClick={() => {
            setVisible(false);
            setTimeout(onDone, 400);
          }}
        >
          {/* Subtle radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,138,0,0.12) 0%, transparent 70%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 320, damping: 24 }}
            className="flex flex-col items-center gap-5 px-8 text-center relative"
          >
            {/* App icon */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 400, damping: 20 }}
              className="w-20 h-20 rounded-[24px] flex items-center justify-center"
              style={{
                background: "linear-gradient(145deg, #2A1A08, #1A0E00)",
                border: "1px solid rgba(255,138,0,0.3)",
                boxShadow: "0 0 32px rgba(255,138,0,0.25), 0 8px 24px rgba(0,0,0,0.5)",
              }}
            >
              <BookOpen size={38} style={{ color: "#FF8A00" }} />
            </motion.div>

            {/* App name */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-4xl font-bold tracking-tight text-white"
            >
              readdiva
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-[15px] leading-relaxed max-w-[260px]"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              แอปจับเวลาอ่านหนังสือ
              <br />
              &amp; แข่งขันยึดพื้นที่ในรูปแบบ gamification
            </motion.p>

            {/* Orange accent line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="w-12 h-0.5 rounded-full"
              style={{ background: "#FF8A00", transformOrigin: "center" }}
            />
          </motion.div>

          {/* Tap to skip hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-12 text-xs"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            แตะเพื่อข้าม
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}