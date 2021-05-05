<template>
  <div class="upload" @click='add'>
    <slot></slot>
  </div>
</template>

<script>
import { ossUploadImg } from '@/common/api';
export default {
  name: 'upload',
  props: ['statu'], 
  methods: {
    urlTobase64(url){
      wx.getFileSystemManager().readFile({
        filePath: url, //选择图片返回的相对路径
        encoding: 'base64', //编码格式
        success: ress => { //成功的回调
          const  base64 = 'data:image/jpeg;base64,' + ress.data //不加上这串字符，在页面无法显示的哦
          ossUploadImg({base64}).then(res => {
            const { data:nData } = res[1];
            const { data, code } = nData;
            if (code === 200) {
              this.$emit('uploadImg', data, this.statu);
            } else {
              console.log('上传失败', res)
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },

    add () {
      // 选择图片
      uni.chooseImage({
        count: 1,
        success: (res)=> {
          this.urlTobase64(res.tempFilePaths[0])
        },
        fail: (err)=> {
          console.log(1992.2, err)
        }
      })
    }
  }
}
</script>