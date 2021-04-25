<template>
  <div class="card_item" >
    <div class="header_box" @click='clickCard'>
      <span class='title'>活动名称某某某某大赛1</span>
      <span class='down'>
        <i class='iconfont iconxiala icon_item' :class="[down ? 'icon_active': '']"></i>
      </span>
    </div>
    <div class="content_box" v-show='down'>
      <infoHead :iconFilter='iconFilter'/>
      <information :topList='topList'/>
      <join-list title='活动信息' value='海戏剧学院是中国培养戏剧专门人才的高等艺术院校,前身是上海市市立实验戏剧学校,1945年12月1日由著' type='text'/>
      <join-list title='招募要求' value='我是招募要求的文案我是招募要求的文案我是招募要求的文案我是招募要求的文案' type='text'/>
      
      <div class="fagBtn" @click="clickFag">
        查看详情
      </div>
    </div>
  </div>
</template>

<script>
import joinList from '@/components/joinList';
import infoHead from '@/components/infoHead';
import information from './components/information';
import crewInfo from './components/crewInfo';
import { genders,topList,cList,tagList } from '@/components/const';
export default {
  name: 'cardItem',
  components: { infoHead, information, joinList },
  data () {
    return {
      genders,topList,cList,tagList,
      down: false,
      
    }
  },
  computed : {
    iconFilter () {
      return this.genders[this.info || 'nv']
    }
  },
  methods: {
    clickCard() {
      this.down = !this.down
    },
    clickFag() {
      console.log(19923);
      this.$emit("clickBtn");
    }
  }
}
</script>

<style lang="scss" scoped>
$padding: 30rpx 20rpx;
.card_item{
  background: #ffffff;
  width: 100%;
  border-radius: 8px 8px 0px 0px;
  opacity: 0.8;
  position: relative;
  .header_box{
    background: #FFF7E8;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $padding;
    @include fontMixin(34rpx, #333333)
  }
  .content_box{
    padding: 20rpx 20rpx 120rpx;
  }
  .fagBtn{
    position: absolute;
    right: 0;
    bottom: 30rpx;
    background: rgba(92, 134, 242, .2);
    border-radius: 15px 0px 0px 15px;
    padding: 10rpx 20rpx;
    @include fontMixin(28rpx, #5C86F2)
  }
}
.icon_item{
  display: inline-block;
  transform: rotate(0);
}
.icon_active{
  transform: rotate(-180deg);
}
</style>