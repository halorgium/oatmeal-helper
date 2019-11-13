import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment-duration-format'
import { useControlsContext } from './Controls'

function DeltaControl ({ diff, multiplier, prefix, ...props }) {
  const controls = useControlsContext()
  const duration = moment.duration(diff)
  const title = duration.format('HH:mm')

  return (
    <button type='button' onClick={() => controls.add(multiplier * duration)} {...props}>
      {prefix}{title}
    </button>
  )
}

DeltaControl.propTypes = {
  diff: PropTypes.string.isRequired,
  multiplier: PropTypes.number.isRequired,
  prefix: PropTypes.string.isRequired
}

export default DeltaControl
