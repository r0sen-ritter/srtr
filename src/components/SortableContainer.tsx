import { useState } from "react";
import "./SortableContainer.css";
import ContainerItem from "./ContainerItem";
import DragIndicator from "./DragIndicator";

interface SortableContainerProps {
  containerElements: String[];
  setContainerElements: React.Dispatch<React.SetStateAction<String[]>>;
}

const SortableContainer = ({
  containerElements,
  setContainerElements,
}: SortableContainerProps) => {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    setDragIndex(index);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    setOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    setOverIndex(null);

    const newContainerElements = [...containerElements];
    const draggedElement = newContainerElements[dragIndex as number];
    newContainerElements.splice(dragIndex as number, 1);
    newContainerElements.splice(index, 0, draggedElement);

    setContainerElements(newContainerElements);
  };
  console.log(dragIndex, overIndex);

  return (
    <div className="sortable-container">
      {containerElements.map((containerElement, index) => {
        return (
          <>
            {dragIndex !== null &&
              overIndex !== null &&
              dragIndex > overIndex &&
              index === overIndex && <DragIndicator />}
            <ContainerItem
              key={index}
              index={index}
              containerElement={containerElement}
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
            />
            {dragIndex !== null &&
              overIndex !== null &&
              dragIndex < overIndex &&
              index === overIndex && <DragIndicator />}
          </>
        );
      })}
    </div>
  );
};

export default SortableContainer;
