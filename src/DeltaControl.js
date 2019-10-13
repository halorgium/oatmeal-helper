import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment-duration-format'
import { useControlsContext } from './Controls'

function DeltaControl ({ diff }) {
  const controls = useControlsContext()
  const duration = moment.duration(diff)
  const title = duration.format('HH:mm')

  return (
    <>
      <button type='button' onClick={() => controls.add(duration)}>
        +{title}
      </button>
      <button type='button' onClick={() => controls.add(-duration)}>
        -{title}
      </button>
    </>
  )
}

DeltaControl.propTypes = {
  diff: PropTypes.string.isRequired
}

export default DeltaControl
