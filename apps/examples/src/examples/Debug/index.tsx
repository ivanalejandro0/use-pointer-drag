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
  dragging: boolean,
}

export function Debug() {
  const [data, setData] = useState<Data>();
  const ref = usePointerDrag(
    useCallback((dragging, x, y, offset) => {
      setData({x, y, dragging, ...offset})
    }, [])
  );

  const { dragging, x, y, top, left, height, width } = data || {};

  return (
    <div>
      <div ref={ref} className={styles.container} />
      <div>Dragging: {dragging ? 'true' : 'false'}</div>
      <div>Pointer position: x = {x}, y = {y}</div>
      <div>Element position: top = {top}, left = {left}</div>
      <div>Element size: width = {width}, height = {height}</div>
    </div>
  );
}
