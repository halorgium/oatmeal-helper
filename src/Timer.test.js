import React from 'react'
import renderer from 'react-test-renderer'
import Timer from './Timer'

it('renders without crashing', () => {
  const tree = renderer.create(
    <Timer />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
