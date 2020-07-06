import history from "@/router/history";
import { takeEvery, fork, put, call } from 'redux-saga/effects'
import { dispatchLogin, login, getInfo, dispatchInitialization, dispatchResetToken, resetToken } from './action'
import { dispatchSetRoutes} from "../permission/action";
import { request_login, request_getInfo } from "@/services/user";
import { message } from "antd";
import { setToken, removeToken } from "@/utils/token";

function *sagaLogin(action) {
  try {
    const { data } = yield request_login(action.payload)
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

function *sagaInitialization({ payload: {path, token}}) {
  try {
    const { data } = yield call(request_getInfo, token)
    if(data.success) {
      yield put(getInfo({
        roles: data.data.roles,
        admin: data.data
      }))
      yield put(dispatchSetRoutes({ roles: data.data.roles, path }))
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
  yield takeEvery(dispatchInitialization, sagaInitialization)
  yield takeEvery(dispatchLogin, sagaLogin)
  yield takeEvery(dispatchResetToken, sagaResetToken)
}

export default [fork(watchCommon)]
