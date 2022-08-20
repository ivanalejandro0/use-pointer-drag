import { useState, useEffect, useCallback, useRef } from "react";

interface Offset {
  width: number;
  height: number;
  left: number;
  top: number;
}
export function usePointerDrag(
  onDrag: (x: number, y: number, offset: Offset) => void,
  onDragChange?: (isDragging: boolean) => void,
  // maybe send same params as for `onDrag` along with `isDragging`
): React.RefCallback<HTMLElement> {
  const [dragging, setDragging] = useState<boolean>(false);

  // To show how's necessary to `useCallback` for your handlers
  // useEffect(() => { console.log("onDrag changed") }, [onDrag]);

  const handleMouseDown = useCallback((_e: MouseEvent): void => {
    setDragging(true);
    onDragChange?.(true);
  }, [onDragChange]);

  const handlePointerUp = useCallback((_e: MouseEvent): void => {
    setDragging(false);
    onDragChange?.(false);
  }, [onDragChange]);

  const handlePointerMove = useCallback((e: MouseEvent) => {
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
      ref.current?.removeEventListener("pointerdown", handleMouseDown, {capture: true});
    }
    ref.current = node;
    if (!node) return;
    // if we have a node, attach listener
    node.addEventListener("pointerdown", handleMouseDown, { capture: true });
  }, [handleMouseDown]);

  // Something like this would be useful to support only dragging inside of the element
  // I use document instead since it's desirable to report dragging even if the
  // user goes outside of the element while holding the pointer clicked
  // useEffect(() => {
  //   ref.current?.addEventListener("pointermove", handleMouseMove, { capture: true });
  //   return () => {
  //     ref.current?.removeEventListener("pointermove", handleMouseMove, {capture: true});
  //   };
  // }, [dragging, handleMouseMove])

  // Listeners are attached to the document and not the node so the user can
  // drag and move from outside the element.
  // If the listener were to be attached to the node, the dragging action
  // wouldn't work if the user moves the cursor outside the clicked element.
  useEffect(() => {
    document.addEventListener("pointerup", handlePointerUp, { capture: true });
    document.addEventListener("pointermove", handlePointerMove, { capture: true });
    return () => {
      document.removeEventListener("pointerup", handlePointerUp, {capture: true});
      document.removeEventListener("pointermove", handlePointerMove, {capture: true});
    };
  }, [handlePointerMove, handlePointerUp]);

  return setRef;
}
