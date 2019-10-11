import React from 'react'
import PropTypes from 'prop-types'
import 'moment-duration-format'

function DeltaControl ({duration, updater}) {
  const title = duration.format('HH:mm')

  return [
    <button key='add' onClick={() => updater(duration)}>+{title}</button>,
    <button key='subtract' onClick={() => updater(-duration)}>-{title}</button>
  ]
}

DeltaControl.propTypes = {
  updater: PropTypes.func.isRequired,
  duration: PropTypes.object.isRequired
}

export default DeltaControl
