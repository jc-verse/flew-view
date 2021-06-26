import { JSEncrypt } from 'wxmp-rsa'

// 定义待加密的字符串
const str = '{"name":"neo"}'
// 定义公钥
const publicKey = `
  -----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCqK4CiUemgOvMwweit4V4BxwCLZBsdbjvqZosUivaQvSw84YFzyHOHdbnsPtpz7ZHsQPjlGg+Bq9sS1KGQdgt39EqORJZqum59rmVHGHNLOIDjURykkHNbCKfGe3Qy9VDD+t9RIwhLu2qokE6FHACsv/9Ts8AlvjkoIWxOdV8o5wIDAQAB
  -----END PUBLIC KEY-----
`
// 定义私钥
const privateKey = `
  -----BEGIN RSA PRIVATE KEY-----
  MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAKorgKJR6aA68zDB6K3hXgHHAItkGx1uO+pmixSK9pC9LDzhgXPIc4d1uew+2nPtkexA+OUaD4Gr2xLUoZB2C3f0So5Elmq6bn2uZUcYc0s4gONRHKSQc1sIp8Z7dDL1UMP631EjCEu7aqiQToUcAKy//1OzwCW+OSghbE51XyjnAgMBAAECgYA/L94Y58+XVqxcq3QJtMhiYpF6MNa8q+UFmcQFAcCiaAwYIygdZQ44+2bpKUGWkF2B23JQJ8ggPz8ek+PWL278JId8S1w242x9Dw+reqwXsdz/uatAs3oCK50yCuIWkz0vL6NEBwHG74kWfs6M/yGj5aJ61POvTalqMuJ+847COQJBAOvuGC8Ph/iEjtE8cOzT6ujIcQmNsPbohC/32xiYf8lfDkX86SZy3GokUvWtHkB1YFZ+tdWBCy8pHRINkJyRT1UCQQC4pVV+yyASIlBzV+rsI9ElxUjwqjRc2JLvNM8+qyrHVcfKwsmAqYc/Li44CcVkYR0aAAclYvvz+MkLgzR9Kz9LAkEAo8MGglPze2r3fwDHGXwXSDEpVQpG1XublXgjWjUwLeSPEcF1TDzaBcrk0qaxouhWUHNvX51M2BVfmlJUGHk8aQJAAyTtm8chuK1U6WHp4jOJ8Da300FSuvIFLoWbsdmAVPyk9lLy03oPj4fdyZ6A+gCdWj/93ykcWT83TTbiwe7mmQJBAKwN8AdxHkGX7+JBkszqg9QN4rol/XtmxDa120LLQtoWAOJok9UpJLsItFZqCA/IoH7cV0eyG/VeaDXontlOY24=
  -----END RSA PRIVATE KEY-----
`

const myEncrypt = new JSEncrypt()
myEncrypt.setPublicKey(publicKey)
myEncrypt.setPrivateKey(privateKey)

export default myEncrypt;
