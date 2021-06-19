<template>
<!-- 2.SAGE -->
<page-sj>
  <div class="page_box">
    <tag-group @changeValue='changeTag'></tag-group>
    <scroll-box @lower='lower'>
      <synopsis :info='newBg'>
      </synopsis>
      <div class="group_info_list" v-if="cardList.length">
        <group-item v-for="(item, ind) in cardList" :totalList='totalList' :infoData='item' :key='ind' @clickBuoy='clickBuoy'/>
      </div>
      
      <template v-else>
        <div class="noList">
          当前无队伍！
        </div>
      </template>
    </scroll-box>
    <fab-group/>
  </div>
  <DiyPopup ref='popup' :noUp='true'>
    <div class="tip_box" slot='tip' @click.stop>
      <div class="title">组队申请</div>
      <div class="msg">请完善个人信息后申请！</div>
      <div class="btns">
        <div class="no" @click.stop="close(false)">取消</div>
        <div class="yes" @click.stop="close(true)">确定</div>
      </div>
    </div>
  </DiyPopup>

</page-sj>
</template>

<script>
import pageSj from '@/components/pageSjNew';
import DiyPopup from '@/components/diyPopup';
import scrollBox from '@/components/scrollBox';
import fabGroup from '@/components/fabGroup';
import tagGroup from '@/components/forms/tagGroup' ;
import groupItem from './groupItem';
import synopsis from './synopsis';

import { getCurPage, joinUrl } from '@/common/utils';
import { branchCompetitionUser, teamUpranks } from '@/common/api';
import { bgColors } from './const';


export default {
  name:'sage',
  components: { tagGroup, synopsis, groupItem, fabGroup, scrollBox, pageSj, DiyPopup },
  data() {
    return {
      show: false,
      index: 0,
      menuType: '1',
      matchId: '', //比赛id
      cardList: [],

      current: 1,
      total: 0,
      noConcat:false,
      type: 1,
      headMsg: {},

      totalList:[] 
    }
  },
  computed: {
    newBg () {
      const { menuType, headMsg } = this;
      const data = { ...bgColors[menuType], ...headMsg };
      return data;
    }
  },
  onShow() {
    const { englishName, matchName, id, title, menuType } = (getCurPage() || {})
    this.headMsg ={
      title: matchName || '',
      eTitle: englishName || ''
    }
    this.totalList = this.$store.state.totalList
    console.log(1992, this.totalList)
    this.matchId = id
    this.menuType = menuType || 0;
    this.title = title || '';
    uni.setNavigationBarTitle({ title: this.title })
    this.initInfo();
  },
  methods : {
    initInfo (form={}) {
      this.cardList = [];
      this.noConcat = false;
      this.current  = 1;
      this.getInfo(form);
    },
    getInfo (form={}) {
      const { menuType, current, matchId } = this;
      const params = {
        current,
        organizeTypeSonMatchId: matchId,
        size: 10,
        ...form
      }
      console.log('我是竞赛组队赛选参数：', JSON.stringify(params))
      branchCompetitionUser(params).then(res => {
        const { data: nData } = res[1];
        const { data, code } = nData;
        if (code === 200) {
          const { current, pages, records, searchCount, total  } = data;
          if (records && records.length) {
            this.cardList = [ ...this.cardList , ...records] ;
            if (records.length < 10) {
              this.noConcat = true;
            }else {
              this.current +=1;
            }
          } else  {
            this.noConcat = true;
          }
        }
      })
    },
    teamUpranks (item) {
      const { matchId  } = this;
      const params = {
        "master": item.id,
        "organizeTypeSonMatchId": matchId || 0
      }
      teamUpranks( params ).then(res => {
        const { data: nData } = res[1];
        const { code, data, msg, success  } = nData;
        if (code === 200) {
          if (success) {
            uni.showToast({ title: msg })
          } else {
            uni.showToast({ title: msg, icon: 'none' })
          }
        } else {
          uni.showToast({ title: msg, icon: 'none' })
        }
      }).catch(err => {console.log(err)})
    },
    clickBuoy (item) {
      // this.type = type || 1;
      this.teamUpranks(item)
      // this.open();
    },
    changeTag(form) {
      this.initInfo(form)
    },
    // 触底
    lower() {
      if (this.noConcat) return ;
      this.getInfo();
    },
    open() {
      this.$refs.popup.show()
    },
    close(flag) {
      this.$refs.popup.hide()
      if (flag) {
        if (this.type  == 1) {
          uni.navigateTo({ url: joinUrl('/pages/userInfo/index',{type:'edit'}) })
        } else {
          uni.navigateTo({ url: joinUrl('/pages/userComplete/index',{type:'edit'}) })
        }
        
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import url("/static/fonts/iconfont.css");
$color:#B3B3B4;
.page_box{
  display: flex;
  flex-direction: column ;
  background: #F1F3F5;
  .group_info_list{
    padding: 0 20rpx 20rpx;
    z-index: 1;
    margin-top: -40rpx;
  }
  .noList{
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(102,102,102 , 0.4);
    font-size: 40rpx;
  }
}
.demo {
  position: absolute;
  top: 10px;
  left: 10px;
  background: blue;
  border-radius: 10rpx;
  padding: 10rpx;
  color: #fff;
  font-family: HYQH-505;
}
.tip_box{
  width: 500rpx;
  // height: 300rpx;
  background: #ffffff;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20rpx;
  .title{
    padding: 20rpx;
    font-weight: bold;
    width: 100%;
    text-align: center;
    // border-bottom: 1px solid #f5f5f5;
  }
  .msg{
    padding: 10rpx;
    min-height: 80rpx;
    width: 100%;
    text-align: center;
  }
  .btns{
    display: flex;
    width: 100%;
    justify-content: space-around;
    padding: 10rpx 0 20rpx;
    .yes, .no{
      text-align: center;
      border-radius: 30rpx;
      border: 1px solid rgba(92, 134, 242, 0.2);
      width: 150rpx;
      padding: 10rpx;
    }
    .yes{
      background: rgba(92, 134, 242, 0.2);
      color: #5C86F2
    };
    .no{
      border-color: auto;
    }
  }
}
</style>