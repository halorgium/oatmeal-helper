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

class Absolute extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    updater: PropTypes.func.isRequired
  }

  render () {
    const { value, updater } = this.props

    return <button onClick={() => updater(value)}>{value}</button>
  }
}

class Deltas extends React.Component {
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
    absolutes: PropTypes.object.isRequired,
    deltas: PropTypes.object.isRequired
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
          <Absolute value='6:30' updater={absolutes.ready} />
          <Absolute value='7:00' updater={absolutes.ready} />
          <Absolute value='8:00' updater={absolutes.ready} />
          <Deltas updater={deltas.ready} />
          <div>{ready.format('HH:mm')}</div>
        </div>
        <div>
          <p>Time to cook</p>
          <Absolute value='2:30' updater={absolutes.cook} />
          <Absolute value='8:00' updater={absolutes.cook} />
          <Deltas updater={deltas.cook} />
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

const makeAbsolute = (time, now) => {
  const ready = moment(time, 'HH:mm')

  if (ready.isAfter(now)) {
    return ready
  }

  return ready.add(1, 'day')
}

class App extends React.Component {
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
        <Helper
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

export default App
