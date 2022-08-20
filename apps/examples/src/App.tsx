import {Volume} from "./examples/Volume";
import {TimeIndicator} from "./examples/TimeIndicator";
import {ImageSideSplit} from "./examples/ImageSideSplit";
import {Debug} from "./examples/Debug";

import styles from "./App.module.css";

export default function App() {
  return (
    <>
      <div className={styles.container}>
        <TimeIndicator />
        <Volume />
        <ImageSideSplit />
        <Debug />
      </div>
    </>
  );
}
