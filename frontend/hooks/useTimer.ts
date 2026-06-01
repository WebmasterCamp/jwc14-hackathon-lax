"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export type TimerState = "idle" | "running" | "paused" | "complete";

interface UseTimerReturn {
  seconds: number;
  totalSeconds: number;
  state: TimerState;
  progress: number;       // 0–1
  formattedTime: string;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  setDuration: (minutes: number) => void;
}

export function useTimer(initialMinutes = 25): UseTimerReturn {
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60);
  const [seconds, setSeconds] = useState(initialMinutes * 60);
  const [state, setState] = useState<TimerState>("idle");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const start = useCallback(() => {
    setState("running");
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setState("complete");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const pause = useCallback(() => {
    clear();
    setState("paused");
  }, []);

  const resume = useCallback(() => {
    setState("running");
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setState("complete");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const reset = useCallback(() => {
    clear();
    setSeconds(totalSeconds);
    setState("idle");
  }, [totalSeconds]);

  const setDuration = useCallback((minutes: number) => {
    clear();
    const secs = minutes * 60;
    setTotalSeconds(secs);
    setSeconds(secs);
    setState("idle");
  }, []);

  useEffect(() => () => clear(), []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const formattedTime = `${pad(mins)}:${pad(secs)}`;
  const progress = totalSeconds > 0 ? 1 - seconds / totalSeconds : 0;

  return { seconds, totalSeconds, state, progress, formattedTime, start, pause, resume, reset, setDuration };
}