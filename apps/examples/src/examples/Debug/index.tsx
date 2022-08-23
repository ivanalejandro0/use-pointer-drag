import { useState, useCallback } from "react";
import { usePointerDrag } from "@ivanalejandro0/use-pointer-drag";

import styles from "./index.module.css";

type Data = {
  x: number,
  y: number,
  top: number,
  left: number,
  height: number,
  width: number,
  isDragging: boolean,
}

export function Debug() {
  const [data, setData] = useState<Data>();
  const ref = usePointerDrag(
    useCallback(({ isDragging, x, y, offset }) => {
      setData({x, y, isDragging, ...offset})
    }, [])
  );

  const { isDragging, x, y, top, left, height, width } = data || {};

  return (
    <div>
      <div ref={ref} className={styles.container} />
      <div>Dragging: {isDragging ? 'true' : 'false'}</div>
      <div>Pointer position: x = {x}, y = {y}</div>
      <div>Element position: top = {top}, left = {left}</div>
      <div>Element size: width = {width}, height = {height}</div>
    </div>
  );
}
