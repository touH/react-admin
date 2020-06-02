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
      component: DynamicTable,
      name: 'DynamicTable',
      meta: { title: '选择列' }
    },
    {
      path: '/table/page-table',
      component: PageTable,
      name: 'PageTable',
      meta: { title: '分页 Table' }
    },
    {
      path: '/table/drag-table',
      component: DragTable,
      name: 'DragTable',
      meta: { title: '拖拽 Table' }
    },
    {
      path: '/table/inline-edit-table',
      component: InlineEditTable,
      name: 'InlineEditTable',
      meta: { title: 'Table 内编辑' }
    },
    {
      path: '/table/scroll-table',
      component: ScrollTable,
      name: 'ScrollTable',
      meta: { title: '滚动加载' }
    },
    {
      path: '/table/complex-table',
      component: ComplexTable,
      name: 'ComplexTable',
      meta: { title: '综合 Table' }
    },
  ]
}
