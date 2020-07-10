import { takeEvery, fork, put, call } from 'redux-saga/effects'
import {dispatchLogin, login, dispatchGetInfo, getInfo, dispatchResetToken, resetToken} from "./action";
import { request_login, request_getInfo } from "@/services/user";
import { setToken, removeToken } from "@/utils/token";
import { message } from "antd";
import history from "@/router/history";

function *sagaLogin(action) {
  const { password, username } = action.payload
  try {
    const { data } = yield request_login({ password, username })
    if(data.success) {
      // 1. 在 cookie 中设置 token   2. reducer 中保存 token
      setToken(data.data.token);
      yield put(login(data.data.token))
      history.push('/');
    } else {
      message.error(data.message);
    }
  } catch (e) {
    console.log(e)
  }
}

function *sagaGetInfo({ payload }) {
  try {
    const { data } = yield call(request_getInfo, payload)
    if(data.success) {
      yield put(getInfo({
        roles: data.data.roles,
        admin: data.data
      }))
    } else {
      message.error(data.message);
    }
  } catch (e) {
    message.error(e);
    yield put(dispatchResetToken())
  }
}

function *sagaResetToken() {
  removeToken()
  yield put(resetToken())
  history.push('/login')
}

function* watchCommon() {
  yield takeEvery(dispatchLogin, sagaLogin)
  yield takeEvery(dispatchGetInfo, sagaGetInfo)
  yield takeEvery(dispatchResetToken, sagaResetToken)
}

export default [fork(watchCommon)]
