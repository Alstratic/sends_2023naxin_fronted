<template>
  <el-container class="all-container">
    <!-- navigator的布局 -->
    <el-header class="header-container">
      <Login_nav></Login_nav>
    </el-header>
    <!-- main区域 -->
    <el-main style="display: flex;flex-direction: column;">
      <div class="all-position-tags" style="margin-bottom: 1vh;" >
        <div class="all-position-font">
          <span class="all-position-font-detail">全部职位</span>
        </div>
        <div class="all-position-tags-detail">
          <div class="position-tags-types-detail">
            <span style="text-align: center;line-height: 35px;margin-right: 9px;">组织分类</span>
            <div>
                <Positiontag
                  :tags="this.organClass"
                  :id="1"
                  @tag-selected="SlctTagId"
                >
                </Positiontag>
            </div>
          </div>
          <div class="position-tags-types-detail">
            <span style="text-align: center;line-height: 35px;margin-right: 9px;">组织类别</span>
            <div>
            <Positiontag
              :tags="this.organType"
              :id="2"
              @tag-selected="SlctTagId"
            >
            </Positiontag>
          </div>
          </div>
          <div class="position-tags-types-detail">
            <span style="text-align: center;line-height: 35px;margin-right: 9px;">职位分类</span>
            <div>
            <Positiontag
              :tags="this.PosiTags"
              :id="3"
              @tag-selected="SlctTagId"
            >
            </Positiontag>
          </div>
          </div>
          <div class="position-tags-types-detail">
            <span style="text-align: center;line-height: 35px;margin-right: 9px;">招聘对象</span>
            <div>
            <Positiontag
              :tags="this.recruitTags"
              :id="4"
              @tag-selected="SlctTagId"
            >
            </Positiontag>
          </div>
          </div>
          <div class="position-tags-types-detail">
            <span style="text-align: center;line-height: 35px;margin-right: 9px;">职位经验</span>
            <div>
            <Positiontag
              :tags="this.posiExperience"
              :id="5"
              @tag-selected="SlctTagId"
            >
            </Positiontag>
          </div>
          </div>
        </div>
      </div>
      <div class="position-cards">
        <div
          class="row-card"
          v-for="(group, groupIndex) in groupedCardData"
          :key="groupIndex"
        >
          <HotPositionCard
            v-for="(cardData, cardIndex) in group"
            :key="cardIndex"
            :position-name="cardData.Name"
            :position-num="cardData.Nums"
            :tags="mergeTags(cardData)"
            :logo="cardData.OrganizationPath"
            :organization-name="cardData.OrganizationName"
            :organization-category="cardData.OrganizationCategory"
            :organization-classify="cardData.OrganizationClassify"
            :id="cardData.id"
          />
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Positiontag from '@/components/Positiontag.vue'
import axios from 'axios'
import HotPositionCard from '@/components/HotPositionCard.vue'
import Login_nav from '@/components/Login_nav.vue'

export default {
  components: { Positiontag, HotPositionCard, Login_nav },
  data() {
    return {
      tagsData: {},
      cardData: [],
      organClass: ['全部', '互联网', '设计', '娱乐', '党团组织'],
      organType: ['全部', '校级组织', '院级组织', '社团', '自建组织'],
      PosiTags: ['全部', '互联网/电子技术', '策划/管理', '新媒体/运营', '设计'],
      recruitTags: ['全部', '大一', '大二', '大三', '大四', '不限'],
      posiExperience: ['全部', '无需经验', '仅了解', '熟悉', '精通', '不限'],
      baseUrl: 'http://124.221.99.127:10810/square/posts',
      queryString1: '',
      queryString2: '',
      queryString3: '',
      queryString4: '',
      queryString5: '',
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      axios.get(this.baseUrl).then((response) => {
        this.cardData = response.data.data.posts
      })
    },
    mergeTags(cardData) {
      const mergedTags = []
      if (cardData.Classify) {
        mergedTags.push(cardData.Classify)
      }
      if (cardData.Experience) {
        mergedTags.push(cardData.Experience)
      }
      if (cardData.Object) {
        mergedTags.push(cardData.Object)
      }
      return mergedTags
    },
    SlctTagId(tag, id) {
      if (id === 1) {
        this.queryString1 =
          tag === '全部'
            ? ''
            : `?organizationClassify=${encodeURIComponent(tag)}`
        // console.log(this.queryString)
      } else if (id === 2) {
        this.queryString2 =
          tag === '全部'
            ? ''
            : `?organizationCategory=${encodeURIComponent(tag)}`
      } else if (id === 3) {
        this.queryString3 =
          tag === '全部' ? '' : `?classify=${encodeURIComponent(tag)}`
      } else if (id === 4) {
        this.queryString4 =
          tag === '全部' ? '' : `?object=${encodeURIComponent(tag)}`
      } else {
        this.queryString5 =
          tag === '全部' ? '' : `?experience=${encodeURIComponent(tag)}`
      }

      let queryString =
        this.baseUrl +
        this.queryString1 +
        this.queryString2 +
        this.queryString3 +
        this.queryString4 +
        this.queryString5
      let queryStringParts = queryString.split('?')
      queryString =
        queryStringParts[0] +
        (queryStringParts.length > 1
          ? '?' + queryStringParts.slice(1).join('&')
          : '')
      // console.log(queryString);

      let that = this
      axios.get(queryString).then((response) => {
        that.cardData = response.data.data.posts
      })
    },
  },
  computed: {
    groupedCardData() {
      const grouped = []
      if (typeof this.cardData === 'undefined') {
        this.emptyView = true // 设置 emptyView
        this.cardData = []
        return []
      }
      for (let i = 0; i < this.cardData.length; i += 2) {
        const group = [this.cardData[i]]
        if (i + 1 < this.cardData.length) {
          group.push(this.cardData[i + 1])
        }
        grouped.push(group)
      }
      return grouped
    },
  },
}
</script>

<style scoped lang="less">
.all-container {
  height: 100%;
  background-color: #fff;
}

#un-login {
  color: black;
  background-color: #ffd74d;
  font-family: 'Source Han Sans SC VF', sans-serif;
  font-size: 14px;
  padding: 8px 14px;
  font-weight: 800;
  border: 0;
}
/* position-tags的样式 */
.all-position-tags {
  display: flex;
  width: 100%;
  background-color: #fff;
  padding-left: 15%;

  flex-wrap: wrap;
  flex-direction: row;
  @media (max-width: 769px) {
    padding-left: 0%;
  }
}

.all-position-font {
  flex-basis: 100%; /* 将宽度设置为100%，使其占据整行 */
  font-size: 32px;
  font-weight: 500;
}

.all-position-tags-detail {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin-bottom: 5%;
  white-space: nowrap; /* 添加这一行样式 */
}

.position-tags-types-detail {
  display: flex;
  margin-top: 8px;
}

.position-tags-types-detail span {
  color: #929292;
  font-size: 20px;
  font-weight: 400;
  @media (max-width: 769px) {
    font-size: 14px;
  }
}

.position-cards {
  display: flex;
  justify-content: center;
  height: 80%;
  background-color: #fff;
  flex-wrap: wrap;
  @media (max-width: 769px) {
    display: block;
  }
}

.row-card {
  display: flex;
  flex-wrap: wrap;
  width: 65%;
  @media (max-width: 769px) {
    flex-wrap: wrap;
    width: 96%;
  }
}

.el-card.box-card.is-always-shadow {
  @media (max-width: 769px) {
    width: 100%;
    height: 100%;
  }
}
.Position-tag-list label.active {
  background-color: #ffd74d;
  transition: background-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
</style>