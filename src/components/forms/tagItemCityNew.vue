<template>
    <picker 
      @columnchange='columnchange'
      @change="onchange" 
      @cancel='cancel'
      :value="values" 
      :range="cityList" 
      mode='multiSelector'  
      range-key='name'
    >
      <div class="tag_item">
        <span >{{checkName || item.ph}}</span>
        <i class='iconfont iconxiala icon_item' :class="[down ? 'icon_active': '']"></i>
      </div>
    </picker>

</template>

<script>
import {uniDataPicker} from '@dcloudio/uni-ui';
import cityData from '@/static/city1.json';
export default {
  name: 'tag_item',
  components:{ uniDataPicker },
  props: {
    item: { type: Object, default: ()=>({}) }
  },
  data () {
    return {
      values: [ 0 , 0 ],
      newValue: [ 0 , 0 ],
      down: true,
    }
  },
  computed: {
    cityList () { //
      const { item, values } = this;
      const list = item.list || [];
      const arr2 = (list.find((item, index) => index === values[0]-1) || {}).children || [];
      return [ [{name: '请选择', value:''}, ...list], [{name: '请选择', value:''},...arr2] ]
    },
    checkName () { // 拼接选中展示
      const { cityList, newValue } = this;
      const [ aVal, bVal] = newValue;
      const [ arr1, arr2 ] = cityList;
      let checkName ='';
      if (aVal || aVal === 0) {
        const a = arr1.find((ite,ind) => ind === aVal);
        console.log('a', a)
        if (a.value) {
          checkName = a.name;
        }
        if (bVal || bVal=== 0) {
          const b = arr2.find((ite,ind) => ind === bVal);
          console.log('b', b)
          if (b.value) {
            checkName += `/${b.name}`;
          }
        }
      }
      return  checkName;
    }
  },
  methods: {
    onchange(e) {
      const { id, code } = this.item;
      this.newValue = e.detail.value;
      const queryName =  this.checkName.replace('/','');
      this.$emit('changeCity',  id, code, queryName);
    },
    columnchange(e){ //改变选项
      const { column, value } = e.detail
      this.$set(this.values, column, value)
      if (column === 0) {
        this.$set(this.values, 1, 0)
      }
    },
    cancel() { 
      const { newValue, values } = this;
      const isChnage = newValue.findIndex((ite, ind)=> ite!== values[ind]) != -1;
      if (isChnage) { // 取消 还原出数据
        this.values = newValue
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.tag_item{
  padding: 8rpx 36rpx;
  flex-shrink: 0;
  background: #ECECEC;
  border-radius: 4px;
  color: grey;
  // opacity: 0.56;
  white-space: nowrap;
  @include flex_center;
  @include fontMixin(28rpx, #666666, 400);
  .icon_item {
    margin-left: 10rpx;
    font-size: 24rpx;
    display: inline-block;
    transform: translateY(4rpx);
  }
  .icon_active{
    transform: translateY(4rpx) rotate(-90deg);
  }
}
</style>