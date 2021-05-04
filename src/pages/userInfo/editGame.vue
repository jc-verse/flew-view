<template>
  <DiyPopup @popupclosed='popupclosed' popupTitle='经历' :styles='{ top: "auto" }'>
    <slot>
      <div class="custom add"  >
        亮出你比赛经历吧
        <i class="iconfont iconjiahao add_icon"></i>
      </div>
    </slot>

    <div class="center" style="padding:0 40rpx" slot='content'>
      <form-item-box 
        v-for='(ite, indx) in matchlist' :key='indx' 
        :ite ='ite'  :show-b='indx + 1 === matchlist.length'
        :formData='formData'
      >
        <form-item :headInit='ite' :formData='formData' @change="changeFn">
          <template slot='upload'>
            
            <div class="box" v-if="forms.img">
              <img  :src="forms.img" alt="" style='width:100rpx;height:100rpx'>
              <i @click.stop="deleteImg"  class="iconfont iconshanchu icon" style="color:#676FDF;font-size:50rpx"></i>
            </div>
            <i v-else class="iconfont icontupianshangchuan " style="color:#676FDF;font-size:50rpx"></i>
          </template>
        </form-item>
      </form-item-box>
    </div>
  </DiyPopup>
</template>
<script>
import formItem from '@/components/formItem';
import formItemBox from '@/components/formItemBox';
import DiyPopup from '@/components/diyPopup'
export default {
  name: 'editGame',
  props:{
    formData: {
      type: Object,
      default:()=> ({})
    },
    className: {
      type: String,
      default: ''
    }
  },
  components: {
    formItem,
    formItemBox,
    DiyPopup
  },
  data () {
    return {
      matchlist: [
        { label: '比赛名称', code:'name', id: '' ,required: true,  params: { ph: '请填写比赛名称',genre:'input', type: 'text', max: 20 } },
        { label: '比赛时间', code:'time', id: '' ,required: false,  params: { ph: '请填写比赛时间',genre:'input', type: 'text', max: 20 } },
        { label: '获得奖项', code:'wonAwards', id: '' ,required: false,  params: { ph: '请填写获得奖项',genre:'input', type: 'text', max: 20 } },
        { label: '上传认证', code:'authUrl', id: '' ,required: false,  params: { ph: '请填写真实姓名',genre:'upload', type: 'text', max: 20 } },
      ],
      forms: { name: '', time: '', wonAwards: '', authUrl : '' }
    }
  },
  methods:{
    changeFn({data,code}) {
      this.forms[code] = data;
    },
    deleteImg() {
      this.forms.img = ''
    },
    popupclosed(flag) {
      if (flag && !!this.forms.name) {
        const _this = this;
        const createTime = new Date().getTime()
        const { forms, className } = this;
        uni.getStorage({key:'openid',success(res) {
          const { data: uid } = res
          _this.$emit('editGameFn', { 
            data: { ...forms, uid, createTime },
            code: className ,
            type:'add'
            }
          )
        }})
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.box{
  @include flex-center;
  img{
    width: 100rpx;
    height: 100rpx;
    margin-right: 10rpx;
  }
}
</style>

