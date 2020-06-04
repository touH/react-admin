import { createActions } from 'redux-actions';

export const { login } = createActions({
  LOGIN: todo => ({ todo }),
  REMOVE_TODO: [
    todo => ({ todo }),
    (todo, warn) => ({ todo, warn }),
  ],
}, 'SET_LOGIN_OUT');
