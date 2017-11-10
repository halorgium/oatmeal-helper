import React from 'react'
import PropTypes from 'prop-types'

class AbsoluteButton extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    updater: PropTypes.func.isRequired
  }

  render () {
    const { value, updater } = this.props

    return <button onClick={() => updater(value)}>{value}</button>
  }
}

export default AbsoluteButton
