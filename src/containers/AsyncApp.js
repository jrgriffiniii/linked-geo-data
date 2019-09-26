import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateWorks } from '../actions'
import GeoMap from './GeoMap';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import ScrollTop from './ScrollTop';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import scannedMapThumbnail from '../static/images/scanned_map_thumbnail.png';
import samveraLogo from '../static/images/samvera-logo-tm.png';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';

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
        <AppBar position="fixed">
          <Toolbar id="navbar">
            <IconButton edge="start" color="inherit" aria-label="menu">
            </IconButton>

            <IconButton variant="contained" onClick={this.handleRefreshClick} disabled={ isRequesting } style={{color: "white"}}>
              <RotateLeftIcon />
            </IconButton>
              <span>Refresh Graph Data</span>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" style={this.props.style.navbar} id="title">
          <Typography variant="h1" component="h1" gutterBottom align="center" style={this.props.style.h1}>Linked Geo Data <span role="img" aria-label="globe">🌐</span></Typography>
        </Container>

        <GeoMap works={ this.props.works } />

        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom align="center">Spatial Search Results</Typography>
          <Grid container spacing={2} align="center" style={this.props.style.grid}>

              { [0,1,3,4,5].map((work) => {
                return(
                  <Grid item xs={3}>
                    <Card>
                      <CardHeader title="My Scanned Map" />
                      <CardMedia image={scannedMapThumbnail} style={this.props.style.itemThumbnail} />
                      <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra, sapien a vestibulum accumsan, augue magna porttitor dolor, imperdiet bibendum elit neque a nunc. Vestibulum eget dui at lorem tempus aliquet.</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              }) }

          </Grid>
        </Container>

        <div id="footer" style={ {marginTop: "1.55rem"} }>
          <Divider />
          <Typography style={{padding: "0.85rem 1.35rem"}}>
            <Link href="https://samvera.org"><img src={samveraLogo} width="146px" /></Link>
          </Typography>
        </div>

        <ScrollTop targetSelector="#title" style={this.props.style.scrollTop} />
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
    },
    navbar: {
      marginTop: "6.15em"
    },
    scrollTop: {
      paddingLeft: "1.15em",
      paddingRight: "1.15em",
      paddingBottom: "1.15em",
      position: "fixed",
      bottom: "0px",
      right: "0px"
    },
    itemThumbnail: {
      backgroundSize: "144px",
      height: "144px"
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
