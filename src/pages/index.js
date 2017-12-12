import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import SearchBar from '../components/SearchBar'
import withRoot from '../components/withRoot'
import SearchResults from '../components/SearchResults'
import movies from '../movies'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    background: '#f9f9f9'
  },
  contentFrame: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 0',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 900,
    width: 700,
    background: theme.palette.background.contentFrame,
    padding: theme.spacing.unit * 8
  }
})

class Index extends Component {
  state = {
    searchValue: '',
    active: false,
    results: [],
    showingResults: false
  }

  handleClick = e => {
    this.setState(prevState => ({
      active: !prevState.active,
      value: ''
    }))
  }

  handleChange = e => {
    const value = String(e.currentTarget.value)
    this.setState({
      value,
      results: value.length > 4 ? movies : [],
      showingResults:  value.length > 4
    })
  }

  render() {
    const { classes } = this.props
    const {showingResults} = this.state
    return (
      <div className={this.props.classes.root}>
        <div className={classes.contentFrame}>
          <SearchBar
            {...this.state}
            handleClick={this.handleClick}
            handleChange={this.handleChange}
            showingResults={this.state.showingResults}
          />
          <SearchResults results={this.state.results} show={showingResults}/>
        </div>
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRoot(withStyles(styles)(Index))
