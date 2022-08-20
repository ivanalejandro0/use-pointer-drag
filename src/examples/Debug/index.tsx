import { useState, useCallback } from "react";
import { usePointerDrag } from "../../use-pointer-drag";

import styles from "./index.module.css";

type Offset = Parameters<Parameters<typeof usePointerDrag>[0]>[3];

export function Debug() {
  const [position, setPosition] = useState({x: 0, y: 0});
  const [dragging, setDragging] = useState<boolean>(false);
  const [offset, setOffset] = useState<Offset | undefined>();

  const ref = usePointerDrag(
    useCallback((isDragging, x, y, offset) => {
      setPosition({x, y});
      setDragging(isDragging);
      setOffset(offset)
    }, [])
  );

  return (
    <div>
      <div ref={ref} className={styles.container}>
      </div>
      <div>Dragging: {dragging ? 'true' : 'false'}</div>
      <div>Pointer position: (x = {position.x}, y = {position.y})</div>
      <div>top = {offset?.top}, left = {offset?.left}</div>
      <div>width = {offset?.width}, height = {offset?.height}</div>
    </div>
  );
}
