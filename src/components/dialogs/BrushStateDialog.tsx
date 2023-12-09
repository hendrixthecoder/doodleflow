import { useToggleBrushModal } from "@/hooks/useToggleBrushModal";
import Button from "../Button";
import { strokeColors, strokeSizes } from "@/data";
import { useStateContext } from "@/contexts/ContextProvider";

const BrushStateDialog = () => {
  const { brushModalRef, toggleBrush } = useToggleBrushModal();
  const { brush, setBrush } = useStateContext();

  return (
    <>
      <Button
        type="button"
        color="black"
        bgColor="white"
        value="Brush"
        action={toggleBrush}
      />
      <dialog
        ref={brushModalRef}
        className="w-[20vw] min-w-[300px] border p-4 px-5 shadow-xl rounded-xl"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm">Stroke Size</span>
            <div className="flex justify-between items-center">
              {strokeSizes.map((stroke, index) => (
                <>
                  <button
                    key={index}
                    style={{ padding: `${stroke}px` }}
                    className={` bg-[#F1F1F1] rounded-full ${stroke === brush.lineWidth && 'selected-stroke'}`}
                    onClick={() => setBrush({ ...brush, lineWidth: stroke })}
                  ></button>
                </>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm">Color</span>
            <div className="flex justify-between items-center">
              {strokeColors.map((color, index) => (
                <>
                  <button
                    key={index}
                    style={{ backgroundColor: `${color}` }}
                    className={`p-4 rounded-md ${
                      color === brush.color && "selected-color"
                    }`}
                    onClick={() => setBrush({ ...brush, color })}
                  ></button>
                </>
              ))}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default BrushStateDialog;
