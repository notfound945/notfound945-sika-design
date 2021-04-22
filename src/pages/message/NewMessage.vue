<template>
  <div>
    <div class='bg-white q-pa-md'>
      <div class='text-h6'>
        <strong>新建留言</strong>
      </div>
      <div class='text-body2'>
        说出你的心声与需求，我们会尽全力来服务您！
      </div>
    </div>
    <div class='q-px-md'>
      <q-card square flat class='q-gutter-y-md q-my-md q-py-sm'>
        <div class='row q-px-sm q-mx-md items-center'>
          <q-item-label class='text-body1'>留言内容</q-item-label>
        </div>
        <q-separator spaced='15px' />
        <q-form class='q-px-md full-width' @reset='onReset' @submit='onSubmit'>
          <div class='row q-gutter-y-sm items-center'>
            <span
              class='col-sm-4 col-xs-12'
              :class="{ 'justify-end': $q.screen.gt.xs }"
            >
              <q-item-label
                class='q-pr-md'
                :class="{ 'text-right': $q.screen.gt.xs }"
              >标题:</q-item-label
              >
            </span>
            <span class='col-xl-4 col-md-5 col-sm-6 col-xs-12 sc-design'>
              <q-item-label>
                <q-input
                  class='q-pb-none'
                  outlined
                  v-model='inputData.title'
                  placeholder='留言标题'
                  dense
                  square
                  :rules="[(val) => (val && val.length > 0) || '请输入名字']"
                >
                </q-input>
              </q-item-label>
            </span>
          </div>
          <div class='row q-gutter-y-sm q-my-md items-center'>
            <span
              class='col-sm-4 col-xs-12'
              :class="{ 'justify-end': $q.screen.gt.xs }"
            >
              <q-item-label
                class='q-pr-md'
                :class="{ 'text-right': $q.screen.gt.xs }"
              >用户昵称:</q-item-label
              >
            </span>
            <span class='col-xl-4 col-md-5 col-sm-6 col-xs-12 sc-design'>
              <q-item-label>
                <q-input
                  class='q-pb-none'
                  outlined
                  v-model='inputData.nickname'
                  placeholder='用户昵称'
                  dense
                  square
                  :rules="[
                    (val) => (val && val.length > 0) || '请输入用户昵称'
                  ]"
                >
                </q-input>
              </q-item-label>
            </span>
          </div>
          <div class='row q-gutter-y-sm q-my-md items-center'>
            <span
              class='col-sm-4 col-xs-12'
              :class="{ 'justify-end': $q.screen.gt.xs }"
            >
              <q-item-label
                class='q-pr-md'
                :class="{ 'text-right': $q.screen.gt.xs }"
              >主题:</q-item-label
              >
            </span>
            <span class='col-xl-4 col-md-5 col-sm-6 col-xs-12 sc-design'>
              <q-item-label>
                <q-input
                  class='q-pb-none'
                  outlined
                  v-model='inputData.object'
                  placeholder='主题内容'
                  dense
                  square
                  :rules="[
                  (val) => (val && val.length > 0) || '请输入主题内容'
                  ]"
                >
                </q-input>
              </q-item-label>
            </span>
          </div>
          <div class='row q-gutter-y-sm q-my-md items-start'>
            <span
              class='col-sm-4 col-xs-12'
              :class="{ 'justify-end': $q.screen.gt.xs }"
            >
              <q-item-label
                class='q-pr-md'
                :class="{ 'text-right': $q.screen.gt.xs }"
              >留言内容:</q-item-label
              >
            </span>
            <span class='col-xl-4 col-md-5 col-sm-6 col-xs-12'>
              <q-item-label>
                <q-input
                  class='q-pb-none'
                  outlined
                  type='textarea'
                  v-model='inputData.postContent'
                  placeholder='请输入你的留言内容'
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
          <div class='row q-gutter-y-sm q-my-md items-center'>
            <span
              class='col-sm-4 col-xs-12'
              :class="{ 'justify-end': $q.screen.gt.xs }"
            >
              <q-item-label
                class='q-pr-md'
                :class="{ 'text-right': $q.screen.gt.xs }"
              >
                <span>留言部门：</span>
              </q-item-label>
            </span>
            <span class='col-xl-4 col-md-5 col-sm-6 col-xs-12 sc-design'>
              <q-item-label>
                <q-select
                  behavior='menu'
                  outlined
                  value=''
                  options-dense
                  v-model='inputData.postDepartment'
                  :options='departmentValue'
                  label='选择部门'
                  dense
                  square
                  clearable
                  :rules="[
                    (value) => (value) || '请选择留言部门'
                  ]"
                >
                </q-select>
              </q-item-label>
            </span>
          </div>
          <div class='row q-gutter-y-sm q-my-md items-center' >
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
                    label='新 建'
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
        </q-form>
      </q-card>
    </div>
  </div>
</template>

<script>
import BASIC_FORM_DATA from '@/mock/data/form/basicFormData'
import { getRequest, postRequest } from 'src/utils/axios'

export default {
  name: 'NewMessage',
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
        postDepartment: null
      }
    }
  },
  methods: {
    async onSubmit() {
      this.$q.notify({
        position: 'top',
        color: 'info',
        textColor: 'white',
        icon: 'cloud_done',
        group: false,
        html: true,
        message: '新建留言成功！！'
      })
      const params = this.inputData
      params.postDepartment = this.inputData.postDepartment.value
      console.log(params)
      const result = await postRequest('/api/add-message', params).then(res => {
        return res
      }).catch(() => {
        return null
      })
      console.log(result)
    },
    onReset() {
      for (const key in this.inputData) {
        this.inputData[key] = null
      }
    }
  },
  computed: {},
  async mounted() {
    const department = await getRequest('/api/get-all-departments').then(res => {
      return res.data
    }).catch(() => {
      return null
    })
    const departmentData = department.data
    const temp = []
    Object.keys(departmentData).forEach(function(key) {
      temp.push({ label: departmentData[key].name, value: departmentData[key].id })
    })
    this.departmentValue = temp
  },
  watch: {}
}
</script>

<style lang='sass'></style>
