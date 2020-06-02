import {
  WindowsOutlined
} from '@ant-design/icons';

import Menu1 from '@/pages/nested/menu1'
import Menu1_1 from '@/pages/nested/menu1/menu1-1'
import Menu1_2 from '@/pages/nested/menu1/menu1-2'
import Menu1_2_1 from '@/pages/nested/menu1/menu1-2/menu1-2-1'
import Menu1_2_2 from '@/pages/nested/menu1/menu1-2/menu1-2-2'
import Menu1_3 from '@/pages/nested/menu1/menu1-3'
import Menu2 from '@/pages/nested/menu2'

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
      component: Menu1, // Parent router-view
      name: 'Menu1',
      meta: { title: '菜单 1', isSubmenu: true },
      redirect: '/nested/menu1/menu1-1',
      children: [
        {
          path: '/nested/menu1/menu1-1',
          component: Menu1_1,
          name: 'Menu1-1',
          meta: { title: '菜单 1-1' }
        },
        {
          path: '/nested/menu1/menu1-2',
          component: Menu1_2,
          name: 'Menu1-2',
          redirect: '/nested/menu1/menu1-2/menu1-2-1',
          meta: { title: '菜单 1-2', isSubmenu: true },
          children: [
            {
              path: '/nested/menu1/menu1-2/menu1-2-1',
              component: Menu1_2_1,
              name: 'Menu1-2-1',
              meta: { title: '菜单 1-2-1' }
            },
            {
              path: '/nested/menu1/menu1-2/menu1-2-2',
              component: Menu1_2_2,
              name: 'Menu1-2-2',
              meta: { title: '菜单 1-2-2' }
            }
          ]
        },
        {
          path: '/nested/menu1/menu1-3',
          component: Menu1_3,
          name: 'Menu1-3',
          meta: { title: '菜单 1-3' }
        }
      ]
    },
    {
      path: '/nested/menu2',
      component: Menu2,
      name: 'Menu2',
      meta: { title: '菜单 2' }
    }
  ]
}
