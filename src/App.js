import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment-duration-format'
import 'moment-timer'
import './App.css'

const calculateWait = (now, ready, cook) => {
  if (now.isAfter(ready)) {
    throw new Error('ready is not after now')
  }

  return moment.duration(ready - now.clone().add(cook))
}

class Buttons extends React.Component {
  static propTypes = {
    updater: PropTypes.func.isRequired
  }

  render () {
    const { updater } = this.props

    return (
      <div>
        <button onClick={() => updater(1, 'hour')}>+1h</button>
        <button onClick={() => updater(-1, 'hour')}>-1h</button>
        <button onClick={() => updater(15, 'minutes')}>+15m</button>
        <button onClick={() => updater(-15, 'minutes')}>-15m</button>
      </div>
    )
  }
}

class Helper extends React.Component {
  static propTypes = {
    now: PropTypes.instanceOf(moment).isRequired,
    ready: PropTypes.instanceOf(moment).isRequired,
    cook: PropTypes.object.isRequired,
    wait: PropTypes.object.isRequired,
    updateReady: PropTypes.func.isRequired,
    updateCook: PropTypes.func.isRequired
  }

  render () {
    const { now, ready, cook, wait, updateReady, updateCook } = this.props

    return (
      <div>
        <div>
          <p>Time right now</p>
          <div>{now.format('HH:mm')}</div>
        </div>
        <div>
          <p>Time to be ready</p>
          <Buttons updater={updateReady} />
          <div>{ready.format('HH:mm')}</div>
        </div>
        <div>
          <p>Time to cook</p>
          <Buttons updater={updateCook} />
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

const makeReady = now => {
  const ready = moment('0630', 'HHmm')

  if (ready.isAfter(now)) {
    return ready
  }

  return ready.add(1, 'day')
}

class App extends React.Component {
  constructor (props) {
    super(props)

    const now = moment()
    const cook = moment.duration('02:30')
    const ready = makeReady(now)
    const wait = calculateWait(now, ready, cook)

    this.state = {
      now,
      cook,
      ready,
      wait
    }

    this.timer = moment.duration(10, 'seconds').timer({ start: true, loop: true }, () => {
      this.setState({now: moment()})
    })

    this.updateReady = this.updateReady.bind(this)
    this.updateCook = this.updateCook.bind(this)
  }

  render () {
    const { now, ready, cook, wait } = this.state

    return (
      <div className='App'>
        <header className='header'>
          <h1 className='title'>Make Oatmeal</h1>
        </header>
        <Helper
          now={now} ready={ready} cook={cook} wait={wait}
          updateReady={this.updateReady} updateCook={this.updateCook}
        />
      </div>
    )
  }

  updateReady (amount, unit) {
    const { now, cook } = this.state
    const ready = this.state.ready.clone().add(amount, unit)
    const wait = calculateWait(now, ready, cook)
    this.setState({ ready, wait })
  }

  updateCook (amount, unit) {
    const { now, ready } = this.state
    const cook = this.state.cook.clone().add(amount, unit)
    const wait = calculateWait(now, ready, cook)
    this.setState({ cook, wait })
  }
}

export default App
