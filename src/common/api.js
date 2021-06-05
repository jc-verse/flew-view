import { httpAPI } from './http'

// 登录注册
export const login = (data) => {
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

// 希望参与比赛的用户 - SAGE
export const branchCompetitionUser = (data) => {
  return  httpAPI('/app/team-up/branch-competition-user', { data })
}

// 获取学校列表
export const selectSchoolList = (data) => {
  return  httpAPI('/app/user-info/select-school-list', { data })
}


// 申请组队
export const teamUpranks = (data) => {
  return  httpAPI('/app/team-up/ranks', { data })
}


// 点击已读
export const userInfoClickRead = (data) => {
  return  httpAPI('/app/user-info/click-read', { data })
}

// 我的消息
export const userInfoMyMsgList = (data) => {
  return  httpAPI('/app/user-info/my-msg-list', { data })
}

// 未读数量
export const userInfoReadCount = (data) => {
  return  httpAPI('/app/user-info/read-count', { data })
}

// 被申请
export const userInfoApply = (data) => {
  return  httpAPI('/app/user-info/apply', { data })
}

// 申请中
export const userInfoConduct = (data) => {
  return  httpAPI('/app/user-info/conduct', { data })
}

// 进行中
export const userInfoContinued = (data) => {
  return  httpAPI('/app/user-info/continued', { data })
}


// 申请记录
export const userInfoApplyRecord = (data) => {
  return  httpAPI('/app/user-info/apply-record', { data })
}



// 取消申请
export const userInfoCancelMatch = (data) => {
  return  httpAPI('/app/user-info/cancel-match', { data })
}

// 接收、拒接
export const userInfoPower = (data) => {
  return  httpAPI('/app/user-info/power', { data })
}


// 队长方,完成 与 开启/关闭加入
export const userInfoOperationMatch = (data) => {
  return  httpAPI('/app/user-info/operation-match', { data })
}

// 申请人,退出组队
export const userInfoExitTeam = (data) => {
  return  httpAPI('/app/user-info/exit-team', { data })
}

// 学术帮助-列表
export const academicHelpList = (data) => {
  return  httpAPI('/app/academic/academic-help-list', { data })
}

// 学术帮助-申请服务
export const academicApplyService = (data) => { // {"serviceUserId": 0}
  return  httpAPI('/app/academic/apply-service', { data })
}

// 学术帮助-通过与拒绝
export const academicOperationAcademic = (data) => {
  return  httpAPI('/app/academic/operation-academic', { data })
}
// 学术帮助-评价
export const academicEvaluate = (data) => {
  return  httpAPI('/app/academic/evaluate', { data })
}

// 学术帮助-完成
export const academicAcademicComplete = (data) => {
  return  httpAPI('/app/academic/academic-complete', { data })
}

// 学术帮助-评价显示
export const academicGetEvaluate = (data) => {
  return  httpAPI('/app/academic/get-evaluate', { data })
}

// 学校咨询-列表
export const consultingList = (data) => {
  return  httpAPI('/app/consulting/consulting-list', { data })
}

// 学校咨询-申请服务
export const consultingApplyService = (data) => { // {"serviceUserId": 0}
  return  httpAPI('/app/consulting/apply-service', { data })
}

// 学校咨询-通过与拒绝
export const consultingOperation = (data) => {
  return  httpAPI('/app/consulting/operation-consulting', { data })
}

// 学校咨询-完成
export const consultingComplete = (data) => {
  return  httpAPI('/app/consulting/consulting-complete', { data })
}

// 自主发起-发起活动
export const launchActivity = (data) => {
  return  httpAPI('/app/activity/launch-activity', { data })
}
// 自主发起-活动列表
export const activityList = (data) => {
  return  httpAPI('/app/activity/activity-list', { data })
}

// 年级下拉
export const teamUpGradeList = (data) => {
  return  httpAPI('/app/team-up/grade-list', { data })
}

// 查询课程体系
export const selectCurriculumSystem = (data) => {
  return  httpAPI('/app/academic/select-curriculum-system', { data })
}


// 自主发起-申请加入
export const attendActivity = (data) => {
  return  httpAPI('/app/activity/attend-activity', { data })
}
// 自主发起-通过与拒绝
export const operationActivity = (data) => {
  return  httpAPI('/app/activity/operation-activity', { data })
}

// 自主发起-完成
export const activityComplete = (data) => {
  return  httpAPI('/app/activity/complete', { data })
}
// 自主发起-修改
export const operationActivityEdit = (data) => {
  return  httpAPI('/app/activity/operation-activity', { data })
}