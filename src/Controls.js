import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import momentPropTypes from 'react-moment-proptypes'

import AbsoluteControl from './AbsoluteControl'
import DeltaControl from './DeltaControl'

function Controls (props) {
  const { title, times, durations, set, add, value} = props

  const timeControls = times.map(time => {
    return <AbsoluteControl
      key={time}
      duration={moment.duration(time)}
      updater={set}
    />
  })

  const durationControls = durations.map(duration => {
    return <DeltaControl
      key={duration}
      duration={moment.duration(duration)}
      updater={add}
    />
  })

  return (
    <div>
      <p>{title}</p>
      {timeControls}
      {durationControls}
      <div>{value.format('HH:mm')}</div>
    </div>
  )
}

Controls.propTypes = {
  title: PropTypes.string,
  set: PropTypes.func,
  add: PropTypes.func,
  times: PropTypes.array,
  durations: PropTypes.array,
  value: momentPropTypes.momentDurationObj
}

export default Controls
