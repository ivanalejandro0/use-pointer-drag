<div align="center">

# usePointerDrag
A [React hook](https://reactjs.org/docs/hooks-intro.html) to help you handle
pointer (mouse, touch) drag actions on your components.

Includes Typescript support, examples and tests.

<hr />

[Why?](#why) |
[Installation](#installation) |
[How to use](#how-to-use) |
[Examples](#examples) |
[Live demo](https://ivanalejandro0.github.io/use-pointer-drag/)

<hr />
</div>

## Why?
The implementation for such problem seems simple enough, basically dealing with
pointer events. For example: `mousedown` to detect the user started dragging,
`mousemove` to detect the dragging action, and `mouseup` to detect when the
user stopped dragging. But there are several corner cases that make it worth it
extracting the code into its own package.

Besides that, testing such code and making sure that it behaves as it should is
not that straightforward, and that's an area that's sometimes overlooked... so
just having this code tested hopefully will make it worth using the package
instead of implementing it on your own. Or just copy/paste the code as LICENSE
allows.


## Installation
Using yarn:
```
$ yarn add @ivanalejandro0/use-pointer-drag
```

Using npm:
```
$ npm install --save @ivanalejandro0/use-pointer-drag
```

## How to use
You need to use the `usePointerDrag` hook, which will return a ref callback for
you to add to the element you want to use for the dragging events.

And you also have to provide a function that will be called when the user
clicks/taps and drags over the element.

Here's some example code:

```jsx
import { usePointerDrag } from "@ivanalejandro0/use-pointer-drag";

// from: ./apps/examples/
export function Debug() {
  const [data, setData] = useState();
  const ref = usePointerDrag(
    useCallback(({ isDragging, x, y, offset }) => {
      setData({x, y, isDragging, ...offset})
    }, [])
  );

  const { isDragging, x, y, top, left, height, width } = data || {};

  return (
    <div>
      <div
        ref={ref}
        style={{ width: '300px', height: '300px', background: 'grey' }}
      />
      <div>Dragging: {isDragging ? 'true' : 'false'}</div>
      <div>Pointer position: x = {x}, y = {y}</div>
      <div>Element position: top = {top}, left = {left}</div>
      <div>Element size: width = {width}, height = {height}</div>
    </div>
  );
}
```

Here's the type information for the callback you need to define:
```typescript
type Callback = ({
  isDragging: boolean,
  x: number,
  y: number,
  offset: {
    width: number,
    height: number,
    left: number,
    top: number,
  }
}) => void;
```
Please see the `use-pointer-drag.ts` file for an up to date definition.
This package exports types as well, so you can get the information on your
editor right when you use the package.


The event handler you need to define will receive information about:
- `isDragging`: whether the user is dragging or not. Useful if you want to do
  something specific when the action starts/ends, like changing the pointer
  icon.
- `x` and `y`: the cursor position. To show exactly where the user is pointing.
- `offset`: the element position and size. Useful to calculate some correlation
  between the pointer and the element. For example to "paint" the element up
  until the position where the user is pointing.

## Examples
You can see some examples on `./apps/examples/`, that's a very basic app
created to showcase some of the components you can easily build using this
library.

These examples are live [here](https://ivanalejandro0.github.io/use-pointer-drag/).
