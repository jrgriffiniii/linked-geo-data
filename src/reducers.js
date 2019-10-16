import { combineReducers } from 'redux';
import * as types from './types';

// Define the initial state for Works in the store
const initialWorksState = {
  isRequesting: false,
  didInvalidate: false,
  items: []
}

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

// Define the initial state for Works in the store
const initialCurrentExtentState = {
  extent: {}
}

function updatedCurrentExtentState(state, action) {
  switch (action.type) {
    case types.UPDATE_MAP_EXTENT:
      return Object.assign({}, state, {
        extent: action.extent
      });
    default:
      return state;
  }
}

function currentExtent(currentState = {}, action) {
  const state = Object.assign({}, initialCurrentExtentState, currentState);
  const updated = updatedCurrentExtentState(currentState, action);

  switch (action.type) {
    case types.UPDATE_MAP_EXTENT:
      return Object.assign({}, state, updated);
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  works,
  currentExtent
});

export default rootReducer;
