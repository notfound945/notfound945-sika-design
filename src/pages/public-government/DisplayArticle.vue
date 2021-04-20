<template>
  <div class="sc-design">
    <div class="bg-white q-pa-md">
      <div class="text-h6">
        <strong v-if='article.title'> {{ article.title }} </strong>
        <strong v-else> 请选择文件 </strong>
      </div>
      <div class="text-body2">
        <p v-if='article.title'>
          展示选择文件内容,如果内容为空表明你没选择任何文件，请切换到文件栏选择文件
        </p>
        <p v-else>
          你还没选择任何文件
        </p>
      </div>
    </div>
    <div class="q-px-md">
      <q-form>
        <q-card square flat class="q-mt-md q-pt-md q-pb-lg">
          <div class="row q-px-sm q-mx-md items-center">
            <q-item-label class="text-body1">文件信息</q-item-label>
          </div>
          <q-separator spaced="15px" />
          <div class="row q-gutter-y-lg q-px-lg items-center">
            <span class="col-xs-12 col-sm-5 col-md-3">
              <q-item-label class="q-pr-md q-mb-sm">发文机构</q-item-label>
              <q-item-label>
                <span class="col-auto text-primary cursor-pointer">
                  这是发布机构信息
                </span>
              </q-item-label>
            </span>
            <span class="col-xs-12 offset-sm-2 col-sm-5 offset-md-1 col-md-3">
              <q-item-label class="q-pr-md q-mb-sm">文件编号</q-item-label>
              <q-item-label>
                <span class="col-auto text-primary cursor-pointer">
                  文件编号
                </span>
              </q-item-label>
            </span>
            <span class="col-xs-12 offset-md-1 col-md-4">
              <q-item-label class="q-pr-md q-mb-sm">文件名</q-item-label>
              <q-item-label>
                <span class="col-auto text-primary cursor-pointer">
                  {{ article.title }}
                </span>
              </q-item-label>
            </span>
            <span class="col-xs-12 col-sm-5 col-md-3">
              <q-item-label class="q-pr-md q-mb-sm">发布日期</q-item-label>
              <q-item-label>
                <span class="col-auto text-primary cursor-pointer">
                  发布日期
                </span>
              </q-item-label>
            </span>
            <span class="col-xs-12 offset-sm-2 col-sm-5 offset-md-1 col-md-3">
              <q-item-label class="q-pr-md q-mb-sm">发布时间</q-item-label>
              <q-item-label>
                <span class="col-auto text-primary cursor-pointer">
                  发布时间
                </span>
              </q-item-label>
            </span>
            <span class="col-xs-12 offset-md-1 col-md-4">
              <q-item-label class="q-pr-md q-mb-sm">描述</q-item-label>
              <q-item-label>
                <span class="col-auto text-primary cursor-pointer">
                  (一)贯彻执行国家生态环境基本制度。会同有关部门拟订地方生态环境政策、规划并组织实施，起草地方性法规、省政府规章草案。会同有关部门编制并监督实施重点区域、流域、饮用水水源地生态环境规划和水功能区划。组织拟订生态环境地方标准和技术规范。
                  (二)负责重大生态环境问题的统筹协调和监督管理。牵头协调跨市(州)环境污染事故和生态破坏事件的调查处理，指导协调地方政府对重大以上突发生态环境事件的应急、预警工作。牵头指导实施生态环境损害赔偿制度，协调解决有关跨区域环境污染纠纷，统筹协调重点区域、流域生态环境保护工作。
                </span>
              </q-item-label>
            </span>
          </div>
        </q-card>
      </q-form>
      <q-form>
        <q-card square flat class="q-mt-lg q-pt-md q-pb-lg">
          <div class="row q-px-sm q-mx-md items-center">
            <q-item-label class="text-body1">文件内容</q-item-label>
          </div>
          <q-separator spaced="15px" />
          <div class="row q-gutter-y-lg q-px-lg items-center">
          </div>
        </q-card>
      </q-form>
    </div>
  </div>
</template>

<script>
import ADVANCED_FORM_DATA from '@/mock/data/form/advancedFormData'
import _ from 'lodash'

export default {
  name: 'DisplayArticle',
  mounted() {
    const query = this.$route.query
    this.article = query
  },
  data() {
    return {
      article: {
        id: 0,
        title: '请选择文件后查看'
      },
      advancedFormData: ADVANCED_FORM_DATA,
      show: false,
      pagination: {
        page: 1,
        rowsNumber: 10
      }
    }
  },
  methods: {
    edit(index) {
      this.advancedFormData.memberData.columnDatas[index].edit = true
    },
    save(index) {
      this.advancedFormData.memberData.columnDatas[index].edit = false
    },
    add() {
      const columnDataTemp = _.clone(
        this.advancedFormData.memberData.columnDataDefault
      )
      columnDataTemp.index = this.advancedFormData.memberData.columnDatas.length

      console.log(JSON.stringify(columnDataTemp))
      this.advancedFormData.memberData.columnDatas.push(columnDataTemp)
    },
    deleteData(index) {
      this.advancedFormData.memberData.columnDatas.splice(index, 1)
      for (let i = 0; i < this.advancedFormData.memberData.columnDatas.length; ++i) {
        this.advancedFormData.memberData.columnDatas[i].index = i
      }
    }
  }
}
</script>

<style lang="sass">
.sc-design
  .sc-edit
    .q-item__section--side
      padding-right: 0

    .q-field--dense
      .q-field__control
        padding: 0 5px
        height: 28px

      .q-field__marginal
        height: 28px

    .q-field--auto-height.q-field--dense
      .q-field__control, .q-field__native
        min-height: 28px

</style>
