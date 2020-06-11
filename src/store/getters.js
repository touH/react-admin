import { namespace as appNamespace } from './modules/app/reducer'
import { namespace as permissionNamespace } from './modules/permission/reducer'
import { namespace as tagsViewNamespace } from './modules/tagsView/reducer'
import { namespace as userNamespace } from './modules/user/reducer'

// permission
export const getterMenuRoutes = state => state[permissionNamespace].menuRoutes
export const getterExpandMenuRoutes = state => state[permissionNamespace].expandMenuRoutes

// tagsView
export const getterVisitedViews = state => state[tagsViewNamespace].visitedViews

// user
export const getterToken = state => state[userNamespace].token
export const getterRoles = state => state[userNamespace].roles
export const getterAdmin = state => state[userNamespace].admin
