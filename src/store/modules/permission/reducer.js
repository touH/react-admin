import { handleActions } from 'redux-actions'

export const namespace = 'permission'

const initState = [2];

export const permissionReducer = handleActions({
  PERMISSION(state, action) {
    return []
  }
}, initState)
