import { useCallback, useEffect, useRef } from 'react';

interface CarAnimation {
  carRef: React.RefObject<HTMLDivElement | null>;
  trackRef: React.RefObject<HTMLDivElement | null>;
  startAnimation: (duration: number) => void;
  stopAnimation: () => void;
  resetAnimation: () => void;
}

export function useCarAnimation(): CarAnimation {
  const carRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const stopAnimation = useCallback((): void => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const resetAnimation = useCallback((): void => {
    stopAnimation();

    if (carRef.current) {
      carRef.current.style.transform = 'translateX(0)';
    }
  }, [stopAnimation]);

  const startAnimation = useCallback(
    (duration: number): void => {
      const carElement = carRef.current;
      const trackElement = trackRef.current;

      if (!carElement || !trackElement) {
        return;
      }

      stopAnimation();

      const finishOffset = 60;
      const travelDistance = Math.max(
        trackElement.clientWidth - carElement.clientWidth - finishOffset,
        0,
      );

      const startedAt = performance.now();

      function animate(currentTime: number): void {
        const elapsedTime = currentTime - startedAt;
        const progress = Math.min(elapsedTime / duration, 1);
        const position = travelDistance * progress;

        carElement.style.transform = `translateX(${position}px)`;

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          animationFrameRef.current = null;
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    },
    [stopAnimation],
  );

  useEffect(
    () => () => {
      stopAnimation();
    },
    [stopAnimation],
  );

  return {
    carRef,
    trackRef,
    startAnimation,
    stopAnimation,
    resetAnimation,
  };
}