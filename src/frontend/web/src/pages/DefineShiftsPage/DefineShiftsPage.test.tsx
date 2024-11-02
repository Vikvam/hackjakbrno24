import { render } from '@redwoodjs/testing/web'

import DefineShiftsPage from './DefineShiftsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DefineShiftsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DefineShiftsPage />)
    }).not.toThrow()
  })
})
