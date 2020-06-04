import {handleActions} from "redux-actions";

export const namespace = 'user';

const initState = [4];

export const userReducer = handleActions({
  USER(state, action) {
    return []
  }
}, initState)
