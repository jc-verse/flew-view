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

// 将比赛信息重组
export const bsToStrFn = (arr = []) => {
  const list = arr || []
  return list.map(item => {
    const { createTime, name } = item;
    const year = createTime.split('-')[0]
    return `${year} ${name}`
  });
}