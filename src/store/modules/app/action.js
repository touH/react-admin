import { createActions } from 'redux-actions';

export const { setActiveRoute, setMatchRoutes, dispatchActiveRouteMatch } = createActions({
  SET_ACTIVE_ROUTE: route => ({ route }),
  SET_MATCH_ROUTES: matchRoutes => ({ matchRoutes })
}, 'DISPATCH_ACTIVE_ROUTE_MATCH');
