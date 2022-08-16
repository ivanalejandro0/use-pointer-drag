import "./styles.css";

import { DragBar } from "./drag-bar";

export default function App() {
  return (
    <>
      <p>click and drag</p>
      <div className="App">
        <DragBar />
      </div>
    </>
  );
}
