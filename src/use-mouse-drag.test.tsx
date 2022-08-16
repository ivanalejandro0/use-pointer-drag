import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import { useMouseDrag } from "./use-mouse-drag";

// @ts-ignore:next-line
const MyDiv = React.forwardRef((props, ref: ForwardedRef<HTMLElement>) => (
  <div data-testid='drag-bar' ref={ref}></div>
));

describe("useMouseDrag", () => {
  test("fires native mouseEnter/mouseLeave events", async () => {
    const user = userEvent.setup({ document });
    let l = 0;

    const { result } = renderHook(() => useMouseDrag((x, y) => {
      console.log(`dragging: ${x} ${y}`);
      l = x;
    }));

    expect(result.current).not.toBeUndefined();

    // const view = render(<MyDiv ref={ref} />);
    render(<MyDiv ref={result.current} />);

    const element = screen.getByTestId('drag-bar');
    await user.pointer([
      // { keys: '[MouseLeft>]', coords: { x: 20, y: 10 }, target: element },
      { keys: '[MouseLeft>]', target: element },
      // { coords: { x: 20, y: 20 } },
      { coords: { x: 40 } },
      '[/MouseLeft]',
    ])

    expect(l).toEqual(40);
  });
});
