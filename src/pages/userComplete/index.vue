<template>
  <page-sj>
    <scroll-box>
      <div class="userInfo">
        <div class="top">
          <form-item-box v-for='(ite, ind) in formHeads' :key='ind' :ite='ite' :show-b='ind+1 === formHeads.length' >
            <form-item :info='ite' :headInit='ite'></form-item>
          </form-item-box>
        </div>

        <div class="center">
          <form-item-box v-for='(ite, ind) in centerHeads' :key='ind' :ite='ite' :show-b='ind+1 === centerHeads.length' >
            <form-item :info='ite' :headInit='ite'></form-item>
          </form-item-box>
        </div>

        <div class="bottom">
          <courseSystem title="课程体系" :tableHead='tableHead' :showBtn='false' class="tb_item">
            <div class="add" slot='diy'> <i class="iconfont iconjiahao add_icon"></i> <span style="font-size:28rpx">请选择</span> </div>
            <div class="right_h" slot='right'>
              <i class="iconfont icontupianshangchuan"></i>
              <span>上传认证</span>
            </div>
          </courseSystem> 

          <courseSystem title="标化成绩" :tableHead='tableHead2' class="tb_item" /> 

          <form-item-box v-for='(ite, ind) in bottomHeads' :key='ind' :ite='ite' :show-b='ind+1 === bottomHeads.length' >
              <template v-if='ite.params.genre === "custom"'>
                <div class="custom add"  @click="addAut">
                  <div class="right_h" slot='right'>
                    <i class="iconfont icontupianshangchuan"></i>
                    <span>上传认证</span>
                  </div>
                </div>
                <div class="g_list" slot='diy'>
                  <template v-if="autList.length && shows.aut">
                    <div class="g_item" v-for='(ite,ind) in autList' :key="ind">
                      <div class="text">{{`${ite.url}${ind+1}.png`}}</div>
                      <div class="delete" @click='deleteAut(ind)'>删除</div>
                    </div>
                    <div class="noList" @click='showFn("aut")'>
                      <i class="iconfont iconxiala packUp"></i>
                    </div>
                  </template>
                  <template v-else-if='autList.length && !shows.aut'>
                    <div class="noList" @click='showFn("aut")'>
                      <i class="iconfont iconxiala"></i>
                    </div>
                  </template>
                  <template v-else>
                    <div class="noList">亮出你比赛经历吧</div>
                  </template>
                </div>
              
              </template>
            <form-item :info='ite' :headInit='ite' v-else></form-item>
          </form-item-box>
        </div>

        <div class="center">
          <form-item-box v-for='(ite, ind) in lastHeads' :key='ind' :ite='ite' :show-b='ind+1 === lastHeads.length' >
            <form-item :info='ite' :headInit='ite'></form-item>
          </form-item-box>
        </div>

        <div class="btn" :class='[showBtn?"btn_active":""]' @click='submit'> 确定 </div>
      </div>
    </scroll-box>
  </page-sj>
  
</template>

<script>

