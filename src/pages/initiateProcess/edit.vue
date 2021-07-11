<template>
  <page-sj :styles="{ background: '#F1F3F5' }">
    <div class="initiateProcess">
      <div class="content">
        <form-item-box
          v-for="(ite, ind) in formHeads"
          :key="ind"
          :ite="ite"
          :show-b="ind + 1 === formHeads.length"
        >
          <template v-if="ite.params.genre !== 'textarea'">
            <form-item
              :info="ite"
              :headInit="ite"
              :formData="formData"
              @change="changeFn"
            ></form-item>
          </template>
          <template v-else>
            <template>
              <div class="num_box">
                {{ `${formData[ite.code].length || 0}/${ite.params.max}` }}
              </div>
            </template>
            <!-- @input='changeTextarea($event,ite)'  -->
            <template slot="diy">
              <textarea
                v-model="formData[ite.code]"
                class="textarea_box"
                :placeholder="ite.params.ph"
                :maxlength="ite.params.max"
              />
            </template>
          </template>
        </form-item-box>
      </div>
      <div class="btn" v-if="errList.length" @click="submit"> 确定 </div>
      <div class="btn btn_active" v-else @click="submit"> 确定 </div>
    </div>
  </page-sj>
</template>

<script>
  import pageSj from '@/components/pageSjNew'

  import formItem from '@/components/forms/formItem'
  import formItemBox from '@/components/forms/formItemBox'
  import { activityList, updateActivity } from '@/common/api'
  import { getCurPage } from '@/common/utils'

  export default {
    name: 'initiateProcess',
    components: { pageSj, formItem, formItemBox },
    data() {
      return {
        value: '',
        formHeads: [
          {
            label: '活动名称',
            code: 'activityName',
            id: '',
            required: true,
            params: { ph: '请填写', genre: 'input', type: 'text', max: 30 },
          },
          {
            label: '地点',
            code: 'address',
            id: '',
            required: true,
            params: { ph: '请填写', genre: 'input', type: 'text', max: 20 },
          },
          {
            label: '活动简介',
            code: 'activityInfo',
            id: '',
            required: true,
            params: { ph: '请填写活动简介', genre: 'textarea', type: 'text', max: 100 },
          },
          {
            label: '招募要求',
            code: 'requirement',
            id: '',
            required: false,
            params: { ph: '请填写招募要求', genre: 'textarea', type: 'text', max: 100 },
          },
          {
            label: '联系方式',
            code: 'phone',
            id: '',
            required: true,
            params: { ph: '请填写手机号码', genre: 'input', type: 'text', max: 11 },
          },
          {
            label: '备注',
            code: 'remarks',
            id: '',
            required: false,
            params: { ph: '请填写', genre: 'input', type: 'text', max: 20 },
          },
        ],
        canClick: true,
        formData: {
          address: '',
          activityId: '',
          activityInfo: '',
          activityName: '',
          remarks: '',
          requirement: '',
          phone: '',
        },
      }
    },
    onShow() {
      const { activityId } = getCurPage()
      this.getInfo(activityId)
    },
    computed: {
      showBtn() {
        const arr =
          this.formHeads.find((item) => {
            return !this.formData[item.code]
          }) || []
        return arr.length === 0
      },
      errList() {
        const { formData, formHeads } = this
        const errArr = []
        const ite = formHeads.find((item) => item.required && !formData[item.code]) || {}
        if (Object.keys(ite).length) {
          if (ite.params.genre === 'input' || ite.params.genre === 'textarea') {
            errArr.push(`${ite.label}不能为空！`)
          }
        }
        if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(formData.phone)) {
          errArr.push(`手机号格式不正确`)
        }
        return errArr
      },
    },
    methods: {
      submit() {
        const { errList, formData } = this
        if (errList.length) {
          uni.showToast({ title: errList[0], icon: 'none' })
          return
        }
        this.canClick = false
        this.updateActivity()
      },
      updateActivity() {
        const { formData } = this
        const params = { ...formData, info: formData.activityInfo }
        const _this = this
        updateActivity(params)
          .then((res) => {
            const { data: nData } = res[1]
            const { data, code, msg } = nData
            if (code === 200) {
              uni.showToast({
                title: msg || '',
                success: (res) => {
                  setTimeout(function () {
                    uni.navigateBack({
                      delta: 1,
                      success: () => {
                        _this.canClick = true
                      },
                    })
                  }, 1000)
                },
              })
            } else {
              uni.showToast({
                title: msg,
                icon: 'none',
                success: () => {
                  _this.canClick = true
                },
              })
            }
          })
          .catch((err) => {
            console.log(err)
            this.canClick = true
          })
      },
      // 改变表单
      changeFn({ data, code, type }) {
        this.formData[code] = data
      },
      // 获取详情
      getInfo(activityId) {
        const params = {
          activityId,
          current: 1,
          size: 10,
        }
        activityList(params).then((res) => {
          const { data: nData } = res[1]
          const { data, code } = nData
          if (code === 200) {
            const { records } = data
            const info = records[0] || {}
            const { formHeads } = this
            const infoObj = {}
            for (let i in formHeads) {
              infoObj[formHeads[i].code] = info[formHeads[i].code] || ''
            }
            infoObj.activityId = info.activityId
            this.formData = infoObj
          }
        })
      },
      // changeTextarea(e, item) {
      //   const { value, cursor } = e.detail;
      //   const { code } = item;
      //   this.formData[code] = value
      // }
    },
  }
</script>
<style lang="scss" scoped>
  .initiateProcess {
    background: #f1f3f5;
    width: 100%;
    height: 100%;
    padding: 20rpx 30rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    .content {
      width: 100%;
      background: #ffffff;
      border-radius: 16px;
      padding: 30rpx;
      box-sizing: border-box;
      > .item_box:last-child {
        border: none;
      }
      .item_box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2rpx solid rgba(0, 0, 0, 0.05);
        padding: 20rpx 0;
        .right {
          // width: 200rpx;
          .input {
            text-align: end;
          }
        }
        /deep/ .placeH {
          display: flex;
          justify-content: flex-end;
        }
      }
    }
    .btn {
      width: 100%;
      margin: 20rpx 0;
      @include fontMixin(32rpx, #ffffff, bold);
      background: #c5c5c5;
      text-align: center;
      padding: 20rpx 0;
      border-radius: 40rpx;
    }
    .btn_active {
      background: #676fdf;
    }
  }
  .textarea_box {
    border: 2rpx solid rgb(119, 119, 119);
    padding: 20rpx 20rpx 20rpx 20rpx;
    font-size: 28rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
    line-height: 40rpx;
    height: 200rpx;
    width: 95%;
  }
  .num_box {
    text-align: right;
    font-size: 12px;
    color: #7e7e7e;
  }
</style>
