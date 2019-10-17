import React, { Component } from 'react'
import PropTypes from 'prop-types'

import L from 'leaflet';

import { updateMap } from '../actions';
import { withStyles } from '@material-ui/core/styles';

class GeoMap extends Component {
  state = {
    lat: this.props.lat,
    lng: this.props.lng,
    zoom: this.props.zoom,
    renderedWorks: [],
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

    this.map.on('load', (event => this.props.dispatch(updateMap(event))));
    this.map.on('moveend', (event => this.props.dispatch(updateMap(event))));
    this.map.on('zoomend', (event => this.props.dispatch(updateMap(event))));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const renderedWorks = this.state.renderedWorks;

    for (const work of this.props.works) {
      // Only add this work to the map if it has not already been added
      if (renderedWorks.indexOf(work.id) === -1) {
        L.geoJSON(work.geoJSON).addTo(this.map);
        renderedWorks.push(work.id);
        this.setState({renderedWorks: renderedWorks});
      }
    }
  }

  render() {
    return (
      <div id="map" className={this.props.classes.root} />
    )
  }
}

GeoMap.propTypes = {
  works: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  lat: PropTypes.number,
  lng: PropTypes.number,
  zoom: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

GeoMap.defaultProps = {
  lat: 40.3494507,
  lng: -74.6596194,
  zoom: 14
}

const styles = {
  root: {
    height: "512px",
    marginTop: "1.35rem",
    marginBottom: "1.35rem"
  }
};

export default withStyles(styles)(GeoMap);
