<template>
  <div class="diyTable" ref="diyTable" id="diyTable">
    <div class="table_box">
      <div class="tb_box">
        <div class="th tb_item" v-for="(item,index) in tableHeadList" :style="{flexGrow: item.pro}" :key='index'>{{item.label}}</div>
      </div>
      <div class="tr_box" v-for='(ite,ind) in tableDataList' :key='ind'>
        <div class="tb_box">
          <div class="td tb_item" v-for="(item,index) in tableHeadList" :style="{flexGrow: item.pro}" :key='index'>
            
            <template v-if='!item.type || item=== "text"'>
              {{ite[item.code]}}
            </template>

            <div v-if='item.type === "input"'>
              <input placeholder='请填写' @change='change($event, ind, "input", item.code)' v-model='ite[item.code]' type="text"/>
            </div>

            <div v-if='item.type === "checkbox"'>
              <checkbox-group @change='change($event, ind, "checkout", item.code)' v-model='ite[item.code]'>
                <checkbox :value="item.code" :checked="ite[item.code]" />
              </checkbox-group>
            </div>

            <div v-if='item.type === "select"'>
              <picker placeholder='请选择' @change='change($event, ind, "select", item.code)' range-key='label' :value="ite[item.code]" :range="array">
                <view class="uni-input" v-if='ite[item.code]'>{{array[ite[item.code]].label}}</view>
                <view v-else style='color:#808080'>请选择</view>
              </picker>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formItem from '@/components/formItem';
export default {
  name: 'diyTable',
  components:{ formItem },
  props: {
    heads: {
      type:Array,
      default: ()=>[]
    },
    datas: {
      type:Array,
      default: ()=>[]
    },
    
    thStyle:{
      type: Object,
      default: ()=>({})
    },
    tbStyle:{
      type: Object,
      default: ()=>({})
    }
  },
  computed : {
    tableHeadList () {
      const list = this.heads;
      console.log(1,list, this.heads, this.aaa )
      return list
    },
    tableDataList () {
      const list = this.datas;
      console.log(12,list, this.datas)
      return list
    },
    de() {
      const num = `${1/this.tableHeadList.length*100}%`
      return num;
    }
  },
  mounted() {
  }
  
  ,
  onLoad() {
    console.log(1991,);
  },
  onShow(){
    console.log(1,this.datas, this.heads)
    
    
  },
  data () {
    return {
      array: [
        { label: '科目1', id:'0' },
        { label: '科目2', id:'1' },
        { label: '科目3', id:'2' },
        { label: '科目4', id:'3' },
      ]
    }
  },
  methods:{
    change(e,index, type, code){
      const { value } = e.target
      switch (type) {
        case 'checkout':
          this.datas[index][code] = !!value.length;
          break;
        case 'input':
        case 'select':
          this.datas[index][code] = value;
          break;
        default:
          break;
      }
      this.$emit('change', this.datas)
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin flex_diy {
  display: flex;
  >div{
    flex-basis: 10px;
  }
}
.diyTable{
  .table_box{
    // width: 100%;
    // background: red;
    .tb_item{
      padding: 20rpx;
      text-align: center;
      border: 2rpx solid #EAEAEA;
    }
    .tb_box{
      @include flex_diy;
    }
    >.tb_box:first-child{
      background: rgba(103, 111, 223, .05);
      .th{
        @include fontMixin(26rpx, #333333,bold)
      }
    }
  }
}
</style>