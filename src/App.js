import React from 'react'
import Timer from './Timer'
import Controls from './Controls'
import AbsoluteControl from './AbsoluteControl'
import DeltaControl from './DeltaControl'

import './App.css'

function App () {
  return (
    <Timer initialCook='02:30' initialReady='06:30'>
      <div className='App'>
        <header className='header'>
          <h1 className='title'>Make Oatmeal</h1>
        </header>
        <div>Time right now: <Timer.Now /></div>
        <Timer.ControlReady>
          <div>Time to be ready: <Controls.Value /></div>
          <AbsoluteControl time='06:30' />
          <AbsoluteControl time='07:00' />
          <AbsoluteControl time='08:00' />
          <DeltaControl diff='00:15' />
          <DeltaControl diff='01:00' />
        </Timer.ControlReady>
        <Timer.ControlCook>
          <div>Time to cook: <Controls.Value /></div>
          <AbsoluteControl time='02:30' />
          <AbsoluteControl time='08:00' />
          <DeltaControl diff='00:15' />
          <DeltaControl diff='01:00' />
        </Timer.ControlCook>
        <div>Time to wait: <Timer.Wait /></div>
        <div>Total Time: <Timer.Total /></div>
      </div>
    </Timer>
  )
}

App.propTypes = {}

export default App
