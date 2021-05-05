<template>
  <div class="group_info_item" @click="clickItem">
  
    <infoHead :iconFilter='iconFilter'  :showGender='false'/>

    <div class="content">
      <!-- 个人信息 -->
      <information :topList='topList'/>
      <!-- 经历 -->
      <div class="center">
        <join-list title='奖项' :list='cList'/>
        <join-list title='评价' :value='`我是留言文案文案文案文案文案文案文案文案文案文案`' type='text'/>
      </div>
    </div>
  </div>
</template>

<script>
import joinList from './components/joinList';
import infoHead from '@/components/cards/infoHead';
import information from './components/information';
import crewInfo from './components/crewInfo';
export default {
  name: 'group_item',
  components: { infoHead, information, joinList, crewInfo },
  data () {
    return {
      genders: {
        'nan':{ icon:'iconxingbie-nan', id: '1', name:'某某男', value: '' },
        'nv': { icon:'iconxingbie-nv', id: '2', name:'某某女' , value: 'nv'}
      },
      topList: [
        { title: '学校', val: '世界联合学院', id: 1, width: '50%' }, 
        { title: '年纪', val: '10', id: 2 , width: '50%'}, 
        { title: '课程', val: 'ALEVEL', id: 4, width: '50%' }, 
        { title: '标化', val: '我是标化成绩', id: 3, width: '50%' }, 
        // { title: '评分', val: '3', id: 5 , code: 'rate'}, 
      ],
      cList: [ '2020 NSDA最佳辩手', '2020 NSHDLC 全程最佳辩手', '2020 AIME 全球前百分之一' ],
      tagList: [ 'NECIEO', 'AIME',  ],
      info: '',
      showList: false,
      showInfo: false
    }
  },
  computed : {
    iconFilter () {
      return this.genders[this.info || 'nv']
    }
  },
  methods:{
    clickDown () {
      this.showList = !this.showList
    },
    // 点击组队申请！
    clickBuoy () {
      console.log('点击组队申请！')
    },
    clickItem() {
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
    top: 54rpx;
    right: 0;
    padding: 10rpx 20rpx;
    @include fontMixin(28rpx, #5C86F2 ,bold);
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