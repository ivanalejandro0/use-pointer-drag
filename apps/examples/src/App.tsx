import {Volume} from "./examples/Volume";
import {TimeIndicator} from "./examples/TimeIndicator";
import {ImageSideSplit} from "./examples/ImageSideSplit";
import {Debug} from "./examples/Debug";

import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.container}>
      <h1>Example widgets created with usePointerDrag</h1>
      <h2>Time control</h2>
      <p>Usually seen on video and audio players.</p>
      <TimeIndicator />
      <h2>Volume control</h2>
      <Volume />
      <h2>Image comparison with split</h2>
      <p>Helpful widget so easily show differences between two pictures.</p>
      <ImageSideSplit />
      <h2>Debug widget</h2>
      <p>Used to show the data we get from the hook.</p>
      <Debug />
    </div>
  );
}
