import Loading from '@/components/Loading'
import Loadable from "react-loadable";
import {
  WindowsOutlined
} from '@ant-design/icons';

export default  {
  path: '/components',
  redirect: '/components/tinymce',
  name: 'Components',
  meta: {
    title: 'Components',
    icon: WindowsOutlined,
    isSubmenu: true
  },
  children: [
    {
      path: '/components/tinymce',
      component: Loadable({
        loader: () => import('@/pages/components/tinymce'),
        loading: Loading
      }),
      name: 'Tinymce',
      meta: { title: 'Tinymce' }
    },
    {
      path: '/components/markdown',
      component: Loadable({
        loader: () => import('@/pages/components/markdown'),
        loading: Loading
      }),
      name: 'Markdown',
      meta: { title: 'Markdown' }
    },
    {
      path: '/components/json-editor',
      component: Loadable({
        loader: () => import('@/pages/components/json-editor'),
        loading: Loading
      }),
      name: 'JsonEditor',
      meta: { title: 'JSON Editor' }
    },
    {
      path: '/components/upload',
      component: Loadable({
        loader: () => import('@/pages/components/upload'),
        loading: Loading
      }),
      name: 'Upload',
      meta: { title: '文件上传' }
    },
    {
      path: '/components/count-to',
      component: Loadable({
        loader: () => import('@/pages/components/count-to'),
        loading: Loading
      }),
      name: 'CountTo',
      meta: { title: '计数' }
    },
    {
      path: '/components/back-to-top',
      component: Loadable({
        loader: () => import('@/pages/components/back-to-top'),
        loading: Loading
      }),
      name: 'BackToTop',
      meta: { title: '回到顶部' }
    },
    {
      path: '/components/drag-list',
      component: Loadable({
        loader: () => import('@/pages/components/drag-list'),
        loading: Loading
      }),
      name: 'DragList',
      meta: { title: '拖拽 List' }
    },
  ]
}
