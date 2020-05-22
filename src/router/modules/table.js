import Layout from '@/layout'

import {
  WindowsOutlined
} from '@ant-design/icons';

import DynamicTable from '@/pages/table/dynamic-table'
import PageTable from '@/pages/table/page-table'
import DragTable from '@/pages/table/drag-table'
import InlineEditTable from '@/pages/table/inline-edit-table'
import ScrollTable from '@/pages/table/scroll-table'
import ComplexTable from '@/pages/table/complex-table'

export default {
  path: '/table',
  component: Layout,
  redirect: '/table/dynamic-table',
  name: 'Table',
  meta: {
    title: 'Table',
    icon: WindowsOutlined,
    isSubmenu: true
  },
  children: [
    {
      path: 'dynamic-table',
      component: DynamicTable,
      name: 'DynamicTable',
      meta: { title: '选择列' }
    },
    {
      path: 'page-table',
      component: PageTable,
      name: 'PageTable',
      meta: { title: '分页 Table' }
    },
    {
      path: 'drag-table',
      component: DragTable,
      name: 'DragTable',
      meta: { title: '拖拽 Table' }
    },
    {
      path: 'inline-edit-table',
      component: InlineEditTable,
      name: 'InlineEditTable',
      meta: { title: 'Table 内编辑' }
    },
    {
      path: 'scroll-table',
      component: ScrollTable,
      name: 'ScrollTable',
      meta: { title: '滚动加载' }
    },
    {
      path: 'complex-table',
      component: ComplexTable,
      name: 'ComplexTable',
      meta: { title: '综合 Table' }
    },
  ]
}
