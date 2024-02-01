/* eslint-disable unused-imports/no-unused-vars */

const unusedVariable = 1;

const foo = {};
const x = foo.bar;

function bar() {
  return /[=]foo/;
}

const foo1 = !bar;
const foo2 = bar ? 'baz' : 'bat';

const re = /foo bar/;
const re1 = new RegExp('foo {3}bar');

const fooUndefined = undefined;

const a = { 0: 0 };
const a1 = { '0+1,234': 0 };
const a2 = { 0: 0 };
const a3 = { x: 0 };
const a4 = {
  x() {
    // comment
  },
};

import { foo1 as foo3 } from 'bar';
export { foo3 as foo1 };

const foo4 = function () {
  // eslint-disable-next-line no-undef
  doSomething();
};

const x1 = 'y';
const CONFIG = {};

const foo5 = 2 ** 8;

const color = '';
if (color === 'red') {
  // ...
}
