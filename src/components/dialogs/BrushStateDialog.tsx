import { useToggleBrushModal } from "@/hooks/useToggleBrushModal";
import { strokeColors, strokeSizes } from "@/data";
import { useStateContext } from "@/contexts/ContextProvider";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const BrushStateDialog = () => {
  const { brushModalRef, toggleBrush, isOpen } = useToggleBrushModal();
  const { brush, setBrush } = useStateContext();

  return (
    <>
      <button
        onClick={toggleBrush}
        className={`flex items-center h-[55px] px-3 gap-2 ${
          isOpen && "bg-myPurple"
        }`}
      >
        <CreateOutlinedIcon
          className={`text-[20px] ${isOpen && "text-white"}`}
        />
        <KeyboardArrowDownIcon
          className={`text-[16px] ${isOpen && "text-white"}`}
        />
      </button>
      <dialog
        ref={brushModalRef}
        className="w-[20vw] min-w-[300px] border p-4 px-5 shadow-xl rounded-xl mt-6"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm">Stroke Size</span>
            <div className="flex justify-between items-center">
              {strokeSizes.map((stroke, index) => (
                <button
                  key={index}
                  style={{ padding: `${stroke}px` }}
                  className={` bg-[#F1F1F1] rounded-full ${
                    stroke === brush.lineWidth && "selected-stroke"
                  }`}
                  onClick={() => setBrush({ ...brush, lineWidth: stroke })}
                ></button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm">Color</span>
            <div className="flex justify-between items-center">
              {strokeColors.map((color, index) => (
                <button
                  key={index}
                  style={{ backgroundColor: `${color}` }}
                  className={`p-4 rounded-md ${
                    color === brush.color && "selected-color"
                  }`}
                  onClick={() => setBrush({ ...brush, color })}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default BrushStateDialog;
