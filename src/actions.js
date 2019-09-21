import * as types from './types';
import { getResources } from './graph';
import wkt from 'terraformer-wkt-parser';

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
    items: [],
    receivedAt: Date.now()
  };
}

function parseWKT(geoSparqlWKT) {

  const wktLiteral = geoSparqlWKT;
  return wkt.parse(wktLiteral);
};

async function getWorks() {

  console.log('TRACE2');
  // Retrieve all Scanned Maps
  const resources = await getResources('ScannedMap');
  let works = [];

  for (const resource of resources) {
    const work = {};
    work.title = resource.title;
    work.creator = resource.creator;
    work.coverage = resource.coverage;
    work.geoJSON = parseWKT(resource.coverage);
    works.append(work);
  }

  return works;
}

function requestAndReceiveWorks() {
  return dispatch => {
    dispatch(requestWorks());
    return getWorks()
      .then(works => dispatch(receiveWorks(works)));
  };
}

export function updateWorks() {
  return (dispatch, getState) => {
    if (shouldRequestWorks(getState())) {
      return dispatch(requestAndReceiveWorks());
    }
  };
}
