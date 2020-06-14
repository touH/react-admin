import { handleActions } from 'redux-actions'

export const namespace = 'app'

const initState = {
  // 当前路由信息
  activeRoute: {},
};

export const appReducer = handleActions({
  SET_ACTIVE_ROUTE(state, action) {
    const { route: activeRoute } = action.payload
    return {...state, activeRoute }
  },
}, initState)

