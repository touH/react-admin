import Loadable from 'react-loadable';
import Loading from '@/components/Loading'

import {
  WindowsOutlined
} from '@ant-design/icons';

/* Router Modules */
import componentsRouter from "./modules/components";
import tableRouter from "./modules/table";
import dialogRouter from "./modules/dialog";
import formRouter from "./modules/form";
import nestedRouter from "./modules/nested";

/*
hidden: 用于表示该路由是否显示与菜单中，即是否是菜单路由，hidden: true为其他路由，false或者不写为菜单路由
meta: {
  title: String         菜单标题
  icon: String          菜单图标
  roles: Array          角色
  isSubmenu: Boolean    是否是多级菜单，即是否有子菜单，true是，false不是
  affix: Boolean        是否在tagsView中默认永远显示，不被删除， 如：让首页默认显示
  noCache: Boolean      如果设置为true，则表示不需要缓存。主要用于tagsView中，用户缓存。  如果不设置或者false，因为keep-alive的原因会缓存。。
}
 */

export const constantRoutes = [
  {
    path: '/login',
    component: Loadable({
      loader: () => import('@/pages/login'),
      loading: Loading
    }),
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
    component: Loadable({
      loader: () => import('@/pages/error-page/404'),
      loading: Loading
    }),
    name: '_404',
    hidden: true
  },
  {
    path: '/500',
    component: Loadable({
      loader: () => import('@/pages/error-page/500'),
      loading: Loading
    }),
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

export const baseName = '/app';

// 需要根据用户角色动态加载的路由，即权限判断
export const asyncMenuRoutes = addBasename(baseName, [
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '首页',
      icon: WindowsOutlined,
      affix: true
    },
    component: Loadable({
      loader: () => import('@/pages/home'),
      loading: Loading
    }),
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
        component: Loadable({
          loader: () => import('@/pages/permission/page'),
          loading: Loading
        }),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
        }
      },
      {
        path: '/permission/role',
        component: Loadable({
          loader: () => import('@/pages/permission/role'),
          loading: Loading
        }),
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

// 对于菜单路由，选中的当前菜单路由，获取到它的父级路由信息，即match
export const getMatchRoutes = (path, extendMenuRoutes) => extendMenuRoutes.filter(route => path.indexOf(route.path) !== -1)




