'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * 默认暴露，只能暴露一次
 */

//  export default {
//     name: '佩奇',
//     age: 18,
//     speak() {
//         console.log(`我的名字是${this.name}，我今年${this.age}岁了！`);
//     }
//  }

exports.default = {
    name: '周杰伦',
    age: 20,
    song: function song() {
        console.log('天青色等烟雨，而我在等你！');
    }
};