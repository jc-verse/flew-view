<template>
  <div class="group_info_item">
  
    <infoHead :infoData='infoData'/>

    <div class="content">
      <!-- 个人信息 -->
      <information :topList='tops'/>
      <!-- 经历 -->
      <div class="center">
        <join-list title='个人留言' :value='infoData.personalMessage || "暂无留言"' type='text'/>
      </div>
    </div>

    <div class="buoy" v-if="userId != infoData.id"  @click.stop="clickBuoy(1)"> 申请服务 </div>
    <TipPopup title="申请服务" ref='tipPopup' msg="是否确认申请服务？" @confirm='confirm'/>
    <TipPopup title="操作提示" ref='noLogin' msg="是否登录后执行操作？" @confirm='toLogin'/>
  </div>
</template>

<script>
import joinList from '@/components/cards/joinList';
import infoHead from '@/components/cards/infoHead';
import information from '@/components/cards/information';
import CrewInfo from '@/components/cards/crewInfo';
import TipPopup from '@/components/cards/tipPopup';
import { bsToStrFn } from '@/common/utils';
import { isLogin, toLogin } from '@/common/utils'
export default {
  name: 'group_item',
  components: { infoHead, information, joinList, CrewInfo, TipPopup },
  props: {
    infoData: {
      type: Object,
      default: () => ({})
    },
    totalList:{
      type: Array,
      default: ()=>[]
    },
    userId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      type: 1,
    }
  },
  computed : {
    tops() {
      const { infoData } = this;
      const arr = [
        { title: '学校',    val: infoData.schoolName || '', id: 1 }, 
        { title: '年级',    val: infoData.grade || '',          id: 2 }, 
        { title: '课程体系', val: infoData.curriculumSystem || '', id: 4 }, 
        { title: '标化成绩', val: infoData.standardizedPerformance || '',           id: 3 }, 
        { title: '专业方向', val: infoData.professionalDirection || '', id: 4 }, 
        { title: '校内成绩', val: infoData.schoolRecord || '',         id: 3 }, 
        { title: '星级评价', val: infoData.star  || 0,           id: 5 , code: 'rate', readonly:true}, 
      ]
      return arr
    },
    bList() {
      const { competitionExperience  } = this.infoData;
      const arr = bsToStrFn(competitionExperience);
      return arr;
    },
  },
  methods:{
    toLogin,
    // 点击服务申请！
    clickBuoy (type) {
      if (!isLogin()) {
        this.$refs.noLogin.show()
        return 
      }
      this.type = type;
      this.$refs.tipPopup.show()
    },
    // 点击确定
    confirm () {
      const { type } = this
      this.$emit('clickBuoy', type, this.infoData)
    },
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
    justify-content: space-between;
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
  .evaluate{
    border-radius: 30rpx;
    background: #FFF6E8 ;
    position: absolute;
    top: 54rpx;
    right: 170rpx;
    padding: 10rpx 20rpx;
    @include fontMixin(28rpx, #EF8E17 ,bold);
  }
}
</style>