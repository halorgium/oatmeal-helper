import React from 'react'
import PropTypes from 'prop-types'

import DeltaControl from './DeltaControl'

function DeltaControls ({updater}) {
  return [
    <DeltaControl
      key='1h' title='1h' value={1}
      unit='hour' updater={updater}
    />,
    <DeltaControl
      key='15m' title='15m' value={15}
      unit='minute' updater={updater}
    />
  ]
}

DeltaControls.propTypes = {
  updater: PropTypes.func.isRequired
}

export default DeltaControls
