import {Volume} from "./examples/Volume";
import {TimeIndicator} from "./examples/TimeIndicator";

import styles from "./App.module.css";

export default function App() {
  return (
    <>
      <div className={styles.container}>
        <p>Click and drag to change bars' width.</p>
        <TimeIndicator />
        <Volume />
      </div>
    </>
  );
}
