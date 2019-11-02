import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment-duration-format'
import 'moment-timer'

import { calculateWait } from './calculations'
import Controls from './Controls'

function useNow (clock, delay) {
  const [now, setNow] = useState(() => moment.duration(clock()))

  useEffect(() => {
    if (delay <= 0) {
      return
    }

    const interval = setInterval(() => {
      setNow(moment.duration(clock()))
    }, delay)

    return () => {
      clearInterval(interval)
    }
  }, [clock, delay])

  return now
}

function useDuration (initial) {
  const [duration, setDuration] = useState(() => moment.duration(initial))

  const set = useCallback((time) => {
    setDuration(moment.duration(time))
  }, [])

  const add = useCallback((amount, unit) => {
    setDuration(original => {
      const value = original.clone()
      value.add(amount, unit)

      if (value.as('seconds') < 0) {
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

const Context = createContext()

function useContext () {
  const context = React.useContext(Context)
  if (!context) {
    throw new Error(
      'Timer compound components cannot be rendered outside the Timer component'
    )
  }
  return context
}

function Timer ({ initialCook, initialReady, clock, delay, children }) {
  const now = useNow(clock, delay)
  const cook = useDuration(initialCook)
  const ready = useDuration(initialReady)

  const value = useMemo(() => {
    const wait = calculateWait(now, ready.value, cook.value)
    const total = cook.value.clone()
    total.add(wait)

    return {
      now,
      cook,
      ready,
      wait,
      total
    }
  }, [now, cook, ready])

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

Timer.propTypes = {
  children: PropTypes.node.isRequired,
  clock: PropTypes.func,
  delay: PropTypes.number,
  initialCook: PropTypes.string.isRequired,
  initialReady: PropTypes.string.isRequired
}

const defaultClock = () => {
  const now = moment()
  const dayStart = now.clone().startOf('day')
  return moment.duration(now.diff(dayStart))
}

Timer.defaultProps = {
  clock: defaultClock,
  delay: 1000
}

function Now () {
  const { now } = useContext()
  return now.format('HH:mm')
}

Now.displayName = 'Timer.Now'

function ControlReady ({ children }) {
  const { ready } = useContext()

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
  const { cook } = useContext()

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
  const { wait } = useContext()
  return wait.format('d [days] HH:mm')
}

Wait.displayName = 'Timer.Wait'

function Total () {
  const { total } = useContext()
  return total.format('d [days] HH:mm')
}

Total.displayName = 'Timer.Total'

Timer.Now = Now
Timer.ControlCook = ControlCook
Timer.ControlReady = ControlReady
Timer.Wait = Wait
Timer.Total = Total
Timer.useContext = useContext

export default Timer
