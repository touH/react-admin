import { createActions } from 'redux-actions';

export const { setActiveRoute } = createActions({
  SET_ACTIVE_ROUTE: route => ({ route }),
});
