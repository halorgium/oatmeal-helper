import React from 'react'
import renderer from 'react-test-renderer'
import Timer from './Timer'

it('renders without crashing', () => {
  const clock = () => '21:21'

  const tree = renderer.create(
    <Timer initialCook='02:30' initialReady='06:30' clock={clock} delay={0}>
      <Timer.Now />
    </Timer>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

describe('Context', () => {
  const ShowContext = () => {
    const context = Timer.useContext()
    return (
      <span>{JSON.stringify(context)}</span>
    )
  }

  it('stores the information', () => {
    const clock = () => '21:21'

    const tree = renderer.create(
      <Timer initialCook='02:30' initialReady='06:30' clock={clock} delay={0}>
        <ShowContext />
      </Timer>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('handles odd cases', () => {
    const clock = () => '09:41'

    const tree = renderer.create(
      <Timer initialCook='23:45' initialReady='06:30' clock={clock} delay={0}>
        <ShowContext />
      </Timer>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
