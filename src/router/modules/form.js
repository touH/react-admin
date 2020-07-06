import Loading from '@/components/Loading'
import Loadable from "react-loadable";
import {
  WindowsOutlined
} from '@ant-design/icons';

export default {
  path: '/form',
  redirect: '/form/base-form',
  name: 'Form',
  meta: {
    title: 'Form',
    icon: WindowsOutlined,
    isSubmenu: true
  },
  children: [
    {
      path: '/form/base-form',
      component: Loadable({
        loader: () => import('@/pages/form/base-form'),
        loading: Loading
      }),
      name: 'BaseForm',
      meta: { title: '基础 Form' }
    },
  ]
}
