import Loading from '@/components/Loading'
import Loadable from "react-loadable";
import {
  WindowsOutlined
} from '@ant-design/icons';

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
      component: Loadable({
        loader: () => import('@/pages/dialog/drag-dialog'),
        loading: Loading
      }),
      name: 'DragDialog',
      meta: { title: '拖拽 Dialog' }
    },
  ]
}
