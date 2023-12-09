import { useStateContext } from "@/contexts/ContextProvider";
import { useDraw } from "@/hooks/useDraw";
import { Draw, DrawLineProps } from "@/lib/types";
import { useEffect } from "react";
import { io } from "socket.io-client";
const socket = io(`${process.env.NEXT_PUBLIC_SERVER_URL}`);

const Canvas = () => {
  const { brush } = useStateContext();
  const { canvasRef, onMouseDown } = useDraw(createALine);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    socket.on(
      "drawLine",
      ({ prevPoint, currentPoint, color, lineWidth }: DrawLineProps) => {
        if (!ctx) return;
        drawALine({ prevPoint, currentPoint, ctx, color, lineWidth });
      }
    );
  }, [canvasRef]);

  useEffect(() => {
    const canvasContainer = document.querySelector(".canvas-container");

    const resizeCanvas = () => {
      // Set canvas dimensions based on the container size
      if (!canvasRef.current) return;
      if (!canvasContainer) return;

      canvasRef.current.width = canvasContainer.clientWidth;
      canvasRef.current.height = canvasContainer.clientHeight;
    };

    // Initial resize
    resizeCanvas();

    // Attach a resize event listener
    window.addEventListener("resize", resizeCanvas);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [canvasRef]);

  function drawALine ({ prevPoint, currentPoint, ctx, color, lineWidth }: DrawLineProps) {
    const { x: currX, y: currY } = currentPoint;
    const lineColor = color;

    let startPoint = prevPoint ?? currentPoint;
    ctx.beginPath;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  function createALine({ prevPoint, currentPoint, ctx }: Draw) {
    socket.emit("drawLine", ({ prevPoint, currentPoint, color: brush.color, lineWidth: brush.lineWidth }));
    drawALine({ prevPoint, currentPoint, ctx, color: brush.color, lineWidth: brush.lineWidth });
  }

  return (
    <div className="h-[80%] w-[90%] mx-auto my-auto border flex items-center justify-center canvas-container">
      <canvas
        onMouseDown={onMouseDown}
        width={750}
        height={750}
        ref={canvasRef}
      />
    </div>
  );
};

export default Canvas;
