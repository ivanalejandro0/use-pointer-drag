import React from "react";
import { render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";

import { usePointerDrag } from "./use-pointer-drag";

const MyDiv = React.forwardRef<HTMLDivElement>((_props, ref) => (
  <div ref={ref} data-testid='drag-bar'></div>
));

test("can drag horizontally", async () => {
  const user = userEvent.setup({ document });
  let resultX: number = 0;

  const { result } = renderHook(() => usePointerDrag((x, _y) => {
    resultX = x;
  }));

  expect(result.current).not.toBeUndefined();

  render(<MyDiv ref={result.current} />);

  const element = screen.getByTestId('drag-bar');
  await user.pointer([
    { keys: '[MouseLeft>]', coords: { x: 40 }, target: element },
    { coords: { x: 40 } },
    { coords: { x: 50 } },
    { coords: { x: 60 } },
    '[/MouseLeft]',
  ])

  expect(resultX).toEqual(60);
});

test("can drag vertically", async () => {
  const user = userEvent.setup({ document });
  let resultY: number = 0;

  const { result } = renderHook(() => usePointerDrag((_x, y) => {
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

  const { result } = renderHook(() => usePointerDrag((x, _y) => {
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

  expect(results).not.toContain(10)
  expect(results).toEqual(expect.arrayContaining([120, 130, 140]));
});

test.skip("click and drag outside won't trigger event", () => {
  // drag is enabled by clicking and holding the bar
  // const mockFunction = jest.fn(() => {});
  // expect(mockFunction).not.toHaveBeenCalled();
});

// User Story for this:
// - click on the bar
// - move the pointer out of the bar
// - continue moving the pointer
// - release pointer button outside of the bar
// - value should show the last pointer location, outside of the bar
test("drag outside of bar works", async () => {
  const user = userEvent.setup();
  let resultX: number = 0;

  const { result } = renderHook(() => usePointerDrag((x) => {
    resultX = x;
  }));
  render(<MyDiv ref={result.current} />);

  const element = screen.getByTestId('drag-bar');
  // click and hold on element and move pointer a bit
  await user.pointer([
    { keys: '[MouseLeft>]', coords: { x: 20 }, target: element },
    { coords: { x: 20 } },
    { coords: { x: 30 } },
  ])

  // Move pointer outside of `element` and then release click
  // NOTE: testing library does not do layout, so position doesn't
  // actually do much, the important configuration is the `target`, which
  // shows which element is the pointer hovering.
  await user.pointer([
    { coords: { x: 120 }, target: document.body },
    { coords: { x: 120 } },
    { coords: { x: 130 } },
    { coords: { x: 140 } },
    '[/MouseLeft]',
  ])

  expect(resultX).toEqual(140);
});

test.skip("drag stops once mouse is no longer pressed", () => {
  // drag and check value, move mouse and check value
});
