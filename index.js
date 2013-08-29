/**
 * Module Dependencies
 */

var tap = require('tap');
var event = require('event');
var abs = Math.abs;
var hasTouch = 'ontouchstart' in window;

/**
 * Expose `Doubletap`
 */

module.exports = Doubletap;

/**
 * Initialize `Doubletap`
 *
 * @param {Element} el
 * @param {Function} fn
 * @return {Doubletap}
 * @api public
 */

function Doubletap(el, fn) {
  if (!(this instanceof Doubletap)) return new Doubletap(el, fn);
  this.el = el;
  this.fn = fn;
  this.tapped = false;
  this._ontap = this.ontap.bind(this);

  if (hasTouch) this.tap = tap(el, this._ontap);
  else event.bind(el, 'click', this._ontap);
}

/**
 * On tap
 *
 * @param {Event} e
 * @return {Doubletap}
 * @api private
 */

Doubletap.prototype.ontap = function(e) {
  var self = this;
  var touches = e.changedTouches;
  var x, y;

  // TODO: this logic should be moved up to tap
  // and abstracted out
  if (touches && touches.length) {
    if (touches.length > 1) return this;
    x = touches[0].pageX;
    y = touches[0].pageY;
  } else {
    x = e.pageX;
    y = e.pageY;
  }

  if (this.tapped) {
    this.tapped = false;
    if (this.id) clearTimeout(this.id);
    if (abs(x - this.x) > 50) return this;
    if (abs(y - this.y) > 50) return this;
    this.fn(e);
  } else {
    this.tapped = true;
    this.x = x;
    this.y = y;

    this.id = setTimeout(function() {
      self.tapped = false;
    }, 500);
  }

  return this;
};

/**
 * Unbind `Doubletap`
 *
 * @return {Doubletap}
 * @api public
 */

Doubletap.prototype.unbind = function() {
  if (this.tap) this.tap.unbind();
  else event.unbind(this.el, 'click', this._ontap);

  return this;
};
