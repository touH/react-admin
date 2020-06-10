import { createActions } from 'redux-actions';
import { message } from 'antd';
import { asyncMenuRoutes } from '@/router'

// 判断该路由菜单是否有权限，无roles字段表示该路由都可访问，有roles字段则和服务端做对比，得到该角色是否有该路由权限
function hasPermission(roles, route) {
  if(route.meta && route.meta.roles) {
    // 服务端返回的 roles 中有一个在路由配置中就算可以被访问
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    // 路由配置中无 roles 表示，直接可访问，不用判断权限
    return true
  }
}
// 根据服务端返回的 roles 角色，来动态判断显示的权限菜单有哪些
export function filterAsyncRoutes(routes, roles) {
  const res = [];
  routes.forEach(route => {
    const tmp = { ...route };
    if(hasPermission(roles, tmp)) {
      if(tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  });
  return res
}

export const { setRoutes } = createActions({
  // 通过服务端返回的 roles 信息，对本地菜单路由配置每一个做对比，得到有权限的访问菜单
  SET_ROUTES: roles => {
    let accessedRoutes;
    // 此处可进行权限判断，得到想要的路由。 超级管理员可以得到所有权限，其他登录人员相关有权限的部分可进入
    if(roles.includes('admin')) {
      accessedRoutes = asyncMenuRoutes || [];
    } else {
      accessedRoutes = filterAsyncRoutes(asyncMenuRoutes, roles)
    }
    return {
      accessedRoutes
    }
  }
})
