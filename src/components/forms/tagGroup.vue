<template>
  <div class="tag_group">
    <div class="tag_list">
      <div class="tag_item_box" v-for="(item, ind) in tagList" :key='ind'>
        <TagItem :list='tagList' :ind='ind' :item='item'/>
      </div>
    </div>
  </div>
</template>
<script>
import TagItem from './tagItem'
export default {
  name: 'TagItem',
  components: { TagItem },
  props: {
    list: {
      type: Array,
      default:() => []
    }
  },  
  data () {
    return {
      index: 0,
      tagList: [
        { label: '省份', id: 1 },
        // { label: '学校', id: 2 },
        // { label: '省份2', id: 3 },
        // { label: '省份3', id: 4 },
        // { label: '省份41111', id: 5 },
        // { label: '省份5', id: 6 },
        // { label: '省份6', id: 7 },
        // { label: '省份7', id: 8 },
      ]
    }
  },
  methods:{
    clickItem(item, index) {
      this.index = index;
      this.$emit('clickItme', item)
    },
    bindPickerChange: function(e) {
			this.index = e.detail.value;
		}
  },
}
</script> 

<style lang="scss" scoped>

.tag_group::-webkit-scrollbar{
  display: none;
}
.tag_group{
  background: #ffffff;
  box-sizing: border-box;
  overflow: scroll;
  padding: 16rpx 10rpx;
  flex-shrink: 0;
  border-bottom: 2rpx solid #f5f5f5;
  .tag_list{
    display: flex;
    box-sizing: border-box;
    .tag_item_box{
      padding: 0 10rpx;
      flex-grow: 1;
    }
    
  }
}
</style>