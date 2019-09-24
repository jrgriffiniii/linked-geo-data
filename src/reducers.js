import { combineReducers } from 'redux';
import * as types from './types';

// Define the initial state for Works in the store
const initialWorksState = {
  isRequesting: false,
  didInvalidate: false,
  items: []
}

/**
 * This does not handle cases where the state is being initialized
 */
function updatedWorksState(state, action) {
  switch (action.type) {
    case types.REQUEST_WORKS:
      return Object.assign({}, state, {
        isRequesting: true,
        didInvalidate: false
      });
    case types.RECEIVE_WORKS:
      return Object.assign({}, state, {
        isRequesting: false,
        didInvalidate: false,
        lastUpdated: action.receivedAt,
        items: action.items
      });
    default:
      return state;
  }
}

/**
 * Handles the updates for works in the state for all actions
 */
function works(currentState = {}, action = {}) {
  const state = Object.assign({}, initialWorksState, currentState);
  const updated = updatedWorksState(currentState, action);

  switch (action.type) {
    case types.REQUEST_WORKS:
    case types.RECEIVE_WORKS:
      return Object.assign({}, state, updated);
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  works
});

export default rootReducer;
