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
  }, []);

  const handleMouseUp = useCallback((_e: MouseEvent): void => {
    setDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging || !ref?.current) return;
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
    if (!node) {
      // remove previously attached listener, if any
      ref.current?.removeEventListener("mousedown", handleMouseDown, {capture: true});
    }
    ref.current = node;
    if (!node) return;
    // if we have a node, attach listener
    node.addEventListener("mousedown", handleMouseDown, { capture: true });
  }, [handleMouseDown]);

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp, { capture: true });
    document.addEventListener("mousemove", handleMouseMove, { capture: true });
    return () => {
      document.removeEventListener("mouseup", handleMouseUp, {capture: true});
      document.removeEventListener("mousemove", handleMouseMove, {capture: true});
    };
  }, [handleMouseMove, handleMouseUp]);

  return setRef;
}
