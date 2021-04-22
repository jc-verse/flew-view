<template>
  <div class="courseSystem">
    <div class="header">
      <div class="title">课程体系：</div>
      <div class="add"> <span class='add_icon'>+</span><span>请选择</span> </div>
    </div>

    <div class="content">
      <diyTable :heads='tableHead' :datas='tableDatas' @change='tableChange'/>
    </div>
    
    <div class="add_item" @click="addTableItem">+ 更多成绩</div>
  </div>
</template>

<script>
import diyTable from './diyTable'
export default {
  name : 'courseSystem',
  components: { diyTable },
  data () {
    return {
      tableHead: [
        { label: '科目', code: 'km', id: '', onlyCode: '', type:'select' },
        { label: '分数', code: 'fs', id: '', onlyCode: '', type:'input' },
        { label: '咨询', code: 'zx', id: '', onlyCode: '', type:'checkbox' },
        { label: '帮助', code: 'bz', id: '', onlyCode: '', type:'checkbox' },
        // { label: '操作', code: 'cz', id: '', onlyCode: '', type:'edit' },
      ],
      tableDatas: [
        { km:'',fs: '2',zx: true,bz: true},
      //   { km:'1',fs:'21',zx: false,bz: true},
      //   { km:'2',fs:'22',zx: false,bz: true},
      //   { km:'3',fs:'24',zx: true,bz: true},
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
    .title{
      font-weight: bold;
    }
    .add {
      display: flex;
      align-items: center;
      margin-left: 10rpx;
      @include fontMixin(32rpx, #676FDF, bold);
    }
    .add_icon{
      display: inline-block;
      height: 48rpx;
      width: 48rpx;
      line-height: 48rpx;
      border-radius: 50%;
      background: rgba(103, 111, 223,.2);
      @include flex_center;
    }
  }
  .content{
  }
  
  .add_item{
    width: 100%;
    padding: 20rpx;
    border: 2rpx dashed #CCD5F6;
    @include fontMixin(28rpx,#676FDF);
    text-align: center;
  }
}
</style>