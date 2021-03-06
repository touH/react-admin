import {handleActions} from "redux-actions";
import { getToken } from '@/utils/token'

export const namespace = 'user';

const initState = {
  token: getToken(),
  roles: [],
  admin: {}
};

export const userReducer = handleActions({
  LOGIN(state, action) {
    const { token } = action.payload
    return { ...state, token }
  },
  GET_INFO(state, action) {
    const { roles, admin } = action.payload
    return {
      ...state,
      roles,
      admin
    }
  },
  RESET_TOKEN(state, action) {
    return initState
  }
}, initState)
