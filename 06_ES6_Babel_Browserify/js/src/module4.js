/**
 * 混合暴露
 */
// 分别暴露
export let name = '周星驰'
export let age = 30


// 统一暴露
let height = 176
let sex = '男'

export {
    height,
    sex
}


// 默认暴露
export default {
    job: ['演员', '主持人', '导演', '编剧'],
    hobby: ['唱歌', '跳舞', '搞笑', '配音', '无厘头']
}

