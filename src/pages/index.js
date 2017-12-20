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
    background: '#f9f9f9'
  },
  contentFrame: {
    flex: '1 0 0',
    width: '100%',
    background: theme.palette.background.contentFrame,
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 2}px`,
    [theme.breakpoints.up('sm')]: {
      margin: '40px auto',
      maxWidth: 544,
      padding: theme.spacing.unit * 4,
    }
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

class Index extends Component {
  state = {
    value: '',
    active: false,
    results: [],
    showingResults: false
  }

  handleClick = e => {
    if (!this.state.active) {
      if (this.searchBar && this.searchBar.input) {
        this.searchBar.input.focus()
      }
      this.setState({active: true, value: ''})
    } else {
      this.setState({results: [], value: ''})
    }
  }

  handleChange = e => {
    const value = String(e.currentTarget.value)
    this.setState({ value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({
      results: movies,
      showingResults: true
    })
  }
  handleClear = e => {
    this.setState({
      results: [],
      showingResults: false
    })
  }

  render() {
    const { classes } = this.props
    const { showingResults } = this.state
    return (
      <div className={this.props.classes.root}>
        <div className={classes.contentFrame}>
          <div className={classes.content}>
            <SearchBar
              {...this.state}
              handleClick={this.handleClick}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              showingResults={this.state.showingResults}
              searchBarRef={comp => (this.searchBar = comp)}
            />
            <SearchResults results={this.state.results} show={showingResults} />
          </div>
        </div>
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRoot(withStyles(styles)(Index))
