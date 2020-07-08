import { WindowsOutlined } from '@ant-design/icons';

const menuData = [
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '首页',
      icon: WindowsOutlined,
      affix: true
    },
  },
  {
    path: '/permission',
    redirect: '/permission/page',
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: WindowsOutlined,
      roles: ['admin', 'other'],
    },
    children: [
      {
        path: '/permission/page',
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
        }
      },
      {
        path: '/permission/role',
        name: 'RolePermission',
        meta: {
          title: '角色管理',
          roles: ['admin']
        }
      }
    ]
  },
]
