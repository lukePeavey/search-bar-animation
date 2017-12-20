import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import NodeGroup from 'react-move/NodeGroup'
import { easeExpOut } from 'd3-ease'
import MovieCard from '../components/MovieCard'
import { easeBackOut, easeBackInOut, easeCubicOut, easeQuadOut } from 'd3-ease'
import movies from '../movies'

const styles = theme => ({
  html: {
    boxSizing: 'border-box'
  },
  '*, &::before, &::after': {
    boxSizing: 'inherit'
  },
  root: {
    flex: '0 0 0',
    width: '100%',
    alignSelf: 'stretch',
    transition: 'all 150ms ease-out',
    overflow: 'hidden',
    paddingTop: 24
  },
  item: {
    margin: '16px 0'
  }
})

class SearchResults extends Component {
  render() {
    const { classes, results, show } = this.props
    return (
      <div className={classes.root} style={{ flexGrow: show ? 1 : 0 }}>
        <NodeGroup
          data={results}
          keyAccessor={(data, index) => `key-${index}`}
          start={() => ({
            y: 300,
            x: 0,
            opacity: 0
          })}
          enter={(data, index) => ({
            y: [0],
            opacity: [1],
            timing: { duration: 450, ease: easeQuadOut, delay: 150 + 80 * index }
          })}
          leave={(data, index) => ({
            opacity: [0],
            x: [200],
            timing: { duration: 600, ease: easeBackInOut, delay: 50 * index }
          })}
        >
          {nodes => (
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              {nodes.map(({ key, state: { x, y, opacity }, data }) => (
                <div
                  key={key}
                  className={classes.item}
                  style={{ transform: `translate3d(${x}px,${y}px,0)`, opacity }}
                >
                  <MovieCard movie={data} />
                </div>
              ))}
            </div>
          )}
        </NodeGroup>
      </div>
    )
  }
}

export default withStyles(styles)(SearchResults)
