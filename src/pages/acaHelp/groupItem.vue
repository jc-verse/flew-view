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
    <TipPopup title="申请服务" ref='tipPopup' msg="是否确认申请服务？" @confirm='confirm'/>
    <TipPopup title="操作提示" ref='noLogin' msg="是否登录后执行操作？" @confirm='toLogin'/>

    <TipPopup title="选择学科" ref='subjectPopup' msg="是否登录后执行操作？" @confirm='confirm'>
      <template slot='content'>
        <div class="content_box">
          <picker @change="bindPickerChange" :value="index" range-key='label' :range="systemList" selector-type='select'>
            <view class="uni-input">{{systemList[index].label}}</view>
          </picker>
        </div>
      </template>
    </TipPopup>
    <!-- <TipPopup title="选择学科" ref='subjectPopup' msg="是否登录后执行操作？" @confirm='confirm'>
      <template slot='content'>
        <div class="content_box">
          <scroll-view class="select_box" :scroll-y="true" :show-scrollbar='true'>
            <div :class="['select_item', checkList.includes(i.id) ? 'check': '']" v-for='i in systemList' :key='i' @click="checkItem(i.id)">
              {{i.label}}
              <i class="iconfont iconziyuanldpi icon"></i>
            </div>
          </scroll-view>
        </div>
      </template>
    </TipPopup> -->
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
import { academicGetEvaluate, selectCurriculumSystem } from '@/common/api';
import DiyRate from '@/components/diyRate';
import { isLogin, toLogin } from '@/common/utils';
// const demoSel= [
//   { label: '小白', id: 1 },
//   { label: '小白1', id: 2 },
//   { label: '小白2', id: 3 },
//   { label: '小白3', id: 4 },
//   { label: '小白4', id: 5 },
//   { label: '小白5', id: 6 },
//   { label: '小白6', id: 7 },
//   { label: '小白7', id: 8 },
// ]
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
      rateForm: {},
      index: 0,
      systemList:[],
      // demoSel,
      checkList: [] // 被选中的id
    }
  },
  computed : {
    tops() {
      const { infoData } = this;
      const arr = [
        { title: '学校', val: infoData.schoolName || '', id: 1 }, 
        { title: '年级', val: infoData.grade || '',          id: 2 }, 
        { title: '课程', val: infoData.curriculumSystem || '', id: 4 }, 
        { title: '标化', val: infoData.standardizedPerformance || '',           id: 3 }, 
        { title: '专业', val: infoData.professionalDirection || '', id: 4 }, 
        { title: '成绩', val: infoData.schoolRecord || '',         id: 3 }, 
        { title: '评价', val: infoData.star  || 0,           id: 5 , code: 'rate', readonly:true}, 
      ]
      return arr
    },
    bList() {
      const { curriculumSystemList  } = this.infoData;
      const arr = bsToStrFun(curriculumSystemList);
      return arr;
    },
  },
  mounted() {
    this.selectCurriculumSystem();
  },
  methods:{
    toLogin,
    checkItem(id) {
      const { checkList } = this;
      if (checkList.includes(id)) {
        this.checkList = checkList.filter(item => item!= id)
      } else {
        this.checkList.push(id);
      }

    },
    selectCurriculumSystem() {
      selectCurriculumSystem({serviceUserId : this.infoData.id}).then(res => {
        const {data: nData} = res[1];
        const { code, data, success } = nData || {};
        if (code === 200 && success) {
          if (Array.isArray(data)) {
            const arr = data.map(item => ({ ...item, label: item.subject  }))
            this.systemList = arr || []
            console.log(988, arr)
          }
        }
      }).catch(err=>{console.log(err)})
    },
    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.target.value)
        this.index = e.target.value
        console.log(199,e)
    },
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
          
          this.$refs.subjectPopup.show();
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
      const { type, index, systemList } = this
      this.$emit('clickBuoy', type, this.infoData, systemList[index].id )
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
  
  .content_box{
    padding: 10rpx 0rpx;
    min-width: 300rpx;
    // border: 2rpx solid rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: 20rpx;
    margin: 20rpx;
  }
}
.select_box{
  height: 300rpx;
  .select_item{
    padding: 20rpx 60rpx 20rpx 20rpx;
    margin: 10rpx;
    text-align: left;
    position: relative;
    
  }
  .check{
    color: #5C86F2;
    // background: rgba(92, 134, 242, 0.3);
    .icon{
      // background: #5C86F2;
      color: #5C86F2;
    }
  }
  .icon{
    position: absolute;
    right: 20rpx;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(0, 0, 0,.3);
    // background: #b7b5b5;
    padding: 15rpx;
    border-radius: 50%;
    font-size: 20rpx;
  }
}

</style>