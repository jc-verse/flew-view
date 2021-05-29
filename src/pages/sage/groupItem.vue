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
      <div class="group_infos" v-if='slaveList.length'>
        <div class="team_member" @click="showInfo=!showInfo">
          <div class="left">团队成员：{{slaveList}}</div>
          <i @click='clickDown' class='iconfont iconxiala' :class="[!showList? 'icon_active': '']"></i>
        </div>
        <!-- 团队成员信息 -->
        <CrewInfo :info='ite' v-for="(ite, ind) in infoData.slave" :key='ind' v-show="showInfo"/>
      </div>
    </div>

    <div class="buoy" v-if='infoData.rank == 2' @click="clickBuoy(infoData)"> 申请组队 </div>
    <TipPopup title="操作提示" ref='noLogin' msg="是否登录后执行操作？" @confirm='toLogin'/>
    <TipPopup title="提示" ref='toUserInfo' msg="是否完善个人信息？" @confirm='toUserInfo(true)' @close='toUserInfo(false)'/>

  </div>
</template>

<script>
import joinList from '@/components/cards/joinList';
import infoHead from '@/components/cards/infoHead';
import information from '@/components/cards/information';
import CrewInfo from '@/components/cards/crewInfo';
import TipPopup from '@/components/cards/tipPopup';
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
    }
  },
  data () {
    return {
      info: '',
      showList: false,
      showInfo: false,
      toUserInfoUrl: ''
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
      const { competitionExperience  } = this.infoData;
      const arr = (competitionExperience || []).map(item => item.name);
      return arr
    },
    tags() {
      const { totalList, infoData } = this;
      const { match, matchList } = infoData || {};
      const arr = (matchList || '').split(',');
      return arr
    },
    slaveList () {
      const slave = this.infoData.slave || [];
      return slave.reduce((i, j)=> {
        return  i ? i +'/'+ j.nikeName : i + j.nikeName
      }, '')
    }
  },
  methods:{
    toLogin,
    clickDown () {
      this.showList = !this.showList
    },
    // 跳转信息录入
    toUserInfo (flag) {
      if (flag) {
        uni.navigateTo({ url: this.toUserInfoUrl });
        this.toUserInfoUrl = ''
      } else {
        uni.showToast({title: '请录入信息后, 申请服务!', icon: 'none'})
      }
    },
    // 点击组队申请！
    clickBuoy (type) {
      if (!isLogin()) {
        this.$refs.noLogin.show()
        return 
      }

      const  toUserInfoUrl = uni.getStorageSync('toUserInfoUrl');
      if (toUserInfoUrl) {
        this.toUserInfoUrl = toUserInfoUrl;
        this.$refs.toUserInfo.show();
      } else {
        this.$emit('clickBuoy', type)
      }
      
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