import React from 'react'
import PropTypes from 'prop-types'

function DeltaControl ({title, unit, updater, value}) {
  return [
    <button key='add' onClick={() => updater(value, unit)}>+{title}</button>,
    <button key='subtract' onClick={() => updater(-value, unit)}>-{title}</button>
  ]
}

DeltaControl.propTypes = {
  title: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  updater: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
}

export default DeltaControl
