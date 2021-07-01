import { JSEncrypt } from 'wxmp-rsa'

// 定义待加密的字符串
const str = '{"name":"neo"}'
// 定义公钥--测试
const publicKey = `   
  -----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCbODez8JyyxDlyleC1N+dFLb75svefv28yO73J4C1Qq0aTtSosQN5jU+K5K94X9dfz3l0fXPQxTwysYZZt5wB+BRRGr8thr6gC65Z/G9nMBzqbe4LrYzKtUn7w03Lyk4fxBLfrzJ/daFUI2IJw2PJHJENT6QpKK1t5RkepYLhsSwIDAQAB
  -----END PUBLIC KEY-----
`
// 定义公钥-- 生产
// const publicKey = `   
//   -----BEGIN PUBLIC KEY-----

//   -----END PUBLIC KEY-----
// `


// 定义私钥
// const privateKey = `
//   -----BEGIN RSA PRIVATE KEY-----
          
//   -----END RSA PRIVATE KEY-----
// `

const myEncrypt = new JSEncrypt()
myEncrypt.setPublicKey(publicKey)
// myEncrypt.setPrivateKey(privateKey)

export default myEncrypt;
