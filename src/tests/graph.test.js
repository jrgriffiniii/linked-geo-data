import { getResourcesByModel, query } from '../graph'

describe('the graph store API', () => {

  it('getResourcesByModel', async () => {
    const responses = await getResourcesByModel('ScannedMap');
    // Provide the fixtures for the models
    const expectedGeoJSON = {

    };
    const expectedResponses = [
      {
        id: 'http://maps.org/gazetteer/boundingBox1',
        coverage: 'POLYGON((-125 38.4,-121.8 38.4,-121.8 40.9,-125 40.9,-125 38.4))',
        geoJSON: expectedGeoJSON
      }
    ];
    expect(responses).toEqual(expectedResponses);
  });
});

