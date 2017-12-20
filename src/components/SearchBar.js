import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import * as baseStyles from '../styles/baseStyles'
import Animate from 'react-move/Animate'
import { easeExpOut } from 'd3-ease'

const styles = theme => ({
  root: {
    margin: 'auto 0',
    transition: 'all 200ms ease-out'
  },
  searchBar: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: 64,
    width: 64,
    background: '#fff',
    overflow: 'hidden'
  },
  input: {
    ...baseStyles.input,
    flex: '1 0 0',
    width: 'calc(100% - 80px)',
    paddingLeft: theme.spacing.unit * 2,
    fontSize: 20,
    fontWeight: 500,
    color: theme.palette.text.secondary,
    '&::placeholder': {
      color: '#ccc'
    }
  },
  button: {
    position: 'absolute',
    top: theme.spacing.unit * 1,
    right: theme.spacing.unit * 1,
    fontSize: 32,
    color: theme.palette.primary[500]
  }
})

class SearchBar extends Component {
  state = {
    containerWidth: 600
  }

  getContainerWidth() {
    if (this.elem && this.elem.parentElement) {
      this.setState({ containerWidth: this.elem.parentElement.offsetWidth })
    }
  }

  componentDidMount() {
    this.getContainerWidth()
    window.addEventListener('resize', this.getContainerWidth.bind(this))
    this.props.searchBarRef(this)
  }

  render() {
    const {
      classes,
      showingResults,
      active,
      value,
      handleChange,
      handleSubmit,
      handleClick,
      searchBarRef
    } = this.props
    return (
      <div className={classes.root} ref={elem => (this.elem = elem)}>
        <Animate
          start={() => ({
            width: [active ? this.state.containerWidth : 64],
            rotate: [active ? 0 : 135],
            opacity: [active ? 1 : 0],
            rad: [active ? 8 : 32]
          })}
          update={() => ({
            width: [active ? this.state.containerWidth : 64],
            rotate: [active ? 0 : 135],
            opacity: [active ? 1 : 0],
            rad: [active ? 8 : 32],
            timing: { duration: 700, ease: easeExpOut }
          })}
        >
          {state => (
            <form
              onSubmit={handleSubmit}
              className={classes.searchBar}
              style={{ width: state.width, borderRadius: state.rad + 'px' }}
            >
              <input
                className={classes.input}
                placeholder="Search"
                style={{ opacity: state.opacity }}
                value={value}
                onChange={handleChange}
                ref={input => (this.input = input)}
              />
              <IconButton
                className={classes.button}
                style={{ transform: `rotateZ(${state.rotate}deg)` }}
                onClick={handleClick}
                disableRipple
              >
                <CloseIcon />
              </IconButton>
            </form>
          )}
        </Animate>
      </div>
    )
  }
}

export default withStyles(styles)(SearchBar)
