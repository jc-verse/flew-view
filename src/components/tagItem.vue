<template>
  <div class="tag_item" @click="clickD(true)">
    <picker  @change="bindPickerChange" @cancel='clickD(false)' :value="index" range-key="label" :range="list">
      <span>{{list[index]['label']}}</span>
      <i class='iconfont iconxiala icon_item' :class="[down ? 'icon_active': '']"></i>
    </picker>
  </div>
</template>

<script>
export default {
  name: 'tag_item',
  props: {
    list: { type:Array, default: ()=>[] },
    ind: { type: Number, default: 0 },
    item: { type: Object, default: ()=>({}) }
  },
  data () {
    return {
      index: 0,
      down: false
    }
  },
  methods: {
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
  background: #ECECEC;
  border-radius: 4px;
  opacity: 0.56;
  white-space: nowrap;
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
}
</style>