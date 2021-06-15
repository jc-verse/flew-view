<template>
  <div class="card_item" >
    <div class="header_box" @click='clickCard'>
      <span class='title'>{{infoData.activityName || ''}}</span>
      <span class='down'>
        <i class='iconfont iconxiala icon_item' :class="[down ? 'icon_active': '']"></i>
      </span>
    </div>
    <div class="content_box" v-show='down'>
      <infoHead :infoData='newInfoData' :maxWidth='300'/>
      <information :topList='tops'/>
      <join-list title='活动信息' :value='infoData.activityInfo || "暂无活动信息"' type='text'/>
      <join-list title='招募要求' :value='infoData.requirement || "暂无招募要求"' type='text'/>
      <!-- <join-list v-if="infoData.phone" title='联系方式' :value='infoData.phone || ""' type='diy'>
        <template slot="diy">
          <span class="copy">手机号：{{infoData.phone || ''}}</span>
          <span class="copy_btn" @click="copy(infoData.phone)">复制</span>
        </template>
      </join-list> -->
      
      <div class="fagBtn" @click="clickFag"> 查看详情 </div>
    </div>
  </div>
</template>

<script>
import joinList from '@/components/cards/joinList';
import infoHead from '@/components/cards/infoHead';
import information from '@/components/cards/information';
import { copy } from '@/common/utils'
export default {
  name: 'cardItem',
  components: { infoHead, information, joinList },
  props: {
    infoData: {
      type: Object,
      default: ()=>({})
    }
  },
  data () {
    return {
      down: false,
      
    }
  },
  computed : {
    tops() {
      const { infoData } = this;
      const arr = [
        { title: '学校', val: infoData.schoolName || '', id: 1 }, 
        { title: '年级', val: infoData.grade || '',          id: 2 }, 
        { title: '课程', val: infoData.curriculumSystem || '', id: 4 }, 
        { title: '标化', val: infoData.standardizedPerformance || '', id: 3 }, 
      ]
      return arr
    },
    newInfoData () {
      const data = {...this.infoData};
      data.nikeName = `发起者：${ data.nikeName || data.nickName || ''}`;
      return data;
    }
  },
  methods: {
    copy,
    clickCard() {
      this.down = !this.down
    },
    clickFag() {
      this.$emit("clickBtn", this.infoData);
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
    @include fontMixin(34rpx, #333333, bold)
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
.copy{
  color: #b0a8a8;
}
.copy_btn{
  margin-left:20rpx;
  @include fontMixin(28rpx, #5C86F2)
}
</style>