<template>
  <div class="logs-wrapper">
    <swiper v-if="imgUrls.length > 0" indidator-dots="imgUrls.length > 1" >
      <block v-for="(item, index) in imgUrls" :key="index" >
        <swiper-item>
          <image :src="item" mode="scaleToFill"></image>
        </swiper-item>
      </block>
    </swiper>

    <View class="container log-list">
      <View v-for="(item, index) in newsList" :class="{ red: aa }" :key="index" class="thread">
        <!-- <card :text="(index + 1) + ' . ' + log.node.name"></card> -->
        <View className='info'>
          <!-- <Image :src="item.member.avatar_large" /> -->
          <View class="middle">
            {{item.member.username}}
          </View>
          <View>评论 {{item.replies}}</View>
          <View>{{item.node.title}}</View>
          <View>{{item.title}}</View>
        </View>
      </View>
    </View>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { SET_NEWS_LIST } from '@/store/mutation-types'
import { formatTime } from '@/utils/index'
import card from '@/components/card'

export default {
  components: {
    card
  },

  data () {
    return {
      logs: [],
      imgUrls: [
        'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/newsPicture/05558951-de60-49fb-b674-dd906c8897a6',
        'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/coursePicture/0fbcfdf7-0040-4692-8f84-78bb21f3395d',
        'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/management-school-picture/7683b32e-4e44-4b2f-9c03-c21f34320870'
      ]
    }
  },
  created () {
    this.fetchNews()
    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({key: 'logs'}).data || []
    } else {
      logs = mpvue.getStorageSync('logs') || []
    }
    this.logs = logs.map(log => formatTime(new Date(log)))
  },
  computed: {
    ...mapState('news', ['newsList', 'hasMore'])
  },
  methods: {
    ...mapMutations('news', {
      setNewsList: SET_NEWS_LIST
    }),
    ...mapActions('news', [
      'getNewsList'
    ]),
    async fetchNews () {
      console.log('fetchNews')
      await this.getNewsList()
      console.log(this.newsList)
    }
  }
}
</script>

<style lang="stylus" scoped>
.logs-wrapper
.log-list
  display: flex;
  flex-direction: column;
  padding: 40rpx;
.log-item
  margin: 10rpx;
.thread
  display: flex;
  padding: 15px;
  border-bottom: 1px solid red;
  flex-direction: column;
.info
  display: flex;
  height: 65px;
  margin-bottom: 5px;
  margin-top: 5px;
.info .author
  font-size: 28px;
.bold
  font-size: 32px;
  font-weight: bold;
.avatar
  max-width: 65px;
  max-height: 65px;
  border-radius: 50%;
  margin-right: 10px;
.middle
  flex: 1;
  display: flex;
  margin-left: 10px;
  flex-direction: column;
.mr10
  margin-right: 10px;
.info .replies
  font-size: 20px;
  color: darkgray;
.node
  float: right;
.node .tag
  font-size: 24px;
  padding: 5px 15px;
  float: right;
  background-color: #eeeeee;
  border-radius: 5px;
.title
  margin-top: 10px;
  font-size: 30px;

</style>
