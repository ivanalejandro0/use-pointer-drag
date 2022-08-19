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

export function TimeIndicator() {
  const [width, setWidth] = useState(50);
  const [dragging, setDragging] = useState<boolean>(false);

  useCursorGrabbing(dragging);

  const ref = useMouseDrag(
    useCallback((x, _y, offset) => {
      let w = Math.round(100 * (x - offset.left) / offset.width);
      w = Math.min(w, 100);
      w = Math.max(w, 0);
      setWidth(w);
    }, []),
    useCallback((isDragging: boolean) => { setDragging(isDragging) }, [])
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
