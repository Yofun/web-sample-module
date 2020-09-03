/**
 * 定义一个有依赖的模块
 *      module2 依赖 module1 中的数据
 */

define([
    'module1'
], function (m1) {
    let data = '我是module2中的数据'

    function show() {
        console.log('我是module2，module1中的数据是【' + m1.getData() + '】');
    }
    return { show, data }
});