/**
 * 定义一个依赖模块，module2
 */

define(function (require, exports, module) {
    let data = '----------module02----------'

    function getData() {
        console.log('module2 getData() ' + data);
    }

    exports.data = data
    exports.getData = getData
})