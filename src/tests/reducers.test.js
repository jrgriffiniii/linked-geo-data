import reducer from '../reducers'
import * as types from '../types'

describe('the reducers', () => {
  it('should return the initial state', () => {
    const initialState = {
      works: {
        didInvalidate: false,
        isRequesting: false,
        items: []
      }
    }

    expect(reducer()).toEqual(initialState)
  })

  it('should update the state for a REQUEST_WORKS action', () => {
    let updatedState = reducer({}, {
      type: types.REQUEST_WORKS
    })

    let expectedState = {
      works: {
        didInvalidate: false,
        isRequesting: true,
        items: []
      }
    }
    expect(updatedState).toEqual(expectedState)
  })
})
