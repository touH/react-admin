// 路由加载
import Loadable from "react-loadable";
import Loading from '@/components/Loading'

const dynamicWrapper = (loader) => {
  return Loadable({
    loader,
    loading: Loading
  })
}

// 常量路由
export const constantRouters = [
  {
    title: 'Login',
    path: '/login',
    name: 'Login',
    component: dynamicWrapper(() => import('@/pages/login'))
  },
  {
    title: '404',
    path: '/404',
    name: '404',
    component: dynamicWrapper(() => import('@/pages/error-page/404'))
  },
  {
    title: '500',
    path: '/500',
    name: '500',
    component: dynamicWrapper(() => import('@/pages/error-page/500'))
  }
];

// app应用 菜单路由
export const appRouters = [

  // Home
  {
    path: '/home',
    component: dynamicWrapper(() => import('@/pages/home'))
  },

  // Permission
  {
    path: '/permission/page',
    component: dynamicWrapper(() => import('@/pages/permission/page'))
  },
  {
    path: '/permission/role',
    component: dynamicWrapper(() => import('@/pages/permission/role'))
  },

  //  Components
  {
    path: '/components/tinymce',
    component: dynamicWrapper(() => import('@/pages/components/tinymce'))
  },
  {
    path: '/components/markdown',
    component: dynamicWrapper(() => import('@/pages/components/markdown'))
  },
  {
    path: '/components/json-editor',
    component: dynamicWrapper(() => import('@/pages/components/json-editor'))
  },
  {
    path: '/components/upload',
    component: dynamicWrapper(() => import('@/pages/components/upload'))
  },
  {
    path: '/components/count-to',
    component: dynamicWrapper(() => import('@/pages/components/count-to'))
  },
  {
    path: '/components/back-to-top',
    component: dynamicWrapper(() => import('@/pages/components/back-to-top'))
  },
  {
    path: '/components/drag-list',
    component: dynamicWrapper(() => import('@/pages/components/drag-list'))
  },

  // Table
  {
    path: '/table/dynamic-table',
    component: dynamicWrapper(() => import('@/pages/table/dynamic-table'))
  },
  {
    path: '/table/page-table',
    component: dynamicWrapper(() => import('@/pages/table/page-table'))
  },
  {
    path: '/table/drag-table',
    component: dynamicWrapper(() => import('@/pages/table/drag-table'))
  },
  {
    path: '/table/inline-edit-table',
    component: dynamicWrapper(() => import('@/pages/table/inline-edit-table'))
  },
  {
    path: '/table/scroll-table',
    component: dynamicWrapper(() => import('@/pages/table/scroll-table'))
  },
  {
    path: '/table/complex-table',
    component: dynamicWrapper(() => import('@/pages/table/complex-table'))
  },

  // Dialog
  {
    path: '/dialog/drag-dialog',
    component: dynamicWrapper(() => import('@/pages/dialog/drag-dialog'))
  },

  // Form
  {
    path: '/form/base-form',
    component: dynamicWrapper(() => import('@/pages/form/base-form'))
  },

  // Nested
  {
    path: '/nested/menu1/menu1-1',
    component: dynamicWrapper(() => import('@/pages/nested/menu1/menu1-1'))
  },
  {
    path: '/nested/menu1/menu1-2/menu1-2-1',
    component: dynamicWrapper(() => import('@/pages/nested/menu1/menu1-2/menu1-2-1'))
  },
  {
    path: '/nested/menu1/menu1-2/menu1-2-2',
    component: dynamicWrapper(() => import('@/pages/nested/menu1/menu1-2/menu1-2-2'))
  },
  {
    path: '/nested/menu1/menu1-3',
    component: dynamicWrapper(() => import('@/pages/nested/menu1/menu1-3'))
  },
  {
    path: '/nested/menu2',
    component: dynamicWrapper(() => import('@/pages/nested/menu2'))
  }
];
