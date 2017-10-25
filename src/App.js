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

class Deltas extends React.Component {
  static propTypes = {
    callback: PropTypes.func.isRequired
  }

  render () {
    const { callback } = this.props

    return (
      <div>
        <button onClick={() => callback(1, 'hour')}>+1h</button>
        <button onClick={() => callback(-1, 'hour')}>-1h</button>
        <button onClick={() => callback(15, 'minutes')}>+15m</button>
        <button onClick={() => callback(-15, 'minutes')}>-15m</button>
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
    const { now, ready, cook, wait, deltas } = this.props

    return (
      <div>
        <div>
          <p>Time right now</p>
          <div>{now.format('HH:mm')}</div>
        </div>
        <div>
          <p>Time to be ready</p>
          <button onClick={() => '6:30'} />
          <button onClick={() => '7:00'} />
          <button onClick={() => '8:00'} />
          <Deltas callback={deltas.ready} />
          <div>{ready.format('HH:mm')}</div>
        </div>
        <div>
          <p>Time to cook</p>
          <Deltas callback={deltas.cook} />
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

    this.state = { now, cook, ready }

    this.timer = moment.duration(10, 'seconds').timer({ start: true, loop: true }, () => {
      this.setState({now: moment()})
    })

    this.deltas = {
      ready: this.delta('ready').bind(this),
      cook: this.delta('cook').bind(this)
    }
  }

  render () {
    const { now, ready, cook } = this.state
    const wait = calculateWait(now, ready, cook)

    return (
      <div className='App'>
        <header className='header'>
          <h1 className='title'>Make Oatmeal</h1>
        </header>
        <Helper
          now={now} ready={ready} cook={cook} wait={wait}
          deltas={this.deltas}
        />
      </div>
    )
  }

  delta (key) {
    return (amount, unit) => {
      const value = this.state[key].clone().add(amount, unit)
      this.setState({ [key]: value })
    }
  }
}

export default App
