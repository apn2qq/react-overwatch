# React-overwatch 🌀

React component using the browser's Intersection Observer API to watch for when an element is within (or intersecting with) the viewport.

## Installation

```
yarn add react-overwatch
```

## Usage

```jsx
import React, { Component } from 'react'
import Observable from 'react-overwatch'

const options = {
  // IntersectionObserver options
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
}

class SomeComponent extends Component {
  onEnter = () => {
    console.log('Element in viewport 🎉🎉')
  }

  onLeave = () => {
    console.log('Element out of viewport 😓😓')
  }

  onIntersection = () => {
    console.log('Some action on element intersection 🦜🦜')
  }

  render() {
    return (
      <Observable
        options={options}
        onIntersection={this.onIntersection}
        onEnter={this.onEnter}
        onLeave={this.onLeave}
      >
        <div>I am a observable item 👀</div>
      </Observable>
    )
  }
}
```

## Adding the polyfill to your site

**Note:** For complete browser support you must also provide an [Intersection Observer polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill).
The examples below show various ways to add the `IntersectionObserver` polyfill to your site.

```
yarn add intersection-observer
```

**Using `<script>` tags in the HTML:**

```html
<!-- Load the polyfill first. -->
<script src="path/to/intersection-observer.js"></script>

<!-- Load all other JavaScript. -->
<script src="app.js"></script>
```

**Using a module loader (e.g. Browserify or Webpack):**

```js
import 'intersection-observer'
```

**Using only for required browsers:**

```js
if (
  typeof window !== 'undefined' &&
  typeof window.IntersectionObserver === `undefined`
) {
  import(`intersection-observer`)
}
```

## Browser Support

Intersection Observer is [pretty well supported](https://caniuse.com/#feat=intersectionobserver) by major browsers, with the exception of Safari/iOS Safari. There's also not been much movement by the Safari team to add support. This is unfortunate but adding a [good polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) will work great for adding support to Safari or IE11. You can track [Safari's lack of progress here](https://bugs.webkit.org/show_bug.cgi?id=159475).

## Examples

[Basic example](https://codesandbox.io/s/1wzr4866q3)

[Infinite scroll example](https://codesandbox.io/s/nr9ljym6wm)
