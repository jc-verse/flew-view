<template>
  <div class="courseSystem">
    <div class="header required">
      <div class="title">{{title}}：</div>
      <slot name='diy'></slot>
      <slot name='right'></slot>
    </div>

    <div class="content">
      <diyTable :heads='tableHead' :datas='tableDatas' @change='tableChange'/>
    </div>
    <slot>
      <div v-if="showBtn" class="add_item" @click="addTableItem">
        <i class="iconfont iconjiahao"></i>
        更多成绩
      </div>
    </slot>
    
  </div>
</template>

<script>
import diyTable from './diyTable'
export default {
  name : 'courseSystem',
  components: { diyTable },
  props: {
    title:{
      type:  String,
      default: '标题'
    },
    
    tableHead: {
      type: Array,
      default: ()=>[]
    },
    showBtn: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      tableDatas: [
        { km:'',fs: '2',zx: false,bz: false,},
      ],
    }
  },
  methods: {
    tableChange (data) {
      console.log(193, data)
    },
    addTableItem () {
      const obj = {};
      this.tableHead.forEach(item => {
        if (item.type === 'checkbox') {
          obj[item.code] = false
        } else {
          obj[item.code] = ''
        }
      })
      this.tableDatas.push(obj)
    }
  }
}
</script>

<style lang="scss" scoped>
.courseSystem{
  >div:not(:first-child){
    margin-top: 20rpx;
  }
  .header{
    display: flex;
    position: relative;
    .title{
      font-weight: bold;
    }
  }
  .content{
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