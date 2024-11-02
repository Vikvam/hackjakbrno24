import { render } from '@redwoodjs/testing/web'

import SearchUsersPage from './SearchUsersPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SearchUsersPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SearchUsersPage />)
    }).not.toThrow()
  })
})
