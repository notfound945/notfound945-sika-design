<template>
  <div>
    <div class='bg-white q-pa-md'>
      <div class='text-h6'>
        <strong>{{ inputData.title }}</strong>
      </div>
      <div class='text-body2'>
        当前留言状态：
        <strong v-if='inputData.isDone' class='text-green'> 已处理完成 </strong>
        <strong v-else class='text-red'> 未处理 </strong>
      </div>
    </div>
    <div class='q-px-md'>
      <q-card square flat class='q-gutter-y-md q-my-md q-py-sm'>
        <div class='row q-px-sm q-mx-md items-center'>
          <q-item-label class='text-body1'>留言内容</q-item-label>
        </div>
        <q-separator spaced='15px' />
        <div class='row q-gutter-y-lg q-px-lg items-center'>
            <span class='col-xs-12 offset-sm col-sm-6 offset-md col-md-5 sc-design'>
              <q-item-label class='q-pr-md q-mb-sm'>标题</q-item-label>
              <q-item-label>
                <q-input
                  disable
                  outlined
                  v-model='inputData.title'
                  placeholder='标题'
                  dense
                  square
                >
                </q-input>
              </q-item-label>
            </span>
          <span class='col-xs-12 offset-sm-2 col-sm-6 offset-md-2 col-md-5 sc-design'>
              <q-item-label class='q-pr-md q-mb-sm'>昵称</q-item-label>
              <q-item-label>
                <q-input
                  disable
                  outlined
                  v-model='inputData.nickname'
                  placeholder='昵称'
                  dense
                  square
                >
                </q-input>
              </q-item-label>
            </span>
          <span class='col-xs-12 offset-sm col-sm-6 offset-md col-md-5 sc-design'>
              <q-item-label class='q-pr-md q-mb-sm'>提交日期</q-item-label>
              <q-item-label>
                <q-input
                  disable
                  outlined
                  v-model='inputData.postDate'
                  placeholder='提交日期'
                  dense
                  square
                >
                </q-input>
              </q-item-label>
            </span>
          <span class='col-xs-12 offset-sm-2 col-sm-6 offset-md-2 col-md-5 sc-design'>
              <q-item-label class='q-pr-md q-mb-sm'>提交时间</q-item-label>
              <q-item-label>
                <q-input
                  disable
                  outlined
                  v-model='inputData.postTime'
                  placeholder='提交时间'
                  dense
                  square
                >
                </q-input>
              </q-item-label>
            </span>
          <span class='col-xs-12 offset-sm col-sm-6 offset-md col-md-5 sc-design'>
              <q-item-label class='q-pr-md q-mb-sm'>提交部门</q-item-label>
              <q-item-label>
                <q-input
                  disable
                  outlined
                  v-model='inputData.postDepartment'
                  placeholder='提交部门'
                  dense
                  square
                >
                </q-input>
              </q-item-label>
            </span>
          <span class='col-xs-12 offset-sm-2 col-sm-6 offset-md-2 col-md-5 sc-design'>
              <q-item-label class='q-pr-md q-mb-sm'>主题</q-item-label>
              <q-item-label>
                <q-input
                  disable
                  outlined
                  v-model='inputData.object'
                  placeholder='主题'
                  dense
                  square
                >
                </q-input>
              </q-item-label>
            </span>
          <span class='col-xl-12 col-md-12 col-sm-12 col-xs-12'>
              <q-item-label class='q-pr-md q-mb-sm'>留言内容</q-item-label>
              <q-item-label>
                <q-input
                  disable
                  class='q-pb-none'
                  outlined
                  type='textarea'
                  v-model='inputData.postContent'
                  placeholder='留言内容'
                  dense
                  square
                >
                </q-input>
              </q-item-label>
            </span>
        </div>
      </q-card>
      <q-card square flat class='q-mt-lg q-pt-md q-pb-lg'>
        <div class='row q-px-sm q-mx-md items-center'>
          <q-item-label class='text-body1'>留言结果</q-item-label>
        </div>
        <q-separator spaced='15px' />
        <div v-if='inputData.isDone' class='row q-gutter-y-lg q-px-lg items-center'>
            <span class='col-xs-12 offset-sm col-sm-6 offset-md col-md-5'>
              <q-item-label class='q-pr-md q-mb-sm'>答复日期</q-item-label>
              <q-item-label>
                <q-input
                  disable
                  outlined
                  v-model='inputData.doDate'
                  placeholder='答复日期'
                  dense
                  square
                >
                </q-input>
              </q-item-label>
            </span>
          <span class='col-xs-12 offset-sm-2 col-sm-6 offset-md-2 col-md-5'>
              <q-item-label class='q-pr-md q-mb-sm'>答复时间</q-item-label>
              <q-item-label>
                <q-input
                  disable
                  outlined
                  v-model='inputData.doTime'
                  placeholder='答复时间'
                  dense
                  square
                >
                </q-input>
              </q-item-label>
            </span>
          <span class='col-xs-12 offset-md col-md-5 col-sm-5'>
              <q-item-label class='q-pr-md q-mb-sm'>答复部门</q-item-label>
              <q-item-label>
                <q-input
                  disable
                  outlined
                  v-model='inputData.doDepartment'
                  placeholder='答复部门'
                  dense
                  square
                >
                </q-input>
              </q-item-label>
            </span>
          <span class='col-xl-12 col-md-12 col-sm-12 col-xs-12'>
              <q-item-label class='q-pr-md q-mb-sm'>留言回复</q-item-label>
              <q-item-label>
                <q-input
                  disable
                  class='q-pb-none'
                  outlined
                  type='textarea'
                  v-model='inputData.doContent'
                  placeholder='回复内容'
                  dense
                  square
                >
                </q-input>
              </q-item-label>
            </span>
        </div>
        <div v-else class='col'>
          <q-card-section class='text-center'>
            <q-item-label class='text-h5 text-red'>暂未处理内容</q-item-label>
            <q-item-label class='text-body2 text-grey-6'>
              此条留言暂未处理内容，请耐心等待处理。
            </q-item-label>
          </q-card-section>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import BASIC_FORM_DATA from '@/mock/data/form/basicFormData'
import { getRequest, postRequest } from 'src/utils/axios'
import _ from 'lodash'

export default {
  name: 'DisplayMessage',
  data() {
    return {
      loading: false,
      basicFormData: BASIC_FORM_DATA,
      departmentValue: [],
      departmentMessage: '',
      targetOption: 'public',
      inputData: {
        title: '请选择留言查看',
        object: null,
        nickname: null,
        postContent: null,
        postDepartment: null,
        postDate: null,
        postTime: null,
        doDate: null,
        doTime: null,
        doContent: null,
        doDepartment: null,
        isDone: null
      }
    }
  },
  methods: {},
  computed: {},
  async mounted() {
    const messageID = this.$route.query.id
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
    if (!_.isUndefined(messageID)) {
      const message = await postRequest('/api/get-message-by-id', { id: messageID }).then(res => {
        return res.data
      }).catch(() => {
        return null
      })
      this.inputData = message.data
      this.inputData.postDepartment = temp2[this.inputData.postDepartment]
      this.inputData.doDepartment = temp2[this.inputData.doDepartment]
    }
  },
  watch: {}
}
</script>

<style lang='sass'></style>
