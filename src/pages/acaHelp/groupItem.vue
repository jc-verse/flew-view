<template>
  <div class="group_info_item" @click.stop='clickItem'>
  
    <infoHead :infoData='infoData'>
      <template slot="right"> 
        <div class="btn_box">
          <div v-if="infoData.isAcademic == 2 && infoData.isAcademic != 4" @click.stop="clickBuoy(1)">申请服务</div>
          <div v-else-if='infoData.isAcademic == 1' class="disable">{{'申请中'}}</div>
          <div v-else-if='infoData.isAcademic == 3' class="disable">{{'进行中'}}</div>
          <div class="orange" @click.stop="clickBuoy(2)">查看评价</div>
        </div>
      </template>
    </infoHead>
    <div class="content">
      <!-- 个人信息 -->
      <information :topList='tops'/>
      <!-- 经历 -->
      <div class="center">
        <join-list title='课程体系' :list='bList'/>
        <join-list title='个人留言' :value='infoData.personalMessage || "暂无留言"' type='text'/>
      </div>
    </div>

    <!-- <div class="buoy btn blue" v-if="infoData.isAcademic == 2" @click.stop="clickBuoy(1)"> 申请服务 </div> -->
    <!-- <div :class="['orange','btn',infoData.isAcademic != 2 ? 'buoy' : 'evaluate']" @click.stop="clickBuoy(2)" >查看评价</div> -->
    <TipPopup title="申请服务" ref='tipPopup' msg="是否确认申请服务？" @confirm='confirm'/>
    <TipPopup title="操作提示" ref='noLogin' msg="是否登录后执行操作？" @confirm='toLogin'/>
    <DiyRate ref='diyRate' :rateData='rateForm' :readonly='true'></DiyRate>
  </div>
</template>

<script>
import joinList from '@/components/cards/joinList';
import infoHead from '@/components/cards/infoHead';
import information from '@/components/cards/information';
import CrewInfo from '@/components/cards/crewInfo';
import TipPopup from '@/components/cards/tipPopup';
import { bsToStrFn, bsToStrFun } from '@/common/utils';
import { academicGetEvaluate } from '@/common/api';
import DiyRate from '@/components/diyRate';
import { isLogin, toLogin } from '@/common/utils'
export default {
  name: 'group_item',
  components: { infoHead, information, joinList, CrewInfo, TipPopup, DiyRate },
  props: {
    infoData: {
      type: Object,
      default: () => ({})
    },
    totalList:{
      type: Array,
      default: ()=>[]
    }
  },
  data () {
    return {
      type: 1,
      rateForm: {}
    }
  },
  computed : {
    tops() {
      const { infoData } = this;
      console.log(12213123,infoData)
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
      const { curriculumSystemList   } = this.infoData;
      const arr = bsToStrFun(curriculumSystemList);
      return arr;
    },
  },
  methods:{
    toLogin,
    academicGetEvaluate(serviceUserId ) {
      academicGetEvaluate({serviceUserId}).then(res => {
        const {data: nData} = res[1];
        const { code, data, success } = nData || {};
        if (code === 200 && success) {
          this.rateForm = data
          this.$refs.diyRate.show()
        }
      })
    },
    // 点击组队申请！
    clickBuoy (type) {
      if (!isLogin()) {
        this.$refs.noLogin.show()
        return 
      }
      this.type = type;
      console.log(1222, type, this.$refs, DiyRate)
      switch (type) {
        case 1:
          this.$refs.tipPopup.show()
          break;
        case 2:
          this.academicGetEvaluate(this.infoData.id)
          break;
      
        default:
          break;
      }
    },
    // 点击确定
    confirm () {
      const { type } = this
      this.$emit('clickBuoy', type, this.infoData)
    },
    clickItem() {
      if (!isLogin()) {
        return 
      }
      this.$emit('clickItem')
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
  .btn_box{
    display: flex;
    flex-direction: row-reverse;
    margin-right: -30rpx;
    > div {
      padding: 10rpx 10rpx;
      border-radius: 30rpx;
      background: rgba(92,134,242,.2);
      @include fontMixin(24rpx, #5C86F2 ,500);
    }
    &>div:first-child{
      border-radius: 30rpx 0 0 30rpx;
    }
    &>div:not(:first-child){
      margin-right: 10rpx;
    }
    .disable{
      filter: grayscale(100%);
    }
    .orange{
      background: #FFF6E8 ;
      color: #EF8E17;
    }
  }
  
}
</style>