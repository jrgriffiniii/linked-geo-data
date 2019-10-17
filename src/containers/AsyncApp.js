import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { updateWorks } from '../actions'

import GeoMap from './GeoMap';

import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import ScrollTop from './ScrollTop';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import samveraLogo from '../static/images/samvera-logo-tm.png';
import scannedMapThumbnail from '../static/images/scanned_map_thumbnail.png';

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

  render() {
    const { works, isRequesting } = this.props

    return (
      <div>
        <AppBar position="fixed">
          <Toolbar id="navbar">
            <IconButton edge="start" color="inherit" aria-label="menu">
            </IconButton>

            <IconButton variant="contained" onClick={this.handleRefreshClick} disabled={ isRequesting } className={this.props.classes.iconButton}>
              <RotateLeftIcon />
            </IconButton>
              <span>Refresh Graph Data</span>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" className={this.props.classes.navbar} id="title">
          <Typography variant="h1" component="h1" gutterBottom align="center" className={this.props.classes.h1}>Linked Geo Data <span role="img" aria-label="globe">🌐</span></Typography>
        </Container>

        <GeoMap works={ works } dispatch={ this.props.dispatch } />

        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom align="center">Spatial Search Results</Typography>
          <Grid container spacing={2} align="center" className={this.props.classes.grid}>

              { this.props.works.length === 0 && (
                <Grid item xs={3}>
                  <Typography
                    variant="h5"
                    color="textSecondary"
                    component="div"
                  >No works found</Typography>
                </Grid>
              )}

              { this.props.works.map((work) => {
                return(
                  <Grid item xs={3}>
                    <Card>
                      <CardHeader title={work.title} />
                      <CardMedia image={scannedMapThumbnail} className={this.props.classes.itemThumbnail} />
                      <CardContent>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >{work.abstract}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              }) }

          </Grid>
        </Container>

        <div id="footer" className={this.props.classes.footer}>
          <Divider />
          <Typography className={this.props.classes.footerType}>
            <Link href="https://samvera.org"><img alt="samvera community" src={samveraLogo} width="146px" /></Link>
          </Typography>
        </div>

        <ScrollTop targetSelector="#title" className={this.props.classes.scrollTop} />
      </div>
    )
  }
}

AsyncApp.propTypes = {
  classes: PropTypes.object.isRequired,
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

const styles = {
  root: {},
  iconButton: {
    color: "white"
  },
  h1: {
    marginTop: "0.35em"
  },
  grid: {
    marginTop: "0.35em",
    justifyContent: "center"
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
  },
  footer: {
    marginTop: "1.55rem"
  },
  footerType: {
    padding: "0.85rem 1.35rem"
  }
};

const StyledAsyncApp = withStyles(styles)(AsyncApp);
export default connect(mapStateToProps)(StyledAsyncApp);
