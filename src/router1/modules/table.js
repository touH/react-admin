import Loading from '@/components/Loading'
import Loadable from "react-loadable";
import {
  WindowsOutlined
} from '@ant-design/icons';

export default {
  path: '/table',
  redirect: '/table/dynamic-table',
  name: 'Table',
  meta: {
    title: 'Table',
    icon: WindowsOutlined,
    isSubmenu: true
  },
  children: [
    {
      path: '/table/dynamic-table',
      component: Loadable({
        loader: () => import('@/pages/table/dynamic-table'),
        loading: Loading
      }),
      name: 'DynamicTable',
      meta: { title: '选择列' }
    },
    {
      path: '/table/page-table',
      component: Loadable({
        loader: () => import('@/pages/table/page-table'),
        loading: Loading
      }),
      name: 'PageTable',
      meta: { title: '分页 Table' }
    },
    {
      path: '/table/drag-table',
      component: Loadable({
        loader: () => import('@/pages/table/drag-table'),
        loading: Loading
      }),
      name: 'DragTable',
      meta: { title: '拖拽 Table' }
    },
    {
      path: '/table/inline-edit-table',
      component: Loadable({
        loader: () => import('@/pages/table/inline-edit-table'),
        loading: Loading
      }),
      name: 'InlineEditTable',
      meta: { title: 'Table 内编辑' }
    },
    {
      path: '/table/scroll-table',
      component: Loadable({
        loader: () => import('@/pages/table/scroll-table'),
        loading: Loading
      }),
      name: 'ScrollTable',
      meta: { title: '滚动加载' }
    },
    {
      path: '/table/complex-table',
      component: Loadable({
        loader: () => import('@/pages/table/complex-table'),
        loading: Loading
      }),
      name: 'ComplexTable',
      meta: { title: '综合 Table' }
    },
  ]
}
