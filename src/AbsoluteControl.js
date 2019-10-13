import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment-duration-format'
import { useControlsContext } from './Controls'

function AbsoluteControl ({ time }) {
  const controls = useControlsContext()
  const duration = moment.duration(time)
  const title = duration.format('HH:mm')

  return (
    <button type='button' onClick={() => controls.set(duration)}>
      {title}
    </button>
  )
}

AbsoluteControl.propTypes = {
  time: PropTypes.string.isRequired
}

export default AbsoluteControl
