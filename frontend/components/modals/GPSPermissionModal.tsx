"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";

interface Props {
  open: boolean;
  onAllow: () => void;
  onDeny: () => void;
}

export default function GPSPermissionModal({ open, onAllow, onDeny }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <div
              className="w-full max-w-[310px] rounded-[22px] overflow-hidden"
              style={{
                background: "rgba(22, 22, 36, 0.97)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
              }}
            >
              {/* Content area */}
              <div className="flex flex-col items-center px-6 pt-7 pb-5 gap-3 text-center">
                {/* App Icon */}
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 400 }}
                  className="w-16 h-16 rounded-[18px] flex items-center justify-center mb-1"
                  style={{
                    background: "linear-gradient(145deg, #2A1A0A, #1A0A00)",
                    border: "1px solid rgba(255,138,0,0.25)",
                    boxShadow: "0 4px 20px rgba(255,138,0,0.2)",
                  }}
                >
                  <MapPin size={30} className="text-orange-DEFAULT" style={{ color: "#FF8A00" }} />
                </motion.div>

                {/* Heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-[17px] font-semibold leading-snug text-white"
                >
                  Allow &ldquo;readdiva&rdquo; to access your location?
                </motion.h2>

                {/* Sub-text */}
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-[13px] leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Used to detect nearby study spots and claim territory on the conquest map.
                </motion.p>
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: "rgba(255,255,255,0.1)" }} />

              {/* Buttons */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                onClick={onDeny}
                className="w-full py-[14px] text-[16px] font-medium text-white/70
                           transition-colors duration-150 hover:bg-white/5 active:bg-white/10"
              >
                Don&apos;t Allow
              </motion.button>

              <div style={{ height: "1px", background: "rgba(255,255,255,0.1)" }} />

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={onAllow}
                className="w-full py-[14px] text-[16px] font-semibold
                           transition-colors duration-150 hover:bg-white/5 active:bg-white/10"
                style={{ color: "#FF8A00" }}
              >
                Allow While Using App
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}