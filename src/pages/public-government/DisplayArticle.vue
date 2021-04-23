<template>
  <div class='sc-design'>
    <div class='bg-white q-pa-md'>
      <div class='text-h6'>
        <strong> {{ article.name }}</strong>
      </div>
      <div class='text-body2'>
        {{ article.description }}
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
                  {{ article.name }}
                </span>
              </q-item-label>
            </span>
            <span class='col-xs-12 col-sm-6 col-md-6'>
              <q-item-label class='q-pr-md q-mb-sm'>发布日期</q-item-label>
              <q-item-label>
                <span class='col-auto text-primary cursor-pointer'>
                  {{ article.date }}
                </span>
              </q-item-label>
            </span>
            <span class='col-xs-6 offset-sm col-sm-6 offset-md col-md-6'>
              <q-item-label class='q-pr-md q-mb-sm'>发布时间</q-item-label>
              <q-item-label>
                <span class='col-auto text-primary cursor-pointer'>
                  {{ article.time }}
                </span>
              </q-item-label>
            </span>
            <span class='col-xs-12 offset-sm col-sm-12 offset-md col-md-12'>
              <q-item-label class='q-pr-md q-mb-sm'>描述</q-item-label>
              <q-item-label>
                <span class='col-auto text-primary cursor-pointer'>
                  {{ article.description }}
                </span>
              </q-item-label>
            </span>
          </div>
        </q-card>
      </q-form>
      <q-form>
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
      </q-form>
    </div>
  </div>
</template>

<script>
import ADVANCED_FORM_DATA from '@/mock/data/form/advancedFormData'
import _ from 'lodash'
import { getRequest, postRequestBlob } from 'src/utils/axios'
// import service from 'src/utils/request'

export default {
  name: 'DisplayArticle',
  async mounted() {
    const query = this.$route.query
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
        name: '请选择文件后查看',
        description: '你还没选择文件呢',
        owner: '',
        fileID: '',
        date: '1970/01/01',
        time: '00:00:00'
      },
      pdf_url: null,
      departmentValue: [],
      advancedFormData: ADVANCED_FORM_DATA,
      show: false
    }
  },
  methods: {
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
