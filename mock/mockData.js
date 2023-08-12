// 引入 Mock.js
import Mock from 'mockjs'

// 定义模拟数据规则，多次调用 Mock.mock 来生成多组数据
Mock.mock('/api/cardData/1', {
  positionName: '@cname',
  positionNum: '@natural(1, 10)',
  tags: function () {
    const tagList = ['大一', '大二', '大三', '大四', '研究生']
    const tagCount = Mock.Random.natural(1, 5)// 随机生成 1 到 5 个元素
    const tags = Mock.Random.shuffle(tagList).slice(0, tagCount)
    tags.unshift('全部')
    return tags
  },
  isSelected: function () {
    return Array(this.tags.length).fill(false)
  },
  logo: '@image(100x100)',
  organizationName: '@ctitle(3, 7)',
  organizationType: '@cword(3, 4) | @cword(3, 4)'
})

Mock.mock('/api/cardData/2', {
  positionName: '@cname',
  positionNum: '@natural(1, 10)',
  tags: function () {
    const tagList = ['大一', '大二', '大三', '大四', '研究生', '播音', '日语口语']
    const tagCount = Mock.Random.natural(1, 5)// 随机生成 1 到 5 个元素
    return Mock.Random.shuffle(tagList).slice(0, tagCount)
  },
  logo: '@image(100x100)',
  organizationName: '@ctitle(3, 7)',
  organizationType: '@cword(4, 4) | @cword(4, 4)'
})

Mock.mock('/api/cardData/3', {
  positionName: '@cname',
  positionNum: '@natural(1, 10)',
  tags: function () {
    const tagList = ['大一', '大二', '大三', '大四', '研究生']
    const tagCount = Mock.Random.natural(1, 5)// 随机生成 1 到 5 个元素
    return Mock.Random.shuffle(tagList).slice(0, tagCount)
  },
  logo: '@image(100x100)',
  organizationName: '@ctitle(3, 7)',
  organizationType: '@cword(3, 4) | @cword(3, 4)'
})

Mock.mock('/api/cardData/4', {

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

Mock.mock('/api/cardData/5', {
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

Mock.mock('/api/cardData/6', {
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

Mock.mock('/api/cardData/7', {
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
Mock.mock('/api/cardData/8', {
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
Mock.mock('/api/cardData/9', {
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

Mock.mock('/api/cardData/10', {
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

Mock.mock('/api/cardData/11', {
  positionName: '@cname',
  Status: function () {
    const statusList = ['已查看', '已拒绝', '待考核', '已面试', '考核中']
    return Mock.Random.pick(statusList)
  },
  tags: function () {
    const tagList = ['大一', '大二', '大三', '大四', '研究生']
    const tagCount = Mock.Random.natural(1, 5)// 随机生成 1 到 5 个元素
    return Mock.Random.shuffle(tagList).slice(0, tagCount)
  }
})
export default Mock
