<template>
  <div>
    <div class='sc-base-list'>
      <div class='bg-white text-h6 q-pa-md sc-design'>
        <strong>征集列表</strong>
        <div class='row full-width justify-center'>
          <span class='col' style='max-width: 500px'>
            <q-input
              class='q-ma-md'
              outlined
              v-model='queryData'
              dense
              placeholder='请输入'
              square
            >
              <template v-slot:append>
                <q-btn
                  class='no-border-radius full-height'
                  color='primary'
                  unelevated
                  label='搜索'
                  style='margin-right: -12px'
                >
                </q-btn>
              </template>
            </q-input>
          </span>
        </div>
      </div>
    </div>
    <div class='sc-design-min bg-white q-gutter-md q-mt-md q-mx-md q-pa-sm'>
      <div class='row'>
        <span class='col-auto q-mt-xs'> 标签：</span>
        <span class='col'>
          <q-chip
            class='cursor-pointer no-border-radius'
            style='padding: 12px 12px'
            square
            dense
            color='primary'
            v-for='type in types'
            v-bind:key='type'
            :label='type'
            text-color='white'
          />
        </span>
      </div>
      <div class='row'>
        <span class='col-sm-auto col-xs-2'>发布部门： </span>
        <span class='col-sm-auto col-xs-9'>
          <q-select
            class='col-auto inline-block'
            style='min-width: 100px'
            outlined
            v-model='owner'
            square
            multiple
            dense
            hide-dropdown-icon
            options-dense
            transition-show='jump-down'
            transition-hide='jump-up'
            behavior='menu'
            :options='owners'
            emit-value
            map-options
            @filter='filterFn'
          >
            <template v-slot:selected-item='scope'>
              <q-chip
                removable
                dense
                @remove='scope.removeAtIndex(scope.index)'
                :tabindex='scope.tabindex'
                color='primary'
                text-color='white'
                class='q-ma-xs'
              >
                {{ scope.opt.label }}
              </q-chip>
            </template>
            <template v-slot:option='scope'>
              <q-item
                class='q-pa-none'
                v-bind='scope.itemProps'
                v-on='scope.itemEvents'
              >
                <q-item-section side>
                  <q-checkbox
                    :disable='scope.opt.disable'
                    v-model='owner'
                    :val='scope.opt.value'
                  ></q-checkbox>
                </q-item-section>
                <q-item-section class='q-pr-sm'>
                  <q-item-label v-html='scope.opt.label'></q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </span>
      </div>
    </div>
    <div class='bg-white q-mx-md q-mt-md q-pb-md q-pt-md'>
      <!--      <sc-page :items="articlesData.articlesDatas" class="q-mt-sm">-->
      <sc-page v-if='articles' :items='articles' class='q-mt-sm'>
        <template v-slot:item='props'>
          <div class='q-pb-sm' @click='linkTo(props.item)'>
            <sc-shadow class='q-pa-sm'>
              <q-item-section>
                <q-item-label class='text-body1 q-mb-sm'>
                  <strong>
                    {{ props.item.title }}
                  </strong>
                </q-item-label>
                <q-item-label class='q-mb-sm'>
                  <q-chip v-if='props.item.isDone'
                    label='征集结束'
                    class='cursor-pointer'
                    color='red'
                    text-color='white'
                    square
                    size='12px'
                  ></q-chip>
                  <q-chip v-else
                    label='正在征集'
                    class='cursor-pointer'
                    color='primary'
                    text-color='white'
                    square
                    size='12px'
                  ></q-chip>
                </q-item-label>
                <p class='text-grey-8 q-mb-sm q-pl-xs'>
                  {{ props.item.content }}
                </p>
                <q-item-label
                  class='row text-body2 text-grey-7 items-center q-gutter-x-xs'
                >
                  <q-btn-group flat>
                    <q-chip
                      color='white'
                      text-color='primary'
                      class='col-auto cursor-pointer'
                    >
                      {{ props.item.startDate }}
                    </q-chip>
                    <q-chip
                      color='white'
                      text-color='second'
                      class='col-auto cursor-pointer'
                    >
                      至
                    </q-chip>
                    <q-chip
                      color='white'
                      text-color='primary'
                      class='col-auto cursor-pointer'
                    >
                      {{ props.item.endDate }}
                    </q-chip>
                  </q-btn-group>
                  <q-chip
                    color='white'
                    text-color='primary'
                    class='col-auto cursor-pointer'
                  >
                    {{ departmentValue[props.item.department] }}
                  </q-chip>
                  <span class='col-sm-auto col-xs-12 q-pl-xs'>
                      {{ props.item.date }}
                  </span>
                  <span class='col-sm-auto col-xs-12 q-pl-xs'>
                      {{ props.item.time }}
                  </span>
                </q-item-label>
              </q-item-section>
            </sc-shadow>
          </div>
          <q-separator spaced='10px' />
        </template>
      </sc-page>
      <div v-else class='col'>
        <q-card-section class='text-center'>
          <q-item-label class='text-h5 text-grey'>暂未任何征集</q-item-label>
          <q-item-label class='text-body2 text-grey-6'>
            当前没有发布过任何的征集，感谢您的支持与配合。
          </q-item-label>
        </q-card-section>
      </div>
    </div>
  </div>
</template>

<script>
import ScShadow from 'components/shadow/ScShadow'
import ScPage from 'components/common/ScPage'
import ARTICLES_DATA from '@/mock/data/list/search/articlesData'
// import articlesData from 'src/mock/data/list/search/articlesData'
import { getRequest } from 'src/utils/axios'

const types = ['全部', '教育部', '人力资源部', '国土资源部', '统计部']
const ownersDefault = [
  {
    label: '我自己',
    value: '我自己',
    icon: 'mail'
  },
  {
    label: '张小三',
    value: '张小三',
    icon: 'bluetooth'
  },
  {
    label: '李泽瑞',
    value: '李泽瑞',
    icon: 'map'
  },
  {
    label: '朱元璋',
    value: '朱元璋',
    icon: 'golf_course'
  },
  {
    label: '姚明',
    value: '姚明',
    disable: true,
    icon: 'casino'
  }
]

export default {
  name: 'ListCollect',
  components: {
    ScPage,
    ScShadow
  },
  async mounted() {
    getRequest('/api/get-all-collect').then(res => {
      console.log(res.data)
      this.articles = res.data.data
    }).catch(err => {
      console.log(err)
    })
    const department = await getRequest('/api/get-all-departments').then(res => {
      return res.data
    }).catch(() => {
      return null
    })
    const departmentData = department.data
    const temp = []
    const temp2 = []
    Object.keys(departmentData).forEach(function(key) {
      temp.push({
        label: departmentData[key].name,
        value: departmentData[key].id
      })
      temp2.push(departmentData[key].name)
    })
    this.departmentValue = temp2
  },
  data() {
    return {
      articlesData: ARTICLES_DATA,
      articles: [],
      types,
      owner: [],
      activeUser: '张三',
      goodPing: '优秀',
      owners: ownersDefault,
      queryData: '',
      departmentValue: []
    }
  },
  methods: {
    linkTo(item) {
      this.$router.push({
        path: '/collect/display-collect',
        query: {
          item: item
        }
      })
      // window.open(details.href, '_blank')
    },
    filterFn(val, update) {
      update(() => {
        if (val === '') {
          this.owners = ownersDefault
        } else {
          const needle = val
          this.owners = ownersDefault.filter(
            (v) => v.value.indexOf(needle) > -1
          )
        }
      })
    }
  }
}
</script>

<style>
.q-item__section--side {
  padding-right: 0;
}
</style>
