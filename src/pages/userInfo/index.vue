<template>
  <page-sj>
    <scroll-box>
      <div class="userInfo">
        <div class="top">
          <form-item-box 
            v-for='(ite, ind) in formHeadList' 
            :key='ind' 
            :ite ='ite' 
            :show-b='ind + 1 === formHeadList.length'
            :formData='formData'
          >
            <form-item :headInit='ite' :formData='formData' @change="changeFn">
              <template slot='upload'>
                <div class="box" v-if="imgUrl">
                  <img  :src="imgUrl" alt="" style='width:100rpx;height:100rpx'>
                  <!-- <i @click.stop="deleteImg"  class="iconfont iconshanchu icon" style="color:#676FDF;font-size:50rpx"></i> -->
                </div>
                <i v-else class="iconfont icontupianshangchuan " style="color:#676FDF;font-size:50rpx"></i>
              </template>
              <DiyInpSel slot='inputSelect' @searchInp='searchInp' :datas='schoolList' className='schoolName' popup-title="请选择学校" @popupclosed='changeFn'>
                <div  style='color:#999999; display: flex; align-items: center; justify-content: flex-end;' v-if="!formData.schoolName">请选择学校</div>
                <div  style=' display: flex; align-items: center; justify-content: flex-end;' v-else>{{formData.schoolName || ''}}</div>
              </DiyInpSel>
            </form-item>
          </form-item-box>
        </div>

        <div class="center">
          <form-item-box  :ite='centerHeads' :show-b='true' >
            <form-item  :headInit='centerHeads' :formData='formData' @change="changeFn"></form-item>
          </form-item-box>
        </div>

        <div class="bottom">
          <CourseSystem 
            title="课程体系" 
            :tableHead='tableHead_sy' 
            :tableData='formData["curriculumSystem"]'
            className='curriculumSystem'  
            class="tb_item"
            @changeTable='changeFn'
            @deleteItem='deleteItem'
            :maxNum='8'
          >
            <div class="add" slot='diy'>
              <form-item  :headInit='systems' :showIcon='true' :formData='formData' @change="changeFn"></form-item> 
            </div>
            <div class="right" slot='right' v-if='systemImgList.length < 8'>
              <form-item  :headInit='right' :formData='formData' @change="changeFn">
                <template slot='upload'>
                  <div class="right_box">
                    {{`上传认证`}}<i class="iconfont icontupianshangchuan icon"></i>
                  </div>
                </template>
              </form-item>
            </div>
            <div slot='right_list'>
              <template v-if="systemImgList.length">
                <div class="g_item" style='margin-top: 10rpx' v-for="(ite, ind) in systemImgList" :key='ind'>
                  <div class="text">{{ ite }}</div>
                  <div class="delete" @click='deleteUrl(ind,ite)'>删除</div>
                </div>
              </template>
            </div>
            <div class="g_list" slot='list'>
              <template v-for='(items,ind) in formData["curriculumSystem"]' >
                <div class="g_item" :key="ind" v-if="items.img">
                  <div class="text">{{`${ind + 1}. ${items.img}`}}</div>
                  <div class="delete" @click='deleteSta(ind)'>删除</div>
                </div>
              </template>
            </div>
          </CourseSystem>

          <CourseSystem 
            title="标化成绩" 
            :tableHead='tableHead_bh' 
            class="tb_item" 
            :tableData='formData["standardizedPerformance"]' 
            className='standardizedPerformance'
            @changeTable='changeFn'
            @deleteItem='deleteItem'
            :maxNum='6'
          >
            <div class="g_list" slot='list'>
              <template v-for='(items,ind) in formData["standardizedPerformance"]' >
                <div class="g_item" :key="ind" v-if="items.img">
                  <div class="text">{{`${ind + 1}. ${items.img}`}}</div>
                  <div class="delete" @click='deleteSta(ind, "standardizedPerformance")'>删除</div>
                </div>
              </template>
            </div>
          </CourseSystem>

          <form-item-box v-for='(option, ind) in bottomHeads' :key='ind' :ite='option' :show-b='ind+1 === bottomHeads.length' >
            <template v-if='option.code === "competitionExperience"'>
              <EditGame className='competitionExperience' @editGameFn='changeFn'>
                <div class="custom add"  >
                  亮出你比赛经历吧
                  <i class="iconfont iconjiahao add_icon"></i>
                </div>
              </EditGame>
              <div class="g_list" slot='diy'>
                <template v-if="formData.competitionExperience.length && shows.aut">
                  <div class="g_item" v-for='(items,ind) in formData.competitionExperience' :key="ind">
                    <div class="text">{{`${items.name}`}}</div>
                    <div class="delete" @click='deleteAut(ind)'>删除</div>
                  </div>
                  <div class="noList" @click='showFn("aut")'>
                    <i class="iconfont iconxiala packUp"></i>
                  </div>
                </template>
                <template v-else-if='formData.competitionExperience.length && !shows.aut'>
                  <div class="noList" @click='showFn("aut")'>
                    <i class="iconfont iconxiala"></i>
                  </div>
                </template>
              </div>
            
            </template>

            <template v-if='option.code === "match"'>
              <DiyPicker  :datas='totalList'  popup-title="希望参加的比赛" @addList='changeFn'>
                <div  class="" style='color:#999999; display: flex; align-items: center; justify-content: flex-end;'>请选择你希望参加的比赛</div>
              </DiyPicker>
              <div class="g_list" slot='diy'>
                <template v-if="matchList.length && shows.match">
                  <div class="g_item" v-for='(items,ind) in matchList' :key="ind">
                    <div class="text">{{`${items[2].label}`}}</div>
                    <div class="delete" @click='deleteMatch(ind)'>删除</div>
                  </div>
                  <div class="noList" @click='showFn("match")'>
                    <i class="iconfont iconxiala packUp"></i>
                  </div>
                </template>
                <template v-else-if='matchList.length && !shows.match'>
                  <div class="noList" @click='showFn("match")'>
                    <i class="iconfont iconxiala"></i>
                  </div>
                </template>
              </div>
            </template>

          </form-item-box>
          
        </div>
        <div class="btn btn_active" v-if="!showBtn.length"  @click='save'> 确定 </div>
        <div class="btn" v-else  @click='save'> 确定 </div>
      </div>
    </scroll-box>
    <FabGroup/>
  </page-sj>
  
