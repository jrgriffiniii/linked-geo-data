import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateWorks } from '../actions'
import { Map, TileLayer, GeoJSON } from 'react-leaflet'
import GeoMap from './GeoMap';

class AsyncApp extends Component {
  constructor(props) {
    super(props)

    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(updateWorks())
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(updateWorks())
  }

  render() {
    const { works, isRequesting, lastUpdated } = this.props

    return (
      <div>
        <GeoMap works={ this.props.works }/>

        <div>
          {lastUpdated && (
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}
            </span>
          )}
        </div>

        <div>
          {!isRequesting && (
            <button onClick={this.handleRefreshClick}>Refresh</button>
          )}
        </div>

      </div>
    )
  }
}

AsyncApp.propTypes = {
  works: PropTypes.array.isRequired,
  isRequesting: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { works } = state
  const { isRequesting, lastUpdated, items } = works ||  {
    isRequesting: true,
    items: []
  }

  return {
    works: items,
    isRequesting,
    lastUpdated
  }
}

export default connect(mapStateToProps)(AsyncApp)
