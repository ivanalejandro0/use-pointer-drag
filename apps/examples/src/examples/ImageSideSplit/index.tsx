import { useState, useCallback, useEffect } from "react";
import { usePointerDrag } from "@ivanalejandro0/use-pointer-drag";

import styles from "./index.module.css";

/**
 * Show cursor as grabbing hand.
 */
function useCursorGrabbing(grabbing = false) {
  useEffect(() => {
    if (grabbing) {
      document.body.classList.add(styles.grabbing);
    } else {
      document.body.classList.remove(styles.grabbing);
    }
    return () => document.body.classList.remove(styles.grabbing);;
  }, [grabbing]);
}

export function ImageSideSplit() {
  const [width, setWidth] = useState(50);
  const [dragging, setDragging] = useState<boolean>(false);

  useCursorGrabbing(dragging);

  const ref = usePointerDrag(
    useCallback(({ isDragging, x, offset }) => {
      let w = Math.round(100 * (x - offset.left) / offset.width);
      w = Math.min(w, 100); // max is 100
      w = Math.max(w, 0); // min is 0
      setWidth(w);
      setDragging(isDragging);
    }, []),
  );

  return (
    <div ref={ref} className={styles.container}>
      <div
        className={styles.filled}
        style={{ width: `${width}%` }}
      />
      <div className={styles.handle} />
    </div>
  );
}
