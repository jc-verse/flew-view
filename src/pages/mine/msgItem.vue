<template>
  <div class="msg_item_wrap">
    <div class="msg_title">fsdfdfdfd的放水电费第三方sfdsfdfdsfj付了定金发了多少</div>
    <div class="head_wrap">
      <div class="left">
        <img src="@/static/img1/icon_8.png" alt="" class="head_icon">
        <div class="head_name">某某某</div>
        <div class="user_sex">
          <img v-if="msgContent.sex" :src="maleImg" alt="male">
          <img v-else :src="femaleImg" alt="female">
        </div>
      </div>
      <div class="target_list">
        <Wtarget types="0" direction="r" v-for="(item, idx) in 1" :key="item" />
      </div>
    </div>
    <div class="school_info">
      <div class="left">
        <div class="school_name mb-7">学校：世界联合学院</div>
        <div class="source_target">标化：标化大幅度</div>
      </div>
      <div class="right">
        <div class="class_level mb-7">年级：10</div>
        <div class="source_class">课程：ALEVEL</div>
      </div>
    </div>
    <div class="module_content">
      <div class="game_experience module">
        <div class="title">比赛经历</div>
        <div class="contents">海戏剧学院是中国培养戏剧专门人才的高等艺术院校,前身是上海市市立实验戏剧学校,1945年12月1日由著</div>
      </div>
      <div class="hopes module">
        <div class="title">希望参加的比赛</div>
        <div class="contents">
          <Wtarget v-for="(item, index) in 2" :key="item" :idx="index"/>
        </div>
      </div>
    </div>
    <Wfooter text="你的申请被拒绝" />
  </div>
</template>
<script>
import maleImg from '../../static/img1/male_sex.png'
import femaleImg from '../../static/img1/female_sex.png'
import Wtarget from './target.vue'
import Wfooter from './footer.vue'

export default {
  components: { Wtarget, Wfooter },
  props: {
    msgContent: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      maleImg,
      femaleImg
    }
  }
}
</script>
<style lang="scss" scoped>
.display_center {
  display: flex;
  align-items: center;
}

.mb_7 {
  margin-bottom: 14rpx;
}

.msg_item_wrap {
  padding: 30rpx 0 0 30rpx;
  background-color: #fff7e8;

  .msg_title {
    font-size: 32rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #000000;
    line-height: 44rpx;
    margin-bottom: 30rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 30rpx;
  }

  .head_wrap {
    @extend .display_center;
    margin-bottom: 24rpx;

    .left {
      @extend .display_center;
      justify-content: space-between;

      .head_icon {
        width: 80rpx;
        height: 80rpx;
        border-radius: 100%;
        margin-right: 20rpx;
      }
  
      .head_name {
        font-size: 30rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #131415;
        line-height: 42rpx;
        margin-right: 14rpx;
      }
  
      .user_sex {
        width: 42rpx;
        height: 42rpx;
  
        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .target_list {
      @extend .display_center;
      justify-content: flex-end;
      flex: 1;
    }

  }

  .school_info {
    @extend .display_center;
    font-size: 28rpx;
    line-height: 40rpx;
    padding-right: 30rpx;
    color: #333;

    .left {
      width: 60%;
    }

    .right {
      width: 40%;
    }
  }

  .module_content {
    padding: 16rpx 30rpx 20rpx 0;
    border-top: 1px solid #F7E7C9;
    margin-top: 9px;

    .module {
      margin-bottom: 20rpx;

      .title {
        font-size: 30rpx;
        line-height: 42rpx;
        margin-bottom: 12rpx;
        font-weight: 500;
      }

      .contents {
        font-size: 30rpx;
        font-weight: 400;
        line-height: 42rpx;
        color: #999;
        // padding-bottom: 20rpx;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

  }
}
</style>
