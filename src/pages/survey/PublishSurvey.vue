<template>
  <div class='sc-design'>
    <div class='bg-white q-pa-md'>
      <div class='text-h6'>
        <strong>新建问卷</strong>
      </div>
      <div class='text-body2'>
        添加调查问题，设置完成并检验通过后进行下一步。
      </div>
    </div>
    <div class='q-px-md'>
      <q-card square flat class='q-gutter-y-md q-mt-md q-pb-md'>
        <q-stepper
          flat
          v-model='step'
          header-nav
          ref='stepper'
          color='primary'
          animated
          :vertical='$q.screen.lt.sm'
        >
          <q-step
            :name='1'
            title='添加问卷问题'
            icon='settings'
            :done='step > 1'
            :header-nav='step > 1'
          >
            <q-form class='full-width' @submit='oneOnSubmit'>
              <div class='row q-gutter-y-sm q-pb-sm'>
                <span class='col-sm-12 col-xl-12 col-md-12'>
                  <q-item-label class='q-gutter-md'>
                     <q-btn
                       unelevated
                       class='no-border-radius'
                       color='primary'
                       @click='addSelectOption'
                       label='添加单选项'
                     />
                     <q-btn
                       unelevated
                       class='no-border-radius'
                       color='primary'
                       @click='addFillOption'
                       label='添加填空项'
                     />
                    <q-btn
                      unelevated
                      class='no-border-radius'
                      color='grey'
                      @click='fieldList = []'
                      label='清空'
                    />
                  </q-item-label>
                </span>
                <span
                  v-for='(n, index) in fieldList'
                  :key='index'
                  class='col-sm-12 col-xs-12'
                  :class="{ 'justify-end': $q.screen.gt.xs }"
                >
                <RadioField v-if='n === 1' />
                <FillField v-else-if='n === 2' />
                </span>
                <span v-if='fieldList.length === 0'>
                  <q-item-label class='text-subtitle1 q-ma-md text-red'>
                      <q-icon name="warning" size='md' />请点击上方按钮，添加对应问题。如若不这样，你将无法进行下一步。
                  </q-item-label>
                </span>
              </div>
              <q-stepper-navigation class='q-pt-sm'>
                <div class='row items-center'>
                <span class='offset-sm-3 col-sm-auto col-xs-12'>
                    <q-btn v-if='fieldList.length > 0'
                      unelevated
                      class='no-border-radius'
                      color='primary'
                      type='submit'
                      label='下一步'
                    />
                  </span>
                </div>
              </q-stepper-navigation>
              <q-separator spaced='20px' />
              <q-item-label class='text-grey-6 q-mt-md'>
                <div class='text-body1 q-mb-md'>说明</div>
                <div class='text-body2 q-my-xs'>要进行下一步，请完成表单添加</div>
                <div class='text-body2'>
                  如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
                </div>
              </q-item-label>
            </q-form>
          </q-step>
          <q-step
            :name='2'
            title='设置问卷属性'
            icon='published_with_changes'
            :done='step > 2'
            :header-nav='step > 2'
          >
            <q-form class='full-width' @submit='towOnSubmit'>
              <div class='row q-gutter-y-md'>
                <q-item-label class='q-my-md offset-sm-3 col-sm-8 col-xs-12'>
                  付款账户: {{ stepFormData.transferData.payerAccount }}
                </q-item-label>
                <q-item-label class='q-my-md offset-sm-3 col-sm-8 col-xs-12'>
                  收款账户: {{ stepFormData.transferData.payeeAccount }}
                </q-item-label>
                <q-item-label class='q-my-md offset-sm-3 col-sm-8 col-xs-12'>
                  收款人姓名: {{ stepFormData.transferData.payeeName }}
                </q-item-label>
                <q-item-label class='q-my-md offset-sm-3 col-sm-8 col-xs-12'>
                  转账金额: {{ stepFormData.transferData.amount }}元
                </q-item-label>
              </div>
              <div class='row q-gutter-y-sm'>
              <span
                class='offset-sm-3 col-sm-auto col-xs-12'
                :class="{ 'justify-end': $q.screen.gt.xs }"
              >
                <q-item-label
                  class='q-pr-md'
                  :class="{ 'text-right q-pt-sm': $q.screen.gt.xs }"
                >
                  支付密码:
                </q-item-label>
              </span>
                <span class='col-sm-auto col-xs-12'>
                <q-item-label>
                  <q-input
                    type='password'
                    outlined
                    :rules="[
                      val => val && val.length > 0 || '请输入密码',
                      val => val && val === '123456' || '密码不正确'
                    ]"
                    v-model='stepFormData.transferData.payPassword'
                    dense
                    square
                  >
                  </q-input>
                </q-item-label>
              </span>
              </div>
              <q-stepper-navigation>
                <div class='row items-center'>
                <span class='offset-sm-3 col-sm-auto col-xs-12'>
                  <q-btn
                    class='no-border-radius'
                    unelevated
                    type='submit'
                    color='primary'
                    label='提交'
                  />
                  <q-btn
                    flat
                    unelevated
                    @click='step = 1'
                    color='secondary'
                    label='上一步'
                    class='q-ml-sm no-border-radius'
                  />
                </span>
                </div>
              </q-stepper-navigation>
            </q-form>
          </q-step>

          <q-step
            :name='3'
            title='完成问卷创建'
            icon='add_comment'
            :header-nav='step > 3'
          >
            <q-card-section class='row items-center justify-center q-gutter-md'>
              <div class='inline-block text-center col-sm-auto col-xs-12'>
                <q-item-label class='q-pb-sm'>
                  <q-icon name='check_circle' color='positive' size='70px' />
                </q-item-label>
                <q-item-label class='text-h6 q-py-sm'>操作成功</q-item-label>
                <q-item-label caption>预计两小时内到账</q-item-label>
                <q-item-label class='q-pt-lg'>
                  <q-btn
                    class='no-border-radius'
                    unelevated
                    color='primary'
                    @click='againTransfer'
                    label='再转一笔'
                  />
                  <q-btn
                    unelevated
                    @click='searchOrder'
                    color='secondary'
                    label='查看账单'
                    class='q-ml-sm no-border-radius'
                  />
                </q-item-label>
              </div>
              <div class='text-left inline-block q-ml-xl col-sm-auto col-xs-12'>
                <q-item-label class='q-py-sm'>
                  付款账户: {{ stepFormData.transferData.payerAccount }}
                </q-item-label>
                <q-item-label class='q-py-sm'>
                  收款账户: {{ stepFormData.transferData.payeeAccount }}
                </q-item-label>
                <q-item-label class='q-py-sm'>收款人姓名: {{ stepFormData.transferData.payeeName }}</q-item-label>
                <q-item-label class='q-py-sm'>转账金额: {{ stepFormData.transferData.amount }}元</q-item-label>
              </div>
            </q-card-section>
          </q-step>
        </q-stepper>
      </q-card>
    </div>
  </div>
</template>

<script>
import STEP_FORM_DATA from '@/mock/data/form/stepFormData'
import RadioField from 'components/field/RadioField'
import FillField from 'components/field/FillField'

export default {
  name: 'PublishSurvey',
  components: {
    RadioField,
    FillField
  },
  data() {
    return {
      stepFormData: STEP_FORM_DATA,
      step: 1,
      fieldList: []
    }
  },
  methods: {
    addSelectOption() {
      console.log('add select ')
      this.fieldList.push(1)
    },
    addFillOption() {
      this.fieldList.push(2)
      console.log('add fill')
    },
    oneOnSubmit() {
      this.step = 2
    },
    towOnSubmit() {
      this.step = 3
    },
    againTransfer() {
      for (const key in this.stepFormData.transferData) {
        this.stepFormData.transferData[key] = null
      }
      this.step = 1
    },
    searchOrder() {
      this.$q.notify({
        position: 'top',
        color: 'info',
        textColor: 'white',
        icon: 'cloud_done',
        group: false,
        html: true,
        message: '提交成功！！'
      })
    }
  }
}
</script>

<style lang='sass'>
</style>
