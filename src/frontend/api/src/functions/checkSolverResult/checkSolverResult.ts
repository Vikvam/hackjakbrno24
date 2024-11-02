// api/src/functions/checkSolverResult.ts
import fetch from 'node-fetch'

export const handler = async (event, context) => {
  try {
    const { job_id } = JSON.parse(event.body)

    const response = await fetch(`http://localhost:8000/result/${job_id}`)
    const result = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    }
  }
}
