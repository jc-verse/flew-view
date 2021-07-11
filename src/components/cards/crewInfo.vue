<template>
  <div
    class="crew_info"
    :style="{ background: styles.background || '#F7F7F7' }"
  >
    <infoHead
      :infoData="info"
      headStyles="width:64rpx;height: 64rpx"
      styles="font-size: 30rpx"
    >
      <template slot="right">
        <div class="btn_box">
          <!-- <div class="blue" v-if="cardStatu.showInfo.includes(4)" @click="clickBuoy(4)" >退出组队</div>
          <div class="blue" v-if="cardStatu.showInfo.includes(5)" @click="clickBuoy(5)" >完成</div> -->
          <div
            class="blue"
            v-for="(item, ind) in showBtn"
            :key="ind"
            @click="clickBtn(item.code)"
            >{{ item.label || '' }}</div
          >
          <!-- <div class="" v-if="cardStatu.showInfo.includes(13)" @click="clickBuoy(13)" >移除</div> -->
          <!-- <div class="blue" v-if="cardStatu.showInfo.includes(8)" @click="clickBuoy(8)" >联系客服</div> -->
        </div>
      </template>
    </infoHead>
    <information :topList="tops" />
    <join-list v-if="showMobile" title="联系方式" type="diy">
      <template slot="diy">
        <span class="copy">手机号：{{ info.mobile || '' }}</span>
        <span class="copy_btn" @click="copy(info.mobile)">复制</span>
      </template>
    </join-list>
  </div>
</template>

<script>
  import infoHead from '@/components/cards/infoHead';
  import joinList from '@/components/cards/joinList';
  import information from '@/components/cards/information';
  import { copy } from '@/common/utils';
  export default {
    name: 'crew_info',
    components: { infoHead, information, joinList },
    props: {
      info: {
        type: Object,
        default: () => ({}),
      },
      styles: {
        type: Object,
        default: () => ({}),
      },
      showBtn: {
        type: Array,
        default: () => [],
      },
      showMobile: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      tops() {
        const { info } = this;
        // let newPerformance= ''
        // if (info.standardizedPerformance) {
        //   const arr = info.standardizedPerformance.split(' ')
        //   newPerformance = arr.map((item, ind) => {
        //     if (ind === 1 && Number(item)) {
        //       return Number(item)
        //     }
        //     return item
        //   } ).join(' ')
        // }
        const arr = [
          { title: '学校', val: info.schoolName || '', id: 1, width: '50%' },
          { title: '年级', val: info.grade || '', id: 2, width: '50%' },
          {
            title: '课程',
            val: info.curriculumSystem || '',
            id: 4,
            width: '50%',
          },
          {
            title: '标化',
            val: info.standardizedPerformance || '',
            id: 3,
            width: '50%',
          },
        ];
        return arr;
      },
    },
    methods: {
      copy,
      clickBtn(code) {
        this.$emit('clickBtn', code, this.info);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .crew_info {
    // margin-bottom: 10rpx;
    background: #f7f7f7;
    border-radius: 4px;
    padding: 20rpx;
    margin-bottom: 10rpx;
    > div {
      margin-right: 10rpx;
    }
  }
  .btn_box {
    display: flex;
    flex-direction: row-reverse;
    margin-right: -20rpx;
    > div {
      padding: 10rpx 10rpx;
      border-radius: 30rpx;
      background: #eeeeee;
      @include fontMixin(26rpx, #666666);
    }
    & > div:first-child {
      border-radius: 30rpx 0 0 30rpx;
    }
    & > div:not(:first-child) {
      margin-right: 10rpx;
    }
    .disable {
      filter: grayscale(100%);
    }
    .blue {
      background: rgba(92, 134, 242, 0.1);
      color: rgb(92, 134, 242);
    }
  }
  .copy {
    color: #b0a8a8;
  }
  .copy_btn {
    margin-left: 20rpx;
    @include fontMixin(28rpx, #5c86f2);
  }
</style>
