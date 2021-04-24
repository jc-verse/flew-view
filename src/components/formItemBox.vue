<template>
<div  :class="[ 'formItemBox', showB?'no_border':'']">
  <div class="left" :class="[ite.required?'required': '']">{{ ite.label }}</div>
  <div class="right">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name:'formItemBox',
  props: {
    ite:{
      type:Object,
      default: ()=>({})
    },
    showB: Boolean
  },
  computed:{
  },
  data () {
    return {
      formData: {
        info: '0',
        name: '小明'
      }
    }
  },
  mounted() {
    console.log(111,this.ite)
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.formItemBox{
  @include flex_(space-between);
  border-bottom: 2rpx solid rgba(0,0,0,.05);
  padding: 20rpx 0;
  position: relative;
  .required::before{
    content: '*';
    position: absolute;
    left: -20rpx;
    top: 50%;
    transform: translateY(-50%);
    color: red;
  }
  .left{
    max-width: 30%;
  }
  .right{
    max-width: 70%;
    flex-grow: 1;
    .input{
      text-align: end;
    }
  }
}

.no_border{
  border: none;
}
</style>