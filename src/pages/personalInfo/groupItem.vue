<template>
  <div class="group_info_item">
  
    <infoHead :infoData='infoData' />

    <div class="content">
      <!-- 个人信息 -->
      <information :topList='tops'/>
      <!-- 经历 -->
      <div class="center">
        <join-list title='比赛经历' :list='bList' v-if="bList.length"/>

        <join-list title='个人留言' :value='infoData.personalMessage || "暂无留言"' v-if="infoData.personalMessage" type='text'/>
      </div>
    </div>

    <div class="buoy" @click="clickBuoy(infoData.type)"> 修改 </div>
    <TipPopup title="操作提示" ref='noLogin' msg="是否登录后执行操作？" @confirm='toLogin'/>

  </div>
</template>

<script>
import joinList from '@/components/cards/joinList';
import infoHead from '@/components/cards/infoHead';
import information from '@/components/cards/information';
import crewInfo from '@/components/cards/crewInfo';
import TipPopup from '@/components/cards/tipPopup';
import { isLogin, toLogin } from '@/common/utils'

export default {
  name: 'group_item',
  components: { infoHead, information, joinList, crewInfo, TipPopup },
  props: {
    infoData: {
      type: Object,
      default: ()=>({})
    }
  },
  data () {
    return {
    }
  },
  computed : {
    tops() {
      const { infoData } = this;
      const arr = [
        { title: '学校',    val: infoData.schoolName || '', id: 1 }, 
        { title: '年级',    val: infoData.grade || '',          id: 2 }, 
        { title: '课程', val: infoData.curriculumSystem || '', id: 4 }, 
        { title: '标化', val: infoData.standardizedPerformance || '',           id: 3 }, 
        { title: '专业', val: infoData.professionalDirection || '', id: 4 }, 
        { title: '成绩', val: infoData.schoolRecord || '',         id: 3 }, 
        { title: '评价', val: infoData.star  || 0,           id: 5 , code: 'rate', readonly:true}, 
      ]
      return arr
    },
    bList() {
      const { competitionExperienceList  } = this.infoData;
      const arr = (competitionExperienceList || []).map(item => item.name);
      return arr
    }
  },
  methods:{
    toLogin,
    clickBuoy (type) {
      if (!isLogin()) {
        this.$refs.noLogin.show()
        return 
      }
      this.$emit('clickBuoy', type)
    }
  }

}
</script>

<style lang="scss" scoped>
@import url("/static/fonts/iconfont.css");
.group_info_item{
  background: #FFFFFF;
  border-radius: 8px;
  padding: 30rpx;
  margin-bottom: 20rpx;
  position: relative;

  .content>div:not(:last-child){
    border-bottom: 2rpx solid #ECEEF6;
  }
  .team_member{
    display: flex;
    @include flex_center;
    @include fontMixin(30rpx, #676FDF ,400);
    .left{
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    i{ 
      padding: 24rpx;
      color: rgba(0, 0, 0, 0.3)
    }
    .icon_active{
      transform: rotate(-90deg);
    }
  }
  .buoy{
    border-radius: 30rpx 0 0 30rpx;
    background: rgba(92,134,242,.2);
    position: absolute;
    top: 60rpx;
    right: 0;
    padding: 10rpx 20rpx;
    @include fontMixin(28rpx, #5C86F2 ,500);
  }
  
}

</style>