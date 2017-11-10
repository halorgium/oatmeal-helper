import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment-duration-format'
import 'moment-timer'

import Controls from './Controls'

const calculateWait = (now, ready, cook) => {
  if (now.isAfter(ready)) {
    throw new Error('ready is not after now')
  }

  return moment.duration(ready - now.clone().add(cook))
}



const makeAbsolute = (time, now) => {
  const ready = moment(time, 'HH:mm')

  if (ready.isAfter(now)) {
    return ready
  }

  return ready.add(1, 'day')
}

class Timer extends React.Component {
  static propTypes = {}

  constructor (props) {
    super(props)

    this.makeReady = this.makeReady.bind(this)

    const now = moment()
    const cook = moment.duration('02:30')
    const ready = makeAbsolute('06:30', now)

    this.state = { now, cook, ready }

    this.timer = moment.duration(10, 'seconds').timer({ loop: true }, () => {
      this.setState({now: moment()})
    })

    this.absolutes = {
      ready: this.absolute('ready', this.makeReady).bind(this),
      cook: this.absolute('cook', moment.duration).bind(this)
    }

    this.deltas = {
      ready: this.delta('ready').bind(this),
      cook: this.delta('cook').bind(this)
    }
  }

  componentDidMount () {
    console.log('start')
    this.timer.start()
  }

  componentWillUnmount () {
    console.log('stop')
    this.timer.stop()
  }

  render () {
    const { now, ready, cook } = this.state
    const wait = calculateWait(now, ready, cook)

    return (
      <div className='App'>
        <header className='header'>
          <h1 className='title'>Make Oatmeal</h1>
        </header>
        <Controls
          now={now} ready={ready} cook={cook} wait={wait}
          absolutes={this.absolutes} deltas={this.deltas}
        />
      </div>
    )
  }

  makeReady (time) {
    const { now } = this.state
    return makeAbsolute(time, now)
  }

  absolute (key, builder) {
    return (time) => {
      const value = builder(time)
      this.setState({ [key]: value })
    }
  }

  delta (key) {
    return (amount, unit) => {
      const value = this.state[key].clone().add(amount, unit)
      this.setState({ [key]: value })
    }
  }
}

export default Timer
