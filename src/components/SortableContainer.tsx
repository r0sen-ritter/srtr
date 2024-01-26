import "./SortableContainer.css";
import ContainerItem from "./ContainerItem";

interface SortableContainerProps {
  containerElements: String[];
  setContainerElements: React.Dispatch<React.SetStateAction<String[]>>;
}

const SortableContainer = ({
  containerElements,
  setContainerElements,
}: SortableContainerProps) => {
  let dragSrcIndex: number;

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    dragSrcIndex = index;
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    e.currentTarget.classList.add("over");
  };

  const handleDragLeave = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.currentTarget.classList.remove("over");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();

    const newContainerElements = [...containerElements];
    const draggedElement = newContainerElements[dragSrcIndex];
    newContainerElements.splice(dragSrcIndex, 1);
    newContainerElements.splice(index, 0, draggedElement);

    setContainerElements(newContainerElements);
    e.currentTarget.classList.remove("over");
  };

  return (
    <div className="sortable-container">
      {containerElements.map((containerElement, index) => {
        return (
          <ContainerItem
            key={index}
            index={index}
            containerElement={containerElement}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
          />
        );
      })}
    </div>
  );
};

export default SortableContainer;
