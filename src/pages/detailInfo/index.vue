<template>
<page-sj>
  <div class="detail_info" >
    <scroll-box>
      <div class="content_box">
        <div class="top">
          <infoHead :iconFilter='iconFilter' :showGender='false'/>
          <!-- 个人信息 -->
          <information :topList='topList'/>
        </div>
        <div class="center">
          <join-list title='比赛经历' :list='cList'/>
          <join-list title='比赛经历' :list='tagList' type='diy'>
            <div class="tags" slot='diy' >
              <div class="tag" v-for='(ite,ind) in tagList' :key='ind'>{{ite || ''}}</div>
            </div>
          </join-list>
          <join-list title='个人留言' value='留言士大夫士大夫' :list='cList' type='text'/>
        </div>
        <div class="bottom">
          <div class="headline">{{ `一对一指导需要收取一定费用哦` }}</div>
          <div class="join_box">
            <div class="left">
              <img src="@/static/img1/QR_code.png" alt="">
            </div>
          </div>
          <div class="b_tip">了解详情长按二维码添加客服。</div>
        </div>
      </div>
      
      <!-- 底部logo -->
      <bottom-logo/>
    </scroll-box>
    <fab-group/>
  </div>
</page-sj>
  
</template>

<script>
import scrollBox from '@/components/scrollBox';
import pageSj from '@/components/pageSjNew';
import tagGroup from '@/components/forms/tagGroup';
import fabGroup from '@/components/fabGroup';
import bottomLogo from "@/components/bottomLogo";
import infoHead from '@/components/cards/infoHead';
import information from '@/components/cards/information';
import joinList from '@/components/cards/joinList';
export default {
  name:'detail_info',
  components: { 
    tagGroup, 
    scrollBox, 
    fabGroup, 
    bottomLogo,
    infoHead,
    information,
    joinList,
    pageSj
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
    padding: 0 20rpx;
  }
  .content_box>div{
    margin: 20rpx 0 10rpx 0;
    border-radius: 8px;
    background: #ffffff;
    width: 100%;
    padding: 30rpx;
    box-sizing: border-box;
  }
  .top{
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
  .bottom{
    display: flex;
    flex-direction: column;
    align-items: center;
    .join_box>.left{
      width: 200rpx;
      height: 200rpx;
      @include img_fill;
    }
    .headline{
      @include fontMixin(36rpx, #131415 ,bold);
      padding: 20rpx 0;
      font-size: 30rpx;
    }
    .b_tip{
      @include fontMixin(24rpx, #666666)
    }
  }
}
</style>
