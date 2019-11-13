import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Timer from './Timer'
import { Value } from './Controls'
import AbsoluteControl from './AbsoluteControl'
import DeltaControl from './DeltaControl'

import styles from './App.module.css'

function Set ({ time, ...props }) {
  return <AbsoluteControl time={time} {...props} />
}

Set.propTypes = {
  time: PropTypes.string.isRequired
}

function Add ({ diff, ...props }) {
  return <DeltaControl diff={diff} multiplier={1} prefix='+' {...props} />
}

Add.propTypes = {
  diff: PropTypes.string.isRequired
}

function Sub ({ diff, ...props }) {
  return <DeltaControl diff={diff} multiplier={-1} prefix='-' {...props} />
}

Sub.propTypes = {
  diff: PropTypes.string.isRequired
}

function App () {
  return (
    <Timer initialCook='02:30' initialReady='06:30'>
      <div className={styles.main}>
        <header>
          <h1 className={styles.title}>Make Oatmeal</h1>
        </header>
        <div className={styles.wide_time}>Now: <Timer.Now /></div>
        <Timer.ControlReady>
          <div className={styles.controller}>
            <div className={classNames(styles.left, styles.buttons, styles.w_2p)}>
              <Add diff='00:15' className={classNames(styles.button, styles.w_1)} />
              <Sub diff='00:15' className={classNames(styles.button, styles.w_1)} />
              <Add diff='01:00' className={classNames(styles.button, styles.w_1)} />
              <Sub diff='01:00' className={classNames(styles.button, styles.w_1)} />
            </div>
            <div className={styles.tall_time}>Ready: <Value /></div>
            <div className={classNames(styles.right, styles.buttons, styles.w_2p)}>
              <Set time='06:30' className={classNames(styles.button, styles.w_1)} />
              <Set time='07:00' className={classNames(styles.button, styles.w_1)} />
              <Set time='07:30' className={classNames(styles.button, styles.w_1)} />
              <Set time='08:00' className={classNames(styles.button, styles.w_1)} />
            </div>
          </div>
        </Timer.ControlReady>
        <Timer.ControlCook>
          <div className={styles.controller}>
            <div className={classNames(styles.left, styles.buttons, styles.w_2p)}>
              <Add diff='00:15' className={classNames(styles.button, styles.w_1)} />
              <Sub diff='00:15' className={classNames(styles.button, styles.w_1)} />
              <Add diff='01:00' className={classNames(styles.button, styles.w_1)} />
              <Sub diff='01:00' className={classNames(styles.button, styles.w_1)} />
            </div>
            <div className={styles.tall_time}>Cook: <Value /></div>
            <div className={classNames(styles.right, styles.buttons, styles.w_2p)}>
              <Set time='02:30' className={classNames(styles.button, styles.w_2)} />
              <Set time='08:00' className={classNames(styles.button, styles.w_2)} />
            </div>
          </div>
        </Timer.ControlCook>
        <div className={styles.wide_time}>Wait: <Timer.Wait /></div>
        <div className={styles.wide_time}>Total: <Timer.Total /></div>
      </div>
    </Timer>
  )
}

App.propTypes = {}

export default App
