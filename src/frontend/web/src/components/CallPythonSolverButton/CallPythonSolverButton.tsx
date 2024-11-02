import { useState } from 'react'

const example_doctor = {
  name: 'John Smith',
  department_preference: [
    ['RTG', 0.7],
    ['CT', 0.3],
  ],
  shift_availability: [
    ['2024-11-04', 'MORNING', 'AVAILABLE'],
    ['2024-11-05', 'MORNING', 'AVAILABLE'],
  ],
  stem: 'RTG', // ex. RTG, CT
  atestation: 'RTG',
  qualifications: 'L2', // L1 - VS, L2 - kmen, L3 - atestace
}

const example_shift = {
  datetype: ['2024-11-04', 'MORNING'],
  department: 'RTG',
  amount: 1,
  qualification: 'L1',
}

const example_call = {
  employees: [example_doctor],
  shifts: [example_shift],
}

const CallPythonSolverButton = () => {
  const [jobId, setJobId] = useState(null)
  const [result, setResult] = useState(null)

  const scheduleSolver = async () => {
    const response = await fetch('/.redwood/functions/scheduleSolverRequest', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(example_call),
    })
    console.log('Response received:', response)
    const data = await response.json()
    setJobId(data.job_id)
  }

  const checkResult = async () => {
    const response = await fetch('/.redwood/functions/checkSolverResult', {
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