</template>

<script>

import scrollBox from '@/components/scrollBox';
import pageSj from '@/components/pageSjNew';
import CourseSystem from './courseSystem';
import formItem from '@/components/forms/formItem';
import formItemBox from '@/components/forms/formItemBox';
import FabGroup from '@/components/fabGroup';
import DiyPopup from '@/components/diyPopup'
import DiyPicker from './diyPicker';
import EditGame from './editGame';
import DiyInpSel from '@/components/forms/diyInputSelect';
import { formHeads, bottomHeads, centerHeads, tableHead, tableHead2, formData } from './const';
import { joinUrl, getCurPage, analysisFn } from '@/common/utils';
import { imgUrl } from '@/common/http';
import { subjectList, updateCardInfo, selectSchoolList, teamUpGradeList } from '@/common/api';
import commonMixin from '@/common/mixins/commonMixin';
import userDataMixin from '@/common/mixins/userDataMixin';
export default {
  name: 'userInfo',
  components:{ 
    scrollBox, 
    CourseSystem, 
    pageSj, 
    formItem, 
    formItemBox, 
    FabGroup, 
    DiyPicker,
    DiyPopup,
    EditGame,
    DiyInpSel
  },
  mixins:[commonMixin, userDataMixin],
  data() {
    return {
      formHeads, centerHeads, bottomHeads, tableHead, formData,
      autList: [],
      isEdit: false,
      shows: {
        aut: false,
        match: false
      },
      subjectList: [],  // 科目list  
      systemList: [], //  课程体系list
      // totalList: [], // 希望参加的比赛list
      matchList: [],
      schoolList: [],
      gradeList:[],

      canClick: true,

      right: { label: '体系认证', code:'curriculumSystemAuthUrl', id: '' ,required: true,  params: { ph: '请选择您希望参加的比赛',  genre:'upload', type: 'text', max: 20 }},
      userCount: 0
    }
  },
  computed:{
    // 校验 
    showBtn () {
      const { formHeads, bottomHeads,  centerHeads, formData, right } = this;
      const rates = [...formHeads, ...bottomHeads,centerHeads, right ];
      const errList = [];
      const regNum = [];
      var reg = /[^\d]/;
      rates.forEach(item => {
        if (item.required && !formData[item.code]) {
          errList.push(`${item.label}不能为空`);
        }
      })
      formData['curriculumSystem'].forEach(item => {
        if (!item.subject) {
          errList.push(`学科不能为空`);
        }
      })
      const subjectNameList =  formData['curriculumSystem'].map(item=> {
        if (item.fraction) {
          regNum.push(item.fraction)
        }
        return item.subject
      });
      if (subjectNameList.length != [...new Set(subjectNameList)].length) {
        errList.push(`学科名称不能重复`);
      }
      formData['standardizedPerformance'].forEach(item => {
        if (item.fraction) {
          regNum.push(item.fraction)
        }
        if (!item.subject) {
          errList.push(`科目不能为空`);
        }
      })
      if (regNum.findIndex(item=> reg.test(item)) !== -1) {
        errList.push(`分数只能填数字`);
      }
      return  errList;
    },
    // 科目下拉
    subjects () {
      const { standardizedPerformance } = this.formData;
      const idList = standardizedPerformance.map(item=> item.subject)
      const arrNew = this.subjectList.map(item => ({...item ,label: item.subjectName, disable: idList.includes(item.id.toString())}));
      return arrNew
    },
    // 体系下拉
    systems () {
      const list = this.systemList.map(item => ({...item ,label: item.subjectName })) || [];
      return { 
        label: '课程体系', code:'curriculumSystemType', id: '' , required: true,
        params: {  ph: '请选择', genre:'select',  list: list }
      }
    },
    // 体系表头
    tableHead_sy () {
      const arr =  tableHead.map(item => {
        const obj = {...item} || {}
        if (obj.code === 'subject') {
          obj.list = this.subjects;
        }
        return obj;
      })
      return arr;
    },
    // 标化表头
    tableHead_bh () {
      const arr =  tableHead2.map(item => {
        const obj = {...item} || {}
        if (obj.code === 'subject') {
          obj.list = this.subjects;
        }
        return obj;
      })
      return arr;
    },
    imgUrl () {
      const { avatar } = this.formData;
      let url = 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'
      if ( avatar === 'default_img.png') {
        url = ''
      } else if (/http/.test(avatar)) {
        url =  avatar
      } else if (avatar) {
        url = `${imgUrl}${avatar}`
      }
      return url;
    },
    formHeadList() {
      const { gradeList } = this
      return formHeads.map(item => {
        if (item.code == 'grade'){
          item.params.list = gradeList || [];
        }
        return item
      })
    },
    systemImgList () {
      const { curriculumSystemAuthUrl }= this.formData;
      let arr = []
      if (curriculumSystemAuthUrl) {
        arr = curriculumSystemAuthUrl.split(',')
      }
      return arr
    }
  },
  onShow() {
    this.formDataFun();
  },
  mounted() {
    this.getDownList(1);  //科目
    this.getDownList(2);  //体系
    this.teamUpGradeList();

    /*获取当前路由*/
    const { type = '' } = getCurPage();
    if (type === 'edit') {
      this.isEdit = true;
      // this.getInfo();
    }

    uni.getStorage({ key: 'nickName', success:(res)=>{
      const { errMsg = '', data } = res || {};
      if (errMsg && errMsg.includes('ok')) {
        this.formData.nikeName = data;
      }
    },fail:(err)=>{console.log(err)}})
  },
  methods:{
    // 表单回显
    formDataFun(v) {
      const { userData, userCount } = this;
      const user = v || userData
      const keys = Object.keys(user)
      if (keys.length) {
        const obj = { ...user,
          competitionExperience : user.competitionExperienceList || [],
          curriculumSystemType : Number(user.curriculumSystem) || '',
          curriculumSystem : user.curriculumSystemList || [],
          standardizedPerformance : user.standardizedPerformanceList || [],

          isConsulting  : user.isConsulting == 1,
          isAcademic  : user.isAcademic == 1,
        };
        if (userCount === 0) {
          this.formData = JSON.parse(JSON.stringify(obj))
          this.userCount +=1
        }
      }
    },
    // 获取学校列表
    getSchoolList(val) {
      if (!val) {
        this.schoolList = [];
        return
      };
      const params = {
        keyword: val || ""
      }
      selectSchoolList(params).then(res=>{
        const { data:nData } = res[1] || {};
        const { code, data } = nData || {};
        if (code === 200) {
          this.schoolList = (data || []).map(item=>{
            return { ...item, label: item.name }
          })
        }
      })
    },
    // 获取科目/课程体系  list
    getDownList (type = 1) { //  type: 1 科目   /  2 课程体系
      subjectList({ type }).then(res => {
        const {data: nData} = res[1];
        const { code, data } = nData || {};
        if (code === 200) {
          const obj = { '1': 'subjectList', '2': 'systemList' };
          this[obj[type]] = [{label: '请选择', id: '', subjectName:'请选择'}, ...(data || [])];
        }
      })
    },
    // 获取年级
    teamUpGradeList() {
      teamUpGradeList().then(res => {
        const {data: nData} = res[1];
        const { code, data } = nData;
        if (code === 200 && data.length) {
          const arr = (data || []).map(item => ({...item, label: item.name}));
          arr.unshift({ label: '请选择年级' , id: ''})
          this.gradeList = arr;
        }
      }).catch(err => {console.log(err)})
    },
    // 改变表单
    changeFn({data, code, type}) {
      switch (type) {
        case 'add':
          this.formData[code].push(data);
          break;
        case 'join':
          let arr = []
          const { matchList } = this;
          data.forEach(item => {
            let flag;
            matchList.forEach(ite =>{
              const [i, c] = [item[2], ite[2]];
              if (i.label === c.label && i.id === c.id) {
                flag = i.label === c.label && i.id === c.id
              }
            })
            if (!flag) {
              arr.push(item)
            }
          })
          this.matchList = matchList.concat(arr);
          break;
        case 'inpSel':
          this.formData[code] = data.name || ''
          break;
        default:
          if (code === 'curriculumSystemAuthUrl') {
            const { curriculumSystemAuthUrl } = this.formData;
            this.formData[code] = curriculumSystemAuthUrl? `${curriculumSystemAuthUrl},${data}`: data;
          } else if (code === 'isConsulting' || code === 'isAcademic') {
            this.formData[code] = data ? 1 : 2;
          } else {
            this.formData[code] = data;
          }

          break;
      }
    },
    // 删除表格
    deleteItem({index, code}) {
      this.formData[code] = this.formData[code].filter((ite, ind) => ind != index);
    },
    // 删除比赛经历
    deleteAut (index) {
      this.formData.competitionExperience = this.formData.competitionExperience.filter((item,ind) => {
        return ind !== index;
      })
    },
    deleteMatch(index) {
      this.matchList = this.matchList.filter((item,ind) =>ind !==index )
    },
    deleteUrl(ind, ite) {
      const { systemImgList } = this;
      const newArr = systemImgList.filter(item => ite !== item);
      this.formData.curriculumSystemAuthUrl = newArr.join(',')
    },
    // 展示列表
    showFn(name){
      this.shows[name] = !this.shows[name]
    },
    // 保存
    save () {
      const _this = this;
      if (!this.canClick)  return;
      const { autList, formData, showBtn, matchList } = this;
      if (showBtn.length) { // 校验
        uni.showToast({ title: showBtn[0],icon:'none' });
        return;
      }
      if (!matchList.length) {
        uni.showToast({ title: '希望参加的比赛不能为空',icon:'none' });
        return;
      }
      this.canClick = false;
      const matchs = matchList.map((item, index)=>{
        const [ organizeTypeId , organizeTypeSon , organizeTypeSonMatchId  ] = [item[0].id,item[1].id,item[2].id]
        return  { organizeTypeId , organizeTypeSon , organizeTypeSonMatchId }
      })
      formData.match = matchs || [];
      const params = { ...formData }
      updateCardInfo(params).then(res => {
        const { data: nData } = res[1];
        const { data, code, msg } = nData;
        if (code === 200) {
          uni.showToast({ 
            title: msg || '',
            success: (res)=>{
              setTimeout(function () {
                uni.navigateBack({delta:1,success:()=>{
                  _this.getUserInfo();
                  _this.canClick = true;
                }})
              }, 1000);
            } 
          })
        }else {
          uni.showToast({ title: msg ,icon:'none', success: () =>{
            _this.canClick = true;
          } });
        }
      }).catch(err=> {
        console.log(err)
        this.canClick = true;
      })
    },
    // 上传图片
    uploadImg (data, statu) {
      switch (statu) {
        case 1:
          const { link, name } = data;
          this.showFn("aut")
          this.autList.push({ label: name, url : link })
          break;
      
        default:
          break;
      }
    },
    searchInp (val) {
      this.getSchoolList(val)
    },
    deleteSta (index, code) {
      this.formData[code].map((item, ind) => {
        if (ind === index) {
          item.img = ''
        }
        return item;
      })
    }
  },

  watch: {
    // 希望参加的比赛回显
    totalList (val) {
      const { isEdit, formData } = this;
      if (isEdit) {
        const list = []
        formData.match.forEach(items => {
          const arr = analysisFn(val, items) || [];
          list.push(arr)
        })
        this.matchList = [...list]
      }
    },
    // 希望参加的比赛回显
    'formData.match': {
      handler(val) {
        const { isEdit, totalList } = this;
        if (isEdit && totalList.length) {
          const list = []
          val.forEach(items => {
            const arr = analysisFn(totalList, items) || [];
            list.push(arr)
          })
          this.matchList = [...list]
        }
      }
    },
    userData(val) {
      this.formDataFun(val)
    }
  }
}
</script>
<style lang="scss" scoped>
.userInfo{
  box-sizing: border-box;
  background: #F1F3F5;
  width: 100%;
  padding: 20rpx 30rpx;
  @include flex_(space-between, center, column);
  .center, .btn, .bottom{
    margin-top: 20rpx;
  }
  .top, .center, .bottom{
    width: 100%;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 30rpx;
    box-sizing: border-box;
    .box{
      @include flex-center;
      img{
        width: 100rpx;
        height: 100rpx;
        margin-right: 10rpx;
      }
    }
  }
  .bottom,.center{
    
    .right{
      position: absolute;
      right: 0;
      .right_box{
        display: flex;
        align-items: center;
        font-size: 28rpx;
        color:#676FDF;
        .icon{
          margin-left:10rpx;
          font-size:50rpx
        }
      }
    }
    > div:not(:first-child) ,
    // > CourseSystem:not(:first-child){
    //   margin-top: 20rpx;
    // }
    .custom{
      justify-content: flex-end;
      @include fontMixin(28rpx, #999999)
    }
    .g_list{
      padding: 20rpx 0 0;

      .packUp{
        display: inline-block;
        transform: rotate(180deg)
      }
      .noList{
        @include fontMixin(28rpx,#999999);
        text-align: center;
      }
    }
  }
  .matchList {
    @include ellipsis;
    max-width: 300rpx;
    color:#999999;
    display: flex;
    align-items: center; justify-content: flex-end;
  }

  .btn{
    width: 100%;
    @include fontMixin(32rpx, #ffffff, bold);
    background: #C5C5C5 ;
    text-align: center;
    padding: 20rpx 0;
    border-radius: 40rpx;
    box-sizing: border-box;
  }
  .btn_active{
    background: #676FDF;
  }
  .add {
    display: flex;
    align-items: center;
    margin-left: 10rpx;
    @include fontMixin(32rpx, #676FDF);
    .add_icon{
      display: inline-block;
      height: 48rpx;
      width: 48rpx;
      line-height: 48rpx;
      border-radius: 50%;
      background: rgba(103, 111, 223,.2);
      margin-right: 10rpx;
      margin-left: 10rpx;
      color: #676FDF;
      @include flex_center;
    }
  }
}
.g_item{
  @include flex_(space-between, center);
  .text{
    max-width: 80%;
    @include ellipsis;
    @include fontMixin(28rpx, #676FDF)
  }
  .delete{
    @include fontMixin(28rpx)
  }
}
</style>