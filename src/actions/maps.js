import * as types from '../types';
import { updateWorks } from './works';

function updateMapExtent(geoJSON) {
  return {
    type: types.UPDATE_MAP_EXTENT,
    extent: geoJSON
  };
}

export function updateMap(event) {
  return (dispatch, getState) => {

    const bounds = event.target.getBounds();
    const sw = bounds.getSouthWest();
    const nw = bounds.getNorthWest();
    const ne = bounds.getNorthEast();
    const se = bounds.getSouthEast();
    const geoJSON = {
      "type": "Polygon",
      "coordinates": [
        [
          [sw.lng, sw.lat],
          [nw.lng, nw.lat],
          [ne.lng, ne.lat],
          [se.lng, se.lat],
          [sw.lng, sw.lat]
        ]
      ]
    };

    dispatch(updateMapExtent(geoJSON));
    return dispatch(updateWorks());
  };
}
