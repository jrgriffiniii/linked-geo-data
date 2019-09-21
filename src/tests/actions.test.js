
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as types from '../types'
import * as actions from '../actions'
//import fetchMock from 'fetch-mock'
import tk from 'timekeeper'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
  const currentTime = Date.now()

  beforeAll(() => {
    tk.freeze(currentTime)
  })

  afterEach(() => {
    //fetchMock.restore()
  })

  it('dispatches REQUEST_WORKS and RECEIVE_WORKS when works have been requested and received from the API', () => {
    // These should be loaded from fixture files
    const work1 = {

    }

    const work2 = {

    }

    /*
    fetchMock.getOnce('http://localhost:3000/browse/works', {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: {
        data: [
          work1,
          work2
        ]
      }
    })
    */

    const expectedActions = [
      { type: types.REQUEST_WORKS, isRequesting: true, works: [] },
//      { type: types.RECEIVE_WORKS, isRequesting: false, works: [work1, work2], receivedAt: currentTime }
    ]
    const store = mockStore({ works: [] })

    store.dispatch(actions.updateWorks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
