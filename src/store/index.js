/**
 * 状态管理
 */
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';

import { namespace as appNamespace, appReducer } from './modules/app/reducer'
import { namespace as permissionNamespace, permissionReducer} from './modules/permission/reducer'
import { namespace as tagsViewNamespace, tagsViewReducer} from './modules/tagsView/reducer'
import { namespace as userNamespace, userReducer } from './modules/user/reducer'

const reducers = combineReducers({
  [appNamespace]: appReducer,
  [permissionNamespace]: permissionReducer,
  [tagsViewNamespace]: tagsViewReducer,
  [userNamespace]: userReducer
})

export default createStore(reducers, applyMiddleware(thunkMiddleware, promiseMiddleware))



