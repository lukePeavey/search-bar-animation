import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import NodeGroup from 'react-move/NodeGroup'
import { easeExpOut } from 'd3-ease'
import Card from '../components/Card'
import { easeBackOut, easeBackInOut, easeCircleOut } from 'd3-ease';
import movies from '../movies'

const styles = theme => ({
  root: {
    flex: '0 0 0',
    width: '100%',
    transition: 'all 500ms ease-out',
    overflow: 'hidden'
  },
  item: {
    margin: '16px 0'
  }

})

class SearchResults extends Component {
  render() {
    const { classes, results, show } = this.props
    return (
      <div className={classes.root} style={{flexGrow: show ? 1 : 0}}>
        <NodeGroup
          data={results}
          keyAccessor={(d, i) => `key-${i}`}

          start={() => ({
            y: 300,
            opacity: 0
          })}

          enter={(data, index) => ({
            y: 0,
            opacity: 1,
            timing: { duration: 5999, ease: easeBackOut, delay: index * 100 }
          })}
        >
          {(nodes) =>
            <div>
              {nodes.map(({ key, state: { y, opacity }, data }) => (
                <div
                  key={key}
                  className={classes.item}
                  style={{transform: `translateY(${y}px)`, opacity}}>
                  <Card movie={data} />
                </div>
              ))}
            </div>
          }
        </NodeGroup>
      </div>
    )
  }


}

export default withStyles(styles)(SearchResults)
