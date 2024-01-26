import { useState } from "react";
import "./App.css";
import SortableContainer from "./components/SortableContainer";

function App() {
  const [containerElements, setContainerElements] = useState<String[]>([
    "1",
    "2",
    "3",
    "4",
    "5",
  ]);

  return (
    <div className="app">
      <SortableContainer
        containerElements={containerElements}
        setContainerElements={setContainerElements}
      ></SortableContainer>
    </div>
  );
}

export default App;
