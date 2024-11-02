import { useState } from 'react'

const CallPythonSolverButton = () => {
  const [jobId, setJobId] = useState(null)
  const [result, setResult] = useState(null)

  const scheduleSolver = async () => {
    const response = await fetch('/.netlify/functions/scheduleSolverRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input_data: "example input" }),
    })
    const data = await response.json()
    setJobId(data.job_id)
  }

  const checkResult = async () => {
    const response = await fetch('/.netlify/functions/checkSolverResult', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ job_id: jobId }),
    })
    const data = await response.json()
    setResult(data)
  }

  return (
    <div>
      <button onClick={scheduleSolver}>Schedule Python Solver</button>
      {jobId && <button onClick={checkResult}>Check Result</button>}
      {result && <div>Result: {JSON.stringify(result)}</div>}
    </div>
  )
}

export default CallPythonSolverButton
