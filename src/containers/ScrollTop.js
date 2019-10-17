import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { withStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';

class ScrollTop extends Component {

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    const anchor = (event.target.ownerDocument || document).querySelector(this.props.targetSelector);
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  render() {
    return(
      <Zoom in={true}>
        <div onClick={this.handleClick} role="presentation" className={this.props.classes.root}>
          <Fab onClick={this.handleClick} color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </div>
      </Zoom>
    )
  }
}

const styles = {
  root: {
    paddingLeft: "1.15em",
    paddingRight: "1.15em",
    paddingBottom: "1.15em",
    position: "fixed",
    bottom: "0px",
    right: "0px"
  }
};

ScrollTop.propTypes = {
  classes: PropTypes.object.isRequired,
  targetSelector: PropTypes.string.isRequired
}

export default withStyles(styles)(ScrollTop);
