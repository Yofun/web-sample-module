define([
    'module2',
    'jquery'
], function (module2, $) {
    function show() {
        console.log('我是module3', 'module2中的data为【' + module2.data + '】');
    }

    function each(arr, callback) {
        return $.each(arr, callback)
    }

    return { show, each }
});