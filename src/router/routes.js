const routes = [
  {
    path: '/dashboard/analysis',
    name: '/dashboard/analysis',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/dashboard/Analysis')
      }
    ]
  },
  {
    path: '/dashboard/monitor',
    name: '/dashboard/monitor',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/dashboard/Monitor')
      }
    ]
  },
  {
    path: '/dashboard/workplace',
    name: '/dashboard/workplace',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/dashboard/Workplace')
      }
    ]
  },
  {
    path: '/dashboard/DB-monitor',
    name: '/dashboard/DB-monitor',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/dashboard/DBMonitor')
      }
    ]
  },
  {
    path: '/public-government/latest-file',
    name: '/publicgovernment/latest-file',
    component: () => import('layouts/MainLayout'),
    children: [
      {
        path: '',
        component: () => import('pages/public-government/LatestFile')
      }
    ]
  },
  {
    path: '/public-government/department-dynamic',
    name: '/public-government/department-dynamic',
    component: () => import('layouts/MainLayout'),
    children: [
      {
        path: '',
        component: () => import('pages/public-government/DepartmentDynamic')
      }
    ]
  },
  {
    path: '/public-government/public-latest-file',
    name: '/public-government/public-latest-file',
    component: () => import('layouts/MainLayout'),
    children: [
      {
        path: '',
        component: () => import('pages/public-government/PublicLatestFile')
      }
    ]
  },
  {
    path: '/public-government/display-article',
    name: '/public-government/display-article',
    component: () => import('layouts/MainLayout'),
    children: [
      {
        path: '',
        component: () => import('pages/public-government/DisplayArticle')
      }
    ]
  },
  {
    path: '/collect/publish-collect',
    name: '/collect/publish-collect',
    component: () => import('layouts/MainLayout'),
    children: [
      {
        path: '',
        component: () => import('pages/collect/PublishCollect')
      }
    ]
  },
  {
    path: '/collect/list-collect',
    name: '/collect/list-collect',
    component: () => import('layouts/MainLayout'),
    children: [
      {
        path: '',
        component: () => import('pages/collect/ListCollect')
      }
    ]
  },
  {
    path: '/collect/callback-collect',
    name: '/collect/callback-collect',
    component: () => import('layouts/MainLayout'),
    children: [
      {
        path: '',
        component: () => import('pages/collect/CallbackCollect')
      }
    ]
  },
  {
    path: '/collect/display-collect',
    name: '/collect/display-collect',
    component: () => import('layouts/MainLayout'),
    children: [
      {
        path: '',
        component: () => import('pages/collect/DisplayCollect')
      }
    ]
  },
  {
    path: '/survey/publish-survey',
    name: '/survey/publish-survey',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/survey/PublishSurvey')
      }
    ]
  },
  {
    path: '/survey/list-survey',
    name: '/survey/list-survey',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/survey/ListSurvey')
      }
    ]
  },
  {
    path: '/survey/analyze-survey',
    name: '/survey/analyze-survey',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/survey/AnalyzeSurvey')
      }
    ]
  },
  {
    path: '/survey/display-survey',
    name: '/survey/display-survey',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/survey/DisplaySurvey')
      }
    ]
  },
  {
    path: '/message/new-message',
    name: '/message/new-message',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/message/NewMessage')
      }
    ]
  },
  {
    path: '/message/list-message',
    name: '/message/list-message',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/message/ListMessage')
      }
    ]
  },
  {
    path: '/message/reply-message',
    name: '/message/reply-message',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/message/ReplyMessage')
      }
    ]
  },
  {
    path: '/message/display-message',
    name: '/message/display-message',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/message/DisplayMessage')
      }
    ]
  },
  {
    path: '/form/basic-form',
    name: '/form/basic-form',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/form/BasicForm')
      }
    ]
  },
  {
    path: '/form/advanced-form',
    name: '/form/advanced-form',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/form/AdvancedForm')
      }
    ]
  },
  {
    path: '/form/step-form',
    name: '/form/step-form',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/form/StepForm')
      }
    ]
  },
  {
    path: '/profile/basic',
    name: '/profile/basic',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/profile/basic')
      }
    ]
  },
  {
    path: '/profile/advanced',
    name: '/profile/advanced',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/profile/advanced')
      }
    ]
  },
  {
    path: '/account/center',
    name: '/account/center',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/account/Center')
      }
    ]
  },
  {
    path: '/account/settings',
    name: '/account/settings',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/account/Settings')
      }
    ]
  },
  {
    path: '/result/success',
    name: '/result/success',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/result/Success')
      }
    ]
  },
  {
    path: '/result/fail',
    name: '/result/fail',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/result/Fail')
      }
    ]
  },
  {
    path: '/exception/403',
    name: '/exception/403',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages//exception/403')
      }
    ]
  },
  {
    path: '/exception/404',
    name: '/exception/404',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages//exception/404')
      }
    ]
  },
  {
    path: '/exception/500',
    name: '/exception/500',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages//exception/500')
      }
    ]
  },
  {
    path: '/list/search/projects',
    name: '/list/search/projects',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/list/search/Projects')
      }
    ]
  },
  {
    path: '/list/search/applications',
    name: '/list/search/applications',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/list/search/Applications')
      }
    ]
  },
  {
    path: '/list/search/articles',
    name: '/list/search/articles',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/list/search/Articles')
      }
    ]
  },
  {
    path: '/list/user-list',
    name: '/list/user-list',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/list/UserList')
      }
    ]
  },
  {
    path: '/list/goods-list',
    name: '/list/goods-list',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/list/GoodsList')
      }
    ]
  },
  {
    path: '/list/card-list',
    name: '/list/card-list',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/list/CardList')
      }
    ]
  },
  {
    path: '/list/basic-list',
    name: '/list/basic-list',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/list/BasicList')
      }
    ]
  },
  {
    path: '/list/table-list',
    name: '/list/table-list',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/list/TableList')
      }
    ]
  },
  {
    path: '/user/login',
    name: '/user/login',
    component: () => import('layouts/UserLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/user/Login.vue')
      }
    ]
  },
  {
    path: '/user/register',
    name: '/user/register',
    component: () => import('layouts/UserLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/user/Register.vue')
      }
    ]
  },
  {
    path: '/user/register',
    name: '/user/register',
    component: () => import('layouts/UserLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/user/Register.vue')
      }
    ]
  },
  {
    path: '/user/registerResult',
    name: '/user/registerResult',
    props: true,
    component: () => import('layouts/UserLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/user/RegisterResult.vue')
      }
    ]
  },
  {
    path: '/editor/customer',
    name: '/editor/customer',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/editor/Customer')
      }
    ]
  },
  {
    path: '/editor/markdown',
    name: '/editor/markdown',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/editor/Markdown')
      }
    ]
  },
  {
    path: '/',
    name: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/dashboard/Analysis.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    // component: () => import('pages/Error404.vue')
    component: () => import('pages/exception/404.vue')
  }
]

export default routes
