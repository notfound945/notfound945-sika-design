<template>
  <div>
    <div class='bg-white q-pa-md'>
      <div class='text-h6'>
        <strong>留言详情</strong>
      </div>
      <div class='text-body2'>
        当前留言状态：未处理
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
                  outlined
                  v-model='inputData.title'
                  placeholder='标题'
                  dense
                  square
                  clearable
                >
                </q-input>
              </q-item-label>
            </span>
          <span class='col-xs-12 offset-sm-2 col-sm-6 offset-md-2 col-md-5 sc-design'>
              <q-item-label class='q-pr-md q-mb-sm'>昵称</q-item-label>
              <q-item-label>
                <q-input
                  outlined
                  v-model='inputData.nickname'
                  placeholder='昵称'
                  dense
                  square
                  clearable
                >
                </q-input>
              </q-item-label>
            </span>
          <span class='col-xs-12 offset-sm col-sm-6 offset-md col-md-5 sc-design'>
              <q-item-label class='q-pr-md q-mb-sm'>提交日期</q-item-label>
              <q-item-label>
                <q-input
                  outlined
                  v-model='inputData.postData'
                  placeholder='提交日期'
                  dense
                  square
                  clearable
                >
                </q-input>
              </q-item-label>
            </span>
          <span class='col-xs-12 offset-sm-2 col-sm-6 offset-md-2 col-md-5 sc-design'>
              <q-item-label class='q-pr-md q-mb-sm'>提交时间</q-item-label>
              <q-item-label>
                <q-input
                  outlined
                  v-model='inputData.postTime'
                  placeholder='提交时间'
                  dense
                  square
                  clearable
                >
                </q-input>
              </q-item-label>
            </span>
          <span class='col-xs-12 offset-sm col-sm-6 offset-md col-md-5 sc-design'>
              <q-item-label class='q-pr-md q-mb-sm'>提交部门</q-item-label>
              <q-item-label>
                <q-input
                  outlined
                  v-model='inputData.postDepartment'
                  placeholder='提交部门'
                  dense
                  square
                  clearable
                >
                </q-input>
              </q-item-label>
            </span>
          <span class='col-xl-12 col-md-12 col-sm-12 col-xs-12'>
              <q-item-label class='q-pr-md q-mb-sm'>留言内容</q-item-label>
              <q-item-label>
                <q-input
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
      <q-form>
        <q-card square flat class='q-mt-lg q-pt-md q-pb-lg'>
          <div class='row q-px-sm q-mx-md items-center'>
            <q-item-label class='text-body1'>留言结果</q-item-label>
          </div>
          <q-separator spaced='15px' />
          <div class='row q-gutter-y-lg q-px-lg items-center'>
            <span class='col-xs-12 offset-sm col-sm-6 offset-md col-md-5'>
              <q-item-label class='q-pr-md q-mb-sm'>答复日期</q-item-label>
              <q-item-label>
                <q-input
                  outlined
                  v-model='outputData.doDate'
                  placeholder='答复日期'
                  dense
                  square
                  clearable
                >
                </q-input>
              </q-item-label>
            </span>
            <span class='col-xs-12 offset-sm-2 col-sm-6 offset-md-2 col-md-5'>
              <q-item-label class='q-pr-md q-mb-sm'>答复时间</q-item-label>
              <q-item-label>
                <q-input
                  outlined
                  v-model='outputData.doTime'
                  placeholder='答复时间'
                  dense
                  square
                  clearable
                >
                </q-input>
              </q-item-label>
            </span>
            <span class='col-xs-12 offset-md col-md-5 col-sm-5'>
              <q-item-label class='q-pr-md q-mb-sm'>答复部门</q-item-label>
              <q-item-label>
                <q-input
                  outlined
                  v-model='outputData.doDepartment'
                  placeholder='答复部门'
                  dense
                  square
                  clearable
                >
                </q-input>
              </q-item-label>
            </span>
            <span class='col-xl-12 col-md-12 col-sm-12 col-xs-12'>
              <q-item-label class='q-pr-md q-mb-sm'>留言回复</q-item-label>
              <q-item-label>
                <q-input
                  class='q-pb-none'
                  outlined
                  type='textarea'
                  v-model='outputData.doContent'
                  placeholder='回复内容'
                  dense
                  square
                  :rules="[
                    (val) => (val && val.length > 0) || '请输入留言内容'
                  ]"
                >
                </q-input>
              </q-item-label>
            </span>
          </div>
        </q-card>
      </q-form>
    </div>
  </div>
</template>

<script>
import BASIC_FORM_DATA from '@/mock/data/form/basicFormData'
import { getRequest, postRequest } from 'src/utils/axios'
import _ from 'lodash'

export default {
  name: 'ReplyMessage',
  data() {
    return {
      loading: false,
      basicFormData: BASIC_FORM_DATA,
      departmentValue: [],
      departmentMessage: '',
      targetOption: 'public',
      inputData: {
        title: null,
        object: null,
        nickname: null,
        postContent: null,
        postDepartment: null,
        postData: null,
        postTime: null
      },
      outputData: {
        doDate: null,
        doTime: null,
        doContent: null,
        doDepartment: null
      }
    }
  },
  methods: {
  },
  computed: {},
  async mounted() {
    const messageID = this.$route.query.id
    if (!_.isUndefined(messageID)) {
      const message = await postRequest('/api/get-message-by-id', { id: messageID }).then(res => {
        return res.data
      }).catch(() => {
        return null
      })
      console.log('message ', message)
    }
    const department = await getRequest('/api/get-all-departments').then(res => {
      return res.data
    }).catch(() => {
      return null
    })
    const departmentData = department.data
    const temp = []
    Object.keys(departmentData).forEach(function(key) {
      temp.push({
        label: departmentData[key].name,
        value: departmentData[key].id
      })
    })
    this.departmentValue = temp
  },
  watch: {}
}
</script>

<style lang='sass'></style>
