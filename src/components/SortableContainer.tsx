import React, { useState, useEffect, useRef, ReactElement } from "react";
import "./SortableContainer.css";
import DragIndicator from "./DragIndicator";

interface SortableContainerProps {
  children: ReactElement | ReactElement[];
}

const SortableContainer = ({ children }: SortableContainerProps) => {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const [dragPosition, setDragPosition] = useState<"top" | "bottom">("top");
  const [orderedChildren, setOrderedChildren] = useState(
    React.Children.toArray(children)
  );

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    setOverIndex(index);

    const boundingRect = (e.target as HTMLElement).getBoundingClientRect();
    const relativePosition = e.clientY - boundingRect.top;
    const positionPercent = relativePosition / boundingRect.height;

    setDragPosition(positionPercent < 0.5 ? "top" : "bottom");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    setOverIndex(null);

    if (dragIndex !== null) {
      const newOrderedChildren = [...orderedChildren];
      const draggedElement = newOrderedChildren[dragIndex];
      newOrderedChildren.splice(dragIndex, 1);
      newOrderedChildren.splice(index, 0, draggedElement);
      setOrderedChildren(newOrderedChildren);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const items = Array.from(
        container.getElementsByClassName("container-item")
      );
      items.forEach((item, index) => {
        const htmlItem = item as HTMLElement;
        htmlItem.ondragstart = () => handleDragStart(index);
        htmlItem.ondragover = (e) =>
          handleDragOver(
            e as unknown as React.DragEvent<HTMLDivElement>,
            index
          );
        htmlItem.ondrop = (e) =>
          handleDrop(e as unknown as React.DragEvent<HTMLDivElement>, index);
      });
    }
    return () => {
      if (container) {
        const items = Array.from(
          container.getElementsByClassName("container-item")
        );
        items.forEach((item) => {
          const htmlItem = item as HTMLElement;
          htmlItem.ondragstart = null;
          htmlItem.ondragover = null;
          htmlItem.ondrop = null;
        });
      }
    };
  }, [orderedChildren, handleDragStart, handleDragOver, handleDrop]);

  return (
    <div className="sortable-container" ref={containerRef}>
      {orderedChildren.map((child, index) => {
        return (
          <>
            {dragIndex !== overIndex &&
              dragIndex !== null &&
              overIndex !== null &&
              index === overIndex &&
              dragPosition === "top" && <DragIndicator />}
            {child}
            {dragIndex !== overIndex &&
              dragIndex !== null &&
              overIndex !== null &&
              index === overIndex &&
              dragPosition === "bottom" && <DragIndicator />}
          </>
        );
      })}
    </div>
  );
};

export default SortableContainer;
