<template>
  <div class="diyTable" ref="diyTable" id="diyTable">
    <div class="table_box">
      <div class="tb_box">
        <div 
          :class="['th', 'tb_item', item.disabled ?'disabled': '']" 
          v-for="(item,index) in heads" 
          :style="{ flexGrow: item.pro }" 
          :key='index'
        >{{item.label}}</div>
      </div>
      <div class="tr_box" v-for='(ite,ind) in tableDataList' :key='ind'>
        <div class="tb_box">
          <div class="td tb_item" v-for="(item,index) in tableHeadList" :style="{flexGrow: item.pro}" :key='index' :class="[item.disabled ?'disabled': '']" >
            
            <template v-if='!item.type || item=== "text"'>
              {{ite[item.code]}}
            </template>

            <div v-if='item.type === "input"'>
              <input   :placeholder="item.ph || '请填写'" @input='change($event, ind, "input", item.code)' v-model='ite[item.code]' type="text"/>
            </div>
            

            <div v-if='item.type === "checkbox"'>
              <checkbox-group @change='change($event, ind, "checkout", item.code)'  v-model='ite[item.code]'>
                <checkbox :value="item.code" :checked="ite[item.code]===1"  :disabled='item.disabled'/>
              </checkbox-group>
            </div>

            <div v-if='item.type === "select"' >
              <picker placeholder='请选择' @change='change($event, ind, "select", item.code, item.list)' range-key='label' :value="ite[item.code]" :range="item.list">
                <view class="uni-input" v-if='ite[item.code]'>
                  {{item.list[ite[item.code]].label || ''}}
                  <i class="iconfont iconxiala1" style='color:#808080;margin-left: 10rpx'></i>
                </view>
                <view v-else style='color:#808080'>请选择</view>
              </picker>
            </div>

            <div v-if='item.type === "upload"' >
              <UploadImage @uploadImg='change($event, ind, "upload", item.code)' :statu='1'>
                <i class="iconfont icontupianshangchuan" style="font-size:44rpx;color:#676FDF"></i>
              </UploadImage>
            </div>
            <!-- 操作 -->
            <div v-if='item.type === "edit"' >
              <template v-if="tableDataList.length > 1">
                <i class="iconfont iconshanchu1" style="font-size:44rpx;color:#676FDF" @click='change($event, ind, "edit", item.code)'></i>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TipPopup title="操作提示" ref='tipPopup' msg="是否确定删除？" @confirm='confirm'/>
  </div>
</template>

<script>
import UploadImage from '@/components/forms/upload';
import TipPopup from '@/components/cards/tipPopup';
export default {
  name: 'diyTable',
  components: { UploadImage, TipPopup },
  props: {
    heads: { type:Array, default: ()=>[] },
    datas: { type:Array, default: ()=>[] },
  },
  computed : {
    tableHeadList () {
      const list = this.heads;
      return list
    },
    tableDataList () {
      const list = this.datas;
      return list
    },
  },
  mounted() {
  },
  data () {
    return { 
      delIndex: 0,
    }
  },
  methods:{
    confirm() {
      this.$emit('deleteItem', this.delIndex)
    },
    change(e,index, type, code, list){
      const { value } = e.target || {}
      switch (type) {
        case 'checkout':
          this.datas[index][code] = !!value.length ? 1 :2;
          break;
        case 'input':
          this.datas[index][code] = value;
          break;
        case 'select':
          const val = list.find((item, ind) => ind == value) || {}
          if (val.disable && this.tableDataList[index][code] != value) {
            this.datas[index][code] = ''; 
            uni.showToast({title:'无法重复选择', icon:'none'})
            return;
          }
          this.datas[index][code] = val.id;
          break;
        case 'upload':
          this.datas[index][code] = e.link;
          break;
        case 'edit':
          this.delIndex = index;
          this.$refs.tipPopup.show();
          return 
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
.uni-input{
  @include flex_center;
}
.diyTable{
  .table_box{
    .tb_item{
      padding: 20rpx;
      text-align: center;
      border: 2rpx solid #EAEAEA;
    }
    .tb_box{
      @include flex_diy;
    }
    .disabled{
      background: rgba(158, 158, 158, .1);
    }
    >.tb_box:first-child{
      background: rgba(103, 111, 223, .05);
      .th{
        @include fontMixin(26rpx, #333333,bold)
      }
      .disabled{
        color: rgba(158, 158, 158, 1);
      }
    }
  }
}
</style>