import scrollBox from '@/components/scrollBox';
import pageSj from '@/components/pageSj';
import courseSystem from './courseSystem';
import formItem from '@/components/formItem';
import formItemBox from '@/components/formItemBox';
const arr = [
  { label: '男', id: 0 },
  { label: '女', id: 1 }
]
export default {
  name: 'userInfo',
  components:{ scrollBox, courseSystem, pageSj, formItem, formItemBox },
  data() {
    return {
      isH5: false,
      value: '',
      formHeads:[
        { label: '昵称',   code:'name',       id: '' ,required: false, params: { ph: '获取微信名',    genre:'text', type: 'text', max: 20} },
        { label: '微信号', code:'activeName', id: '' ,required: true,  params: { ph: '请填写微信号',  genre:'input', type: 'text', max: 20 }},
        { label: '姓名',   code:'type',       id: '' ,required: true,  params: { ph: '请填写真实姓名',genre:'input', type: 'text', max: 20 } },
        { label: '手机',   code:'startTime',  id: '' ,required: true,  params: { ph: '请填写电话',    genre:'input', type: 'number', max: 20 } },
        { label: '学校',   code:'city',    id: '' ,required: true,  params: { ph: '请填写学校',    genre:'combox', type: 'text', max: 20 ,candidates:['1','12','13','8',15,16,17]} },
        { label: '年级',   code:'site',       id: '' ,required: true,  params: { ph: '请填写年级',    genre:'input', type: 'text', max: 20 } },
        { label: '性别',   code:'info',       id: '' ,required: false,  params: { ph: '请选择性别',    genre:'select', list: arr } },
        { label: '邮箱',   code:'number',     id: '' ,required: true,  params: { ph: '请填写邮箱',    genre:'input', type: 'email' , max: 20} },
        { label: '邮箱',   code:'number',     id: '' ,required: true,  params: { ph: '请填写邮箱',    genre:'input', type: 'email' , max: 20} },
        // { label: '邮箱1',   code:'che',     id: '' ,required: true,  params: { ph: '请填写邮箱1',    genre:'checkbox' , max: 20} },
        // { label: '邮箱2',   code:'che2',     id: '' ,required: true,  params: { ph: '请填写邮箱1',    genre:'custom' , max: 20} },
      ],
      centerHeads: [
        { label: '校内成绩', code:'nameN', id: '' ,required: true,  params: { ph: '例：45/45 ，4/4，A*A*A*A*',  genre:'input', type: 'text', max: 20 }},
      ],
      bottomHeads:[
        { label: '比赛经历', code:'nameL', id: '' ,required: false,  params: { ph: '亮出你比赛经历吧',  genre:'custom', type: 'text', max: 20 }},
        { label: '希望参加的比赛', code:'nameS', id: '' ,required: true,  params: { ph: '请选择您希望参加的比赛',  genre:'input', type: 'text', max: 20 }},
      ],
      lastHeads: [
        { label: '专业方向', code:'name1', id: '' ,required: false, params: { ph: '请填写',  genre:'input', type: 'text', max: 20 } },
        { label: '个人留言', code:'name2', id: '' ,required: false, params: { ph: '请填写',  genre:'input', type: 'text', max: 20 } },
        { label: '录取大学', code:'name3', id: '' ,required: false, params: { ph: '确认录取后请填写',  genre:'input', type: 'text', max: 20 } },
      ],
      formData: {},
      tableHead: [
        { label: '学科', code: 'km', id: '', onlyCode: '',disabled:false, type:'select' ,pro : '2.5'},
        { label: '分数', code: 'fs', id: '', onlyCode: '',disabled:false, type:'input' ,pro :'2'},
        { label: '咨询', code: 'zx', id: '', onlyCode: '',disabled:true, type:'checkbox' ,pro : '1'},
        { label: '帮助', code: 'bz', id: '', onlyCode: '',disabled:true, type:'checkbox' ,pro : '1'},
      ],
      tableHead2: [
        { label: '科目', code: 'km', id: '', onlyCode: '',disabled:false, type:'select' ,pro : '2.5'},
        { label: '分数', code: 'fs', id: '', onlyCode: '',disabled:false, type:'input' ,pro :'2'},
        { label: '咨询', code: 'zx', id: '', onlyCode: '',disabled:false, type:'checkbox' ,pro : '1'},
        { label: '帮助', code: 'bz', id: '', onlyCode: '',disabled:false, type:'checkbox' ,pro : '1'},
      ],
      autList: [
        { label: '小明', url: '小明比赛认证' },
      ],
      shows: {
        aut: false
      }
    }
  },
  onLoad() {
    // #ifdef H5
      this.isH5 = true
    // #endif
  },
  computed:{
    showBtn () {
      const arr = this.formHeads.find(item=>{
        return !this.formData[item.code]
      }) || [];
      return  arr.length === 0
    }
  },
  methods:{
    submit() {
      console.log(1, this.formData)
    },
    addAut() {
      this.autList.push({ label: '小明', url: '小明比赛认证' })
    },
    deleteAut (index) {
      this.autList= this.autList.filter((ite,ind) => {
        return ind !== index;
      })
    },
    showFn(name){
      this.shows[name] = !this.shows[name]
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
  }
  .bottom{
    > div:not(:first-child) ,
    > courseSystem:not(:first-child){
      margin-top: 20rpx;
    }
    .custom{
      justify-content: flex-end;
      @include fontMixin(28rpx, #676FDF);
      position: relative;
    }
    .g_list{
      padding: 20rpx 0 0;
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
  // add Icon
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
      @include flex_center;
    }
  }
  .right_h{
    position: absolute;
    right: 0;
    @include flex_center;
    @include fontMixin(24rpx, #676FDF);
    border: 2rpx dotted #676FDF;
    padding: 0 8rpx;
    line-height: 40rpx;
  }
}
</style>