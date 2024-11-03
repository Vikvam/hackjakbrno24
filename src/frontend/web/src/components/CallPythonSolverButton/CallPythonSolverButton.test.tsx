import { render } from '@redwoodjs/testing/web'

import CallPythonSolverButton from './CallPythonSolverButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CallPythonSolverButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CallPythonSolverButton />)
    }).not.toThrow()
  })
})
