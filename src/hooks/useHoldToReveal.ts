import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type PointerEvent as ReactPointerEvent,
} from 'react';

interface HoldOptions {
  onHoldStart: () => void;
  onHoldEnd: () => void;
}

export type HoldPointerHandlers = Pick<
  HTMLAttributes<HTMLElement>,
  | 'onPointerDown'
  | 'onPointerUp'
  | 'onPointerCancel'
  | 'onLostPointerCapture'
  | 'onContextMenu'
  | 'onDragStart'
>;

export interface HoldToReveal {
  readonly isHeld: boolean;
  readonly handlers: HoldPointerHandlers;
}

/**
 * Press-and-hold primitive that stays safe on touch and mouse:
 * - Only one pointer can hold at a time; extra fingers are ignored.
 * - Non-primary mouse buttons are ignored.
 * - Pointer capture keeps the release event on the zone even if the finger drifts off it.
 * - Window-level release (pointerup, pointercancel, blur, tab hidden) is a backstop, so the
 *   role can never stay on screen after the player stops holding.
 */
export function useHoldToReveal({ onHoldStart, onHoldEnd }: HoldOptions): HoldToReveal {
  const [isHeld, setIsHeld] = useState(false);
  const activePointerRef = useRef<number | null>(null);
  const callbacksRef = useRef({ onHoldStart, onHoldEnd });

  useEffect(() => {
    callbacksRef.current = { onHoldStart, onHoldEnd };
  }, [onHoldStart, onHoldEnd]);

  const release = useCallback((pointerId?: number) => {
    const activePointer = activePointerRef.current;

    if (activePointer === null) return;
    if (pointerId !== undefined && pointerId !== activePointer) return;

    activePointerRef.current = null;
    setIsHeld(false);
    callbacksRef.current.onHoldEnd();
  }, []);

  useEffect(() => {
    const handleWindowPointer = (event: PointerEvent) => release(event.pointerId);
    const handleWindowBlur = () => release();
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') release();
    };

    window.addEventListener('pointerup', handleWindowPointer);
    window.addEventListener('pointercancel', handleWindowPointer);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('pointerup', handleWindowPointer);
      window.removeEventListener('pointercancel', handleWindowPointer);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [release]);

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (activePointerRef.current !== null) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    activePointerRef.current = event.pointerId;

    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Capture is best-effort; the window-level listeners still end the hold.
    }

    setIsHeld(true);
    callbacksRef.current.onHoldStart();
  }, []);

  const onPointerUp = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => release(event.pointerId),
    [release],
  );

  const onPointerCancel = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => release(event.pointerId),
    [release],
  );

  const onLostPointerCapture = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => release(event.pointerId),
    [release],
  );

  // Suppresses the long-press context menu and image drag ghosts on mobile.
  const preventDefault = useCallback((event: { preventDefault: () => void }) => {
    event.preventDefault();
  }, []);

  return {
    isHeld,
    handlers: {
      onPointerDown,
      onPointerUp,
      onPointerCancel,
      onLostPointerCapture,
      onContextMenu: preventDefault,
      onDragStart: preventDefault,
    },
  };
}
