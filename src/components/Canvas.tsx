import { useStateContext } from "@/contexts/ContextProvider";
import { useDraw } from "@/hooks/useDraw";
import { Draw } from "@/lib/types";
import { useEffect } from "react";

const Canvas = () => {
  const { brush } = useStateContext()
  const { canvasRef, onMouseDown } = useDraw(drawALine)

  useEffect(() => {
    const canvasContainer = document.querySelector(".canvas-container");
    
    const resizeCanvas = () => {
      // Set canvas dimensions based on the container size
      if (!canvasRef.current) return
      if(!canvasContainer) return
      
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
  
  function drawALine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint
    const lineColor = brush.color
    const lineWidth = brush.lineWidth

    let startPoint = prevPoint ?? currentPoint
    ctx.beginPath
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor
    ctx.moveTo(startPoint.x, startPoint.y)
    ctx.lineTo(currX, currY)
    ctx.stroke()

    ctx.fillStyle = lineColor
    ctx.beginPath()
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI)
    ctx.fill()
  }

  return (
    <div className="h-full w-full flex items-center justify-center canvas-container">
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
