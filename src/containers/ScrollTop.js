import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

export default class ScrollTop extends Component {

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
        <div onClick={this.handleClick} role="presentation" style={this.props.style}>
          <Fab onClick={this.handleClick} color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </div>
      </Zoom>
    )
  }
}

ScrollTop.propTypes = {
  targetSelector: PropTypes.string.isRequired,
  style: PropTypes.object
}
