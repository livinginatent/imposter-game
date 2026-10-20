import { useCallback, useEffect, useRef, useState } from 'react';
import { TIMER_TICK_MS } from '@/data/constants';

interface CountdownOptions {
  durationMs: number;
  onComplete: () => void;
}

export interface Countdown {
  readonly remainingMs: number;
  readonly isRunning: boolean;
  readonly toggle: () => void;
  readonly reset: () => void;
}

/**
 * Wall-clock countdown. `endAt` is the source of truth while running, so ticks that
 * fire late (background tabs, throttling) cannot accumulate drift.
 */
export function useCountdown({ durationMs, onComplete }: CountdownOptions): Countdown {
  const [pausedRemainingMs, setPausedRemainingMs] = useState(durationMs);
  const [endAt, setEndAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (endAt === null) return;

    const intervalId = window.setInterval(() => {
      const current = Date.now();

      if (current >= endAt) {
        setEndAt(null);
        setPausedRemainingMs(0);
        onCompleteRef.current();
        return;
      }

      setNow(current);
    }, TIMER_TICK_MS);

    return () => window.clearInterval(intervalId);
  }, [endAt]);

  const toggle = useCallback(() => {
    const current = Date.now();

    if (endAt !== null) {
      setPausedRemainingMs(Math.max(0, endAt - current));
      setEndAt(null);
      return;
    }

    if (pausedRemainingMs === 0) return;

    setNow(current);
    setEndAt(current + pausedRemainingMs);
  }, [endAt, pausedRemainingMs]);

  const reset = useCallback(() => {
    setEndAt(null);
    setPausedRemainingMs(durationMs);
  }, [durationMs]);

  const remainingMs = endAt !== null ? Math.max(0, endAt - now) : pausedRemainingMs;

  return {
    remainingMs,
    isRunning: endAt !== null,
    toggle,
    reset,
  };
}
