import { render } from '@redwoodjs/testing/web'

import VysledneSmenyPage from './VysledneSmenyPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('VysledneSmenyPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<VysledneSmenyPage />)
    }).not.toThrow()
  })
})
