<template>
  <DiyPopup
    ref="popup"
    :popupTitle="title"
    @popupclosed="popupclosed"
    :styles="{ top: '38%' }"
  >
    <template slot="content">
      <div class="rate_box">
        <div class="rate_item" v-for="(item, index) in rateHeads" :key="index">
          <div class="rate_title">{{ item.title }}</div>
          <div class="rate_content">
            <Rate
              v-if="count == 0"
              :size="34"
              :margin="30"
              :value="newRate[item.code]"
              allowHalf
              :max="5"
              :readonly="readonly"
              @change="changeRate($event, item.code)"
            ></Rate>
          </div>
        </div>
      </div>
    </template>
  </DiyPopup>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Rate from '@/components/cards/rate';
  import DiyPopup from '@/components/diyPopup';

  type dimension = {
    title: string;
    value: string;
    code: string;
  };

  @Component({
    components: { DiyPopup, Rate },
  })
  export default class diyRate extends Vue {
    name = 'group_item';
    @Prop({ default: {} }) rateData!: Object;
    @Prop({ default: false }) readonly!: boolean;
    @Prop({ default: '评价' }) title!: string;
    @Prop({
      default: [
        { title: '知识水平', value: '', code: 'dimension1' },
        { title: '理解程度', value: '', code: 'dimension2' },
        { title: '讲课态度', value: '', code: 'dimension3' },
        { title: '授课效率', value: '', code: 'dimension4' },
      ],
    })
    headList!: dimension[];

    type = 8;
    rateForm = {
      dimension1: 3,
      dimension2: 3,
      dimension3: 3,
      dimension4: 3,
    };
    rateHeads: dimension[] = [];
    count = 0;
    get newRate() {
      const { rateForm, rateData } = this;
      return Object.keys(rateData).length ? rateData : rateForm;
    }

    created() {
      this.rateHeads = [...this.headList];
    }

    mounted() {
      // this.$refs.popup.show()
    }

    changeRate(e, code: string) {
      this.rateForm[code] = e.value;
    }

    popupclosed(flag: boolean) {
      console.log(883, flag);
      if (flag) {
        const { rateForm } = this;
        this.$emit('confirmRate', rateForm);
        this.rateForm = {
          dimension1: 3,
          dimension2: 3,
          dimension3: 3,
          dimension4: 3,
        };
        this.count += 1;
        this.$nextTick(() => {
          this.count = 0;
        });
      }
    }

    show() {
      this.$refs.popup.show();
    }
  }
</script>

<style lang="scss" scoped>
  @import url('/static/fonts/iconfont.css');
  .rate_box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    height: 100%;
    .rate_item {
      padding: 20rpx 20rpx 0;
      @include flex_center;
      align-items: flex-start;
      flex-direction: column;
      // @include fontMixin(32rpx, #000, bold);
      width: 100%;
      .rate_title {
        width: 100%;
        text-align: center;
        padding: 10rpx;
      }
      .rate_content {
        width: 100%;
        padding: 0 68rpx;
      }
    }
  }
</style>
