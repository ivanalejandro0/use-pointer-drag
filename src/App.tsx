import { DragBarHorizontal, DragBarVertical } from "./drag-bar";

import styles from "./App.module.css";

export default function App() {
  return (
    <>
      <div className={styles.container}>
        <p>Click and drag to change bars' width.</p>
        <DragBarHorizontal />
        <DragBarVertical />
      </div>
    </>
  );
}
