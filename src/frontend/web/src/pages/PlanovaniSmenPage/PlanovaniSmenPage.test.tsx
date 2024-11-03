import { render } from '@redwoodjs/testing/web'

import PlanovaniSmenPage from './PlanovaniSmenPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PlanovaniSmenPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PlanovaniSmenPage />)
    }).not.toThrow()
  })
})
