import React, { useState, useEffect, useCallback } from 'react'
import moment from 'moment'
import 'moment-duration-format'
import 'moment-timer'

import Controls from './Controls'

const calculateWait = (now, start, duration) => {
  const time = now.clone()
  time.startOf('day')
  time.add(start)
  time.subtract(duration)

  if (time.isBefore(now)) {
    time.add(1, 'day')
  }

  return moment.duration(time.diff(now))
}

function useNow () {
  const [now, setNow] = useState(moment())

  useEffect(() => {
    const timer = moment.duration(10, 'seconds').timer({ loop: true }, () => {
      setNow(moment())
    })
    timer.start()

    return () => {
      timer.stop()
    }
  }, [])

  return now
}

function useDuration (initial) {
  const [duration, setDuration] = useState(moment.duration(initial))

  const set = useCallback((time) => {
    setDuration(moment.duration(time))
  }, [])

  const add = useCallback((amount, unit) => {
    setDuration(original => {
      const value = original.clone()
      value.add(amount, unit)

      if (value.seconds() < 0) {
        return original
      }

      return value
    })
  }, [])

  return {
    value: duration,
    set,
    add
  }
}

function Timer () {
  const now = useNow()
  const cook = useDuration('02:30')
  const ready = useDuration('06:30')
  const wait = calculateWait(now, ready.duration, cook.duration)

  return (
    <div className='App'>
      <header className='header'>
        <h1 className='title'>Make Oatmeal</h1>
      </header>
      <div>
        <p>Time right now</p>
        <div>{now.format('HH:mm')}</div>
      </div>
      <Controls
        title='Time to be ready'
        times={['6:30', '7:00', '8:00']}
        durations={['00:15', '01:00']}
        {...ready}
      />
      <Controls
        title='Time to cook'
        times={['2:30', '8:00']}
        durations={['00:15', '01:00']}
        {...cook}
      />
      <div>
        <p>Time to wait</p>
        <div>{wait.format('HH:mm')}</div>
      </div>
    </div>
  )
}

export default Timer
