'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * 同意暴露
 */

var arr = [1, 2, 3, 4, 5];
function demo2() {
    console.log('我是demo2', arr);
}

function test2() {
    console.log('我是test2', arr);
}

exports.demo2 = demo2;
exports.test2 = test2;