import {Volume} from "./examples/Volume";
import {TimeIndicator} from "./examples/TimeIndicator";
import {ImageSideSplit} from "./examples/ImageSideSplit";
import {Debug} from "./examples/Debug";

import styles from "./App.module.css";

export default function App() {
  return (
    <>
      <div className={styles.container}>
        <h1>Time control</h1>
        <p>Usually seen on video and audio players.</p>
        <TimeIndicator />
        <h1>Volume control</h1>
        <Volume />
        <h1>Image comparison with split</h1>
        <p>Helpful widget so easily show differences between two pictures.</p>
        <ImageSideSplit />
        <h1>Debug widget</h1>
        <p>Used to show the data we get from the hook.</p>
        <Debug />
      </div>
    </>
  );
}
