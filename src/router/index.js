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

export const baseName = '/app';

export const constantRoutes = [
  {
    path: '/login',
    component: Login,
    name: 'Login',
    hidden: true
  },
  // {
  //   path: '/redirect',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/redirect/:path(.*)',
  //       component: Redirect
  //     }
  //   ]
  // },
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

// 因为前面<Route> 路径是以 /app 前缀开始，为了不在业务中增加前缀，所以主要在该文件中添加, 对菜单的路由中的 name 和 redirect 字段的值，增加 /app 前缀
const addBasename = (basename, routes) => {
  routes.forEach(route => {
    if(route.path) {
      route.path = basename + route.path
    }
    if(route.redirect) {
      route.redirect = basename + route.redirect
    }
    if(route.children && route.children.length) {
      addBasename(basename, route.children)
    }
  })
  return routes
}
// 需要根据用户角色动态加载的路由，即权限判断
export const asyncMenuRoutes = addBasename('/app', [
  {
    path: '/home/index',
    name: 'Home',
    meta: {
      title: '首页',
      icon: WindowsOutlined,
      affix: true
    },
    component: Home,
  },
  {
    path: '/permission',
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
])

// 将 route.js 的树形菜单路由 扩展为 都是同一兄弟级的路由
export const getExpandMenuRoutes = routes => {
  return routes.reduce((totalRoutes, route) => {
    let subs = [];
    if(route.children && route.children.length) {
      subs = getExpandMenuRoutes(route.children)
    }
    return [...totalRoutes, route, ...subs]
  }, [])
}
