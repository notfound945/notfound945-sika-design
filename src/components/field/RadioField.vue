<template>
  <div class='row q-gutter-y-sm q-my-md items-center'>
    <q-form v-if='isEdit' class='q-px-md full-width' @reset='onReset' @submit='onSubmit'>
      <div class='row q-gutter-y-sm items-center'>
        <q-btn icon='radio_button_checked' flat label='编辑选择题型' color='green'></q-btn>
      </div>
      <div class='row q-gutter-y-sm items-center'>
        <span
          class='col-3'
          :class="{ 'justify-end': $q.screen.gt.xs }"
        >
          <q-item-label
            class='q-pr-md'
            :class="{ 'text-right': $q.screen.gt.xs }"
          >标题:</q-item-label
          >
        </span>
        <span class='col-7 sc-design'>
          <q-item-label>
            <q-input
              class='q-pb-none'
              outlined
              v-model='title'
              placeholder='输入标题'
              dense
              square
              clearable
              :rules="[(val) => (val && val.length > 0) || '请输入名字']"
            >
            </q-input>
          </q-item-label>
        </span>
      </div>
      <div v-for='(value, index) in options' :key='index' class='row q-gutter-y-lg q-my-xs items-center'>
        <span
          class='col-3'
          :class="{ 'justify-end': $q.screen.gt.xs }"
        >
          <q-item-label
            class='q-pr-md'
            :class="{ 'text-right': $q.screen.gt.xs }"
          >选项 {{ index + 1 }}:</q-item-label
          >
        </span>
        <span class='col-6'>
          <q-item-label>
            <q-input
              class='q-pb-none'
              outlined
              v-model='options[index].label'
              placeholder='请输入选项内容'
              dense
              square
              clearable
              :rules="[(val) => (val && val.length > 0) || '请填写选项']"
            >
            </q-input>

          </q-item-label>
        </span>
        <span class='col-1 text-right'>
        <q-btn-group outline>
          <q-btn icon='add' @click='addOption(index)' />
          <q-btn v-if='index > 0' icon='remove' @click='removeOption(index)' />
        </q-btn-group>
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
    </q-form>
    <div v-else class='q-ma-md items-center full-width'>
      <div class='row items-center'>
        <q-btn icon='radio_button_checked' flat label='编辑选择题型' color='primary' @click='switchEdit'></q-btn>
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
      </div>
      <div class='row q-gutter-y-sm items-center'>
        <span class='offset-3 col-6 sc-design'>
          <q-item-label
            class='q-pr-md'
            :class="{ 'text-left': $q.screen.gt.xs }">
          <q-option-group
            v-model='select'
            :options='options'
            color='primary'
          />
          </q-item-label>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RadioField',
  data() {
    return {
      loading: false,
      isEdit: true,
      title: null,
      test: null,
      select: null,
      options: [{
        label: null,
        value: 0
      }]
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
    },
    addOption(index) {
      if (this.options.length < 6) {
        this.options.push({
          label: null,
          value: index + 1
        })
      }
    },
    removeOption(index) {
      this.options.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>
