/**
 * 定义一个依赖模块，module1
 */

define(function (require, exports, module) {
    let data = '----------module01----------'

    function getData() {
        console.log('module1 getData() ' + data);
    }

    module.exports.data = data
    module.exports.getData = getData
})