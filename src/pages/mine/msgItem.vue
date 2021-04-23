<template>
  <div class="msg_item_wrap">
    <div class="msg_title">fsdfdfdfd的放水电费第三方sfdsfdfdsfj付了定金发了多少</div>
    <div class="head_wrap">
      <div class="left">
        <img src="" alt="" class="head_icon">
        <div class="head_name">某某某</div>
        <div class="user_sex">
          <img v-if="msgContent.sex" :src="maleImg" alt="male">
          <img v-else :src="femaleImg" alt="female">
        </div>
      </div>
      <div class="target_list"></div>
    </div>
    <div class="school_info">
      <div class="left">
        <div class="school_name">学校：世界联合学院</div>
        <div class="source_target">标化：标化大幅度</div>
      </div>
      <div class="right">
        <div class="class_level">年级：10</div>
        <div class="source_class">课程：ALEVEL</div>
      </div>
    </div>
    <div class="module_content">
      <div class="game_experience module">
        <div class="title">比赛经历</div>
        <div class="contents">jfjsdlfjldfjlds</div>
      </div>
      <div class="hopes">
        <div class="title">希望参加的比赛</div>
        <div class="contents">
          <Wtarget />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import maleImg from '../../static/img1/male_sex.png'
import femaleImg from '../../static/img1/female_sex.png'
import Wtarget from './target.vue'

export default {
  components: { Wtarget },
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

.msg_item_wrap {
  padding: 30rpx 0 0 30rpx;

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
        border: 1px solid red;
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
      flex: 1;
    }

  }

  .school_info {
    @extend .display_center;
    font-size: 28rpx;
    line-height: 40rpx;
    color: #333;

    .left {
      width: 60%;
    }

    .right {
      width: 40%;
    }
  }

  .module_content {
    padding: 16rpx 0 20rpx;

    .module {
      margin-bottom: 20rpx;

      .title {
        font-size: 30rpx;
        line-height: 42rpx;
        margin-bottom: 12rpx;
      }

      .contents {
        // color: #fff7e8;
        font-size: 30rpx;
        line-height: 42rpx;
      }

      &:first-child {
        margin-bottom: 0;
      }
    }

  }
}
</style>
