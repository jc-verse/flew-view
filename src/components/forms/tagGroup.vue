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
import TagItemCity from './tagItemCityNew'
import { sexs } from '@/common/enum';
import cityData from '@/static/city1.json';
import { selectSchoolList, teamUpGradeList, subjectList } from '@/common/api'

export default {
  name: 'TagItem',
  components: { TagItem, TagItemCity },
  props: {
    list: {
      type: Array,
      default:() => []
    },
    showList: {
      type: Array,
      default: [1,2,3,4]
    } 
  },  
  data () {
    return {
      index: 0,
      tagList: [
        { label: '城市', id: 1 , code: 'city',      defalutVal:'',  list: cityData, ph: '地区'},
        { label: '学校', id: 2 , code: 'schoolName',defalutVal:'',  list:[] ,       ph: '学校'},
        { label: '性别', id: 3 , code: 'sex',       defalutVal:'',  list: sexs ,    ph: '性别'},
        { label: '课程体系', id: 6 , code: 'subId',     defalutVal:'',  list: [],   ph: '课程体系'},
        { label: '科目', id: 5 , code: 'subId1',     defalutVal:'',  list: [],   ph: '科目'},
        { label: '年级', id: 4 , code: 'grade',     defalutVal:'',  list: [],   ph: '年级'},
      ],
      cityName: '',
      form: {
        schoolName: '',
        sex:'',
        grade: '',
        subId: '',
        subId1: ''
      }
    }
  },
  computed: {
    tags () {
      const { tagList, showList } = this;
      return tagList.filter(item => item.list.length && showList.includes(item.id))
    },
  },
  mounted() {
    this.teamUpGradeList();
    if (this.showList.includes(5)) {
      this.getDownList(1);  //科目
    }
    if (this.showList.includes(6)) {
      this.getDownList(2);  //体系
    }
  },
  methods:{
    // 获取学校列表
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
    // 获取年级
    teamUpGradeList() {
      teamUpGradeList().then(res => {
        const {data: nData} = res[1];
        const { code, data } = nData;
        if (code === 200 && data.length) {
          const arr = (data || []).map(item => ({...item, label: item.name}));
          arr.unshift({ label: '请选择年级' , id: ''})
          this.tagList = this.tagList.map(item => {
            if (item.id == 4) {
              item.list = arr;
            }
            return item;
          });
        }
      }).catch(err => {console.log(err)})
    },
    // 获取科目/课程体系  list
    getDownList (type = 1) { //  type: 1 科目   /  2 课程体系
      subjectList({ type }).then(res => {
        const {data: nData} = res[1];
        const { code, data } = nData || {};
        if (code === 200) {
          const obj = { '1': 5, '2': 6 };
          // this[obj[type]] = data || [];
          const arr = (data || [])
            .map(item => ({...item ,label: item.subjectName }))
          if (arr.length) {
            arr.unshift({label: type == 1? '请选择科目': '请选择课程体系', id: ''})
          } 
          this.tagList = this.tagList.map(item => {
            if (item.id == obj[type]) {
              item.list = arr;
            }
            return item;
          });
        }
      })
    },
    changeFn(id, code, value) {
      switch (id) {
        case 1:
          if (value.length) {
            this.cityName = value
            this.selectSchoolList();
          }
          
          break;
        case 2:
          this.form[code] = value.name;
          this.$emit('changeValue', this.form )
          break;
        case 3:
        case 4:
        case 5:
        case 6:
          this.form[code] = value.id;
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