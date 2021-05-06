<template>
  <div class="group_info_item">
  
    <infoHead :infoData='infoData'/>

    <div class="content">
      <!-- 个人信息 -->
      <information :topList='tops'/>
      <!-- 经历 -->
      <div class="center">
        <join-list title='比赛经历' :list='bList'/>
        <join-list title='希望参加的比赛' :list='tags' type='tag'/>
      </div>
      <!-- 团队成员 -->
      <div class="group_infos">
        <div class="team_member" @click="showInfo=!showInfo">
          <div class="left">团队成员：某某某/某某某/某某某/某某某/某某某/某某某</div>
          <i @click='clickDown' class='iconfont iconxiala' :class="[!showList? 'icon_active': '']"></i>
        </div>
        <!-- 团队成员信息 -->
        <CrewInfo :info='{ iconFilter, topList }' v-for="ite in 2" :key='ite' v-show="showInfo"/>
      </div>
    </div>

    <div class="buoy" @click="clickBuoy"> 申请组队 </div>
  </div>
</template>

<script>
import joinList from '@/components/cards/joinList';
import infoHead from '@/components/cards/infoHead';
import information from '@/components/cards/information';
import CrewInfo from './components/crewInfo';
export default {
  name: 'group_item',
  components: { infoHead, information, joinList, CrewInfo },
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
      genders: {
        'nan':{ icon:'iconxingbie-nan', id: '1', name:'某某男', value: '' },
        'nv': { icon:'iconxingbie-nv', id: '2', name:'某某女' , value: 'nv'}
      },
      topList: [
        { title: '学校', val: '世界联合学院', id: 1 }, 
        { title: '课程', val: 'ALEVEL', id: 4 }, 
        { title: '标化', val: '我是标化成绩范围18字符', id: 3 }, 
        { title: '年级', val: '10', id: 2 }, 
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
    },
    tops() {
      const { infoData } = this;
      const arr = [
        { title: '学校',    val: infoData.admission || '', id: 1 }, 
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
      const arr = (competitionExperience || []).map(item => item.name);
      return arr
    },
    tags() {
      const { totalList, infoData } = this;
      const { match, matchList } = infoData || {};
      const arr = matchList.split(',');
      // if (match && Array.isArray(match)) {
      //   match.forEach(item =>{
      //     const { organizeTypeId: a, organizeTypeSon: b, organizeTypeSonMatchId: c } = item;
      //     totalList.forEach(items => {
      //       if(items.id == a ) {
      //         items && items.children.forEach(ite =>{
      //           if (ite.id == b) {
      //             ite.children.forEach(i =>{
      //               if (i.id == c) {
      //                 arr.push(i.abbreviation)
      //               }
      //             })
      //           }
      //         })
      //       }
      //     })
      //   })
      // }
      return arr
    }
  },
  methods:{
    clickDown () {
      this.showList = !this.showList
    },
    // 点击组队申请！
    clickBuoy () {
      console.log('点击组队申请！')
      this.$emit('clickBuoy')
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