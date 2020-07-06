import Loading from '@/components/Loading'
import Loadable from "react-loadable";
import {
  WindowsOutlined
} from '@ant-design/icons';

export default {
  path: '/nested',
  redirect: '/nested/menu1/menu1-1',
  name: 'Nested',
  meta: {
    title: '路由嵌套',
    icon: WindowsOutlined,
    isSubmenu: true
  },
  children: [
    {
      path: '/nested/menu1',
      component: Loadable({
        loader: () => import('@/pages/nested/menu1'),
        loading: Loading
      }),
      name: 'Menu1',
      meta: { title: '菜单 1', isSubmenu: true },
      redirect: '/nested/menu1/menu1-1',
      children: [
        {
          path: '/nested/menu1/menu1-1',
          component: Loadable({
            loader: () => import('@/pages/nested/menu1/menu1-1'),
            loading: Loading
          }),
          name: 'Menu1-1',
          meta: { title: '菜单 1-1' }
        },
        {
          path: '/nested/menu1/menu1-2',
          component: Loadable({
            loader: () => import('@/pages/nested/menu1/menu1-2'),
            loading: Loading
          }),
          name: 'Menu1-2',
          redirect: '/nested/menu1/menu1-2/menu1-2-1',
          meta: { title: '菜单 1-2', isSubmenu: true },
          children: [
            {
              path: '/nested/menu1/menu1-2/menu1-2-1',
              component: Loadable({
                loader: () => import('@/pages/nested/menu1/menu1-2/menu1-2-1'),
                loading: Loading
              }),
              name: 'Menu1-2-1',
              meta: { title: '菜单 1-2-1' }
            },
            {
              path: '/nested/menu1/menu1-2/menu1-2-2',
              component: Loadable({
                loader: () => import('@/pages/nested/menu1/menu1-2/menu1-2-2'),
                loading: Loading
              }),
              name: 'Menu1-2-2',
              meta: { title: '菜单 1-2-2' }
            }
          ]
        },
        {
          path: '/nested/menu1/menu1-3',
          component: Loadable({
            loader: () => import('@/pages/nested/menu1/menu1-3'),
            loading: Loading
          }),
          name: 'Menu1-3',
          meta: { title: '菜单 1-3' }
        }
      ]
    },
    {
      path: '/nested/menu2',
      component: Loadable({
        loader: () => import('@/pages/nested/menu2'),
        loading: Loading
      }),
      name: 'Menu2',
      meta: { title: '菜单 2' }
    }
  ]
}
