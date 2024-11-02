import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      {/* Other routes */}
      <Route path="/call-python-solver" page={CallPythonSolverPage} name="callPythonSolver" />
    </Router>
  )
}

export default Routes
