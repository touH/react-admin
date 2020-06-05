/**
 * 状态管理
 */
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
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

// 浏览器redux查看插件
const reduxDebug = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f

/*
compose(fn1, fn2):
  ƒ () {
    return a(b.apply(void 0, arguments));
  }
*/

export default createStore(
  reducers,
  compose(
    applyMiddleware(thunkMiddleware, promiseMiddleware),
    reduxDebug
  )
)



