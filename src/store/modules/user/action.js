import { createActions } from 'redux-actions';

export const {
  dispatchLogin,
  login,
  dispatchGetInfo,
  getInfo,
  dispatchResetToken,
  resetToken
} = createActions({
    // 登录
    LOGIN: token => ({ token }),
    // 获取用户信息
    GET_INFO: ({ roles, admin }) => ({ roles, admin}),
  },
  'DISPATCH_LOGIN',
  'DISPATCH_GET_INFO',
  'DISPATCH_RESET_TOKEN',
  'RESET_TOKEN',
);
