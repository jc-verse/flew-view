import JSEncrypt from './jsencrypt.js' //引入模块
import config from '@/config/index'

const secretKey = config.secretKey //公钥

const jse = new JSEncrypt() //New JES对象

jse.setPublicKey(secretKey)

export const jseFnEncrypt = (obj) => {
  //加密
  let objJson = JSON.stringify(obj)
  return {
    //输出加密
    json: jse.encryptLong(objJson),
  }
}
