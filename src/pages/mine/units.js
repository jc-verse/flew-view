

const colors = {
  '1': 'rgba(255, 247, 232, 0.8)',
  '2': 'rgba(211, 247, 244, 0.33)',
  '3': 'rgba(235, 245, 255, 0.8)',
}
// 状态筛选
export const statusScreen = (infoData, userId) => {
  const { type, matchName, nikeName, slaves, id, matchType, academicEvaluate  } = infoData;
  console.log('我是用户id：'+userId, '我是申请人Id：'+ slaves.id,'我是被申请人id:'+ id, '我是不是队长：'+ userId == id?'是' : '不是')
  console.log('【119】是卡片的全部数据')
  console.log(119, infoData)
  const statuInfo = {
    title: '',
    tip: '',
    btnCode: '',  
    bgColor: colors[type] || 'rgba(211,247,244,1)',
    showInfo: [],// 8  联系客服 ; 9 评价 
    showSlaveList: false,
    cardInfo: infoData
  };
  

  if (type == 1) {
    if (userId == id) { //被申请人
      statuInfo.title = `竞赛组队：${slaves.nikeName}向我发起${matchName}的竞赛组队`
      statuInfo.cardInfo = slaves
      switch (matchType) {
        case 3:
          statuInfo.tip = `你拒绝了${slaves.nikeName}的申请`
          break;
        case 4:
          statuInfo.tip = `${slaves.nikeName}的申请已取消`
          break;
        case 5:
          statuInfo.title = `竞赛组队：${matchName}`
          statuInfo.tip = `队伍已经完成组队`;
          statuInfo.showSlaveList = true;
          statuInfo.cardInfo = infoData
          break;
        case 6:
          statuInfo.tip = `${slaves.nikeName}已退出组队`
          break;
        default:
          break;
      }
    } else {
      statuInfo.title = `竞赛组队：向${nikeName}发起${matchName}的竞赛组队`;
      switch (matchType) {
        case 3:
          statuInfo.tip = `你的申请已被${nikeName}拒绝`
          break;
        case 4:
          statuInfo.tip = `你的申请已取消`
          break;
        case 5:
          statuInfo.title = `竞赛组队：${matchName}`;
          statuInfo.tip = `队伍已经完成组队`;
          statuInfo.showSlaveList = true;
          statuInfo.cardInfo = infoData
          break;
        case 6:
          statuInfo.tip = `你已退出组队`;
          break;
        default:
          break;
      }
    }
  } else if (type == 2) {
    if (userId == id) { //被申请人
      statuInfo.title = `学术帮助：${slaves.nikeName}向我提交学术帮助申请`;
      statuInfo.cardInfo = slaves
      switch (matchType) {
        case 3:
          statuInfo.tip = `你拒绝了${slaves.nikeName}的学术帮助申请`
          break;
        case 5:
          console.log(1212666)
          statuInfo.tip = `已经完成${slaves.nikeName}的学术帮助`;
          break;
        default:
          break;
      }
    } else {
      statuInfo.title = `学术帮助：向${nikeName}发起学术帮助申请`
      switch (matchType) {
        case 3:
          statuInfo.tip = `你的申请已被${nikeName}拒绝`
          break;
        case 5:
          console.log(12123)
          statuInfo.tip = `您的申请已经完成`;
          if (academicEvaluate == 2) {
            statuInfo.showInfo = [9];
          }
          break;
        default:
          break;
      }
    }
  } else if (type == 3) {
    if (userId == id) { //被申请人
      statuInfo.title = `学校咨询：${slaves.nikeName}向我提交学校咨询申请`
      statuInfo.cardInfo = slaves
      switch (matchType) {
        case 3:
          statuInfo.tip = `你拒绝了${slaves.nikeName}的学校咨询申请`
          break;
        case 5:
          statuInfo.tip = `已经完成${slaves.nikeName}的学校咨询`;
          break;
        default:
          break;
      }
    } else {
      statuInfo.title = `学校咨询：向${nikeName}发起学校咨询申请`
      switch (matchType) {
        case 3:
          statuInfo.tip = `你的申请已被${nikeName}拒绝`
          break;
        case 5:
          statuInfo.tip = `您的申请已经完成`;
          // if (academicEvaluate == 2) {
          //   statuInfo.showInfo = [9];
          // }
          break;
        default:
          break;
      }
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
    { title: '专业', val: data.professionalDirection || '', id: 4 }, 
    { title: '成绩', val: data.schoolRecord || '',         id: 3 }, 
    { title: '评价', val: data.star  || 0,           id: 5 , code: 'rate', readonly:true}, 
  ]
  return arr;
}