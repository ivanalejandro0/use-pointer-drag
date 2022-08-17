import { useState, useEffect, useCallback, useRef } from "react";

interface Offset {
  width: number;
  height: number;
  left: number;
  top: number;
}
export function useMouseDrag(onDrag: (x: number, y: number, offset: Offset) => void): React.RefCallback<HTMLElement> {
  const [dragging, setDragging] = useState<boolean>(false);

  const handleMouseDown = useCallback((_e: MouseEvent): void => {
    setDragging(true);
    // console.log('drag start:', {x: _e.clientX, y: _e.clientY});
  }, []);

  const handleMouseUp = useCallback((_e: MouseEvent): void => {
    setDragging(false);
    // console.log('drag end:', {x: _e.clientX, y: _e.clientY});
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging || !ref?.current) return;
    // console.log("mouse move");
    const offset = {
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight,
      left: ref.current.offsetLeft,
      top: ref.current.offsetTop,
    }
    onDrag(e.clientX, e.clientY, offset);
  }, [dragging, onDrag]);

  const ref = useRef<HTMLElement | null>(null);
  const setRef = useCallback((node: HTMLElement) => {
    ref.current = node;
    if (!node) return;
    // listen to the event once we have a node
    node.addEventListener("mousedown", handleMouseDown, { capture: true });
  }, [handleMouseDown]);

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp, { capture: true });
    document.addEventListener("mousemove", handleMouseMove, { capture: true });
    return () => {
      ref.current?.removeEventListener("mousedown", handleMouseDown);
      ref.current?.removeEventListener("mouseup", handleMouseUp);
      ref.current?.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove, handleMouseUp, handleMouseDown]);

  return setRef;
}
