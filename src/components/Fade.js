import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Animate from 'react-move/Animate'

export default class Fade extends Component {
  state = { mounted: false }

  componentDidMount() {
    this.setState({ mounted: true })
  }

  render() {
    const { show, children } = this.props
    return (
      <Animate
        show={show}
        start={{ opacity: 0 }}
        enter={{
          opacity: this.state.mounted ? [0, 1] : 1,
          timing: { duration: 200, delay: 200 },
          zIndex: 2
        }}
        leave={{
          opacity: [1, 0],
          timing: { duration: 150 },
          zIndex: 1
        }}
      >
        {({ opacity, zIndex }) => <div style={{ opacity, zIndex }}>{children}</div>}
      </Animate>
    )
  }
}
