import React, { useState, useEffect } from 'react'
import moment from 'moment'
import 'moment-duration-format'
import 'moment-timer'

import Controls from './Controls'

const calculateWait = (now, ready, cook) => {
  const readyTime = makeTime(ready, now)
  if (now.isAfter(readyTime)) {
    throw new Error('ready is not after now')
  }

  return moment.duration(readyTime - now.clone().add(cook))
}

const makeTime = (duration, now) => {
  const time = now.clone()
  time.startOf('day')
  time.add(duration)

  if (time.isAfter(now)) {
    return time
  }

  return time.add(1, 'day')
}

function Timer () {
  const [now, setNow] = useState(moment())
  const [cook, setCook] = useState(moment.duration('02:30'))
  const [ready, setReady] = useState(moment.duration('06:30'))

  useEffect(() => {
    const timer = moment.duration(10, 'seconds').timer({ loop: true }, () => {
      setNow(moment())
    })
    timer.start()

    return () => {
      timer.stop()
    }
  }, [])

  function absolute (setter, builder) {
    return (time) => {
      const value = moment.duration(time)
      setter(value)
    }
  }

  function delta (setter) {
    return (amount, unit) => {
      setter(value => value.clone().add(amount, unit))
    }
  }

  const absolutes = {
    ready: absolute(setReady),
    cook: absolute(setCook)
  }

  const deltas = {
    ready: delta(setReady),
    cook: delta(setCook)
  }

  const wait = calculateWait(now, ready, cook)

  return (
    <div className='App'>
      <header className='header'>
        <h1 className='title'>Make Oatmeal</h1>
      </header>
      <Controls
        now={now} ready={ready} cook={cook}
        wait={wait}
        absolutes={absolutes} deltas={deltas}
      />
    </div>
  )
}

export default Timer
