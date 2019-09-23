import * as types from './types';
import { getResourcesByModel } from './graph';

function shouldRequestWorks(state) {
  const works = state.works;
  return !works.isRequesting;
}

export function requestWorks() {
  return {
    type: types.REQUEST_WORKS,
    items: [],
    isRequesting: true
  };
}

export function receiveWorks(works) {
  return {
    type: types.RECEIVE_WORKS,
    isRequesting: false,
    items: works,
    receivedAt: Date.now()
  };
}


async function getWorks() {
  let resources = [];

  try {
    resources = await getResourcesByModel('ScannedMap');
  } catch(error) {
    console.error(error.message)
  }

  return resources;
}

function requestAndReceiveWorks() {
  return dispatch => {
    dispatch(requestWorks());
    return getWorks()
      .then(works => dispatch(receiveWorks(works)))
      .catch(error => { throw error });
  };
}

export function updateWorks() {
  return (dispatch, getState) => {
    if (shouldRequestWorks(getState())) {
      return dispatch(requestAndReceiveWorks());
    }
  };
}
