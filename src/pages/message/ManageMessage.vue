<template>
  <div class='sc-design'>
    <div class='bg-white text-h6 q-pa-md'>
      <strong>管理所有留言</strong>
    </div>
    <div class='q-pt-md q-mx-md'>
      <q-card square flat class='q-gutter-y-md q-pb-md'>
        <q-form>
          <div class='row q-gutter-y-sm q-pt-sm'>
            <q-item class='col-xl-3 col-sm-6 col-xs-12'>
              <q-item-section class='col-2 text-right gt-sm'>
                <q-item-label>留言标题:</q-item-label>
              </q-item-section>
              <q-item-section class='col'>
                <q-input
                  outlined
                  v-model='queryCondition.title'
                  label='留言标题'
                  dense
                  square
                  clearable
                >
                </q-input>
              </q-item-section>
            </q-item>
            <q-item v-show='showQuery' class='col-xl-3 col-sm-6 col-xs-12'>
              <q-item-section v-show='$q.screen.gt.sm' class='col-2 text-right'>
                <q-item-label>状态:</q-item-label>
              </q-item-section>
              <q-item-section v-show='showQuery' class='col'>
                <q-select
                  behavior='menu'
                  outlined
                  options-dense
                  v-model='queryCondition.isDone'
                  :options='isDone'
                  label='状态'
                  dense
                  square
                  clearable
                >
                </q-select>
              </q-item-section>
            </q-item>
            <q-item v-show='showQuery' class='col-xl-3 col-sm-6 col-xs-12'>
              <q-item-section v-show='$q.screen.gt.sm' class='col-2 text-right'>
                <q-item-label>留言部门:</q-item-label>
              </q-item-section>
              <q-item-section v-show='showQuery' class='col'>
                <q-select
                  behavior='menu'
                  outlined
                  options-dense
                  v-model='queryCondition.postDepartment'
                  :options='departments'
                  label='部门'
                  dense
                  square
                  clearable
                >
                </q-select>
              </q-item-section>
            </q-item>
            <q-item v-show='showQuery' class='col-xl-3 col-sm-6 col-xs-12'>
              <q-item-section v-show='$q.screen.gt.sm' class='col-2 text-right'>
                <q-item-label>昵称:</q-item-label>
              </q-item-section>
              <q-item-section v-show='showQuery' class='col'>
                <q-input
                  outlined
                  v-model='queryCondition.nickname'
                  label='昵称'
                  dense
                  square
                  clearable
                >
                </q-input>
              </q-item-section>
            </q-item>
            <q-item class='col-xl-3 col-sm-6 col-xs-12 q-pr-sm'>
              <q-item-label class='col-12 text-right'>
                <q-btn
                  outline
                  unelevated
                  label='重置'
                  class='q-mr-sm no-border-radius'
                  color='secondary'
                  @click='resetQuery'
                />
                <q-btn
                  unelevated
                  label='查询'
                  color='primary'
                  class='q-mr-sm no-border-radius'
                  :loading='queryLoad'
                  @click='doQuery'
                >
                  <template v-slot:loading>
                    <q-spinner-ios class='on-center' />
                  </template>
                </q-btn>
                <q-btn-dropdown
                  v-model='showQuery'
                  persistent
                  dense
                  flat
                  color='primary'
                  :label='tableLabel'
                  @before-show='show'
                  @before-hide='hide'
                >
                </q-btn-dropdown>
              </q-item-label>
            </q-item>
          </div>
        </q-form>
        <q-card class='row q-mt-lg'>
          <div class='col'>
            <q-table
              class='my-sticky-header-table'
              square
              flat
              title-class='text-body1'
              color='primary'
              :data='filterListData'
              :columns='listDatas.columns'
              :visible-columns='visibleColumns'
              row-key='id'
              :pagination.sync='pagination'
              hide-selected-banner
              virtual-scroll
              :loading='loading'
              @row-click='getMessageByID'
            >
              <template v-slot:top-right='props'>
                <div>
                  <q-btn rounded flat dense size='md' icon='settings'>
                    <q-menu :offset='[0, 12]'>
                      <q-list dense>
                        <q-item
                          clickable
                          :active='column.check'
                          @click='select(column)'
                          :key='index'
                          v-for='(column, index) in showColumns'
                        >
                          <q-item-section>{{ column.label }}</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                  <q-btn
                    rounded
                    flat
                    round
                    dense
                    :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                    @click='props.toggleFullscreen'
                  >
                    <q-tooltip>全屏</q-tooltip>
                  </q-btn>
                </div>
              </template>
              <template v-slot:pagination='scope'>
                <div class='full-width'>
                  <q-pagination
                    v-model='pagination.page'
                    color='primary'
                    :max='scope.pagesNumber'
                    size='sm'
                    :max-pages='4'
                    :boundary-numbers='false'
                    :boundary-links='true'
                    class='float-right'
                  />
                </div>
              </template>
            </q-table>
            <q-inner-loading :showing='queryLoad'>
              <q-spinner-ios size='40px' color='primary' />
            </q-inner-loading>
          </div>
        </q-card>
      </q-card>
    </div>
  </div>
</template>

<script>
import { getRequest } from 'src/utils/axios'

