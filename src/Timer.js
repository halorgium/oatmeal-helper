import React, { createContext, useState, useEffect, useCallback, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment-duration-format'
import 'moment-timer'

import Controls from './Controls'

const calculateWait = (now, start, duration) => {
  const time = now.clone()
  time.startOf('day')
  time.add(start)
  time.subtract(duration)

  const diff = moment.duration(time.diff(now))
  if (diff.as('seconds') < 0) {
    diff.add(1, 'day')
  }
  return diff
}

function useNow () {
  const [now, setNow] = useState(moment())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(moment())
    }, 1000)

    return () => {
      clearInterval(interval)
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

      if (value.as('seconds') < 0) {
        value.add(1, 'day')
      } else if (value.as('seconds') > 86400) {
        value.subtract(1, 'day')
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

const TimerContext = createContext()

function useTimerContext () {
  const context = useContext(TimerContext)
  if (!context) {
    throw new Error(
      'Timer compound components cannot be rendered outside the Timer component'
    )
  }
  return context
}

function Timer ({ children }) {
  const now = useNow()
  const cook = useDuration('02:30')
  const ready = useDuration('06:30')

  const value = useMemo(() => {
    return {
      now,
      cook,
      ready,
      wait: calculateWait(now, ready.value, cook.value)
    }
  }, [now, cook, ready])

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  )
}

Timer.propTypes = {
  children: PropTypes.node.isRequired
}

function Now () {
  const { now } = useTimerContext()
  return now.format('HH:mm')
}

Now.displayName = 'Timer.Now'

function ControlReady ({ children }) {
  const { ready } = useTimerContext()

  return (
    <Controls duration={ready}>
      {children}
    </Controls>
  )
}

ControlReady.displayName = 'Timer.ControlReady'
ControlReady.propTypes = {
  children: PropTypes.node.isRequired
}

function ControlCook ({ children }) {
  const { cook } = useTimerContext()

  return (
    <Controls duration={cook}>
      {children}
    </Controls>
  )
}

ControlCook.displayName = 'Timer.ControlCook'
ControlCook.propTypes = {
  children: PropTypes.node.isRequired
}

function Wait () {
  const { wait } = useTimerContext()
  return wait.format('HH:mm')
}

Timer.Now = Now
Timer.ControlCook = ControlCook
Timer.ControlReady = ControlReady
Timer.Wait = Wait

export default Timer
