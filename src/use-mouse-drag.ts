import { useState, useEffect, useCallback, useRef } from "react";

function useMouseEvent(
  event: "mouseup" | "mousemove" | "mousedown",
  handler: (e: MouseEvent) => void
) {
  useEffect(
    function listenToGlobalMouseEvents() {
      const target = document;
      if (!target) throw new Error("missing target")
      target.addEventListener(event, handler as (e: Event) => void, {
        capture: true
      });
      return () =>
        target.removeEventListener(event, handler as (e: Event) => void, {
          capture: true
        });
    },
    [event, handler]
  );
}

export function useMouseDrag(onDrag: (x: number, y: number) => void): React.RefCallback<HTMLElement> {
  const [dragging, setDragging] = useState<boolean>(false);

  const handleMouseDown = (_e: MouseEvent): void => {
    setDragging(true);
    // console.log('drag start:', {x: _e.clientX, y: _e.clientY});
  };

  const ref = useRef<HTMLElement | null>(null);
  const setRef = useCallback((node: HTMLElement) => {
    ref.current = node;
    if (!node) return;
    // listen to the event once we have a node
    node.addEventListener("mousedown", handleMouseDown, {
      capture: true
    });
  }, []);

  useEffect(() => {
    return () => {
      ref.current?.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  useMouseEvent("mouseup", (_e: MouseEvent) => {
    setDragging(false);
    // console.log('drag end:', {x: _e.clientX, y: _e.clientY});
  });

  useMouseEvent("mousemove", (e: MouseEvent) => {
    if (!dragging || !ref?.current) {
      // console.log("mousemove: noref");
      return;
    }
    // console.log("mouse move");
    // throw new Error("move");
    // const { offsetLeft, offsetWidth } = ref.current;
    onDrag(e.clientX, e.clientY);
  });

  return setRef;
}
