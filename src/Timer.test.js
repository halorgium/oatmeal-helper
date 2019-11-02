import React from 'react'
import renderer from 'react-test-renderer'
import moment from 'moment'
import Timer from './Timer'

it('renders without crashing', () => {
  const clock = () => moment('2017-02-08 21:21:00.000Z')

  const tree = renderer.create(
    <Timer initialCook='02:30' initialReady='06:30' clock={clock} delay={0}>
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

    const clock = () => moment('2017-02-08 21:21:00.000Z')

    const tree = renderer.create(
      <Timer initialCook='02:30' initialReady='06:30' clock={clock} delay={0}>
        <ShowContext />
      </Timer>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
