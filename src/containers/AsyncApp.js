import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateWorks } from '../actions'
import { Map, TileLayer, GeoJSON } from 'react-leaflet'
import GeoMap from './GeoMap';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

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
        <Container maxWidth="lg">
          <Typography variant="h1" component="h1" gutterBottom align="center" style={this.props.style.h1}>Linked Geo Data 🌐</Typography>
        </Container>

        <GeoMap works={ this.props.works }/>

        <Grid container spacing={2} align="center" gutterBottom style={this.props.style.grid}>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                {lastUpdated && (
                  <span>Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}</span>
                )}
              </CardContent>
              <CardActions align="center">
                <Button variant="contained" onClick={this.handleRefreshClick} disabled={ isRequesting } >Refresh</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={6}>
          </Grid>
        </Grid>
      </div>
    )
  }
}

AsyncApp.propTypes = {
  works: PropTypes.array.isRequired,
  isRequesting: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  style: PropTypes.object
}

AsyncApp.defaultProps = {
  style: {
    h1: {
      marginTop: "0.35em"
    },
    grid: {
      marginTop: "0.35em"
    }
  }
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
