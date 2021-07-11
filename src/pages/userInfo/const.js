import { sexs } from "@/common/enum";

export const formHeads = [
  {
    label: "头像",
    code: "avatar",
    id: "",
    required: false,
    params: { ph: "请填写真实姓名", genre: "upload", type: "text", max: 20 },
  },
  {
    label: "昵称",
    code: "nikeName",
    id: "",
    required: false,
    params: { ph: "获取微信名", genre: "input", type: "text", max: 6 },
  },
  {
    label: "微信号",
    code: "wxCode",
    id: "",
    required: false,
    params: { ph: "请填写微信号", genre: "input", type: "text", max: 20 },
  },
  {
    label: "姓名",
    code: "name",
    id: "",
    required: true,
    params: { ph: "请填写真实姓名", genre: "input", type: "text", max: 20 },
  },
  {
    label: "手机",
    code: "phone",
    id: "",
    required: true,
    params: { ph: "请填写电话", genre: "input", type: "number", max: 11 },
  },
  {
    label: "学校",
    code: "schoolName",
    id: "",
    required: true,
    params: {
      ph: "请填写学校",
      genre: "inputSelect",
      type: "text",
      max: 20,
      candidates: [],
      tipMsg: "若列表中缺少校名，选择缺省选项后，联系客服添加",
    },
  },
  {
    label: "年级",
    code: "grade",
    id: "",
    required: true,
    params: { ph: "请填写年级", genre: "select", list: [] },
  },
  {
    label: "性别",
    code: "sex",
    id: "",
    required: true,
    params: { ph: "请选择性别", genre: "select", list: sexs },
  },
  {
    label: "邮箱",
    code: "email",
    id: "",
    required: false,
    params: { ph: "请填写邮箱", genre: "input", type: "email", max: 35 },
  },
  // { label: '学术帮助',   code:'isAcademic',     id: '' ,required: false,  params: { ph: '',    genre:'checkbox', type: '' , max: 20} },
  // { label: '学校咨询',   code:'isConsulting',     id: '' ,required: false,  params: { ph: '',    genre:'checkbox', type: '' , max: 20} },
];

export const centerHeads = {
  label: "校内成绩",
  code: "schoolRecord",
  id: "",
  required: false,
  params: {
    ph: "例：45/45 ，4/4，A*A*A*A*",
    genre: "input",
    type: "text",
    max: 20,
  },
};

export const bottomHeads = [
  {
    label: "比赛经历",
    code: "competitionExperience",
    id: "",
    required: false,
    params: { ph: "亮出你比赛经历吧", genre: "custom", type: "text", max: 30 },
  },
  {
    label: "希望参加的比赛",
    code: "match",
    id: "",
    required: false,
    params: {
      ph: "请选择您希望参加的比赛",
      genre: "custom",
      type: "text",
      max: 20,
      mode: "multiSelector",
    },
  },
];
export const tableHead = [
  {
    label: "学科/级别",
    code: "subject",
    id: "",
    onlyCode: "",
    disabled: false,
    type: "input",
    pro: "2.7",
    ph: "例：英语B/HL",
  },
  {
    label: "分数",
    code: "fraction",
    id: "",
    onlyCode: "",
    disabled: false,
    type: "input",
    pro: "1.8",
  },
  {
    label: "操作",
    code: "edit",
    id: "",
    onlyCode: "",
    disabled: false,
    type: "edit",
    pro: "1",
  },
  // { label: '咨询', code: 'isConsultingService', id: '', onlyCode: '',disabled: false, type:'checkbox' ,pro : '1'},
  // { label: '帮助', code: 'isHelp', id: '', onlyCode: '',disabled: false, type:'checkbox' ,pro : '1'},
];

export const tableHead2 = [
  {
    label: "科目",
    code: "subject",
    id: "",
    onlyCode: "",
    disabled: false,
    type: "select",
    pro: "2.7",
    list: [],
  },
  {
    label: "分数",
    code: "fraction",
    id: "",
    onlyCode: "",
    disabled: false,
    type: "input",
    pro: "1.8",
  },
  {
    label: "操作",
    code: "edit",
    id: "",
    onlyCode: "",
    disabled: false,
    type: "edit",
    pro: "1",
  },
  // { label: '咨询', code: 'isConsultingService', id: '', onlyCode: '',disabled: false, type:'checkbox' ,pro : '1'},
  // { label: '帮助', code: 'isHelp', id: '', onlyCode: '',disabled: false, type:'checkbox' ,pro : '1'},
];

export const formData = {
  avatar: "", // 头像
  admission: "", //录取大学
  wxCode: "", //微信号
  curriculumSystemAuthUrl: "",
  curriculumSystemType: "", // 课程体系类型
  email: "", //邮箱
  grade: "", // 年级 ,
  name: "", // 姓名
  nikeName: "", //昵称
  personalMessage: "", //个人留言
  phone: "", //手机号
  professionalDirection: "", // 专业方向
  schoolName: "", // 学校名
  schoolRecord: "", //校内成绩
  sex: "", // 性别 1.男 2.女 3.不公开
  competitionExperience: [
    //比赛经历
  ],
  curriculumSystem: [
    //课程体系
    {
      fraction: "", // 分数
      // "isConsultingService": 2, // 是否咨询 1.是 2.否
      // "isHelp": 2, // 是否帮助 1.是 2.否
      subject: "", // 学科
    },
  ],
  match: [
    //希望参加的比赛
    // {
    //   "organizeTypeId": '', //  一级
    //   "organizeTypeSon": '', // 二级
    //   "organizeTypeSonMatchId": '' //  三级
    // }
  ],
  standardizedPerformance: [
    // 标化成绩
    {
      fraction: "", //分数
      img: "", //  认证
      // "isConsultingService": 2, //是否咨询 1.是 2.否
      // "isHelp": 2, //  是否帮助 1.是 2.否 ,
      subject: "", // 科目id
    },
  ],
};
