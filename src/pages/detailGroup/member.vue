<template>
  <div class="member">
      <infoHead :iconFilter='iconFilter'/>
      <!-- 个人信息 -->
      <information :topList='topList'/>
  </div>
</template>

<script>
import infoHead from '@/components/infoHead';
import information from '../sage/components/information';
export default {
  name: 'member',
  components: { infoHead, information },
  data() {
    return {
      topList: [
        { title: '学校', val: '世界联合学院', id: 1 }, 
        { title: '年纪', val: '10', id: 2 }, 
        { title: '标化', val: '我是标化成绩范围18字符', id: 3 }, 
        { title: '课程', val: 'ALEVEL', id: 4 }, 
      ]
    }
  },
  computed : {
    iconFilter () {
      const genders = {
        'nan':{ icon:'iconxingbie-nan', id: '1', name:'某某男', value: '' },
        'nv': { icon:'iconxingbie-nv', id: '2', name:'某某女' , value: 'nv'}
      }
      return genders['nv']
    }
  },
}
</script>

<style lang="scss" scoped>
.member{
  margin: 20rpx 0 10rpx 0;
  padding: 30rpx;
  border-radius: 8px;
  background: #ffffff;
}
</style>