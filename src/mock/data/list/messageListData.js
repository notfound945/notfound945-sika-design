import { date } from 'quasar'
import commonUtil from 'src/utils/commonUtil'
import dateUtil from 'src/utils/dateUtil'

const isDone = [0, 1]
const stateValue = ['这条规则不错', '等待确认', '运行完美']
const queryCondition = {
  title: null,
  nickname: null,
  postDepartment: null,
  isDone: null
}
const tableListDatas = {
  columns: [{
    check: true,
    name: 'title',
    required: true,
    label: '标题',
    align: 'left',
    field: 'title',
    format: (val) => `${val}`
  }, {
    check: true,
    name: 'nickname',
    align: 'left',
    label: '昵称',
    field: 'nickname'
  }, {
    check: true,
    name: 'postDate',
    align: 'left',
    label: '提交日期',
    field: 'postDate'
  }, {
    check: true,
    name: 'postTime',
    align: 'left',
    label: '提交时间',
    field: 'postTime'
  }, {
    check: true,
    name: 'isDone',
    align: 'left',
    label: '处理结果',
    field: 'isDone'
  }],
  datas: []
}
for (let i = 0; i < 25; ++i) {
  tableListDatas.datas.push({
    id: i,
    title: '克' + i,
    nickname: 'jock',
    postDate: date.formatDate(dateUtil.buildRandomDate(2021), 'YYYY/MM/DD'),
    postTime: date.formatDate(dateUtil.buildRandomDate(2021), 'HH:mm'),
    isDone: commonUtil.getRandomData(isDone)
  })
}
export default {
  queryCondition,
  stateValue,
  tableListDatas
}
