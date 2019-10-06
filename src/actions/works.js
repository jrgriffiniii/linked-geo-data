import * as types from '../types';
import { getResources } from '../graph';

/**
 * Use the application state to determine if works should be requested
 */
function shouldRequestWorks(state) {
  const works = state.works;
  return !works.isRequesting;
}

function requestWorks() {
  return {
    type: types.REQUEST_WORKS,
    items: [],
    isRequesting: true
  };
}

function receiveWorks(works) {
  return {
    type: types.RECEIVE_WORKS,
    isRequesting: false,
    items: works,
    receivedAt: Date.now()
  };
}


async function getWorks(boundingBox) {
  let resources = [];

  resources = await getResources(boundingBox);
  /*
  try {
    resources = await getResources(boundingBox);
  } catch(error) {
    console.error(error.message)
  }
  */

  return resources;
}

function requestAndReceiveWorks(boundingBox) {
  return dispatch => {
    dispatch(requestWorks());
    return getWorks(boundingBox)
      .then(works => dispatch(receiveWorks(works)))
      .catch(error => { throw error });
  };
}

export function updateWorks() {
  return (dispatch, getState) => {
    const state = getState();
    if (shouldRequestWorks(state)) {
      const boundingBox = state.currentExtent.extent;
      return dispatch(requestAndReceiveWorks(boundingBox));
    }
  };
}
