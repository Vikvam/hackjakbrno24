import fetch from 'node-fetch'

export const handler = async (event, context) => {
  try {
    const { employees, shifts } = JSON.parse(event.body)

    const response = await fetch('http://localhost:8000/solve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ employees, shifts }),
    })

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
