import { createActions } from 'redux-actions';

export const { addVisitedView } = createActions({
  ADD_VISITED_VIEW: view => ({ view })
})
