import { namespace as appNamespace } from './modules/app/reducer'
import { namespace as permissionNamespace } from './modules/permission/reducer'
import { namespace as tagsViewNamespace } from './modules/tagsView/reducer'
import { namespace as userNamespace } from './modules/user/reducer'

// app
export const getterActiveRoute = state => state[appNamespace].activeRoute                       // 每次 active 路由
export const getterCollapsed = state => state[appNamespace].collapsed                           // 菜单展开关闭状态

// permission
export const getterRoutes = state => state[permissionNamespace].routes                          // 所有有权限路由（展开）
export const getterMenuRoutes = state => state[permissionNamespace].menuRoutes                  // 所有有权限菜单路由
export const getterExpandMenuRoutes = state => state[permissionNamespace].expandMenuRoutes      // 所有有权限菜单路由（展开）

// tagsView
export const getterVisitedViews = state => state[tagsViewNamespace].visitedViews                // tagsView

// user
export const getterToken = state => state[userNamespace].token
export const getterRoles = state => state[userNamespace].roles
export const getterAdmin = state => state[userNamespace].admin
