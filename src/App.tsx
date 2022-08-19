import {Volume} from "./examples/Volume";
import {TimeIndicator} from "./examples/TimeIndicator";
import {ImageSideSplit} from "./examples/ImageSideSplit";

import styles from "./App.module.css";

export default function App() {
  return (
    <>
      <div className={styles.container}>
        <TimeIndicator />
        <Volume />
        <ImageSideSplit />
      </div>
    </>
  );
}
