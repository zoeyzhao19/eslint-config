/* eslint-disable no-redeclare */
/* eslint-disable unused-imports/no-unused-vars */

import zls from '@zls/eslint-config'

let unusedVariable = 1

let foo = {}
let x = foo["bar"];

function bar() { return /=foo/; }

let foo1 = !!!bar;
let foo2 = !!bar ? 'baz' : 'bat';

let re = /foo   bar/;
let re1 = new RegExp("foo   bar");

let fooUndefined = undefined;

let a = { ['0']: 0 };
let a1 = { ['0+1,234']: 0 };
let a2 = { [0]: 0 };
let a3 = { ['x']: 0 };
let a4 = { ['x']() {
  // comment
} };

import { foo1 as foo3 } from "bar"
export { foo3 as foo1 }

var foo4 = function() {
  // eslint-disable-next-line no-undef
  doSomething();
  return;
}

var x1 = "y";
var CONFIG = {};

const foo5 = Math.pow(2, 8);

const color = ''
if (color === "red") {
  // ...
}