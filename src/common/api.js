import { http } from './http'

// 登录注册
export const login = (data) => {
  return  http('/app/auth/login', { data })
}

// 微信接口
export const jscode2session = (data) => {
  return  http('/app/wx/jscode2session', { data })
}

// 竞赛组队 - 组队分支下的比赛类型
export const teamTypeCompetition = (data) => {
  return  http('/app/team-up/team-type-branch-competition', { data })
}

// 竞赛组队 - 组队分支
export const teamTypeBranchList = (data) => {
  return  http('/app/team-up/team-type-branch-list', { data })
}

// 竞赛组队 - 组队类型
export const teamTypeList = (data) => {
  return  http('/app/team-up/team-type-list', { data })
}

//用户信息 - 科目/课程体系下拉
export const subjectList = (data) => {
  return  http('/app/user-info/subject-list', { data })
}

//用户信息 - 修改名片卡信息
export const updateCardInfo = (data) => {
  return  http('/app/user-info/update-business-card-info', { data })
}

//用户信息 - 名片卡信息
export const userCardInfo = (data) => {
  return  http('/app/user-info/user-business-card-info', { data })
}