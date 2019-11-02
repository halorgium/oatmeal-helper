import React from 'react'
import renderer from 'react-test-renderer'
import Timer from './Timer'

it('renders without crashing', () => {
  const tree = renderer.create(
    <Timer>
      <Timer.Now />
    </Timer>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

describe('Context', () => {
  it('stores the information', () => {
    const ShowContext = () => {
      const context = Timer.useContext()
      return (
        <span>{JSON.stringify(context)}</span>
      )
    }

    const tree = renderer.create(
      <Timer>
        <ShowContext />
      </Timer>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
