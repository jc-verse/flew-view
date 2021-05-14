

const colors = {
  '1': 'rgba(255, 247, 232, 0.8)',
  '2': 'rgba(211, 247, 244, 0.33)',
  '3': 'rgba(235, 245, 255, 0.8)',
}
// 状态筛选
export const statusScreen = (infoData, userId) => {
  const { type, matchName, nikeName, slaves, id, matchType  } = infoData;
  const statuInfo = {
    title: '',
    tip: '',
    btnCode: '',  // 8  联系客服 ; 9 评价 
    bgColor: colors[type] || 'rgba(211,247,244,1)',
    showInfo: []
  };
  if (userId == id) { // 申请人
    if (type == 1) {
      statuInfo.title = `竞赛组队：向${slaves.nikeName}发起${slaves.matchName}的竞赛组队`
    } else if (type == 2) {
      statuInfo.title = `学术帮助：向${slaves.nikeName}发起学术帮助申请`
    } else if (type == 3) {
      statuInfo.title = `学校咨询：向${slaves.nikeName}发起学校咨询申请`
    }
    switch (matchType) {
      case 1:
        statuInfo.tip = `你的申请待${slaves.nikeName}处理`
        break;
      case 2:
        statuInfo.tip = `你的申请已审批通过`;
        statuInfo.showInfo= [8]
        break;
      case 3:
        statuInfo.tip = `你的申请已被${slaves.nikeName}拒绝`
        break;
      case 4:
        statuInfo.tip = `你的申请已取消`
        break;
      case 5:
        statuInfo.tip = `你的申请已完成`;
        statuInfo.showInfo= [9]
        break;
      case 6:
        statuInfo.tip = `你的已退出组队`;
        break;
      default:
        break;
    }
  } else if (userId == slaves.id) { //队长
    if (type == 1) {
      statuInfo.title = `竞赛组队：${nikeName}向我发起${matchName}的竞赛组队`
    } else if (type == 2) {
      statuInfo.title = `学术帮助：${nikeName}向我提交学术帮助申请`
    } else if (type == 3) {
      statuInfo.title = `学校咨询：${nikeName}向我提交学校咨询申请`
    }
    switch (matchType) {
      case 1:
        statuInfo.tip = `${nikeName}的申请待处理`
        break;
      case 2:
        statuInfo.tip = `你接受了${nikeName}的申请`
        break;
      case 3:
        statuInfo.tip = `你拒绝了${nikeName}的申请`
        break;
      case 4:
        statuInfo.tip = `${nikeName}的申请已取消`
        break;
      case 5:
        statuInfo.tip = `${nikeName}的申请已完成`
        break;
      case 6:
        statuInfo.tip = `${nikeName}已退出组队`
        break;
      default:
        break;
    }
  }
  return statuInfo
}
// 成员拼接
export const  joinName = (slave) => {
  return slave.reduce((i, j)=> {
    return  i ? i +'/'+ j.nikeName : i + j.nikeName
  }, '')
}
// 将比赛信息重组
export const bsToStrFn = (arr = []) => {
  const list = arr || []
  return list.map(item => {
    const { createTime, name } = item;
    const year = createTime.split('-')[0]
    return `${year} ${name}`
  });
}

export const topListFn = (infoData) => {
  const data = infoData || {};
  const arr = [
    { title: '学校', val: data.schoolName || '', id: 1 , width: '50%' ,noShow: false}, 
    { title: '年级', val: data.grade || '',          id: 2, width: '50%' ,noShow: false}, 
    { title: '标化', val: data.standardizedPerformance || '',  id: 3, width: '50%' ,noShow: false}, 
    { title: '课程', val: data.curriculumSystem || '', id: 4 , width: '50%',noShow: false}, 
    { title: '专业方向', val: data.professionalDirection || '', id: 4 }, 
    { title: '校内成绩', val: data.schoolRecord || '',         id: 3 }, 
    { title: '星级评价', val: data.star  || 0,           id: 5 , code: 'rate', readonly:true}, 
  ]
  return arr;
}