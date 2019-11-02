import React from 'react'
import renderer from 'react-test-renderer'
import moment from 'moment'
import MockDate from 'mockdate'
import App from './App'

it('renders without crashing', () => {
  MockDate.set(moment('2017-02-08 21:21:00.000Z'))
  const tree = renderer.create(
    <App />
  ).toJSON()
  MockDate.reset()
  expect(tree).toMatchSnapshot()
})
