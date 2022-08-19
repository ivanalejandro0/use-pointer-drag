import { useState, useCallback, useEffect } from "react";
import { useMouseDrag } from "../../use-mouse-drag";

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

export function Volume() {
  const [height, setHeight] = useState(50);
  const [dragging, setDragging] = useState<boolean>(false);

  useCursorGrabbing(dragging);

  const ref = useMouseDrag(
    useCallback((_x, y, offset) => {
      let h = Math.round(100 * (y - offset.top) / offset.height);
      h = Math.min(h, 100);
      h = Math.max(h, 0);
      // h = Math.round(h / 10) * 10; // in steps of 10
      h = 100 - h;
      setHeight(h);
    }, []),
    useCallback((isDragging: boolean) => { setDragging(isDragging) }, [])
  );

  return (
    <div ref={ref} className={styles.container}>
      <div
        className={styles.filled + " " + styles.handle}
        style={{ height: `calc(${height}% - 5px)` }}
      ></div>
    </div>
  );
}
