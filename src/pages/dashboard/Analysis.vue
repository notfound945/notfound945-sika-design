<template>
  <div class="sc-design q-mb-md">
    <div class='sc-base-list q-ma-md'>
      <div class='bg-white text-h6 q-pa-md sc-design'>
        <div class='row full-width justify-center'>
            <div class='text-h5 q-pa-md'>民征信息数据中心</div>
        </div>
      </div>
    </div>
    <q-resize-observer :debounce="300" />
    <div class="row q-px-sm">
      <div class="col-md-3 col-sm-6 col-xs-12 q-px-sm q-mb-md">
        <sc-shadow>
          <q-card flat class="no-border-radius text-grey-9">
            <q-card-section class="bg-white">
              <q-avatar
                color="green-1"
                size="sm"
                text-color="green"
                class="q-mr-sm"
                :icon="analysisData.visitData.icon"
              ></q-avatar>
              <span> 当天文件发布 </span>
              <span>
                <q-chip
                  size="sm"
                  square
                  outline
                  color="green"
                  class="bg-green-1 float-right"
                  label="文件数"
                ></q-chip>
              </span>
            </q-card-section>
            <q-separator />
            <q-card flat square class="q-pa-md">
              <div style="height: 70px">
                <q-item-label
                  class="text-grey-9 q-mb-md"
                  style="font-size: xx-large"
                >
                  {{ dashboard.doMessageCount }}
                </q-item-label>
              </div>
              <q-separator spaced="15px" />
              <q-item-label>
                <span>总文件发布量</span>
                <span class="float-right">{{
                  dashboard.allMessageCount
                  }}</span>
              </q-item-label>
            </q-card>
          </q-card>
        </sc-shadow>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12 q-px-sm q-mb-md">
        <sc-shadow>
          <q-card flat class="no-border-radius text-grey-9">
            <q-card-section class="bg-white">
              <q-avatar
                color="red-1"
                size="sm"
                text-color="red"
                class="q-mr-sm"
                icon="inbox"
              ></q-avatar>
              <span> 留言数 </span>
              <span>
                <q-chip
                  size="sm"
                  square
                  outline
                  color="blue"
                  class="bg-blue-1 float-right"
                  label="留言"
                ></q-chip>
              </span>
            </q-card-section>
            <q-separator />
            <q-card flat square class="q-pa-md">
              <div style="height: 70px">
                <q-item-label
                  class="text-grey-9 q-mb-md"
                  style="font-size: xx-large"
                >
                  {{ analysisData.visitData.dayVisitCount }}
                </q-item-label>
              </div>
              <q-separator spaced="15px" />
              <q-item-label>
                <span>总文件发布量</span>
                <span class="float-right">{{
                    analysisData.visitData.visitTotal
                  }}</span>
              </q-item-label>
            </q-card>
          </q-card>
        </sc-shadow>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12 q-px-sm q-mb-md">
        <sc-shadow>
          <q-card flat class="no-border-radius text-grey-9">
            <q-card-section class="bg-white">
              <q-avatar
                color="red-1"
                size="sm"
                text-color="red"
                class="q-mr-sm"
                icon="inbox"
              ></q-avatar>
              <span> 留言数 </span>
              <span>
                <q-chip
                  size="sm"
                  square
                  outline
                  color="blue"
                  class="bg-blue-1 float-right"
                  label="留言"
                ></q-chip>
              </span>
            </q-card-section>
            <q-separator />
            <q-card flat square class="q-pa-md">
              <div style="height: 70px">
                <q-item-label
                  class="text-grey-9 q-mb-md"
                  style="font-size: xx-large"
                >
                  {{ analysisData.visitData.dayVisitCount }}
                </q-item-label>
              </div>
              <q-separator spaced="15px" />
              <q-item-label>
                <span>总文件发布量</span>
                <span class="float-right">{{
                    analysisData.visitData.visitTotal
                  }}</span>
              </q-item-label>
            </q-card>
          </q-card>
        </sc-shadow>
      </div>
    </div>
  </div>
</template>

<script>
import ANALYSIS_DATA from '@/mock/data/dashboard/analysisData'
import ScShadow from 'components/shadow/ScShadow'
import { date } from 'quasar'
import { getRequest } from 'src/utils/axios'

export default {
  name: 'Analysis',
  components: {
    ScShadow
  },
  data() {
    return {
      analysisData: ANALYSIS_DATA,
      visitBarData: ANALYSIS_DATA.visitBarData,
      orderLineData: ANALYSIS_DATA.orderLineData,
      searchUserLineData: ANALYSIS_DATA.searchUserLineData,
      perPersonSearchLineData: ANALYSIS_DATA.perPersonSearchLineData,
      salePieData: ANALYSIS_DATA.salePieData,
      visitQuery: 'currentWeek',
      dashboard: {
        allMessageCount: 0,
        doMessageCount: 0
      }
    }
  },
  methods: {
    color(item) {
      if (item < 65) {
        return 'blue'
      } else if (item >= 65 && item < 90) {
        return 'purple-4'
      } else {
        return 'grey'
      }
    },
    changeQueryDate(value) {
      if (!value) {
        value = 'currentWeek'
      }
      const currentDate = date.startOfDate(new Date(), 'day')
      let lastDate = new Date()
      if (value === 'currentMonth') {
        lastDate = date.subtractFromDate(currentDate, { days: 30 })
      } else if (value === 'currentYear') {
        lastDate = date.subtractFromDate(currentDate, { days: 365 })
      } else {
        lastDate = date.subtractFromDate(currentDate, { days: 7 })
      }
      ANALYSIS_DATA.buildEbarItems(lastDate, currentDate, value, this.visitBarData)
    }
  },
  computed: {
    size() {
      if (this.$q.screen.gt.md) {
        return 'sm'
      }
      if (this.$q.screen.gt.xs) {
        return 'xs'
      }
      return '1em'
    }
  },
  async mounted() {
    this.changeQueryDate()
    ANALYSIS_DATA.buildElineItems(this.orderLineData, 100, 1000)
    ANALYSIS_DATA.buildElineItems(this.searchUserLineData, 100, 2000)
    ANALYSIS_DATA.buildElineItems(this.perPersonSearchLineData, 5, 20)
    ANALYSIS_DATA.buildEpieItems(this.salePieData)
    const messageInfo = await getRequest('/api/get-dashboard-data').then(res => {
      return res.data
    }).catch(() => {
      return null
    })
    console.log(messageInfo)
    this.dashboard = messageInfo.data
  }
}
</script>
<style lang="sass"></style>
