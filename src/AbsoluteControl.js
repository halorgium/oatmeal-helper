import React from 'react'
import PropTypes from 'prop-types'

function AbsoluteButton ({updater, value}) {
  return <button onClick={() => updater(value)}>{value}</button>
}

AbsoluteButton.propTypes = {
  updater: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}

export default AbsoluteButton
