<template>
  <PageJS :styles="{ background: '#F1F3F5' }">
    <div class="person_info_page">
      <div class="person_info_wrap">
        <div class="user_img_bar item">
          <div class="label">头像</div>
          <img class="user_img" :src="headImg" alt="" />
        </div>
        <template v-if="showInfoForm">
          <FormItemBox
            :ite="ite"
            :formData="userDataNewFn"
            :show-b="ind + 1 === formHeads.length"
            v-for="(ite, ind) in formHeads"
            :key="ind"
          >
            <FormItem :headInit="ite" :formData="userDataNewFn" @change="changeFn" />
          </FormItemBox>
        </template>
        <template v-else>
          <FormItemBox
            :ite="ite"
            :formData="userDataNewFn"
            :show-b="ind + 1 === formHeads2.length"
            v-for="(ite, ind) in formHeads2"
            :key="ind"
          >
            <FormItem :headInit="ite" :formData="userDataNewFn" @change="changeFn" />
          </FormItemBox>
        </template>
      </div>
      <div class="person_card">
        <div class="title">我的名片卡</div>
        <div class="card_content">
          <GroupItem @clickBuoy="clickBuoy" :infoData="newFormData"></GroupItem>
        </div>
      </div>
      <div class="unLogin" @click="toLogin"> 退出登录 </div>
    </div>
    <TipPopup title="操作提示" ref="noLogin" msg="是否登录后执行操作？" @confirm="toLogin" />
    <FabGroup />
  </PageJS>
</template>
<script>
  import PageJS from '../../components/pageSjNew.vue'
  import FormItem from '@/components/forms/formItem'
  import FormItemBox from '@/components/forms/formItemBox'
  import { userCardInfo, subjectList } from '@/common/api'
  import { sexs } from '@/common/enum'
  import { joinUrl, getCurPage } from '@/common/utils'
  import GroupItem from './groupItem'
  import { imgUrl } from '@/common/http'
  import { isLogin, toLogin } from '@/common/utils'
  import TipPopup from '@/components/cards/tipPopup'
  import unitMixin from '@/common/mixins/unitMixin'

  import FabGroup from '@/components/fabGroup'
  export default {
    name: 'personalInfo',
    components: { PageJS, FabGroup, FormItem, FormItemBox, GroupItem, TipPopup },
    mixins: [unitMixin],
    data() {
      return {
        formHeads: [
          {
            label: '昵称',
            code: 'nikeName',
            id: '',
            disabled: true,
            required: false,
            params: { ph: '微信用户', genre: 'text', type: 'text', max: 20 },
          },
          {
            label: '微信号',
            code: 'wxNum',
            id: '',
            disabled: true,
            required: false,
            params: { ph: '无', genre: 'input', type: 'text', max: 20 },
          },
          // { label: '生日',   code: 'birthday', id: '', required: false, params: { ph: '请填写生日',  genre:'date', type: 'text', max: 20 } },
          {
            label: '年级',
            code: 'grade',
            id: '',
            disabled: true,
            required: false,
            params: { ph: '', genre: 'input', type: 'text', max: 20 },
          },
          {
            label: '性别',
            code: 'sex',
            id: '',
            disabled: true,
            required: false,
            params: { ph: '请选择', genre: 'select', list: sexs },
          },
          {
            label: '邮箱',
            code: 'email',
            id: '',
            disabled: true,
            required: false,
            params: { ph: '暂无邮箱', genre: 'input', type: 'email', max: 20 },
          },
        ],
        formHeads2: [
          {
            label: '昵称',
            code: 'nikeName',
            id: '',
            disabled: true,
            required: false,
            params: { ph: '微信用户', genre: 'input', type: 'text', max: 20 },
          },
          {
            label: '微信号',
            code: 'wxNum',
            id: '',
            disabled: true,
            required: false,
            params: { ph: '无', genre: 'input', type: 'text', max: 20 },
          },
          // { label: '生日',   code: 'birthday', id: '', required: false, params: { ph: '请填写生日',  genre:'date', type: 'text', max: 20 } },
          {
            label: '年级',
            code: 'grade',
            id: '',
            disabled: true,
            required: false,
            params: { ph: '无', genre: 'input', type: 'text', max: 20 },
          },
          {
            label: '性别',
            code: 'sex',
            id: '',
            disabled: true,
            required: false,
            params: { ph: '无', genre: 'input', list: sexs },
          },
          {
            label: '邮箱',
            code: 'email',
            id: '',
            disabled: true,
            required: false,
            params: { ph: '无', genre: 'input', type: 'email', max: 20 },
          },
        ],

        formData: {},
        // headImg: '',
        userHead: '',
        systemList: [],
        showInfoForm: false,
        // userDataNewFn: {}// mixin中
      }
    },
    mounted() {
      this.getUserInfo()
      this.getDownList()
    },
    onShow() {
      const url = uni.getStorageSync('toUserInfoUrl')
      this.showInfoForm = isLogin() && !url
    },
    computed: {
      newFormData() {
        const { formData, systemList, userDataNewFn } = this
        const obj = { ...userDataNewFn }
        if (systemList.length) {
          const item = systemList.find((ite) => ite.id == obj.curriculumSystem) || {}
          obj.curriculumSystem = item.subjectName || obj.curriculumSystem
        }
        return obj
      },
      headImg() {
        const { avatar } = this.userDataNewFn
        let url =
          this.userHead ||
          'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'
        if (/(http|https)/.test(avatar)) {
          url = avatar
        } else if (avatar && avatar !== 'default_img.png') {
          url = imgUrl + avatar
        }
        return url
      },
      userDataNewFn() {
        const { userInfo } = this.$store.state
        return userInfo
      },
    },
    methods: {
      toLogin,
      // 获取科目/课程体系  list
      getDownList() {
        //  type: 1 科目   /  2 课程体系
        subjectList({ type: 2 })
          .then((res) => {
            const { data: nData } = res[1]
            const { code, data } = nData
            if (code === 200) {
              this.systemList = data || []
            }
          })
          .catch((err) => {
            console.log(err)
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
      changeFn({ data, code }) {
        // this.userDataNewFn[code] = data;
      },

      clickBuoy(val) {
        if (!isLogin()) {
          this.$refs.noLogin.show()
          return
        }
        let url = 'userInfo'
        switch (val) {
          case 1:
            url = 'userInfo'
            break
          case 2:
            url = 'userComplete'
            break
          default:
            break
        }
        uni.navigateTo({
          url: joinUrl(`/pages/${url}/index`, { type: 'edit' }),
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
        const {
          detail: { value },
        } = val
        item.text = value
      },
      bindDateChange(val, item) {
        const {
          detail: { value },
        } = val
        item.text = value
      },
    },
  }
</script>
<style scoped lang="scss">
  .person_info_page {
    padding: 20rpx 30rpx;
    background-color: #f1f3f5;

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
          border-top: 2rpx solid rgba(0, 0, 0, 0.1);
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
    .unLogin {
      @include fontMixin;
      width: 100%;
      padding: 20rpx;
      background: red;
      text-align: center;
      margin-top: 20rpx;
      border-radius: 10rpx;
      color: #fff;
    }
  }
</style>
