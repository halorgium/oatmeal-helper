import React from 'react'
import PropTypes from 'prop-types'

class DeltaControl extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
    updater: PropTypes.func.isRequired
  }

  render () {
    const { title, value, unit, updater } = this.props

    return [
      <button key='add' onClick={() => updater(value, unit)}>+{title}</button>,
      <button key='subtract' onClick={() => updater(-value, unit)}>-{title}</button>
    ]
  }
}

export default DeltaControl
