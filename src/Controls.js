import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

const ControlsContext = createContext()

function useControlsContext () {
  const context = useContext(ControlsContext)
  if (!context) {
    throw new Error(
      'Controls compound components cannot be rendered outside the Controls component'
    )
  }
  return context
}

function Controls ({ duration, children }) {
  return (
    <ControlsContext.Provider value={duration}>
      {children}
    </ControlsContext.Provider>
  )
}

Controls.propTypes = {
  children: PropTypes.node.isRequired,
  duration: PropTypes.object.isRequired
}

function Value () {
  const { value } = useControlsContext()
  return value.format('d [days] HH:mm')
}

Value.displayName = 'Controls.Value'

Controls.Value = Value

export default Controls
export { useControlsContext, Value }
