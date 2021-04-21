<template>
  <div class='sc-design'>
    <div>
      <q-form @submit='onSubmit' @reset='onReset' ref='loginForm'>
        <q-tabs
          v-model='tab'
          active-color='primary'
          indicator-color='primary'
          align='left'
          :breakpoint='0'
          narrow-indicator
          class='text-black'
        >
          <q-tab name='mails' no-caps :label="$t('user.login.userPasswordLogin')" />
        </q-tabs>
        <div class='q-gutter-y-sm'>
          <q-tab-panels v-model='tab' class='text-center'>
            <q-tab-panel name='mails' class='q-col-gutter-y-sm'>
              <div class='row'>
                <div class='col'>
                  <q-input
                    outlined
                    clearable
                    clear-icon='cancel'
                    v-model='username'
                    dense
                    debounce='500'
                    :label='userNameLabel'
                    lazy-rules
                    square
                    :rules="[
                      (val) => (val && val.length > 0) || '请输入用户名'
                    ]"
                  >
                    <template v-slot:prepend>
                      <q-icon name='person' />
                    </template>
                  </q-input>
                </div>
              </div>
              <div class='row'>
                <div class='col'>
                  <q-input
                    outlined
                    clearable
                    clear-icon='cancel'
                    :type="isPwd ? 'password' : 'text'"
                    v-model='password'
                    dense
                    debounce='500'
                    :label='passwordLabel'
                    lazy-rules
                    square
                    :rules="[(val) => (val && val.length > 0) || '请输入密码']"
                  >
                    <template v-slot:prepend>
                      <q-icon name='https' />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class='cursor-pointer'
                        @click='isPwd = !isPwd'
                      />
                    </template>
                  </q-input>
                </div>
              </div>
              <div class='row'>
                <div class='col'>
                  <q-input
                    outlined
                    clearable
                    clear-icon='cancel'
                    v-model='validate'
                    dense
                    debounce='500'
                    :label='validateLabel'
                    lazy-rules
                    square
                    :rules="[(val) => (val && val.length > 0) || '请输入验证码']"
                  >
                    <template v-slot:prepend>
                      <q-icon name='verified_user' />
                    </template>
                    <q-popup-proxy>
                      <q-banner>
                        <template v-slot:avatar>
                          <q-icon name='dialpad' color='secondary' />
                        </template>
                        <img alt='加载失败' title='看不清？更换一张' @click='changeValidate'
                             style='width: 100px; font-size: 15px; text-align: center' :src='imgUrl'>
                      </q-banner>
                    </q-popup-proxy>
                  </q-input>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
          <div class='q-mx-md'>
            <div class='row'>
              <div class='col'>
                <q-btn
                  no-caps
                  dense
                  unelevated
                  :label="$t('user.login.login')"
                  size='17px'
                  color='primary q-mt-sm'
                  class='full-width no-border-radius'
                  type='submit'
                  :loading='loginLogin'
                >
                  <template v-slot:loading>
                    <q-spinner-ios class='on-left' />
                    {{ $t('user.login.login') }} ...
                  </template>
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </q-form>
    </div>
    <q-dialog
      v-model='currentLogin.login'
      persistent
      transition-show='scale'
      transition-hide='scale'
    >
      <q-card class='bg-teal text-white' style='width: 300px'>
        <q-card-section>
          <div class='text-h6'>Persistent</div>
        </q-card-section>

        <q-card-section class='q-pt-none'>
          {{ currentLogin.obj }}
        </q-card-section>

        <q-card-actions align='right' class='bg-white text-teal'>
          <q-btn flat label='OK' v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { postRequest, getRequest } from 'utils/axios'
import { Notify } from 'quasar'

export default {
  name: 'Login',
  async mounted() {
    // 加载验证码
    this.verifyImage = await getRequest(
      '/api/get-captcha-image', 'blob').then(result => {
      return result.data
    }).catch(() => {
      return null
    })
    const blob = new Blob([this.verifyImage], { type: 'image/png;charset=utf-8' })
    this.imgUrl = window.URL.createObjectURL(blob)
    console.log(this.imgUrl)
  },
  data() {
    return {
      // 验证图片
      verifyImage: null,
      // 验证码图片地址
      imgUrl: '',
      iconObject: {
        github: {
          class: {
            iconName: 'iconhuaban88',
            color: 'text-grey'
          },
          size: '23px',
          type: 'link'
        }
      },
      iconActive: {
        weibo: 'grey'
      },
      userNameLabel: this.$t('user.login.userName'),
      passwordLabel: this.$t('user.login.password'),
      validateLabel: this.$t('user.login.validate'),
      tab: 'mails',
      username: null,
      password: null,
      validate: null,
      accept: false,
      isPwd: true,
      autoLogin: true,
      card: false,
      loginLogin: false,
      currentLogin: {
        login: false,
        obj: {}
      }
    }
  },
  methods: {
    onSubmit() {
      const params = {
        username: this.username,
        password: this.password,
        validate: this.validate
      }
      postRequest('/api/login', params).then(res => {
        console.log('res ', res)
        if (res.data.responseStatus === 200) {
          console.log('登录成功')
          Notify.create({
            position: 'top',
            color: 'green-4',
            textColor: 'white',
            icon: 'sentiment_very_satisfied',
            message: res.data.responseRemark
          })
          this.loginLogin = true
          this.$q.localStorage.set('name', this.name)
          this.$router.push({
            path: '/'
          })
        } else {
          this.loginLogin = false
          if (res) {
            Notify.create({
              position: 'top',
              color: 'red-4',
              textColor: 'white',
              icon: 'cancel',
              message: res.data.responseRemark
            })
          } else {
            Notify.create({
              position: 'top',
              color: 'red-6',
              textColor: 'white',
              icon: 'cancel',
              message: '登录异常'
            })
          }
        }
      }).catch(err => {
        console.error(err)
      })
    },
    async changeValidate() {
      this.verifyImage = null
      this.imgUrl = null
      // 加载验证码
      this.verifyImage = await getRequest(
        '/api/get-captcha-image', 'blob').then(result => {
        return result.data
      }).catch(() => {
        return null
      })
      const blob = new Blob([this.verifyImage], { type: 'image/png;charset=utf-8' })
      this.imgUrl = window.URL.createObjectURL(blob)
    },
    onReset() {
      this.name = null
      this.age = null
      this.accept = false
    },
    mouseOver(iconKey, event) {
      this.activeForLoginType(iconKey, 'text-primary')
    },
    mouseLeave(iconKey, event) {
      this.activeForLoginType(iconKey, 'text-grey')
    },
    activeForLoginType(iconKey, targetColor) {
      this.iconObject[iconKey].class.color = targetColor
    },
    thirdLogin(iconKey, event) {
      this.currentLogin.login = true
      this.currentLogin.obj = this.iconObject[iconKey]
    }
  },
  computed: {
    loginIcon: function() {
      return this.iconObject
    }
  }
}
</script>

<style scoped>
.q-tab-panel {
}

.flip-list-move {
  transition: transform 1s;
}
</style>
