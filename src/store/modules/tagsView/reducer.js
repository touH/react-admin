import { handleActions } from 'redux-actions'

export const namespace = 'tagsView'

const initState = [3];

export const tagsViewReducer = handleActions({
  TAGSVIEW(state, action) {
    return []
  }
}, initState)
