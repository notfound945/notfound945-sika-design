<template>
  <div class='row q-gutter-y-sm q-my-md items-center'>
    <q-form v-if='isEdit' class='q-px-md full-width' @reset='onReset' @submit='onSubmit'>
      <q-card flat bordered>
        <div class='row q-gutter-y-sm items-center justify-between'>
          <q-btn icon='border_color' flat label='编辑选择题型' color='green'></q-btn>
          <q-btn icon='delete' flat label='删除' color='red'></q-btn>
        </div>
        <div class='row q-gutter-y-sm items-center'>
        <span
          class='col-sm-3 col-xs-3'
          :class="{ 'justify-end': $q.screen.gt.xs }"
        >
          <q-item-label
            class='q-pr-md'
            :class="{ 'text-right': $q.screen.gt.xs }"
          >标题:</q-item-label
          >
        </span>
          <span class='col-xl-7 col-md-7 col-sm-7 col-xs-12 sc-design'>
          <q-item-label>
            <q-input
              class='q-pb-none'
              outlined
              v-model='title'
              placeholder='输入标题'
              dense
              square
              clearable
              :rules="[(val) => (val && val.length > 0) || '请输入标题内容']"
            >
            </q-input>
          </q-item-label>
        </span>
        </div>
        <div class='row q-col-gutter-x-md justify-center q-ma-lg'>
          <div class='column text-left'>
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
          <div class='column'>
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
      </q-card>
    </q-form>
    <div v-else class='q-ma-md items-center full-width'>
      <div class='row items-center'>
        <q-btn icon='border_color' flat label='编辑选择题型' color='primary' @click='switchEdit'></q-btn>
      </div>
      <div class='row q-gutter-y-sm items-center'>
        <span
          class='offset-3'
          :class="{ 'justify-end': $q.screen.gt.xs }"
        >
          <q-item-label
            class='q-pr-md text-h6'
          >{{ title }}</q-item-label
          >
        </span>
        <span class='offset-3 col-7 q-ma-md'>
          <q-item-label
            v-if='isTextarea'
            class='q-pr-md'>
            <q-input
              class='q-pb-none'
              outlined
              v-model='content'
              placeholder='请输写内容'
              dense
              square
              clearable
              :rules="[(val) => (val && val.length > 0) || '请填写选项']"
            />
          </q-item-label>
          <q-item-label v-else>
            <q-input
              class='q-pb-none'
              outlined
              type='textarea'
              v-model='content'
              placeholder='回复内容'
              dense
              square
              :rules="[
                    (val) => (val && val.length > 0) || '请输入留言内容'
                  ]"
            />
          </q-item-label>
        </span>
      </div>
    </div>
    <q-separator inset />
  </div>
</template>

<script>
export default {
  name: 'FillField',
  data() {
    return {
      loading: false,
      title: null,
      content: '',
      isEdit: true,
      isTextarea: true
    }
  },
  methods: {
    onSubmit() {
      console.log('option ', this.options)
      this.isEdit = false
      console.log('submit')
    },
    onReset() {
      console.log('reset')
    },
    switchEdit() {
      this.isEdit = true
    }
  }
}
</script>

<style scoped>

</style>
