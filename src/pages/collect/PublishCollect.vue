<template>
  <div>
    <div class='bg-white q-pa-md'>
      <div class='text-h6'>
        <strong>意见征集发布</strong>
      </div>
      <div class='text-body2'>
        通过填写以下表单内容发起意见征集。
      </div>
    </div>
    <div class='q-px-md'>
      <q-card square flat class='q-gutter-y-md q-my-md q-py-sm'>
        <q-form class='q-px-md full-width' @reset='onReset' method='POST' @submit='onSubmit'
                enctype='multipart/form-data'>
          <div class='row q-gutter-y-sm items-center'>
            <span
              class='col-sm-4 col-xs-12'
              :class="{ 'justify-end': $q.screen.gt.xs }"
            >
              <q-item-label
                class='q-pr-md'
                :class="{ 'text-right': $q.screen.gt.xs }"
              >征集标题:</q-item-label
              >
            </span>
            <span class='col-xl-4 col-md-5 col-sm-6 col-xs-12 sc-design'>
              <q-item-label>
                <q-input
                  class='q-pb-none'
                  outlined
                  v-model='inputData.title'
                  placeholder='征集标题'
                  dense
                  square
                  :rules="[(val) => (val && val.length > 0) || '请输入标题']"
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
              >PDF 文件:</q-item-label
              >
            </span>
            <span class='col-xl-4 col-md-5 col-sm-6 col-xs-12 sc-design'>
              <q-item-label>
                <q-file
                  v-model='inputData.file'
                  value=''
                  label='文件大小 <= 20 MB'
                  max-file-size='20971520'
                  @rejected='onRejected'
                  square
                  dense
                  :rules="[
                    (value) => (value) || '请选择上传文件'
                  ]"
                  accept='.pdf' />
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
              >征集说明:</q-item-label
              >
            </span>
            <span class='col-xl-4 col-md-5 col-sm-6 col-xs-12'>
              <q-item-label>
                <q-input
                  class='q-pb-none'
                  outlined
                  type='textarea'
                  v-model='inputData.description'
                  placeholder='征集说明'
                  dense
                  square
                  :rules="[
                    (val) => (val && val.length > 0) || '请填写征集的描述'
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
              >征集期限:</q-item-label
              >
            </span>
            <span class='col-xl-4 col-md-5 col-sm-6 col-xs-12'>
              <q-item-label>
                 <sc-date-range
                   class=''
                   value=''
                   v-model='inputData.dateRange'
                   ref='startEndDate'
                   :field-style="{ 'min-width': '253px' }"
                   :rules="[
                    (value) => (value && value.length > 0) || '请选择征集期限'
                  ]"
                 />
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
                    label='保 存'
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
import { uploadFileRequest } from 'src/utils/axios'
import ScDateRange from 'components/common/ScDateRange'

export default {
  name: 'PublishCollect',
  components: { ScDateRange },
  data() {
    return {
      loading: false,
      basicFormData: BASIC_FORM_DATA,
      targetOption: 'public',
      inputData: {
        file: null,
        title: null,
        dateRange: null,
        description: null
      },
      uploadProgress: [],
      uploading: null
    }
  },
  methods: {
    onSubmit() {
      const formData = new FormData()
      formData.append('file', this.file)
      formData.append('title', this.title)
      formData.append('description', this.description)
      console.log('submit ', formData)
      uploadFileRequest('/api/public-latest-file', formData).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
      this.$q.notify({
        position: 'top',
        color: 'info',
        textColor: 'white',
        icon: 'cloud_done',
        group: false,
        html: true,
        message: '保存成功！！'
      })
    },
    onReset() {
      for (const key in this.inputData) {
        this.inputData[key] = null
        this.file = null
      }
    },
    onRejected(rejectedEntries) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      this.$q.notify({
        position: 'top',
        type: 'negative',
        message: `${rejectedEntries.length} 个文件不规范，请重新选择`
      })
    }
  },
  computed: {},
  mounted() {
  },
  watch: {}
}
</script>

<style lang='sass'></style>
