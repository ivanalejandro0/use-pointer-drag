import { useState } from "react";
import { useMouseDrag } from "./use-mouse-drag";

import styles from "./drag-bar.module.css";

export function DragBar() {
  const [width, setWidth] = useState(50);

  const ref = useMouseDrag((x, y, offset) => {
    // console.log("dragging:", x, y, offset);
    setWidth( Math.round(100 * (x - offset.left) / offset.width) );
  });

  return (
    <div ref={ref} className={styles.bar}>
      <div className={styles.filled} style={{ width: `${width}%` }}></div>
    </div>
  );
}

export function DragBarVertical() {
  const [height, setHeight] = useState(50);

  const ref = useMouseDrag((_x, y, offset) => {
    console.log("dragging:", _x, y, offset);
    setHeight( Math.round(100 * (y - offset.top) / offset.height) );
  });

  return (
    <div ref={ref} className={styles.barVertical}>
      <div className={styles.filledVertical} style={{ height: `${height}%` }}></div>
    </div>
  );
}
