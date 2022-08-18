import { useState, useCallback, useEffect } from "react";
import { useMouseDrag } from "./use-mouse-drag";

import styles from "./drag-bar.module.css";

export function DragBarHorizontal() {
  const [width, setWidth] = useState(50);
  const [dragging, setDragging] = useState<boolean>(false);

  const ref = useMouseDrag(
    useCallback((x, _y, offset) => {
      let w = Math.round(100 * (x - offset.left) / offset.width);
      w = Math.min(w, 100);
      w = Math.max(w, 0);
      setWidth(w);
    }, []),
    useCallback((isDragging: boolean) => { setDragging(isDragging) }, [])
  );

  // show cursor as grabbing hand while dragging
  // even if the cursor is outside of the element
  useEffect(() => {
    if (dragging) {
      document.body.classList.add(styles.grabbing);
    } else {
      document.body.classList.remove(styles.grabbing);
    }

    return () => {
      document.body.classList.remove(styles.grabbing);
    };
  }, [dragging]);

  return (
    <div ref={ref} className={styles.bar}>
      <div className={styles.filled} style={{ width: `${width}%` }}></div>
    </div>
  );
}

export function DragBarVertical() {
  const [height, setHeight] = useState(50);

  const ref = useMouseDrag((_x, y, offset) => {
    let h = Math.round(100 * (y - offset.top) / offset.height);
    h = Math.min(h, 100);
    h = Math.max(h, 0);
    setHeight(h);
  });

  return (
    <div ref={ref} className={styles.barVertical}>
      <div className={styles.filledVertical} style={{ height: `${height}%` }}></div>
    </div>
  );
}
