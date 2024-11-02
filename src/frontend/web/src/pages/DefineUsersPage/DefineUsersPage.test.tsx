import { render } from '@redwoodjs/testing/web'

import DefineUsersPage from './DefineUsersPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DefineUsersPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DefineUsersPage />)
    }).not.toThrow()
  })
})
