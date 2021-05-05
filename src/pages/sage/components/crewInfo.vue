<template>
  <div class="crew_info" >
    <infoHead :iconFilter='info.iconFilter' headStyles='width:64rpx;height: 64rpx' styles='font-size: 30rpx'/>
    <information :topList='info.topList'/>
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
    }
  }
}
</script>

<style lang="scss" scoped>
.crew_info{
  margin-bottom: 10rpx;
  div{  margin-right: 10rpx; };
  background: #F7F7F7;
  border-radius: 4px;
  padding: 20rpx;
}
</style>