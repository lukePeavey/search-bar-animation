import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent, CardMedia, CardActions } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import StarIcon from 'material-ui-icons/Star'
import AddIcon from 'material-ui-icons/Add'
import CheckIcon from 'material-ui-icons/Check'
import Fade from './Fade'
import { yellow, grey } from 'material-ui/colors'
import classNames from 'classnames'

const styles = theme => ({
  root: {
    display: 'flex',
    width: '100%',
    height: 112,
    border: 'solid 1px transparent',
    borderRadius: 8,
    overflow: 'hidden',
    boxShadow: 'none',
    [theme.breakpoints.up('sm')]: {
      height: 136
    }
  },
  cardHeader: {
    marginBottom: 'auto'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    paddingRight: theme.spacing.unit * 2
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto',
    height: '100%'
  },
  cover: {
    width: 130,
    height: 'inherit',
    filter: 'grayscale(70%)',
    backgroundPosition: 'top center',
    [theme.breakpoints.up('sm')]: {
      width: 170
    }
  },
  saveButton: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 56,
    margin: 0,
    border: 'inherit',
    borderRadius: '0 8px 8px 0',
    backgroundColor: 'rgba(0,0,0,0)',
    color: theme.palette.primary[600],
    transition: 'all 500ms',
    cursor: 'pointer'
  },
  saved: {
    backgroundColor: theme.palette.primary[600],
    color: '#fff'
  },
  saveIcon: {
    position: 'absolute',
    top: 'calc(50% - 16px)',
    right: 'calc(50% - 16px)',
    width: 32,
    height: 32
  },
  star: {
    [theme.breakpoints.down('sm')]: {
      width: 20,
      height: 20
    }
  }
})

class MovieCard extends Component {
  state = {
    saved: false
  }

  handleSaveButtonClick = e => {
    this.setState(prevState => ({ saved: !prevState.saved }))
  }

  render() {
    const { classes, movie, style } = this.props
    const { saved } = this.state
    const stars = Array(5)
      .fill()
      .map((_, i) => (
        <StarIcon className={classes.star} style={{ color: i < 3 ? yellow[800] : grey[300] }} />
      ))

    return (
      <Card className={classes.root} style={style}>
        <CardMedia
          className={classes.cover}
          image={movie.image}
          title="Live from space album cover"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <header className={classes.cardHeader}>
              <Typography type="headline">{movie.title}</Typography>
              <Typography type="subheading" color="secondary">
                {movie.subtitle}
              </Typography>
            </header>
            <div style={{ display: 'flex' }}>{stars}</div>
          </CardContent>
          <CardActions>
            <button
              className={classNames(classes.saveButton, saved && classes.saved)}
              onClick={this.handleSaveButtonClick}
            >
              <Fade show={saved}>
                <CheckIcon className={classes.saveIcon} />
              </Fade>
              <Fade show={!saved}>
                <AddIcon className={classes.saveIcon} />
              </Fade>
            </button>
          </CardActions>
        </div>
      </Card>
    )
  }
}

export default withStyles(styles)(MovieCard)
