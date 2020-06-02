import {
  WindowsOutlined
} from '@ant-design/icons';

import DragDialog from '@/pages/dialog/drag-dialog'

export default {
  path: '/dialog',
  redirect: '/dialog/drag-dialog',
  name: 'Dialog',
  meta: {
    title: 'Dialog',
    icon: WindowsOutlined,
    isSubmenu: true
  },
  children: [
    {
      path: '/dialog/drag-dialog',
      component: DragDialog,
      name: 'DragDialog',
      meta: { title: '拖拽 Dialog' }
    },
  ]
}
