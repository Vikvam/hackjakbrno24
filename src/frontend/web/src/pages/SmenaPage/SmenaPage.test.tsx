import { render } from '@redwoodjs/testing/web'

import SmenaPage from './SmenaPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SmenaPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SmenaPage />)
    }).not.toThrow()
  })
})
