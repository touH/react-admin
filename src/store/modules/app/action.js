import { createActions } from 'redux-actions';

export const { setActiveRoute, setCollapsed } = createActions({
  SET_ACTIVE_ROUTE: route => ({ route }),
}, 'SET_COLLAPSED');
