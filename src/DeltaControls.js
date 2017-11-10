import React from 'react'
import PropTypes from 'prop-types'

import DeltaControl from './DeltaControl'

class DeltaControls extends React.Component {
  static propTypes = {
    updater: PropTypes.func.isRequired
  }

  render () {
    const { updater } = this.props

    return [
      <DeltaControl key='1h' title='1h' value={1} unit='hour' updater={updater} />,
      <DeltaControl key='15m' title='15m' value={15} unit='minute' updater={updater} />
    ]
  }
}

export default DeltaControls
