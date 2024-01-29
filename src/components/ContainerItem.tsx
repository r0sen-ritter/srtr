import React, { useState, useEffect } from "react";
import "./ContainerItem.css";
import { GrDrag } from "react-icons/gr";

interface ContainerItemProps {
  containerElement: String;
  index: number;
  handleDragStart: (index: number) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
}

const ContainerItem = ({
  containerElement,
  index,
  handleDragStart,
  handleDragOver,
  handleDrop,
}: ContainerItemProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      className="container-item"
      draggable={isDragging}
      onDragStart={() => handleDragStart(index)}
      onDragOver={(e) => handleDragOver(e, index)}
      onDrop={(e) => handleDrop(e, index)}
    >
      {containerElement}
      <div className="container-item-drag-handle" onMouseDown={handleMouseDown}>
        <GrDrag />
      </div>
    </div>
  );
};

export default ContainerItem;
