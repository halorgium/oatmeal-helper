import React from 'react'
import PropTypes from 'prop-types'

function AbsoluteControl ({updater, duration}) {
  const title = duration.format('HH:mm')

  return <button onClick={() => updater(duration)}>{title}</button>
}

AbsoluteControl.propTypes = {
  updater: PropTypes.func.isRequired,
  duration: PropTypes.object.isRequired
}

export default AbsoluteControl
