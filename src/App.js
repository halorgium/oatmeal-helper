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

class Helper extends React.Component {
  render () {
    const { now, ready, cook, wait } = this.props

    return (
      <div>
        <div>
          <p>Time right now</p>
          <span>{now.format('HH:mm')}</span>
        </div>
        <div>
          <p>Time to be ready</p>
          <span>{ready.format('HH:mm')}</span>
        </div>
        <div>
          <p>Time to cook</p>
          <span>{cook.format('HH:mm')}</span>
        </div>
        <div>
          <p>Time to wait</p>
          <span>{wait.format('HH:mm')}</span>
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

    this.state = {
      now: moment()
    }

    this.timer = moment.duration(10, 'seconds').timer({ start: true, loop: true }, () => {
      this.setState({now: moment()})
    })
  }

  render () {
    const now = this.state.now
    const ready = makeReady(now)
    const cook = moment.duration('02:30')
    const wait = calculateWait(now, ready, cook)

    return (
      <div className='App'>
        <header className='header'>
          <h1 className='title'>Make Oatmeal</h1>
        </header>
        <Helper now={now} ready={ready} cook={cook} wait={wait} />
      </div>
    )
  }
}

export default App
