import { handleActions } from 'redux-actions'

export const namespace = 'app'

const initState = [1];

export const appReducer = handleActions({
  APP(state, action) {
    return []
  }
}, initState)

