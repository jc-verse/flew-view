const arr = [
  { label: '男', id: 1 },
  { label: '女', id: 2 },
  { label: '不公开', id: 3 },
]

export const formHeads = [
  { label: '昵称',   code:'nikeName',  id: '' ,required: false, params: { ph: '获取微信名',    genre:'text', type: 'text', max: 20} },
  { label: '微信号', code:'wxCode',    id: '' ,required: false,  params: { ph: '请填写微信号',  genre:'input', type: 'text', max: 20 }},
  { label: '姓名',   code:'name',      id: '' ,required: true,  params: { ph: '请填写真实姓名',genre:'input', type: 'text', max: 20 } },
  { label: '手机',   code:'phone',     id: '' ,required: true,  params: { ph: '请填写电话',    genre:'input', type: 'number', max: 11 } },
  { label: '学校',   code:'schoolName',id: '' ,required: true,  params: { ph: '请填写学校',    genre:'combox', type: 'text', max: 20 ,candidates:['1','12','13','8',15,16,17]} },
  { label: '年级',   code:'grade',     id: '' ,required: true,  params: { ph: '请填写年级',    genre:'input', type: 'text', max: 20 } },
  { label: '性别',   code:'sex',       id: '' ,required: true,  params: { ph: '请选择性别',    genre:'select', list: arr } },
  { label: '邮箱',   code:'email',     id: '' ,required: false,  params: { ph: '请填写邮箱',    genre:'input', type: 'email' , max: 20} },
]

export const centerHeads =  { 
  label: '校内成绩', code:'schoolRecord', id: '' ,required: true,  params: { ph: '例：45/45 ，4/4，A*A*A*A*',  genre:'input', type: 'text', max: 20 }
};

export const bottomHeads =[
  { label: '比赛经历',      code:'competitionExperience', id: '' ,required: false,  params: { ph: '亮出你比赛经历吧',  genre:'custom', type: 'text', max: 20 }},
  { label: '希望参加的比赛', code:'match', id: '' ,required: true,  params: { ph: '请选择您希望参加的比赛',  genre:'custom', type: 'text', max: 20, mode : 'multiSelector' }},
]
export const tableHead = [
  { label: '学科', code: 'subject', id: '', onlyCode: '',disabled: false, type:'input' ,pro : '2.7',ph: '例：西语LLHL'},
  { label: '分数', code: 'fraction', id: '', onlyCode: '',disabled: false, type:'input' ,pro :'1.8'},
  { label: '咨询', code: 'isConsultingService', id: '', onlyCode: '',disabled: false, type:'checkbox' ,pro : '1'},
  { label: '帮助', code: 'isHelp', id: '', onlyCode: '',disabled: false, type:'checkbox' ,pro : '1'},
]

export const tableHead2 = [
  { label: '科目', code: 'subject', id: '', onlyCode: '',disabled: false, type:'select' ,pro : '2.7', list:[]},
  { label: '分数', code: 'fraction', id: '', onlyCode: '',disabled: false, type:'input' ,pro :'1.8'},
  { label: '咨询', code: 'isConsultingService', id: '', onlyCode: '',disabled: false, type:'checkbox' ,pro : '1'},
  { label: '帮助', code: 'isHelp', id: '', onlyCode: '',disabled: false, type:'checkbox' ,pro : '1'},
  { label: '认证', code: 'img', id: '', onlyCode: '',disabled: false, type:'upload' ,pro : '1'},
]
export const lastHeads = [
  { label: '专业方向', code:'name1', id: '' ,required: false, params: { ph: '请填写',  genre:'input', type: 'text', max: 20 } },
  { label: '个人留言', code:'name2', id: '' ,required: false, params: { ph: '请填写',  genre:'input', type: 'text', max: 20 } },
  { label: '录取大学', code:'name3', id: '' ,required: false, params: { ph: '确认录取后请填写',  genre:'input', type: 'text', max: 20 } },
]

export const formData = {
  "admission": "", //录取大学
  "wxCode": "", //微信号
  "curriculumSystemAuthUrl": "",
  "curriculumSystemType": '', // 课程体系类型
  "email": "", //邮箱
  "grade": '', // 年级 ,
  "name": "", // 姓名
  "nikeName": "", //昵称
  "personalMessage": "", //个人留言 
  "phone": "", //手机号
  "professionalDirection": "", // 专业方向
  "schoolName": "", // 学校名
  "schoolRecord": "", //校内成绩
  "sex": 3, // 性别 1.男 2.女 3.不公开 
  "competitionExperience": [ //比赛经历
  ],
  "curriculumSystem": [ //课程体系
    {
      "fraction": '', // 分数
      "isConsultingService": 2, // 是否咨询 1.是 2.否
      "isHelp": 2, // 是否帮助 1.是 2.否
      "subject": "" // 学科
    }
  ],
  "match": [ //希望参加的比赛
    {
      "organizeTypeId": '', //  一级
      "organizeTypeSon": '', // 二级
      "organizeTypeSonMatchId": '' //  三级
    }
  ],     
  "standardizedPerformance": [ // 标化成绩
    {
      "fraction": '',  //分数
      "img": "", //  认证
      "isConsultingService": 2, //是否咨询 1.是 2.否
      "isHelp": 2, //  是否帮助 1.是 2.否 ,
      "subject": "" // 科目id
    }
  ]
}



export const  deepChange = (data) => {
  return  data.map(item => {
    const obj = {}
    for (const key in item) {
      if (Array.isArray(item[key])) {
        obj['children'] = deepChange(item[key]);
        // obj[key] = item[key]
      } else{
        obj[key] = item[key]
        if (/(name|sonName|matchName)/.test(key)) {
          obj['label'] = item[key]
        }
      }
    }
    return obj;
  })
}