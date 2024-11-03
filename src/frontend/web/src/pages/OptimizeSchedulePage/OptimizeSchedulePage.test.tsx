import { render } from '@redwoodjs/testing/web'

import OptimizeSchedulePage from './OptimizeSchedulePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('OptimizeSchedulePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OptimizeSchedulePage id={42} />)
    }).not.toThrow()
  })
})
