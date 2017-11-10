import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import AbsoluteControl from './AbsoluteControl'
import DeltaControls from './DeltaControls'

class Controls extends React.Component {
  static propTypes = {
    absolutes: PropTypes.object.isRequired,
    cook: PropTypes.object.isRequired,
    deltas: PropTypes.object.isRequired,
    now: PropTypes.instanceOf(moment).isRequired,
    ready: PropTypes.instanceOf(moment).isRequired,
    wait: PropTypes.object.isRequired
  }

  render () {
    const { now, ready, cook, wait, absolutes, deltas } = this.props

    return (
      <div>
        <div>
          <p>Time right now</p>
          <div>{now.format('HH:mm')}</div>
        </div>
        <div>
          <p>Time to be ready</p>
          <AbsoluteControl value='6:30' updater={absolutes.ready} />
          <AbsoluteControl value='7:00' updater={absolutes.ready} />
          <AbsoluteControl value='8:00' updater={absolutes.ready} />
          <DeltaControls updater={deltas.ready} />
          <div>{ready.format('HH:mm')}</div>
        </div>
        <div>
          <p>Time to cook</p>
          <AbsoluteControl value='2:30' updater={absolutes.cook} />
          <AbsoluteControl value='8:00' updater={absolutes.cook} />
          <DeltaControls updater={deltas.cook} />
          <div>{cook.format('HH:mm')}</div>
        </div>
        <div>
          <p>Time to wait</p>
          <div>{wait.format('HH:mm')}</div>
        </div>
      </div>
    )
  }
}

export default Controls
