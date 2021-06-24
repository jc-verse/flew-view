<template>
  <div class="courseSystem">
    <div class="header" :class="[showRequired ?'required': '']">
      <div class="title">{{title}}：</div>
      <slot name='diy'></slot>
      <slot name='right'></slot>
    </div>
    <slot name='right_list'></slot>
    <div class="content">
      <diyTable :heads='tableHead' :datas='tableData' @change='tableChange' @deleteItem='deleteItem'/>
    </div>
    <slot name='list'></slot>
    <slot name='add'>
      <div v-if="ifAdd"  class="add_item" @click="addTableItem">
        <i class="iconfont iconjiahao"></i>
        更多成绩
      </div>
    </slot>
    <!-- <TipPopup title="操作提示" ref='tipPopup' msg="是否退出登录？" @confirm='confirm'/> -->
  </div>
</template>

<script>
import diyTable from './diyTable';
// import TipPopup from '@/components/cards/tipPopup';
export default {
  name : 'courseSystem',
  components: { diyTable },
  props: {
    title:{
      type:  String,
      default: '标题'
    },
    className: {
      type: String,
      default: ''
    },
    tableData: {
      type: Array,
      default: ()=>[]
    },
    
    tableHead: {
      type: Array,
      default: ()=>[]
    },
    showBtn: {
      type: Boolean,
      default: true
    },
    maxNum:{
      type: Number,
    },
    showRequired: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      delIndex: 0
    }
  },
  computed: {
    ifAdd () {
      const {maxNum, tableData} = this;
      return  tableData.length < maxNum
    }
  },
  methods: {
    // 抛出修改
    tableChange (data) {
      this.$emit('changeTable', {data, code: this.className || ''})
    },
    deleteItem(index) {
      this.$emit('deleteItem', {index, code: this.className || ''})
      
    },
    // 新增表格数据模板
    addTableItem () {
      const obj = {};
      const {maxNum, tableData} = this;
      if (!this.ifAdd) {
        return 
      }
      this.tableHead.forEach(item => {
        if (item.type === 'checkbox') {
          obj[item.code] = 2
        } else {
          obj[item.code] = ''
        }
      })
      this.tableData.push(obj);
      this.tableChange(this.tableData);
    },
  }
}
</script>

<style lang="scss" scoped>
.courseSystem{
  margin-bottom:20rpx;
  >div:not(:first-child){
    margin-top: 20rpx;
  }
  .header{
    display: flex;
    position: relative;
    .title{
      font-weight: bold;
    }
    .right{
      position: absolute;
      right: 0;
      display: flex;
      align-items: center;
      
      .right_box{
        display: flex;
        font-size: 28rpx;
        color: #676FDF;
        .icon{
          margin-left: 10rpx;
          font-size: 40rpx;
        }
      }
    }
  }
  
  .add_item{
    width: 100%;
    padding: 20rpx;
    border: 2rpx dashed #CCD5F6;
    @include fontMixin(28rpx,#676FDF);
    @include flex_center;
    text-align: center;
  }
}
</style>