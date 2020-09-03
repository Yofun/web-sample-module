exports.name = '张学友'

module.exports = function () {
    console.log('module.exports', module.exports);
    console.log('exports', exports);
    return module.exports === exports
}