import { getResources, query } from '../graph'

describe('the graph store API', () => {

  it('getResources', async () => {
    const responses = await getResources('ScannedMap');
    expect(responses).toEqual('foo');
  });
});

