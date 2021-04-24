<template>
  <div class='sc-design'>
    <div class='bg-white q-pa-md'>
      <div class='text-h6 text-center'>
        <strong> {{ article.title }}</strong>
      </div>
      <div class='text-body2'>
        {{ article.content }}
      </div>
    </div>
    <div class='q-px-md'>
      <q-form>
        <q-card square flat class='q-mt-md q-pt-md q-pb-lg'>
          <div class='row q-px-sm q-mx-md items-center'>
            <q-item-label class='text-body1'>文件信息</q-item-label>
          </div>
          <q-separator spaced='15px' />
          <div class='row q-gutter-y-lg q-px-lg items-center'>
            <span class='col-xs-12 col-sm-6 col-md-6'>
              <q-item-label class='q-pr-md q-mb-sm'>发文机构</q-item-label>
              <q-item-label>
                <span class='col-auto text-primary cursor-pointer'>
                  {{ departmentValue[article.department] }}
                </span>
              </q-item-label>
            </span>
            <span class='col-xs-6 offset-sm col-sm-6 offset-md col-md-6'>
              <q-item-label class='q-pr-md q-mb-sm'>文件编号</q-item-label>
              <q-item-label>
                <span class='col-auto text-primary cursor-pointer'>
                  ISN-{{ article.fileID }}
                </span>
              </q-item-label>
            </span>
            <span class='col-xs-12 offset-md offset-sm col-md-12'>
              <q-item-label class='q-pr-md q-mb-sm'>文件名</q-item-label>
              <q-item-label>
                <span class='col-auto text-primary cursor-pointer'>
                  {{ article.title }}
                </span>
              </q-item-label>
            </span>
            <span class='col-xs-12 col-sm-6 col-md-6'>
              <q-item-label class='q-pr-md q-mb-sm'>开始日期</q-item-label>
              <q-item-label>
                <span class='col-auto text-primary cursor-pointer'>
                  {{ article.startDate }}
                </span>
              </q-item-label>
            </span>
            <span class='col-xs-6 offset-sm col-sm-6 offset-md col-md-6'>
              <q-item-label class='q-pr-md q-mb-sm'>结束日期</q-item-label>
              <q-item-label>
                <span class='col-auto text-primary cursor-pointer'>
                  {{ article.endDate }}
                </span>
              </q-item-label>
            </span>
            <span class='col-xs-12 offset-sm col-sm-12 offset-md col-md-12'>
              <q-item-label class='q-pr-md q-mb-sm'>征集说明</q-item-label>
              <q-item-label>
                <span class='col-auto text-primary text-subtitle1 cursor-pointer'>
                  {{ article.content }}
                </span>
              </q-item-label>
            </span>
          </div>
        </q-card>
      </q-form>
      <q-card square flat class='q-mt-lg q-pt-md q-pb-lg'>
        <div class='row q-px-sm q-mx-md items-center'>
          <q-item-label class='text-body1'>文件内容</q-item-label>
        </div>
        <q-separator spaced='15px' />
        <q-item-label>
          <div class='row q-gutter-y-lg q-px-lg items-center'>
            <span class='col-xs-12 offset-sm col-sm-12 offset-md col-md-12'>
              <iframe src='' id='iframe' frameborder='0' style='width: 100%; height: 1000px'></iframe>
            </span>
          </div>
        </q-item-label>
      </q-card>
      <q-form @submit='onSubmit' @reset='onReset'>
        <q-card square flat class='q-gutter-y-md q-my-md q-py-sm'>
          <div class='row q-px-sm q-mx-md items-center'>
            <q-item-label class='text-body1'>征集意见</q-item-label>
          </div>
          <q-separator spaced='15px' />
          <div class='row q-gutter-y-lg q-px-lg items-center'>
          <span class='col-xs-12 offset-sm col-sm-6 offset-md col-md-5 sc-design'>
              <q-item-label class='q-pr-md q-mb-sm'>昵称</q-item-label>
              <q-item-label>
                <q-input
                  outlined
                  v-model='inputData.nickname'
                  placeholder='昵称'
                  dense
                  square
                >
                </q-input>
              </q-item-label>
            </span>
            <span class='col-xs-12 offset-sm-2 col-sm-6 offset-md-2 col-md-5 sc-design'>
              <q-item-label class='q-pr-md q-mb-sm'>手机号码</q-item-label>
              <q-item-label>
                <q-input
                  outlined
                  v-model='inputData.telephone'
                  placeholder='手机号码'
                  dense
                  square
                >
                </q-input>
              </q-item-label>
            </span>
            <span class='col-xl-12 col-md-12 col-sm-12 col-xs-12'>
              <q-item-label class='q-pr-md q-mb-sm'>征集意见</q-item-label>
              <q-item-label>
                <q-input
                  class=''
                  outlined
                  type='textarea'
                  v-model='inputData.content'
                  placeholder='请输入你的意见'
                  dense
                  square
                >
                </q-input>
              </q-item-label>
            </span>
          </div>
          <div class='row q-gutter-y-sm q-my-md items-center'>
            <div
              class='q-pt-sm offset-sm-4 col-xl-4 col-md-5 col-sm-6 col-xs-12'
            >
              <div class='row q-col-gutter-x-md'>
                <div class='col text-left'>
                  <q-btn
                    class='no-border-radius'
                    unelevated
                    type='submit'
                    :loading='loading'
                    color='primary full-width'
                    label='确认'
                    size='md'
                  >
                    <template v-slot:loading>
                      <q-spinner-hourglass class='on-left' />
                      保存...
                    </template>
                  </q-btn>
                </div>
                <div class='col'>
                  <q-btn
                    class='no-border-radius'
                    unelevated
                    type='reset'
                    color='grey full-width'
                    label='清 除'
                    size='md'
                  >
                  </q-btn>
                </div>
              </div>
            </div>
          </div>
        </q-card>
      </q-form>
    </div>
  </div>
