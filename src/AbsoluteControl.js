import React from 'react'
import PropTypes from 'prop-types'

class AbsoluteButton extends React.Component {
  static propTypes = {
    updater: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
  }

  render () {
    const { value, updater } = this.props

    return <button onClick={() => updater(value)}>{value}</button>
  }
}

export default AbsoluteButton
