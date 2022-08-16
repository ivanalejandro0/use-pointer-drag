import { useMouseDrag } from "./use-mouse-drag";

import styles from "./drag-bar.module.css";

export function DragBar() {
  const ref = useMouseDrag((x, y) => {
    console.log("dragging:", x, y);
  });

  return <div ref={ref} className={styles.bar}></div>;
}
