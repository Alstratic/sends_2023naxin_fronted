// 引入 Mock.js
import Mock from 'mockjs'

// 定义模拟数据规则，多次调用 Mock.mock 来生成多组数据
Mock.mock('/api/cardData', {
  positionName: '@cname',
  positionNum: '@natural(1, 10)',
  tags: function () {
    const tagList = ['大一', '大二', '大三', '大四', '研究生']
    const tagCount = Mock.Random.natural(1, 5)// 随机生成 1 到 5 个元素
    return Mock.Random.shuffle(tagList).slice(0, tagCount)
  },
  logo: '@image(100x100)',
  organizationName: '@ctitle(5, 10)',
  organizationType: '@cword(3, 5) | @cword(3, 5)'
})

export default Mock
