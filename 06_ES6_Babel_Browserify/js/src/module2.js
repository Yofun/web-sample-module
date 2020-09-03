/**
 * 统一暴露
 */

let arr = [1, 2, 3, 4, 5]
function demo2() {
    console.log('我是demo2', arr);
}

function test2() {
    console.log('我是test2', arr);
}

export {
    demo2,
    test2
}