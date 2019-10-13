import React from 'react'
import Timer from './Timer'
import Controls from './Controls'
import AbsoluteControl from './AbsoluteControl'
import DeltaControl from './DeltaControl'

import './App.css'

function App () {
  return (
    <Timer>
      <div className='App'>
        <header className='header'>
          <h1 className='title'>Make Oatmeal</h1>
        </header>
        <div>
          <p>Time right now</p>
          <div><Timer.Now /></div>
        </div>
        <Timer.ControlReady>
          <div>
            <p>Time to be ready</p>
            <AbsoluteControl time='06:30' />
            <AbsoluteControl time='07:00' />
            <AbsoluteControl time='08:00' />
            <DeltaControl diff='00:15' />
            <DeltaControl diff='01:00' />
            <div><Controls.Value /></div>
          </div>
        </Timer.ControlReady>
        <Timer.ControlCook>
          <div>
            <p>Time to cook</p>
            <AbsoluteControl time='02:30' />
            <AbsoluteControl time='08:00' />
            <DeltaControl diff='00:15' />
            <DeltaControl diff='01:00' />
            <div><Controls.Value /></div>
          </div>
        </Timer.ControlCook>
        <div>
          <p>Time to wait</p>
          <div><Timer.Wait /></div>
        </div>
      </div>
    </Timer>
  )
}

App.propTypes = {}

export default App
