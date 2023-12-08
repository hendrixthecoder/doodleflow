import { Draw, Point } from "@/lib/types";
import { useEffect, useRef, useState } from "react";

export const useDraw = (
  onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void
) => {
  const [drawing, setDrawing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPoint = useRef<null | Point>(null);

  const startDrawing = () => setDrawing(true);
  const stopDrawing = () => setDrawing(false);

  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (!drawing) return;

      const currentPoint = computePointInCanvas(e);

      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx || !currentPoint) return;

      onDraw({ ctx, currentPoint, prevPoint: prevPoint.current });
      prevPoint.current = currentPoint;
    };

    const computePointInCanvas = (e: MouseEvent | TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x =
        e instanceof MouseEvent
          ? e.clientX - rect.left
          : e.touches[0].clientX - rect.left;
      const y =
        e instanceof MouseEvent
          ? e.clientY - rect.top
          : e.touches[0].clientY - rect.top;

      return { x, y };
    };

    const endDrawing = () => {
      stopDrawing();
      prevPoint.current = null;
    };

    canvasRef.current?.addEventListener("mousemove", handler);
    canvasRef.current?.addEventListener("touchmove", handler);
    window.addEventListener("mouseup", endDrawing);
    window.addEventListener("touchend", endDrawing);

    return () => {
      canvasRef.current?.removeEventListener("mousemove", handler);
      canvasRef.current?.removeEventListener("touchmove", handler);
      window.removeEventListener("mouseup", endDrawing);
      window.removeEventListener("touchend", endDrawing);
    };
  }, [onDraw, drawing]);

  return { canvasRef, onMouseDown: startDrawing };
};
