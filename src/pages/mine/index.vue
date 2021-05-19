<template>
  <PageJs :styles="{background: '#F1F3F5'}">
    <div class="page_mine">
    <div class="header_wrap">
      <div class="mine_title_wrap">
        <div @click="jumpTo(1)" class="user_img">
          <div class="user_img_box">
            <open-data type="userAvatarUrl" style="border-radius: 50%;" v-if="!headImg"></open-data>
            <img v-else :src="headImg" alt="">
          </div>
          <i class="iconfont iconrenzheng icon" :class="[realInfo.class]" v-if="realInfo.isReal"></i>
        </div>
        <div class="user_info">
          <div class="user_name_level">
            <span class="name">
              {{userData.nikeName || ''}}
              <open-data v-if="!userData.nikeName" type="userNickName" ></open-data>
            </span>
            <span class="level">
              <Rate :size="18" :value="userData.star  || 0" :max="5" :readonly='true'></Rate>
            </span>
          </div>
          <div class="vip_num">
            <span class="text">会员号：</span>
            <span class="num">{{userData.vipNum}}</span>
            <span class="desc" v-if="realInfo.id > 2">(已认证)</span>
          </div>
        </div>
        <div class="msg_icon" @click="jumpTo(2)" >
          <div class="target" v-if="ReadCount">{{ ReadCount }}</div>
        </div>
      </div>
    </div>
    <div class="nav_wrap">
      <div class="nav_title">我的申请</div>
      <div class="nav_list">
        <div class="nav_item" v-for="(item, idx) in navList" :key="idx">
          <div @click="navClick(item)" :class="['item_content', item.id === actived ? 'actived' : '']" >
            
            <div class="img_box" :style='{ "background-image": `url(${item.icon})` }'></div>
            <div class="item_label">{{item.label}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content_wrap">
      <ScrollBox :num='80'>
        <template v-if="!cardList.length">
          <div class="nolist">
            暂无记录
          </div>
        </template>
        <template v-else>
          <template v-if="actived == 1">
            <GroupItemBsq v-for="(item, idx) in cardList" :infoData='item' :key="idx" @clickBtn='clickBtn'/>
          </template>
          <template v-if="actived == 2">
            <GroupItemSqz v-for="(item, idx) in cardList" :infoData='item' :key="idx" @clickBtn='clickBtn'/>
          </template>
          <template v-else-if="actived == 3">
            <GroupItemJxz v-for="(item, idx) in cardList" :infoData='item' :userId='userData.id' :key="idx" @clickBtn='clickBtn'/>
          </template>
          <template v-else-if="actived == 4">
            <GroupItemFqz v-for="(item, idx) in cardList" :infoData='item' :userId='userData.id' :key="idx" @clickBtn='clickBtn'/>
          </template>
          <template v-else-if="actived == 5">
            <GroupItemSqjl v-for="(item, idx) in cardList" :infoData='item' :userId='userData.id' :key="idx" @clickBtn='clickBtn'/>
          </template>
        </template>
      </ScrollBox>
    </div>
  </div>
  <FabGroup :shows='[2]'/>
  <!-- <DiyPopup ref='popup' :noUp='true'>
    <div class="tip_box" slot='tip' @click.stop>
      <div class="title">取消申请</div>
      <div class="msg">请完善个人信息后申请！</div>
      <div class="btns">
        <div class="no" @click.stop="close(false)">取消</div>
        <div class="yes" @click.stop="close(true)">确定</div>
      </div>
    </div>
  </DiyPopup> -->

  </PageJs>
</template>
<script>
import PageJs from '../../components/pageSjNew.vue'

import GroupItemSqz from './groupItem_sqz'
import GroupItemJxz from './groupItem_jxz'
import GroupItemBsq from './groupItem_bsq'
import GroupItemSqjl from './groupItem_sqjl'
import GroupItemFqz from './groupItem_fqz'

import ScrollBox from '@/components/scrollBox.vue';
import userDataMixin from '@/common/mixins/userDataMixin';
import Rate from '@/components/cards/rate';
import DiyPopup from '@/components/diyPopup';

import FabGroup from '@/components/fabGroup';
import {imgUrl} from '@/common/http';
import { demoDatas } from './const'

import { 
  userInfoReadCount, 
  userInfoApply, // 申请中
  userInfoConduct, // 申请中
  userInfoContinued, // 进行中
  userInfoApplyRecord,  // 申请记录

  userInfoCancelMatch, // 取消申请
  userInfoPower, // 竞赛组队-接收、拒接
  userInfoOperationMatch, //完成，和关闭组队
  userInfoExitTeam, //退出组队
  academicOperationAcademic, //学术帮助-接收、拒接
  academicAcademicComplete, // 学术帮助-完成
  academicEvaluate,// 学术帮助-评价

  consultingOperation, // 学校咨询--接收、拒接
  consultingComplete, //学校咨询-接收、拒接
} from '@/common/api';

const requests = {
  '1': userInfoApply, // 被申请 
  '2': userInfoConduct, // 申请中
  '3': userInfoContinued, // 进行中
  '4': userInfoApplyRecord, // 发起中
  '5': userInfoApplyRecord, // 申请记录
}
export default {
  components: {
    PageJs, ScrollBox, FabGroup, Rate, DiyPopup,
    GroupItemSqz, GroupItemJxz, GroupItemBsq, GroupItemSqjl, GroupItemFqz,
  },
  mixins:[userDataMixin],
  data() {
    return {
      vipNum: 0,
      actived: '2',
      ReadCount: 0,
      navList: [
        { label: '申请中', id: '2',   icon: 'http://prod.qiniucdns.sjreach.cn/web-36.png' },
        { label: '被申请', id: '1',   icon: 'http://prod.qiniucdns.sjreach.cn/web-35.png' },
        { label: '进行中', id: '3',   icon: 'http://prod.qiniucdns.sjreach.cn/web-18.png' },
        { label: '发起中', id: '4',   icon: 'http://prod.qiniucdns.sjreach.cn/web-19.png' },
        { label: '申请记录', id: '5', icon: 'http://prod.qiniucdns.sjreach.cn/web-20.png' },
      ],

      cardList: [],
      pages: {
        current: 1,
        size: 10
      },
      count: 0
    }
  },
  computed:{
    realInfo () {
      const { realInfo } = this.userData;
      const list = {
        '1': { isReal: false, id: 1, class: '' },
        '2': { isReal: true,  id: 2, class: '' },
        '3': { isReal: true,  id: 3, class: 'icon_active' },
      }
      return list[realInfo || 1]
    },
    headImg () {
      const { avatar } = this.userData;
      let url = 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'
      if (/(http|https)/.test(avatar)) {
        url = avatar || ''
      } else if (avatar !== 'default_img.png' && avatar) {
        url = imgUrl + avatar
      }
      return url
    }
  },
  onShow () {
    this.userInfoReadCount()
    this.initForm();
  },
  methods: {
    initForm (val) {
      this.pages = {
        current: 1,
        size: 10
      }
      this.cardList= [];
      this.count++
      this.getCards(val || '', this.count)
    },
    navClick(item) {
      const { id } = item;
      if (!id) return
      this.actived = id
    },
    jumpTo(val) {
      const urls = {
        '1' : '/pages/personalInfo/index',
        '2' : '/pages/messageBox/index'
      }
      uni.navigateTo({ url: urls[val] })
    },
    goToBack() {
      uni.navigateBack({ delta: 1 })
    },
    getCards (val, count) {
      const { actived, pages } = this;
      const i = val || actived
      requests[i](pages).then(res => {
        const { data: nData } = res[1];
        const { code, data, msg  } = nData;
        if (code === 200) {
          const { records } = data
          if (records && records.length) {
            if(count === this.count) {
              this.cardList = [...this.cardList, ...records]
            }
            if (records.length === this.pages.size && count === this.count) {
              this.current += 1
            }
          } else {
            // 调试用
            // this.cardList= [...demoDatas]
            console.log(1222, this.cardList)
          }
        }
      }).catch(err => {
        this.cardList= [...demoDatas]
            console.log(1222, this.cardList)
      })
    },
    // 获取消息数量
    userInfoReadCount() {
      userInfoReadCount().then(res => {
        const { data: nData } = res[1];
        const { code, data } = nData;
        if (code === 200) {
          console.log('123123', data)
          this.ReadCount = data
        }
      }).catch(err => {console.log(err)})
    },
    // 取消申请
    userInfoCancelMatch(id) {
      const params = {
        userRelationshipId: id
      }
      console.log('取消申请-参数：' + JSON.stringify(params))
      userInfoCancelMatch(params).then(res => {
        const { data: nData } = res[1];
        const { code, data, success } = nData;
        if (code === 200 && success) {
          uni.showToast({title: '取消成功！'})
          this.initForm();
        } else {
          uni.showToast({title: '取消失败，请重试！',icon: 'none'  })
        }
      }).catch(err => {console.log(err)})
    },
    // 竞赛组队-接受/拒绝申请
    userInfoPower(type, id) {
      const params = { type, userRelationshipId: id };
      console.log('竞赛组队-接受/拒绝申请-参数：' + JSON.stringify(params))
      userInfoPower(params).then(res => {
        const { data: nData } = res[1];
        const { code, data, success } = nData;
        if (code === 200 && success) {
          uni.showToast({title: `已${type == 1 ? '接受' : '拒绝'}申请`, icon: 'none'})
          this.initForm();
        } else {
          uni.showToast({title: '操作失败，请重试！',icon: 'none'  })
        }
      }).catch(err => {console.log(err)})
    }, //academicOperationAcademic
    // 学术帮助-接受/拒绝申请
    academicOperationAcademic(type, id) {
      const params = { type, userRelationshipId: id };
      console.log('学术帮助-接受/拒绝申请-参数：' + JSON.stringify(params))
      academicOperationAcademic(params).then(res => {
        const { data: nData } = res[1];
        const { code, data, success } = nData;
        if (code === 200 && success) {
          uni.showToast({title: `已${type == 1 ? '接受' : '拒绝'}申请`, icon: 'none'})
          this.initForm();
        } else {
          uni.showToast({title: '操作失败，请重试！',icon: 'none'  })
        }
      }).catch(err => {console.log(err)})
    },
    // 学校咨询-接受/拒绝申请
    consultingOperation (type, id) {
      const params = { type, userRelationshipId: id };
      console.log('学术帮助-接受/拒绝申请-参数：' + JSON.stringify(params))
      consultingOperation(params).then(res => {
        const { data: nData } = res[1];
        const { code, data, success } = nData;
        if (code === 200 && success) {
          uni.showToast({title: `已${type == 1 ? '接受' : '拒绝'}申请`, icon: 'none'})
          this.initForm();
        } else {
          uni.showToast({title: '操作失败，请重试！',icon: 'none'  })
        }
      }).catch(err => {console.log(err)})
    },
    // 退出组队
    userInfoExitTeam (id) {
      const params = { userRelationshipId: id }
      console.log('退出组队-参数：' + JSON.stringify(params))
      userInfoExitTeam(params).then(res => {
        const { data: nData } = res[1];
        const { code, data, success } = nData;
        if (code === 200 && success ) {
          uni.showToast({title: '已退出组队',icon: 'none'})
          this.initForm();
        } else {
          uni.showToast({title: '操作失败，请重试！',icon: 'none'})
        }
      }).catch(err => {console.log(err)})
    },
    // 开启/关闭加入组队 
    userInfoOperationMatch (id, type, status) {
      const params ={ status, type, userRelationshipId: id }
      console.log('开启/关闭加入组队-参数：' + JSON.stringify(params))
      userInfoOperationMatch(params).then(res => {
        const { data: nData } = res[1];
        const { code, data, success } = nData;
        if (code === 200 && success) {
          if (type == 1) {
            uni.showToast({title: '完成！'})
          } else {
            uni.showToast({title: `${status == 1 ? '关闭组队' : '开启组队'}成功！`})
          }
          this.initForm();
        } else {
          uni.showToast({title: '操作失败，请重试！',icon: 'none'  })
        }
      }).catch(err => {console.log(err)})
    },
    // 学术帮助-完成
    academicAcademicComplete (id) {
      academicAcademicComplete({ userRelationshipId:id }).then(res => {
        const { data: nData } = res[1];
        const { code, data, success } = nData;
        if (code === 200 && success) {
          uni.showToast({title: '完成！'})
          this.initForm();
        } else {
          uni.showToast({ title: '操作失败，请重试！',icon: 'none' })
        }
      }).catch(err => {console.log(err)})
    },
    // 学术帮助-评价
    academicEvaluate(params) {
      console.log('我是评价参数：', JSON.stringify(params))
      academicEvaluate(params).then(res => {
        const { data: nData } = res[1];
        const { code, data, success } = nData;
        if (code === 200 && success) {
          uni.showToast({title: '评价成功！'})
          this.initForm();
        } else {
          uni.showToast({ title: '操作失败，请重试！',icon: 'none' })
        }
      }).catch(err => {console.log(err)})
    },
    // 学校咨询-完成
    consultingComplete (id) {
      consultingComplete({ userRelationshipId:id }).then(res => {
        const { data: nData } = res[1];
        const { code, data, success } = nData;
        if (code === 200 && success) {
          uni.showToast({title: '完成！'})
          this.initForm();
        } else {
          uni.showToast({ title: '操作失败，请重试！',icon: 'none' })
        }
      }).catch(err => {console.log(err)})
    },
    clickBtn(btnType, { data, rates }) {
      const { userRelationshipId, type  } = data;
      switch (btnType) {
        case 1: // 取消申请
          console.log('取消申请',data)
          this.userInfoCancelMatch(userRelationshipId);
          break;
        case 2: // 通过
          console.log('通过',data)
          if (type == 1) { // 竞赛组队
            this.userInfoPower(1, userRelationshipId)
          } else if (type == 2) { // 学术帮助
            this.academicOperationAcademic(1, userRelationshipId)
          } else if (type == 3) {
            this.consultingOperation(1, userRelationshipId)
          }
          break;
        case 3: // 拒绝
          console.log('拒绝',data)
          if (type == 1) {
            this.userInfoPower(2, userRelationshipId)
          } else if (type == 2) {
            this.academicOperationAcademic(2, userRelationshipId)
          } else if (type == 3) {
            this.consultingOperation(2, userRelationshipId)
          }
          break;
        case 4: // 退出组队
          console.log('退出组队',data)
          this.userInfoExitTeam(userRelationshipId);
          break;
        case 5: // 完成
          console.log('完成',data)
          if (type == 1) {
            this.userInfoOperationMatch(userRelationshipId, 1, 0)
          } else if (type == 2) {
            this.academicAcademicComplete(userRelationshipId)
          } else if (type == 3) {
            this.consultingComplete(userRelationshipId)
          }
          break;
        case 6: // 关闭组队
          console.log('关闭组队',data)
          this.userInfoOperationMatch(userRelationshipId, 2, 1)
          break;
        case 7: // 开启组队
          console.log('开启组队',data)
          this.userInfoOperationMatch(userRelationshipId, 2, 2);
          break;

        case 8: // 联系客服
          console.log('联系客服',data)
          // this.userInfoPower(1, userRelationshipId)
          break;
        case 9: // 评价
          console.log('评价',data, rates)
          const params = {
            relationshipId: userRelationshipId,
            ...rates
          }
          this.academicEvaluate(params)
          // this.userInfoOperationMatch(data, 1)
          break;
      
        default:
          break;
      }
    }
  },
  watch: {
    actived(val) {
      this.initForm(val);
    }
  }
}
</script>
<style lang="scss" scoped>
.icon{
  color: rgba(0, 0, 0, 0.3);
  background: white;
  border-radius: 50%;
  position: absolute;
  right: 0rpx;
  bottom: 0rpx;
  border: 2rpx solid white;
}
.icon_active{
  color: #FFC847;
}
.page_mine {
  box-sizing: border-box;
  background: #F1F3F5;
  padding: 0 30rpx;
  overflow: hidden;
  .header_wrap {
    position: relative;
    z-index: 5;
    margin: 0 -30rpx;
    padding: 0 30rpx;
    @include img_bg('http://prod.qiniucdns.sjreach.cn/web-25.png');
  }

  .mine_title_wrap {
    padding-top: 48rpx;
    height: 268rpx;
    display: flex;

    .user_img {
      width: 120rpx;
      height: 120rpx;
      margin-right: 20rpx;
      border-radius: 100%;
      position: relative;
      .user_img_box{
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
        border: 2rpx solid #fff;
        background: white;
        @include img_fill;

      }
      // overflow: hidden;
    }

    .user_info {
      margin-top: 10rpx;
      flex: 1;

      .user_name_level {
        height: 50rpx;
        font-weight: 500;
        font-size: 36rpx;
        color: #fff;
        margin-bottom: 12rpx;
        display: flex;
        align-items: center;

        .name {
          @include fontMixin(36rpx, #ffffff, bold);
          margin-right: 24rpx;
          // font-family: PingFangSC-Medium;
        }
      }

      .vip_num {
        font-size: 28rpx;
        line-height: 40rpx;
        color: rgba(255,255,255 , .5);;
      }
    }

    .msg_icon {
      width: 44rpx;
      height: 44rpx;
      margin-top: 16rpx;
      position: relative;
      @include img_bg('http://prod.qiniucdns.sjreach.cn/web-24.png');

      .target {
        background: #E65A57;
        height: 32rpx;
        min-width: 32rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        font-size: 24rpx;
        font-weight: 400;
        color: #fff;
        border-radius: 16rpx;
        left: 19px;
        top: -4px;
      }
    }
  }

  .nav_wrap {
    height: 260rpx;
    padding: 30rpx 18rpx 0;
    background: #FFFFFF;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    margin-bottom: 20rpx;
    margin-top: -30rpx;
    position: relative;
    z-index: 10;

    .nav_title {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 22px;
      height: 22px;
      margin-bottom: 24rpx;
    }

    .nav_list {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .nav_item {
        width: 162rpx;
        height: 100%;
        display: flex;
        justify-content: center;

        .item_content {
          width: 130rpx;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 16rpx;

          .item_label {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 17px;
          }
          .img_box{
            width: 56rpx;
            height: 56rpx;
            // @include img_fill;
            @include img_bg;
          }

          &.actived {
            background: #F1F3F5;
            border-radius: 8px 8px 0px 0px;
            position: relative;

            &::before {
              display: block;
              content: '';
              position: absolute;
              border-top: transparent 20rpx solid;
              border-right: transparent 32rpx solid;
              border-left: transparent 32rpx solid;
              border-bottom: #fff 20rpx solid;
              left: 50%;
              bottom: -20rpx;
              transform: translateX(-50%);
            }
          }
        }
      }
    }
  }

  .content_wrap {
    background: #FFFFFF;
    border-radius: 16rpx;
    padding: 30rpx 30rpx;

    // /deep/ .group_info_item {
    //   margin-bottom: 20rpx;
    //   background: #FFF7E8;
    // }
  }
  .nolist{
    @include flex_center;
    height: 100%;
  }
}
</style>
