export const bgColors = {
  '1': { lable: '经济与商业' , code: '', color: '#C8EDFF',  url: '', },
  '2': { lable: 'SAGE' , code: '', color: '#C8EDFF',  url: '', },
  '3': { lable: '人文学科' , code: '', color: '#C1E7ED',  url: '' },
  '4': { lable: '混合科学' , code: '', color: '#B7E8DC',  url: '' },
  '5': { lable: '辩论与演讲' , code: '', color: '#C8EDFF',  url: '' },
  '6': { lable: '艺术' , code: '', color: '#C1E7ED',  url: '' },
  '7': { lable: '其他竞赛' , code: '', color: '#DDD6FC',  url: '' },
}

export const demoData = [
  {
    "avatar":"default_img.png",
    "star":3,
    "vipNum":"12659340",
    "realInfo":1,
    "wxNum":"1728374637",
    "nikeName":"微信用户",
    "userName":"finn",
    "sex":1,
    "birthday":null,
    "phone":"14985675868",
    "email":"123@163.com",
    "schoolName":"1",
    "grade":10,
    "curriculumSystem":"SSAT",
    "schoolRecord":"45/45",
    "professionalDirection":"",
    "standardizedPerformance":"10.00",
    "type":1,
    "competitionExperienceList":[
      {"uid":5,
      "name":"撒旦发",
      "time":"",
      "wonAwards":"",
      "authUrl":"",
      "createTime":"2021-05-04 15:51:45"
    }],
    "personalMessage":"",
    "curriculumSystemList":
      [{
        "subject":"西语L",
        "fraction":10,
        "isConsultingService":2,
        "isHelp":2
      }],"standardizedPerformanceList":[
        {
          "subject":"4",
          "fraction":10,
          "isConsultingService":2,
          "isHelp":2,
          "img":null
        }],
        "match":[{
          "organizeTypeId":6,
          "organizeTypeSon":17,
          "organizeTypeSonMatchId":74
        }],
        "admission":"",
        "curriculumSystemAuthUrl":"http://qrw69n75w.hn-bkt.clouddn.com/upload/20210504/ace81727bc90eb04da43976c679e1adb.jpeg","curriculumSystemAuthUrlList":["http://qrw69n75w.hn-bkt.clouddn.com/upload/20210504/ace81727bc90eb04da43976c679e1adb.jpeg"
      ]},
      {
        "avatar":"default_img.png",
        "star":3,
        "vipNum":"12659340",
        "realInfo":1,
        "wxNum":"1728374637",
        "nikeName":"微信用户",
        "userName":"finn",
        "sex":1,
        "birthday":null,
        "phone":"14985675868",
        "email":"123@163.com",
        "schoolName":"1",
        "grade":10,
        "curriculumSystem":"SSAT",
        "schoolRecord":"45/45",
        "professionalDirection":"",
        "standardizedPerformance":"10.00",
        "type":1,
        "competitionExperienceList":[
          {"uid":5,
          "name":"撒旦发",
          "time":"",
          "wonAwards":"",
          "authUrl":"",
          "createTime":"2021-05-04 15:51:45"
        }],
        "personalMessage":"",
        "curriculumSystemList":
          [{
            "subject":"西语L",
            "fraction":10,
            "isConsultingService":2,
            "isHelp":2
          }],"standardizedPerformanceList":[
            {
              "subject":"4",
              "fraction":10,
              "isConsultingService":2,
              "isHelp":2,
              "img":null
            }],
            "match":[{
              "organizeTypeId":6,
              "organizeTypeSon":17,
              "organizeTypeSonMatchId":74
            }],
            "admission":"",
            "curriculumSystemAuthUrl":"http://qrw69n75w.hn-bkt.clouddn.com/upload/20210504/ace81727bc90eb04da43976c679e1adb.jpeg","curriculumSystemAuthUrlList":["http://qrw69n75w.hn-bkt.clouddn.com/upload/20210504/ace81727bc90eb04da43976c679e1adb.jpeg"
          ]}
]

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