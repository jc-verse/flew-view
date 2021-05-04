import { httpAPI } from './http'

// 登录注册
export const login = (data) => {
  console.log(12313)
  return  httpAPI('/app/auth/login', { data })
}

// 微信接口
export const jscode2session = (data) => {
  return  httpAPI('/app/wx/jscode2session', { data })//header:{'content-type':'multipart/form-data; boundary=XXX'}
}

// 竞赛组队 - 组队分支下的比赛类型
export const teamTypeCompetition = (data) => {
  return  httpAPI('/app/team-up/team-type-branch-competition', { data })
}

// 竞赛组队 - 组队分支
export const teamTypeBranchList = (data) => {
  return  httpAPI('/app/team-up/team-type-branch-list', { data })
}

// 竞赛组队 - 组队类型
export const teamTypeList = (data) => {
  return  httpAPI('/app/team-up/team-type-list', { data })
}

//用户信息 - 科目/课程体系下拉
export const subjectList = (data) => {
  return  httpAPI('/app/user-info/subject-list', { data })
}

//用户信息 - 修改名片卡信息
export const updateCardInfo = (data) => {
  return  httpAPI('/app/user-info/update-business-card-info', { data })
}

//用户信息 - 名片卡信息
export const userCardInfo = (data) => {
  return  httpAPI('/app/user-info/user-business-card-info', { data })
}

//图片上传
export const ossUploadImg = (data) => {
  return  httpAPI('/app/oss/upload', { data })
}

//带下级的组队类型
export const totalTeamTypeList = (data) => {
  return  httpAPI('/app/team-up/total-team-type-list', { data })
}