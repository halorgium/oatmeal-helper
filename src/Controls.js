import React from 'react'
import PropTypes from 'prop-types'
import momentPropTypes from 'react-moment-proptypes'

import AbsoluteControl from './AbsoluteControl'
import DeltaControls from './DeltaControls'

function Controls (props) {
  const { now, ready, cook, wait } = props

  return (
    <div>
      <div>
        <p>Time right now</p>
        <div>{now.format('HH:mm')}</div>
      </div>
      <div>
        <p>Time to be ready</p>
        <AbsoluteControl value='6:30' updater={ready.set} />
        <AbsoluteControl value='7:00' updater={ready.set} />
        <AbsoluteControl value='8:00' updater={ready.set} />
        <DeltaControls updater={ready.add} />
        <div>{ready.duration.format('HH:mm')}</div>
      </div>
      <div>
        <p>Time to cook</p>
        <AbsoluteControl value='2:30' updater={cook.set} />
        <AbsoluteControl value='8:00' updater={cook.set} />
        <DeltaControls updater={cook.add} />
        <div>{cook.duration.format('HH:mm')}</div>
      </div>
      <div>
        <p>Time to wait</p>
        <div>{wait.format('HH:mm')}</div>
      </div>
    </div>
  )
}

Controls.propTypes = {
  cook: PropTypes.shape({
    set: PropTypes.func,
    add: PropTypes.func,
    duration: momentPropTypes.momentDurationObj
  }),
  now: momentPropTypes.momentObj,
  ready: PropTypes.shape({
    set: PropTypes.func,
    add: PropTypes.func,
    duration: momentPropTypes.momentDurationObj
  }),
  wait: PropTypes.object.isRequired
}

export default Controls
