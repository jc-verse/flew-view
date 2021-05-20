<template>
  <DiyPopup ref='popup' :popupTitle="title" @popupclosed='popupclosed'>
      <template slot='content' style='height:100%'>
        <div class="rate_box">
          <div class="rate_item" v-for="(item, index) in rateHeads" :key='index'>
            <div class="rate_title">{{item.title}}</div>
            <div class="rate_content">
              <Rate 
                :size='34'  
                :value="newRate[item.code]" 
                allowHalf 
                :max="5" 
                :readonly='readonly'
                @change='changeRate($event,item.code)'
              ></Rate>
            </div>
          </div>
        </div>
      </template>
    </DiyPopup>
</template>

<script>
import Rate from '@/components/cards/rate';
import DiyPopup from '@/components/diyPopup';
export default {
  name: 'group_item',
  components: {  DiyPopup, Rate },
  props: {
    rateData: {
      type: Object,
      default: ()=>({})
    },
    readonly: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '评价'
    }
  },

  data () {
    return {
      type: 8,
      rateForm: {
        "dimension1": 3,
        "dimension2": 3,
        "dimension3": 3,
        "dimension4": 3,
      },
      rateHeads: [
        { title: '知识水平', value: '', code: 'dimension1' },
        { title: '理解程度', value: '', code: 'dimension2' },
        { title: '讲课态度', value: '', code: 'dimension3' },
        { title: '授课效率', value: '', code: 'dimension4' },
      ]
    }
  },
  computed : {
    newRate () {
      const {rateForm, rateData} = this;
      return Object.keys(rateData).length ? rateData : rateForm
    }
  },
  mounted() {
    // this.$refs.popup.show()
  },
  methods:{
    changeRate (e,code) {
      this.rateForm[code] = e.value
    },
    popupclosed (flag) {
      if (flag) {
        const {  rateForm } = this;
        this.$emit('confirmRate', rateForm);
      }
    },
    show () {
      this.$refs.popup.show()
    },
    
  },
}
</script>

<style lang="scss" scoped>
@import url("/static/fonts/iconfont.css");
.rate_box{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
  .rate_item{
    padding: 40rpx;
    @include flex_center;
    align-items: flex-start;
    flex-direction: column;
    // @include fontMixin(32rpx, #000, bold);
    .rate_title{
      padding: 10rpx;
    }
  }
}
</style>