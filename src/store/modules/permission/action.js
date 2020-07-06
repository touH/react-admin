import { createActions } from 'redux-actions';

export const { setRoutes, dispatchSetRoutes } = createActions({
  // 通过服务端返回的 roles 信息，对本地菜单路由配置每一个做对比，得到有权限的访问菜单
  SET_ROUTES: ({ routes, accessedRoutes, expandAccessedRoutes }) => ({
    routes,
    accessedRoutes,
    expandAccessedRoutes
  })
}, 'DISPATCH_SET_ROUTES')
