import { handleActions } from 'redux-actions'

export const namespace = 'app'

const initState = {
  // 当前路由信息
  activeRoute: {},
  // 菜单展开关闭状态
  collapsed: false
};

export const appReducer = handleActions({
  SET_ACTIVE_ROUTE(state, action) {
    const { route: activeRoute } = action.payload
    return {...state, activeRoute }
  },
  SET_COLLAPSED(state, action) {
    return { ...state,  collapsed: !state.collapsed}
  }
}, initState)

