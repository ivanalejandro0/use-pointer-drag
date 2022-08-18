import { useState, useEffect, useCallback, useRef } from "react";

interface Offset {
  width: number;
  height: number;
  left: number;
  top: number;
}
export function useMouseDrag(
  onDrag: (x: number, y: number, offset: Offset) => void,
  onDragChange?: (isDragging: boolean) => void,
): React.RefCallback<HTMLElement> {
  const [dragging, setDragging] = useState<boolean>(false);

  // To show how's necessary to `useCallback` for your handlers
  useEffect(() => { console.log("onDrag changed") }, [onDrag]);

  const handleMouseDown = useCallback((_e: MouseEvent): void => {
    setDragging(true);
    onDragChange?.(true);
  }, [onDragChange]);

  const handleMouseUp = useCallback((_e: MouseEvent): void => {
    setDragging(false);
    onDragChange?.(false);
  }, [onDragChange]);

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

  // Listeners are attached to the document and not the node so the user can
  // drag and move from outside the element.
  // If the listener were to be attached to the node, the dragging action
  // wouldn't work if the user moves the cursor outside the clicked element.
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
