"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Clock, Coffee } from "lucide-react";

interface Props {
  open: boolean;
  onContinue: () => void;
  onBreak: () => void;
}

export default function AFKWarning({ open, onContinue, onBreak }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-5"
          >
            <div className="w-full max-w-[320px] rounded-[24px] p-6 text-center"
              style={{
                background: "#14142A",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              }}>
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl mb-4"
              >
                😴
              </motion.div>

              <h2 className="text-lg font-bold text-white mb-2">
                Have you been away too long?
              </h2>
              <p className="text-sm text-white/50 mb-6 leading-relaxed">
                Your session is still running. Are you still studying?
              </p>

              <div className="flex flex-col gap-2">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={onContinue}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #FF8A00, #FF6B00)",
                    color: "#fff",
                    boxShadow: "0 4px 16px rgba(255,138,0,0.3)",
                  }}
                >
                  <Clock size={16} />
                  Continue Studying
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={onBreak}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 text-white/60"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <Coffee size={16} />
                  Take a Break
                  <span className="text-xs text-white/30">(loses session time)</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}