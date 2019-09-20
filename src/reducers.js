import { combineReducers } from 'redux';
import * as types from './types';

/**
 * Function for updating the state in response to requesting or receiving a
 */
function updatedWorksState(
  state = {
    isFetching: false,
    didInvalidate: false,
    works: []
  },
  action
) {
  switch (action.type) {
    case types.REQUEST_WORKS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case types.RECEIVE_WORKS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        works: action.works,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

function updateWorks(state = {}, action) {
  const updated = updatedWorksState(state.works, action);

  switch (action.type) {
    case types.REQUEST_WORKS:
    case types.RECEIVE_WORKS:
      return Object.assign({}, state, {
        works: updated
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  updateWorks
});

export default rootReducer;
