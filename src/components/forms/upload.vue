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

		//以下两行注释的是同步方法，不过我不太喜欢用。
       	 //let base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64') 
        //console.log(base64)

      // uni.request({
      //   url: url,
      //   method:'GET',
      //   responseType: 'arraybuffer',
      //   success: ress => {
      //     let base64 = wx.arrayBufferToBase64(ress.data); //把arraybuffer转成base64 
      //     base64 = 'data:image/jpeg;base64,' + base64 //不加上这串字符，在页面无法显示的哦
      //     console.log(1992.3, base64)
      //     ossUploadImg({base64}).then(res => {
      //       const { data:nData } = res[1];
      //       const { data, code } = nData;
      //       if (code === 200) {
      //         this.$emit('uploadImg', data, this.statu)
      //       } else {
      //         console.log('上传失败', res)
      //       }
      //     }).catch(err => {
      //       console.log(err)
      //     })
      //   },
      //   fail:(err)=> {
      //     console.log(1992.4,err)
      //   }
      // })
    },

    add () {
      // 选择图片
      uni.chooseImage({
        count: 1,
        success: (res)=> {
          console.log(1992.1, res)
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