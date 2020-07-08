import Loadable from "react-loadable";
import Loading from '@/components/Loading'

export const constantRoutes = [
  {
    path: '/login',
    component: Loadable({
      loader: () => import('@/pages/login'),
      loading: Loading
    }),
  },
  {
    path: '/404',
    component: Loadable({
      loader: () => import('@/pages/error-page/404'),
      loading: Loading
    }),
  },
  {
    path: '/500',
    component: Loadable({
      loader: () => import('@/pages/error-page/500'),
      loading: Loading
    }),
  }
];

const appRouters = [

  // Home
  {
    path: '/home',
    component: Loadable({
      loader: () => import('@/pages/home'),
      loading: Loading
    }),
  },

  // Permission
  {
    path: '/permission/page',
    component: Loadable({
      loader: () => import('@/pages/permission/page'),
      loading: Loading
    }),
  },
  {
    path: '/permission/role',
    component: Loadable({
      loader: () => import('@/pages/permission/role'),
      loading: Loading
    }),
  },

  //  Components
  {
    path: '/components/tinymce',
    component: Loadable({
      loader: () => import('@/pages/components/tinymce'),
      loading: Loading
    }),
  },
  {
    path: '/components/markdown',
    component: Loadable({
      loader: () => import('@/pages/components/markdown'),
      loading: Loading
    }),
  },
  {
    path: '/components/json-editor',
    component: Loadable({
      loader: () => import('@/pages/components/json-editor'),
      loading: Loading
    }),
  },
  {
    path: '/components/upload',
    component: Loadable({
      loader: () => import('@/pages/components/upload'),
      loading: Loading
    }),
  },
  {
    path: '/components/count-to',
    component: Loadable({
      loader: () => import('@/pages/components/count-to'),
      loading: Loading
    }),
  },
  {
    path: '/components/back-to-top',
    component: Loadable({
      loader: () => import('@/pages/components/back-to-top'),
      loading: Loading
    }),
  },
  {
    path: '/components/drag-list',
    component: Loadable({
      loader: () => import('@/pages/components/drag-list'),
      loading: Loading
    }),
  },

  // Table
  {
    path: '/table/dynamic-table',
    component: Loadable({
      loader: () => import('@/pages/table/dynamic-table'),
      loading: Loading
    }),
  },
  {
    path: '/table/page-table',
    component: Loadable({
      loader: () => import('@/pages/table/page-table'),
      loading: Loading
    }),
  },
  {
    path: '/table/drag-table',
    component: Loadable({
      loader: () => import('@/pages/table/drag-table'),
      loading: Loading
    }),
  },
  {
    path: '/table/inline-edit-table',
    component: Loadable({
      loader: () => import('@/pages/table/inline-edit-table'),
      loading: Loading
    }),
  },
  {
    path: '/table/scroll-table',
    component: Loadable({
      loader: () => import('@/pages/table/scroll-table'),
      loading: Loading
    }),
  },
  {
    path: '/table/complex-table',
    component: Loadable({
      loader: () => import('@/pages/table/complex-table'),
      loading: Loading
    }),
  },

  // Dialog
  {
    path: '/dialog/drag-dialog',
    component: Loadable({
      loader: () => import('@/pages/dialog/drag-dialog'),
      loading: Loading
    }),
  },

  // Form
  {
    path: '/form/base-form',
    component: Loadable({
      loader: () => import('@/pages/form/base-form'),
      loading: Loading
    }),
  },

  // Nested
  {
    path: '/nested/menu1/menu1-1',
    component: Loadable({
      loader: () => import('@/pages/nested/menu1/menu1-1'),
      loading: Loading
    }),
  },
  {
    path: '/nested/menu1/menu1-2/menu1-2-1',
    component: Loadable({
      loader: () => import('@/pages/nested/menu1/menu1-2/menu1-2-1'),
      loading: Loading
    }),
  },
  {
    path: '/nested/menu1/menu1-2/menu1-2-2',
    component: Loadable({
      loader: () => import('@/pages/nested/menu1/menu1-2/menu1-2-2'),
      loading: Loading
    }),
  },
  {
    path: '/nested/menu1/menu1-3',
    component: Loadable({
      loader: () => import('@/pages/nested/menu1/menu1-3'),
      loading: Loading
    }),
  },
  {
    path: '/nested/menu2',
    component: Loadable({
      loader: () => import('@/pages/nested/menu2'),
      loading: Loading
    }),
  }
]
