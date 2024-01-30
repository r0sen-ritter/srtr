import { useState } from "react";
import "./ContainerItem.css";
import { GrDrag } from "react-icons/gr";

interface ContainerItemProps {
  containerElement: String;
}

const ContainerItem = ({ containerElement }: ContainerItemProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
    console.log("mouse down");
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="container-item" draggable={isDragging}>
      {containerElement}
      <div className="container-item-drag-handle" onMouseDown={handleMouseDown}>
        <GrDrag />
      </div>
    </div>
  );
};

export default ContainerItem;
