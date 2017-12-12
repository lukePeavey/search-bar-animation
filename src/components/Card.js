import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent, CardMedia } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import StarIcon from 'material-ui-icons/Star'
import { yellow, grey } from 'material-ui/colors'

const styles = theme => ({
  root: {
    display: 'flex',
    width: '100%',
    height: 160
  },
  cardHeader: {
    marginBottom: theme.spacing.unit * 3
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    paddingLeft: theme.spacing.unit * 2
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: 200,
    height: 160,
    filter: 'grayscale(70%)'
  },
  star: {
    widht: 32,
    height: 32
  }
})

class MovieCard extends Component {
  render() {
    const { classes, movie, style } = this.props
    const stars = Array(5)
      .fill()
      .map((_, i) => (
        <StarIcon className={classes.star} style={{ color: i < 3 ? yellow[600] : grey[300] }} />
      ))

    return (
      <Card className={classes.root} style={style}>
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
        </div>
        <CardMedia
          className={classes.cover}
          image={movie.image}
          title="Live from space album cover"
        />
      </Card>
    )
  }
}

export default withStyles(styles)(MovieCard)
