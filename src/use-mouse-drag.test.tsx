import React from "react";
import { render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";

import { useMouseDrag } from "./use-mouse-drag";

const MyDiv = React.forwardRef<HTMLDivElement>((_props, ref) => (
  <div data-testid='drag-bar' ref={ref}></div>
));

test("can drag horizontally", async () => {
  const user = userEvent.setup({ document });
  let resultX: number = 0;

  const { result } = renderHook(() => useMouseDrag((x, _y) => {
    // console.log(`dragging: ${x} ${y}`);
    resultX = x;
  }));

  expect(result.current).not.toBeUndefined();

  render(<MyDiv ref={result.current} />);

  const element = screen.getByTestId('drag-bar');
  await user.pointer([
    // { keys: '[MouseLeft>]', coords: { x: 20, y: 10 }, target: element },
    { keys: '[MouseLeft>]', target: element },
    // { coords: { x: 20, y: 20 } },
    { coords: { x: 40 } },
    '[/MouseLeft]',
  ])

  expect(resultX).toEqual(40);
});

test("can drag vertically", async () => {
  const user = userEvent.setup({ document });
  let resultY: number = 0;

  const { result } = renderHook(() => useMouseDrag((_x, y) => {
    resultY = y;
  }));

  expect(result.current).not.toBeUndefined();

  render(<MyDiv ref={result.current} />);

  const element = screen.getByTestId('drag-bar');
  await user.pointer([
    { keys: '[MouseLeft>]', target: element },
    { coords: { y: 40 } },
    '[/MouseLeft]',
  ])

  expect(resultY).toEqual(40);
});

test("tracks every point where the pointer was", async () => {
  const user = userEvent.setup({ document });
  let results: number[] = [];

  const { result } = renderHook(() => useMouseDrag((x, _y) => {
    // console.log("drag", x);
    results.push(x)
  }));

  expect(result.current).not.toBeUndefined();

  render(<MyDiv ref={result.current} />);

  const element = screen.getByTestId('drag-bar');
  await user.pointer([
    { keys: '[MouseLeft>]', coords: { x: 120 }, target: element },
    { coords: { x: 120 } },
    { coords: { x: 130 } },
    { coords: { x: 140 } },
    '[/MouseLeft]',
  ])

  // console.log({results});
  expect(results).not.toContain(10)
  expect(results).toEqual(expect.arrayContaining([120, 130, 140]));
});

test.skip("click and drag outside won't trigger event", () => {
  // drag is enabled by clicking and holding the bar
});

test.skip("drag outside of bar works", () => {
  // click the bar, move the mouse out, drag mouse, unclick
  // check for value to change accordingly
});

test.skip("drag stops once mouse is no longer pressed", () => {
  // drag and check value, move mouse and check value
});
