/**
 * module2 引入第三方库：jQuery
 */

(function (w, $) {
    let data = '---module2---'

    function say() {
        console.log(`我是${data}`);
    }

    /**
     * 使用jQuery修改body的样式
     */
    function change() {
        $(document.body).css({
            background: 'green'
        })
    }


    w.module2 = {
        say,
        change
    }
})(window, jQuery)