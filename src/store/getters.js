import { namespace as appNamespace } from './modules/app/reducer'
import { namespace as permissionNamespace } from './modules/permission/reducer'
import { namespace as tagsViewNamespace } from './modules/tagsView/reducer'
import { namespace as userNamespace } from './modules/user/reducer'

// permission
export const gettermMenuRoutes = state => state[permissionNamespace].menuRoutes

// user
export const getterToken = state => state[userNamespace].token
export const getterRoles = state => state[userNamespace].roles
export const getterAdmin = state => state[userNamespace].admin
