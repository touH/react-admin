import { handleActions } from 'redux-actions'

export const namespace = 'tagsView'

const initState = {
  // 显示的标签页
  visitedViews: []
};

export const tagsViewReducer = handleActions({
  ADD_VISITED_VIEW(state, action) {
    const { view } = action.payload
    if(state.visitedViews.some(v => v.path === view.path)) {
      return state
    } else {
      return { ...state, visitedViews: [...state.visitedViews, view]}
    }
  }
}, initState)
