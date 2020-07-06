import { createActions } from 'redux-actions';

//api
export const {
  dispatchLogin,
  login,
  getInfo,
  resetToken,
  dispatchResetToken,
  dispatchInitialization
} = createActions({
    // 登录
    LOGIN: token => ({ token }),
    GET_INFO: ({ roles, admin }) => ({ roles, admin}),
  },
  'DISPATCH_LOGIN',
  'DISPATCH_INITIALIZATION',
  'DISPATCH_RESET_TOKEN',
  'RESET_TOKEN'
);
