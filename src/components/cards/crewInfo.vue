<template>
  <div class="crew_info" :style='{background: styles.background || "#F7F7F7"}'>
    <infoHead :infoData='info' headStyles='width:64rpx;height: 64rpx' styles='font-size: 30rpx'>
      <template slot="right"> 
        <div class="btn_box">
          <!-- <div class="blue" v-if="cardStatu.showInfo.includes(4)" @click="clickBuoy(4)" >退出组队</div>
          <div class="blue" v-if="cardStatu.showInfo.includes(5)" @click="clickBuoy(5)" >完成</div> -->
          <div class="blue" v-for="(item, ind) in showBtn" :key='ind' @click="clickBtn(item.code)" >{{item.label || ''}}</div>          
          <!-- <div class="" v-if="cardStatu.showInfo.includes(13)" @click="clickBuoy(13)" >移除</div> -->
          <!-- <div class="blue" v-if="cardStatu.showInfo.includes(8)" @click="clickBuoy(8)" >联系客服</div> -->
        </div>
      </template>
    </infoHead>
    <information :topList='tops'/>
  </div>
</template>

<script>
import infoHead from '@/components/cards/infoHead';
import information from '@/components/cards/information';
export default {
  name: 'crew_info',
  components: { infoHead, information },
  props: {
    info: {
      type:Object,
      default: ()=> ({})
    },
    styles: {
      type: Object,
      default: ()=> ({})
    },
    showBtn: {
      type: Array,
      default: ()=> []
    }
  },
  computed: {
    tops() {
      const { info } = this;
      let newPerformance= ''
      if (info.standardizedPerformance) {
        const arr = info.standardizedPerformance.split(' ')
        newPerformance = arr.map((item, ind) => {
          if (ind === 1 && Number(item)) {
            return Number(item)
          }
          return item 
        } ).join(' ')
      }
      const arr = [
        { title: '学校', val: info.schoolName || '', id: 1 ,width:'50%'}, 
        { title: '年级', val: info.grade || '',          id: 2,width:'50%' }, 
        { title: '课程', val: info.curriculumSystem || '', id: 4 ,width:'50%'}, 
        { title: '标化', val: newPerformance || '', id: 3 ,width:'50%'}, 
      ]
      return arr
    },
  },
  methods: {
    clickBtn(code) {
      this.$emit('clickBtn', code, this.info)
    }
  }
}
</script>

<style lang="scss" scoped>
.crew_info{
  // margin-bottom: 10rpx;
  background: #F7F7F7;
  border-radius: 4px;
  padding: 20rpx;
  margin-bottom: 10rpx;
  >div{  margin-right: 10rpx; };
}
.btn_box{
  display: flex;
  flex-direction: row-reverse;
  margin-right: -20rpx;
  > div {
    padding: 10rpx 10rpx;
    border-radius: 30rpx;
    background: #eeeeee ;
    @include fontMixin(26rpx, #666666 );
  }
  &>div:first-child{
    border-radius: 30rpx 0 0 30rpx;
  }
  &>div:not(:first-child){
    margin-right: 10rpx;
  }
  .disable{
    filter: grayscale(100%);
  }
  .blue{
    background: rgba(92, 134, 242, .1);
    color: rgb(92, 134, 242);
  }
  
}
</style>