import Login from '@/pages/login'
import Layout from '@/layout'
import _404 from '@/pages/error-page/404'
import _500 from '@/pages/error-page/500'
import Home from '@/pages/home'
import Redirect from '@/pages/redirect'

import PagePermission from '@/pages/permission/page'
import RolePermission from '@/pages/permission/role'

import {
  WindowsOutlined
} from '@ant-design/icons';

/* Router Modules */
import componentsRouter from "./modules/components";
import tableRouter from "./modules/table";
import dialogRouter from "./modules/dialog";
import formRouter from "./modules/form";
import nestedRouter from "./modules/nested";

export const constantRoutes = [
  {
    path: '/login',
    component: Login,
    name: 'Login',
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: Redirect
      }
    ]
  },
  {
    path: '/404',
    component: _404,
    name: '_404',
    hidden: true
  },
  {
    path: '/500',
    component: _500,
    name: '_500',
    hidden: true
  }
];

// 需要根据用户角色动态加载的路由，即权限判断
export const asyncMenuRoutes = [
  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    children: [
      {
        path: '/home/index',
        name: 'Home',
        meta: {
          title: '首页',
          icon: WindowsOutlined,
          affix: true
        },
        component: Home,
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: WindowsOutlined,
      roles: ['admin', 'other'],
      isSubmenu: true
    },
    children: [
      {
        path: '/permission/page',
        component: PagePermission,
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
        }
      },
      {
        path: '/permission/role',
        component: RolePermission,
        name: 'RolePermission',
        meta: {
          title: '角色管理',
          roles: ['admin']
        }
      }
    ]
  },
  componentsRouter,
  tableRouter,
  dialogRouter,
  formRouter,
  nestedRouter
]
