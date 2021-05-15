<template>
  <div class="tag_item" @click="clickD(true)">
    <!-- <picker  @change="bindPickerChange" @cancel='clickD(false)' :value="index" range-key="label" :range="list">
      <span>{{list[index]['label']}}</span>
      <i class='iconfont iconxiala icon_item' :class="[down ? 'icon_active': '']"></i>
    </picker> -->

    <uni-data-picker class="picker_box" :localdata="cityList"  popup-title="请选择班级" @change="onchange" @nodeclick="onnodeclick">
      <!-- <div class="check_content">
        {{checkCity}}
      </div> -->
    </uni-data-picker>

  </div>
</template>

<script>
import {uniDataPicker} from '@dcloudio/uni-ui';
import cityData from '@/static/city1.json';
import { deepChange } from '@/common/utils';
// 改装数据方便联动select 使用
// const  deepChange1 = (data, id='') => {
//   return  data.map(item => {
//     const obj = {}
//     for (const key in item) {
//       let newCode = `${id ? id + '-': ''}${item['code']}`
//       if (key === 'code') {
//         console.log(1,2,newCode, item)
//       }
//       if (Array.isArray(item[key])) {
//         obj['children'] = deepChange1(item[key], newCode);
//         // obj[key] = item[key]
//       } else if (key === 'code') {
//         obj['value'] = newCode
//       } else{
//         obj[key] = item[key]
//         if (/(name|sonName|matchName)/.test(key)) {
//           obj['text'] = item[key]
//         }
//       }
//     }
//     console.log(1,99,obj)
//     return obj;
//   })
// }
const  deepChange2 = (data) => {
  return  data.map(item => {
    const obj = {}
    for (const key in item) {
      if (Array.isArray(item[key])) {
        
        if (item.level == 1) {

        } else {
          obj['children'] = deepChange2(item[key]);
        }
      } else{
        obj[key] = item[key]
      }
    }
    console.log(1,99,obj)
    return obj;
  })
}
export default {
  name: 'tag_item',
  components:{ uniDataPicker },
  props: {
    list: { type:Array, default: ()=>[] },
    ind: { type: Number, default: 0 },
    item: { type: Object, default: ()=>({}) }
  },
  computed: {
    cityList() {
      // console.log(999,deepChange2(cityData))
      return cityData
    },
    checkCity() {
      const [a,b,c] = this.formData;
      return Object.keys(b? b: {}).length ? b.name : '请选择';
    }
  },
  mounted() {
    console.log(1222, this.cityList)
    
  },
  data () {
    return {
      index: 0,
      down: false,
      formData: [],

    }
  },
  methods: {
    onchange(e) {
      console.log('change', e)
      this.formData = e.detail.value
    },
    onnodeclick(e) {
      console.log('onnodeclick', e)
    },
    bindPickerChange: function(e) {
			this.index = e.detail.value;
      this.$emit('clickItme', this.list[this.index])
      this.clickD(false)
		},
    clickD (falg) {
      this.down = falg;
    }
  }
}
</script>

<style lang="scss" scoped>
.tag_item{
  padding: 8rpx 36rpx;
  flex-shrink: 0;
  // background: #ECECEC;
  border-radius: 4px;
  // opacity: 0.56;
  white-space: nowrap;
  z-index:10;
  @include flex_center;
  @include fontMixin(28rpx, #666666, 400);
  .icon_item {
    margin-left: 10rpx;
    font-size: 24rpx;
    display: inline-block;
  }
  .icon_active{
    transform: rotate(-90deg);
  }
  .uni-data-tree[data-v-7939fa20] /deep/ .input-value-border[data-v-7939fa20]{
    border: none!important;
  }
}
</style>