<template>
  <div class='items-center'>
    <q-item>
      <q-item-label>
        填空题问题：
      </q-item-label>
      <q-input
        outlined
        v-model='title'
        placeholder='请输入问题标题'
        dense
        square
      >
      </q-input>
    </q-item>
  </div>
</template>

<script>
export default {
  name: 'FillField',
  data() {
    return {
      title: null
    }
  }
}
</script>

<style scoped>

</style>
