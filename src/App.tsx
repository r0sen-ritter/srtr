import "./App.css";
import ContainerItem from "./components/ContainerItem";
import SortableContainer from "./components/SortableContainer";

function App() {
  const itemRecords = ["1", "2", "3", "4", "5", "6"];

  return (
    <div className="app">
      <SortableContainer>
        {itemRecords.map((itemRecord, index) => (
          <ContainerItem key={index} containerElement={itemRecord} />
        ))}
      </SortableContainer>
    </div>
  );
}

export default App;
