import { createActions } from 'redux-actions';

export default createActions({
  APP: todo => ({ todo }),
  REMOVE_TODO: [
    todo => ({ todo }),
    (todo, warn) => ({ todo, warn }),
  ],
}, 'SET_LOGIN_OUT');
