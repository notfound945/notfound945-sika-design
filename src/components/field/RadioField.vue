<template>
  <div class='row q-gutter-y-sm q-my-md items-center'>
    <q-form v-if='isEdit' class='q-px-md full-width' @reset='onReset' @submit='onSubmit'>
      <div class='row q-gutter-y-sm items-center'>
        <div class='row q-gutter-y-sm q-my-md items-center'>
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
              v-model='title'
              placeholder='输入标题'
              dense
              square
              :rules="[(val) => (val && val.length > 0) || '请输入名字']"
            >
            </q-input>
          </q-item-label>
        </span>
        </div>
        <div v-for='(value, index) in options' :key='index' class='row q-gutter-y-sm q-my-md items-center'>
        <span
          class='col-sm-4 col-xs-12'
          :class="{ 'justify-end': $q.screen.gt.xs }"
        >
          <q-item-label
            class='q-pr-md'
            :class="{ 'text-right': $q.screen.gt.xs }"
          >选项 {{ index + 1 }}:</q-item-label
          >
        </span>
        <span class='col-xl-6 col-md-6 col-sm-6 col-xs-12 sc-design'>
          <q-item-label>
            <q-input
              class='q-pb-none'
              outlined
              v-model='options[index].label'
              placeholder='请输入选项内容'
              dense
              square
              :rules="[(val) => (val && val.length > 0) || '请填写选项']"
            >
             <template v-slot:append>
                <q-btn round color='primary' icon='add' @click='addOption(index)' size='xs' />
             </template>
             <template v-slot:after>
              <q-btn v-if='index > 0' round color='red' icon='remove' @click='removeOption(index)' size='xs' />
            </template>
            </q-input>
          </q-item-label>
        </span>
        </div>
        <div class='q-pt-sm offset-sm-4 col-xl-4 col-md-5 col-sm-6 col-xs-12'>
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
    <div v-else class='row q-gutter-y-sm items-center'>
      <div class='row q-gutter-y-sm q-my-md items-center'>
        <strong>{{ title }}</strong>
      </div>
      <q-option-group
        v-model="select"
        :options="options"
        color="primary"
        inline
      />
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
      options: [{ label: null, value: 0 }]
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
    addOption(index) {
      if (this.options.length < 6) {
        this.options.push({ label: null, value: index + 1 })
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
