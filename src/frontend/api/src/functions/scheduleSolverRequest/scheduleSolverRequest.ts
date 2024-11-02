import fetch from 'node-fetch'

export const handler = async (event, context) => {
  try {
    const { input_data } = JSON.parse(event.body)

    const response = await fetch('http://localhost:8000/solve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input_data }),
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
