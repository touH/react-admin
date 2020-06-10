import { handleActions } from 'redux-actions'
import { constantRoutes } from '@/router'

export const namespace = 'permission'

const initState = {
  // 所有路由
  routes: [],
  // 有权限判断部分的路由
  menuRoutes: []
};

export const permissionReducer = handleActions({
  // 有权限菜单路由、所有路由
  SET_ROUTES(state, action) {
    const { accessedRoutes } = action.payload
    return {routes: constantRoutes.concat(accessedRoutes), menuRoutes: accessedRoutes}
  }
}, initState)
