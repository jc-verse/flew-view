<template>
<page-sj>
  <div class="detail_info">
    <scroll-box style='width:100%'>
      <div class="content_box">
        <div class="top">
          <infoHead :iconFilter='iconFilter'/>
          <!-- 个人信息 -->
          <information :topList='topList'/>
        </div>
        <div class="center">
          <join-list title='活动信息' value='活动信息150字，招募要求100字，组队人数8/20人急话缓说计划计划' type='text'/>
          <join-list title='组队人数' :list='tagList' type='diy'>
            <div class="tags" slot='diy' >
              <div class="tag" >{{`${7}/${8}人`}}</div>
            </div>
          </join-list>
          <join-list title='招募要求' value='招募要求100字，摄影师、插画师、艺术家、创意人,设计创意群体中具有较高的影响力与号召力' :list='cList' type='text'/>
        </div>
        <div class="memeber_box">
          <div class="me_title">组队成员</div>
          <member/>
        </div>
        
      <!-- 底部logo -->
      <bottom-logo/>
    </div>
      
    </scroll-box>
    <fab-group/>
    <div class="join_btn">
      <div class="btn">申请加入</div>
    </div>
  </div>
</page-sj>
  
</template>

<script>
import scrollBox from '@/components/scrollBox';
import fabGroup from '@/components/fabGroup';
import bottomLogo from "@/components/bottomLogo";
import infoHead from '@/components/cards/infoHead';
import information from '@/components/cards/information';
import joinList from '@/components/cards/joinList';
import member from './member'
export default {
  name:'detail_info',
  components: { 
    scrollBox, 
    fabGroup, 
    bottomLogo,
    infoHead,
    information,
    joinList,
    member
  },
  data() {
    return {
      show: false,
      index: 0,
      isH5: false,
      genders: {
        'nan':{ icon:'iconxingbie-nan', id: '1', name:'某某男', value: '' },
        'nv': { icon:'iconxingbie-nv', id: '2', name:'某某女' , value: 'nv'}
      },
      topList: [
        { title: '学校', val: '世界联合学院', id: 1 }, 
        { title: '年纪', val: '10', id: 2 }, 
        { title: '标化', val: '我是标化成绩范围18字符', id: 3 }, 
        { title: '课程', val: 'ALEVEL', id: 4 }, 
      ],
      cList: [ '2020 NSDA最佳辩手', '2020 NSHDLC 全程最佳辩手', '2020 AIME 全球前百分之一' ],
      tagList: [ 'NECIEO', 'AIME',  'NECIEO', 'AIME', 'NECIEO', 'AIME', 'NECIEO', 'AIME', 'NECIEO', 'AIME', ],
    }
  },
  computed : {
    iconFilter () {
      return this.genders['nv']
    }
  },
  onLoad() {
    // #ifdef H5
      this.isH5 = true
    // #endif
  },
  methods : {
  },
}
</script>

<style lang="scss" scoped>
@import url("/static/fonts/iconfont.css");
$color:#B3B3B4;
.detail_info{
  display: flex;
  flex-direction: column ;
  background: #F1F3F5;
  .content_box{
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0 20rpx 120rpx;
    >.top,>.center{
      margin: 20rpx 0 10rpx 0;
      border-radius: 8px;
      background: #ffffff;
      width: 100%;
      padding: 30rpx;
      box-sizing: border-box;
    }
  }
  .center{
    .tags{
      display: flex;
      flex-wrap: wrap;
      .tag {
        @include fontMixin(28rpx,#b0a8a8);
        margin-right: 20rpx;
      }
    }
  }
  .memeber_box{
    .me_title{
      font-size: 32rpx;
      font-family: Helvetica;
      color: #000000;
      line-height: 44rpx;
      padding:20rpx 0 0 30rpx;
    }
  }
  .join_btn{
    position: fixed;
    bottom: 0;
    padding: 20rpx;
    width: 100%;
    background: #ffffff;
    box-sizing: border-box;
    .btn{
      background: #676FDF;
      padding: 20rpx 0;
      text-align: center;
      width: 100%;
      border-radius: 40rpx;
      @include fontMixin(32rpx, #ffffff)
    }
  }
}
</style>
