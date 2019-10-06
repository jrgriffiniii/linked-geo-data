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

    // Here the extent needs to be identified from the Leaflet Map
    //const geoJSON = event.extent;
    const bounds = event.target.getBounds();
    const sw = bounds.getSouthWest();
    const nw = bounds.getNorthWest();
    const ne = bounds.getNorthEast();
    const se = bounds.getSouthEast();
    const geoJSON = {
      "type": "Polygon",
      "coordinates": [
        [
          [sw.lat, sw.lng],
          [nw.lat, nw.lng],
          [ne.lat, ne.lng],
          [se.lat, se.lng],
          [sw.lat, sw.lng]
        ]
      ]
    };

    dispatch(updateMapExtent(geoJSON));
    return dispatch(updateWorks());
  };
}
