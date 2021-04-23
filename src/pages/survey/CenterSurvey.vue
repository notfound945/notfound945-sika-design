<template>
  <div class="sc-design q-mb-md">
    <div class="row q-px-sm">
      <iframe src="http://localhost:8181/#/surveylist" class='trend-container' frameborder=0></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CenterSurvey'
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
