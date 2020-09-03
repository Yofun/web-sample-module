(function () {
    requirejs.config({
        baseUrl: 'js/',
        paths: {
            // 隐射：模块标识名：路径
            module1: './modules/module1',
            module2: './modules/module2',
            module3: './modules/module3',
            jquery: './lib/jquery'
        }
    })

    // 引用module2
    requirejs(['module2'], function (m2) {
        m2.show()
    })

    // 引用module3 使用jQuery
    requirejs(['module3'], function (m3) {
        m3.show()

        m3.each(['red', 'green', 'blue'], function (index, item) {
            console.log('第' + index + '个', '值为：' + item);
        })
    })
})()