</template>

<script>
import ADVANCED_FORM_DATA from '@/mock/data/form/advancedFormData'
import _ from 'lodash'
import { getRequest, postRequest, postRequestBlob } from 'src/utils/axios'
// import service from 'src/utils/request'

export default {
  name: 'DisplayCollect',
  async mounted() {
    const department = await getRequest('/api/get-all-departments').then(res => {
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
    const query = this.$route.query
    if (!_.isUndefined(query.item)) {
      console.log(query.item)
      this.article = query.item
      this.pdf_src = await postRequestBlob(
        '/api/get-pdf-file-by-id',
        { id: this.article.fileID })
        .then(res => {
          return res.data
        }).catch(() => {
          return null
        })
      const blob = new Blob([this.pdf_src], { type: 'application/pdf' })
      this.pdf_url = window.URL.createObjectURL(blob)
      document.getElementById('iframe').src = this.pdf_url + '#view=FitH,top'
    }
  },
  data() {
    return {
      article: {
        id: 0,
        name: '请选择征集后查看',
        description: '你还没选择征集呢',
        owner: '',
        fileID: '',
        date: '1970/01/01',
        time: '00:00:00'
      },
      pdf_url: null,
      departmentValue: [],
      inputData: {
        nickname: null,
        telephone: null,
        content: null
      },
      advancedFormData: ADVANCED_FORM_DATA,
      show: false
    }
  },
  methods: {
    async onSubmit() {
      if (this.inputData.doContent != null) {
        this.$q.notify({
          position: 'top',
          color: 'info',
          textColor: 'white',
          icon: 'cloud_done',
          group: false,
          html: true,
          message: '留言回复成功！！'
        })
        const params = this.inputData
        params.postDepartment = this.inputData.postDepartment.value
        const result = await postRequest('/api/reply-message', params).then(res => {
          return res
        }).catch(() => {
          return null
        })
        console.log(result)
      } else {
        this.$q.notify({
          position: 'top',
          color: 'error',
          textColor: 'white',
          icon: 'cloud_done',
          group: false,
          html: true,
          message: '请填写留言信息'
        })
      }
    },
    onReset() {
      this.inputData.doContent = null
    },
    edit(index) {
      this.advancedFormData.memberData.columnDatas[index].edit = true
    },
    save(index) {
      this.advancedFormData.memberData.columnDatas[index].edit = false
    },
    add() {
      const columnDataTemp = _.clone(
        this.advancedFormData.memberData.columnDataDefault
      )
      columnDataTemp.index = this.advancedFormData.memberData.columnDatas.length

      console.log(JSON.stringify(columnDataTemp))
      this.advancedFormData.memberData.columnDatas.push(columnDataTemp)
    },
    deleteData(index) {
      this.advancedFormData.memberData.columnDatas.splice(index, 1)
      for (let i = 0; i < this.advancedFormData.memberData.columnDatas.length; ++i) {
        this.advancedFormData.memberData.columnDatas[i].index = i
      }
    }
  }
}
</script>

<style lang='sass'>
.sc-design
  .sc-edit
    .q-item__section--side
      padding-right: 0

    .q-field--dense
      .q-field__control
        padding: 0 5px
        height: 28px

      .q-field__marginal
        height: 28px

    .q-field--auto-height.q-field--dense
      .q-field__control, .q-field__native
        min-height: 28px

</style>
