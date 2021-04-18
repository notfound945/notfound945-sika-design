<template>
  <div class="sc-design q-mb-md">
    <q-resize-observer :debounce="300" @resize="resize" />
    <div class="row q-px-sm">
        <iframe src="http://localhost:8080/druid/" class='trend-container' frameborder=0></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DBMonitor'
}
</script>

<style scoped>
.trend-container {
  position: relative;
  width: 100%;
  min-height: 700px;
  padding-bottom: 16px;
}
</style>
