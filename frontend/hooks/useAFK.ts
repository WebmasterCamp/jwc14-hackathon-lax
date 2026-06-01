"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const AFK_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes

export function useAFK(active: boolean, onAFK?: () => void) {
  const [isAFK, setIsAFK] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!active) return;
    timerRef.current = setTimeout(() => {
      setIsAFK(true);
      onAFK?.();
    }, AFK_THRESHOLD_MS);
  }, [active, onAFK]);

  const dismissAFK = useCallback(() => {
    setIsAFK(false);
    resetTimer();
  }, [resetTimer]);

  useEffect(() => {
    if (!active) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setIsAFK(false);
      return;
    }

    const events = ["mousemove", "keydown", "click", "touchstart", "scroll"];
    const handler = () => {
      if (isAFK) setIsAFK(false);
      resetTimer();
    };

    events.forEach((e) => window.addEventListener(e, handler, { passive: true }));
    resetTimer();

    return () => {
      events.forEach((e) => window.removeEventListener(e, handler));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, isAFK, resetTimer]);

  return { isAFK, dismissAFK };
}