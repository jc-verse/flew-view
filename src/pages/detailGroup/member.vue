<template>
  <div class="member">
    <infoHead :infoData="infoData" />
    <!-- 个人信息 -->
    <information :topList="tops" />
  </div>
</template>

<script>
  import infoHead from '@/components/cards/infoHead';
  import information from '@/components/cards/information';
  export default {
    name: 'member',
    components: { infoHead, information },
    props: {
      infoData: {
        type: Object,
        defautl: () => ({}),
      },
    },
    data() {
      return {};
    },
    computed: {
      tops() {
        const { infoData } = this;
        const arr = [
          { title: '学校', val: infoData.schoolName || '', id: 1 },
          { title: '年级', val: infoData.grade || '', id: 2 },
          { title: '课程', val: infoData.curriculumSystem || '', id: 4 },
          { title: '标化', val: infoData.standardizedPerformance || '', id: 3 },
        ];
        return arr;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .member {
    margin: 20rpx 0 10rpx 0;
    padding: 30rpx;
    border-radius: 8px;
    background: #ffffff;
  }
</style>
