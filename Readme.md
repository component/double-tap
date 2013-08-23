
# double-tap

  double tap on elements. handles both double tap and double click.

## Installation

  Install with [component(1)](http://component.io):

    $ component install component/double-tap

## Example

```js
doubletap(box, function() {
  box.style.backgroundColor = randomColor();
});
```

## API

### doubletap(el, fn)

  Initialize `Doubletap`.

### doubletap.unbind()

  Unbind `Doubletap`

## TODO

- normalize the event object. right now depending on if the device supports touch or not, the event object will be different (ex. no e.pageX on mobile)

## License

  MIT
