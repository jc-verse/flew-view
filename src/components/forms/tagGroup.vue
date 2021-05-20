<template>
  <div class="tag_group">
    <div class="tag_list">
      <div class="tag_item_box" v-for="(item, ind) in tags" :key='ind'>
        <template v-if="item.code === 'city'">
          <TagItemCity :ind='ind' :item='item' @changeCity="changeFn"/>
        </template>
        <template v-else-if="item.code !== 'city' && item.list.length">
          <TagItem :ind='ind' :item='item' @changeItem='changeFn'/>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import TagItem from './tagItem'
import TagItemCity from './tagItemCity'
import { sexs, grades } from '@/common/enum';
import cityData from '@/static/city1.json';
import { selectSchoolList } from '@/common/api'

export default {
  name: 'TagItem',
  components: { TagItem, TagItemCity },
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
        { label: '城市', id: 1 , code: 'city',      defalutVal:'',  list: cityData, ph: '地区'},
        { label: '学校', id: 2 , code: 'schoolName',defalutVal:'',  list:[] ,       ph: '学校'},
        { label: '性别', id: 3 , code: 'sex',       defalutVal:'3',  list: sexs ,    ph: '性别'},
        { label: '年级', id: 4 , code: 'grade',     defalutVal:'1',  list: grades,   ph: '年级'},
      ],
      cityName: '',
      form: {
        schoolName: '',
        sex:'3',
        grade: 1
      }
    }
  },
  computed: {
    tags () {
      const { tagList } = this;
      return tagList.filter(item => item.list.length)
    }
  },
  methods:{
    selectSchoolList() {
      const { cityName, tagList } = this;
      selectSchoolList({keyword: cityName || ''}).then(res => {
        const {data: nData} = res[1];
        const { code, data } = nData;
        if (code === 200 && data.length) {
          const arr = (data || []).map(item => ({...item, label: item.name}));
          arr.unshift({ label: '请选择学校' , id: ''})
          this.tagList[1].list = arr;
        }
      }).catch(err => {console.log(err)})
    },
    changeFn(id, code, value) {
      switch (id) {
        case 1:
          const val = value[value.length-1] || {}
          this.cityName = val.name;
          this.selectSchoolList();
          break;
        case 2:
          this.form[code] = value.name;
          this.$emit('changeValue', this.form )
          break;
        case 3:
        case 4:
          this.form[code] = value.id;
          console.log('234' , this.form);
          this.$emit('changeValue', this.form )
          break;
        default:
          break;
      }
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