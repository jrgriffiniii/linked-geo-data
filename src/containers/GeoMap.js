import React, { Component } from 'react'
import L from 'leaflet';
import PropTypes from 'prop-types'

export default class GeoMap extends Component {
  state = {
    lat: this.props.lat,
    lng: this.props.lng,
    zoom: this.props.zoom
  }

  componentDidMount() {
    const osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    })

    this.map = L.map('map', {
            center: [this.state.lat, this.state.lng],
            zoom: this.state.zoom,
            layers: [osmLayer]
          });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    for (const work of this.props.works) {
      // Only add this to the map if it has not already been added
      L.geoJSON(work.geoJSON).addTo(this.map);
    }
  }

  render() {
    return (
      <div id="map" style={this.props.style} />
    )
  }
}

GeoMap.propTypes = {
  works: PropTypes.array.isRequired,
  style: PropTypes.object,
  lat: PropTypes.number,
  lng: PropTypes.number,
  zoom: PropTypes.number
}

GeoMap.defaultProps = {
  style: {
    height: "512px"
  },
  lat: 40.3494507,
  lng: -74.6596194,
  zoom: 16
}

