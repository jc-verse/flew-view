<template>
  <div class="crew_info" >
    <infoHead :infoData='info' headStyles='width:64rpx;height: 64rpx' styles='font-size: 30rpx'/>
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
    }
  },
  computed: {
    tops() {
      const { info } = this;
      const arr = [
        { title: '学校', val: info.schoolName || '', id: 1 ,width:'50%'}, 
        { title: '年级', val: info.grade || '',          id: 2,width:'50%' }, 
        { title: '课程', val: info.curriculumSystem || '', id: 4 ,width:'50%'}, 
        { title: '标化', val: info.standardizedPerformance || '', id: 3 ,width:'50%'}, 
      ]
      return arr
    },
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