import { render } from '@redwoodjs/testing/web'

import CallPythonSolverPage from './CallPythonSolverPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CallPythonSolverPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CallPythonSolverPage />)
    }).not.toThrow()
  })
})
