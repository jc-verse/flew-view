<template>
  <PageJS :styles='{background: "#F1F3F5"}'>
    <div class="person_info_page">
      <div class="person_info_wrap">
        <div class="user_img_bar item">
          <div class="label">头像</div>
          <img class="user_img" :src="headImg" alt="">
        </div>
        <FormItemBox :ite ='ite' :formData='userData' :show-b='ind + 1 === formHeads.length' v-for='(ite, ind) in formHeads' :key='ind' >
          <FormItem :headInit='ite' :formData='userData' @change="changeFn"/>
        </FormItemBox>
      </div>
      <div class="person_card">
        <div class="title">我的名片卡</div>
        <div class="card_content">
          <GroupItem @clickBuoy='clickBuoy' :infoData='newFormData'></GroupItem>
          <!-- <ItemInfo /> -->
        </div>
      </div>
    </div>
    <FabGroup/>
  </PageJS>
</template>
<script>
import PageJS from '../../components/pageSjNew.vue';
import ItemInfo from '@/pages/mine/msgItem.vue';
import FormItem from '@/components/forms/formItem';
import FormItemBox from '@/components/forms/formItemBox';
import { userCardInfo, subjectList } from '@/common/api';
import { sexs } from '@/common/enum';
import { joinUrl, getCurPage } from '@/common/utils';
import GroupItem from './groupItem'
import userDataMixin from '@/common/mixins/userDataMixin';
import { imgUrl } from '@/common/http'


import FabGroup from '@/components/fabGroup';
export default {
  name: 'personalInfo',
  components: { PageJS, ItemInfo, FabGroup, FormItem, FormItemBox, GroupItem },
  mixins:[userDataMixin],
  data() {
    return {
      formHeads: [
        { label: '昵称',   code:'nikeName',  id: '',disabled:true ,required: false, params: { ph: '获取微信名',    genre:'text', type: 'text', max: 20} },
        { label: '微信号', code:'wxNum',    id: '' ,disabled:true ,required: false,  params: { ph: '请填写微信号',  genre:'input', type: 'text', max: 20 }},
        // { label: '生日',   code: 'birthday', id: '', required: false, params: { ph: '请填写生日',  genre:'date', type: 'text', max: 20 } },
        { label: '年级',   code:'grade',     id: '' ,disabled:true ,required: false,  params: { ph: '请填写年级',    genre:'input', type: 'text', max: 20 } },
        { label: '性别',   code:'sex',       id: '' ,disabled:true ,required: false,  params: { ph: '请选择性别',    genre:'select', list: sexs } },
        { label: '邮箱',   code:'email',     id: '' ,disabled:true ,required: false,  params: { ph: '请填写邮箱',    genre:'input', type: 'email' , max: 20} },
      ],
      formData: {},
      // headImg: '',
      userHead: '',
      systemList: [],
      // userData: {}// mixin中
    }
  },
  mounted() {
    // this.getInfo();
    
    this.getDownList();
    uni.getStorage({key: 'avatarUrl',
      success:(res)=>{
        const {data, errMsg} = res;
        if (/ok/.test(errMsg)) {
          // this.headImg = data;
          this.userHead = data
        }
      }
    })
  },
  onShow(){

  },
  computed :{
    newFormData () {
      const { formData, systemList, userData} = this;
      const obj = {...userData};
      if (systemList.length) {
        const item = systemList.find(ite => ite.id == obj.curriculumSystem) || {}
        obj.curriculumSystem = item.subjectName || obj.curriculumSystem
      }
      return obj;
    },
    headImg () {
      const { avatar } = this.userData;
      let url = this.userHead || 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'
      if (/(http|https)/.test(avatar)) {
        url = avatar;
      } else if (avatar && avatar !== 'default_img.png') {
        url = imgUrl + avatar
      }
      return url;
    }
    
  },
  methods: {
    // 获取科目/课程体系  list
    getDownList () { //  type: 1 科目   /  2 课程体系
      subjectList({ type: 2 }).then(res => {
        const {data: nData} = res[1];
        const { code, data } = nData;
        if (code === 200) {
          this.systemList = data || [];
        }
      })
    },
    // 获取信息
    // getInfo() {
    //   userCardInfo().then(res=> {
    //     const { data:nData } = res[1];
    //     const { data, code } = nData;
    //     if (code === 200) {
    //       data.avatar = this.headImg || ''
    //       this.formData = data || {};
    //     }
    //   }).catch(err => {console.log(err)})
    // },
    // 改变表单
    changeFn({data,code}) {
      this.userData[code] = data;
    },

    clickBuoy(val) {
      let url = 'userInfo'
      switch (val) {
        case 1:
          url = 'userInfo'
          break;
        case 2 :
          url = 'userComplete'
          break;
        default:
          break;
      }
      uni.navigateTo({
        url: joinUrl(`/pages/${url}/index`, { type:'edit' })
      })
    },

    editClick(item) {
      const { id } = item
      console.log('---item: ', item, id)
    },
    saveItemData(item) {
      const { text } = item
      console.log('------回车保存', text)
    },
    sexChange(val, item) {
      const { detail: { value } } = val
      item.text = value
    },
    bindDateChange(val, item) {
      const { detail: { value } } = val
      item.text = value
    }
  }
}
</script>
<style scoped lang="scss">
.person_info_page {
  padding: 20rpx 30rpx;
  background-color: #F1F3F5;

  .person_info_wrap {
    border-radius: 32rpx;
    padding: 0 30rpx 20rpx;
    background-color: #fff;
    margin-bottom: 36rpx;
  
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 96rpx;

      &.user_img_bar {
        height: 110rpx;

        .user_img {
          width: 80rpx;
          height: 80rpx;
          border-radius: 100%;
        }
      }
      
      &._F {
        border-top: 2rpx solid rgba(0, 0, 0, .1);
      }

      .label {
        font-size: 32rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000000;
        line-height: 44rpx;
      }
    
      .item_content {
        color: #888;

        input {
          text-align: right;
        }

        .text {
          display: inline-block;
          min-width: 60rpx;
        }
      }
    }
  }

  .person_card {

    .title {
      height: 44rpx;
      font-size: 32rpx;
      font-family: Helvetica;
      color: #000000;
      line-height: 44rpx;
      margin-bottom: 16rpx;
    }
    
    .card_content {
      background-color: #fff;
      border-radius: 16rpx;
      overflow: hidden;

      .w_target {
        border: 1px solid red;
      }

      .msg_item_wrap {
        background-color: #fff;
      }


      .module_content {
        margin-right: 30rpx;
      }
    }
  }
}
</style>