export default {
  name: 'ManageMessage',
  data() {
    return {
      departments: null,
      listDatas: {
        columns: [{
          check: true,
          name: 'id'
        }, {
          check: true,
          name: 'title',
          required: true,
          label: '标题',
          align: 'left',
          field: 'title'
        }, {
          check: true,
          name: 'nickname',
          align: 'left',
          label: '昵称',
          field: 'nickname'
        }, {
          check: true,
          name: 'postDepartment',
          align: 'left',
          label: '被留言部门',
          field: 'postDepartment',
          format: val => this.departmentValue[`${val}`]
        }, {
          check: true,
          name: 'postDate',
          label: '留言日期',
          align: 'left',
          field: 'postDate',
          sortable: true
        }, {
          check: true,
          name: 'postTime',
          label: '留言时间',
          align: 'left',
          field: 'postTime',
          sortable: true
        }, {
          check: true,
          name: 'isDone',
          align: 'left',
          label: '状态',
          field: 'isDone',
          format: val => val === 0 ? '未处理' : '已处理'
        }],
        datas: []
      },
      filterListData: [],
      queryCondition: {
        title: null,
        nickname: null,
        postDepartment: null,
        isDone: null
      },
      isDone: [
        {
          label: '未处理',
          value: 0
        }, {
          label: '已处理',
          value: 1
        }
      ],
      departmentValue: null,
      queryLoad: false,
      ruleName: null,
      addData: false,
      showQuery: true,
      seamless: false,
      loading: false,
      tableLabel: '展开',
      selected: [],
      pagination: {
        // sortBy: 'calories',
        descending: false,
        page: 1,
        rowsPerPage: 5
        // rowsNumber: xx if getting data from a server
      },
      visibleColumns: [
        'title',
        'nickname',
        'postDepartment',
        'postDate',
        'postTime',
        'isDone'
      ]
    }
  },
  methods: {
    show(evt) {
      this.showQuery = true
      this.tableLabel = '收起'
    },
    hide(evt) {
      this.showQuery = false
      this.tableLabel = '展开'
    },
    getMessageByID(evt, row) {
      this.$router.push({
        path: '/message/reply-message',
        query: {
          id: row.id
        }
      })
    },
    onReset() {
      this.ruleName = null
    },
    resetQuery() {
      this.queryCondition = {}
    },
    select(columnFromClient) {
      this.visibleColumns = []
      const columns = this.listDatas.columns
      for (let i = 0; i < columns.length; ++i) {
        if (columns[i].name === columnFromClient.name) {
          columns[i].check = !columns[i].check
        }
        if (columns[i].check) {
          this.visibleColumns[i] = columns[i].name
        }
      }
    },
    doQuery() {
      this.queryLoad = true
      setTimeout(() => {
        this.queryLoad = false
        this.filterListData = []
        const datas = this.listDatas.datas
        for (let i = 0; i < datas.length; ++i) {
          const data = datas[i]
          if (this.isMatchData(data)) {
            this.filterListData.push(data)
          }
        }
      }, 500)
    },
    isMatchData(data) {
      const listQueryData = this.queryCondition
      let titleFlag = false
      if (!listQueryData.title || data.title.search(listQueryData.title) !== -1) {
        titleFlag = true
      }
      let nicknameFlag = false
      if (!listQueryData.nickname || data.nickname.search(listQueryData.nickname) !== -1) {
        nicknameFlag = true
      }
      let postDepartmentFlag = false
      if (!listQueryData.postDepartment || data.postDepartment === listQueryData.postDepartment.value) {
        postDepartmentFlag = true
      }
      let isDoneFlag = false
      if (!listQueryData.isDone || data.isDone === listQueryData.isDone.value) {
        isDoneFlag = true
      }
      return isDoneFlag && titleFlag && nicknameFlag && postDepartmentFlag
    }
  },
  computed: {
    pagesNumber() {
      return Math.ceil(this.data.length / this.pagination.rowsPerPage)
    },
    selectedTotal() {
      let total = 0
      if (!this.selected || this.selected.length === 0) {
        return total
      }
      for (let i = 0; i < this.selected.length; ++i) {
        total += this.selected[i].callCount
      }
      return total
    },
    showColumns() {
      const showColumns = []
      for (let i = 0; i < this.listDatas.columns.length; ++i) {
        const columnData = this.listDatas.columns[i]
        if (!columnData.required) {
          showColumns.push(columnData)
        }
      }
      return showColumns
    }
  },
  async mounted() {
    this.showQuery = this.$q.screen.gt.xs
    this.tableLabel = this.$q.screen.gt.xs ? '收起' : '展开'
    const message = await getRequest('/api/get-all-messages')
      .then(res => {
        return res.data
      }).catch(() => {
        return null
      })
    this.listDatas.datas = message.data
    const department = await getRequest('/api/get-all-departments')
      .then(res => {
        return res.data
      }).catch(() => {
        return null
      })
    const departmentData = department.data
    const temp = []
    const temp2 = []
    Object.keys(departmentData).forEach(function(key) {
      temp.push({
        label: departmentData[key].name,
        value: departmentData[key].id
      })
      temp2.push(departmentData[key].name)
    })
    this.departmentValue = temp2
    this.departments = temp
  },
  watch: {
    queryCondition: {
      handler(newValue, oldValue) {
        this.doQuery()
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style lang='sass'>
</style>
