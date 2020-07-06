import { takeEvery, fork, put, call } from 'redux-saga/effects'
import { dispatchActiveRouteMatch, setActiveRoute, setMatchRoutes } from './action'
import { getMatchRoutes } from '@/router'

/**
 * @description
 *      1. 在 redux 中 设置当前路由信息。对于不匹配的路径，只设置 path属性
 *      2. 注意： 当 location.pathname 改变时，Layout 菜单路由页面已经改变， 而 redux 中的 activeRoute 还未及时更新，
 *         要等到所有组件渲染完成才会 触发 setActiveRouteMatch 方法，所以在组件内部调用 redux 的 activeRoute 要注意，最好使用 useEffect 监听
 * @param routes 所有有权限的 路由
 * @param path   当前path
 */
function *sagaActiveRouteMatch({ payload: {routes, path}}) {
  try {
    const activeRoute = routes.find(route => route.path === path) || { path: path}
    // redux app 设置当前 route 信息
    yield put(setActiveRoute(activeRoute))
    // redux app 设置当前 route 匹配的match信息
    yield put(setMatchRoutes(getMatchRoutes(path, routes)))
  } catch (e) {
    console.log(e)
  }
}

function* watchCommon() {
  yield takeEvery(dispatchActiveRouteMatch, sagaActiveRouteMatch)
}

export default [fork(watchCommon)]
